const express = require('express');
const app = express();
const router = express.Router();

const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

const dataPath = './db/db.json';

// GET '/api/notes'
router.get('/notes', (req, res) => {
    console.info(`${req.method} request received to get a single note`);
    
    readFromFile(dataPath, (err,data) =>{
        if(err){
            throw err;
        };
    }).then((data) => {
        return res.json( JSON.parse( data ));
    });
});

//POST '/api/notes'
router.post('/notes', (req, res)=>{
    console.info(`${req.method} request received to post a single note`);
    
    const { title, text } = req.body;

    if( !title || !text ){
        console.error("Missing title/text");
        return res.status(400);
    }
    console.log(`Recieved input "${title}": ${text}`);
    const newNote = {
        id: uuid(),
        title,
        text
    }

    let notes = [];

    readFromFile(dataPath, (err) =>{
        if( err ){
            throw err;
        };
    }).then((data) => {
        notes = JSON.parse( data );
        console.log(`Before: ${JSON.stringify(notes)}`)
        
        notes.push(newNote);
        console.log(`After: ${JSON.stringify(notes)}`)
        
        writeToFile(dataPath, notes);
    });
});

router.put('/', (req, res)=>{
    console.info(`${req.method} request received to post a single note`);
    res.send("updating notes");
});


//DELETE `/api/notes/${id}`
router.delete('/notes/:id', (req, res)=>{ //TODO: (1)
    let id = req.params.id.trim();
    console.info(`${req.method} request received to delete note #${id}`);

    //let notes = JSON.parse( readFromFile( path, "utf-8" ) );
    
    let matchedIndex = null;
    for (let note of notes){
        if (note.id === id){
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