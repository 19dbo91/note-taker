const router = require('express').Router()

// GET '/api/notes'

//POST '/api/notes'

//DELETE `/api/notes/${id}`


router.post('/', (req, res)=>{
    console.info(`${req.method} request received to post a single note`);
    
    const {title, text} = req.body;
    console.info(`Passing param - title: ${title} `);
    console.info(`Passing param - text: ${text} `);

    const newNote = {
        id: uuid(),
        title,
        text
    }

    let fileRead =[];
    fileRead = JSON.parse(fs.readFileSync(path,"utf-8"))
    //console.log(fileRead);
    fileRead.push(newNote);
    //console.log(fileRead);

    fs.writeFileSync(path,JSON.stringify(fileRead));
    console.info(`File ${path} overwritten`);
});

router.put('/', (req, res)=>{
    console.info(`${req.method} request received to post a single note`);
    res.send("updating notes");
});

router.delete('/:id', (req, res)=>{ //TODO: (1)
    let queryID = req.params.id.trim();
    console.info(`${req.method} request received to delete note with id #${queryID}`);

    let notes = JSON.parse( fs.readFileSync( path, "utf-8" ) );
    
    let matchedIndex = null;
    for (let note of notes){
        if (note.id === queryID){
            matchedIndex = notes.indexOf(note); 
        }
    }
    if(!matchedIndex){
        res.status(404).json({ message: 'No Match found!' });
    }
    else{
        const delNotes = notes.splice(matchedIndex,1);
        console.log(`Removed note #${matchedIndex+1}`)
        console.log(delNotes)
        res.status(200).json({ message: `DELETE Note #${queryID} success!` })
        //TODO fs write
    }
});

module.exports = router;