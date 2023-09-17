const express = require('express');
const app = express();
const router = express.Router();

const { readFromFile, writeToFile } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');

const dataPath = './db/db.json';

// GET '/api/notes'
router.get('/notes', (req, res) => {
    console.info(`${req.method} request received to get a single note`);
    
    readFromFile(dataPath, (err) =>{
        if(err){
            throw err;
        };
    }).then((data) => {
        return res.status(200).json( JSON.parse( data ));
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
    //console.log(`Recieved input "${title}": ${text}`);
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
        //console.log(`Before: ${JSON.stringify(notes)}`)
        
        notes.push(newNote);
        //console.log(`After: ${JSON.stringify(notes)}`)
        
        writeToFile(dataPath, notes);
        return res.status(200).json(JSON.parse( data ));
    });
});

// May not be needed this placeholder
// router.put('/', (req, res)=>{
//     console.info(`${req.method} request received to post a single note`);
//     res.send("updating notes");
// });


//DELETE `/api/notes/${id}`
router.delete('/notes/:id', (req, res)=>{
    
    let id = req.params.id.trim();

    console.info(`${req.method} request received to delete note #${id}`);

    function findNote(searchId, allNotes){
        //console.log(`Id: ${searchId}; data: ${JSON.stringify(allNotes)}`)
        for (let aNote of allNotes){
            if( aNote.id === searchId ){
                const index = allNotes.indexOf(aNote);
                return index;
            }
        };
    };

    readFromFile(dataPath, (err) =>{
        if(err){
            throw err;
        };
    }).then((data) => {
        let notes = JSON.parse(data);
        //console.log(notes);
        let matchedIndex = findNote(id, notes);
        //console.log(matchedIndex);
        
        if(!(matchedIndex+1)){
            console.log(`Did NOT find note #${matchedIndex+1}`)
            return res.status(404).json({ message: 'No Match found!' });
        }

        const deletedNote = notes.splice(matchedIndex,1);
        console.log(notes);
        writeToFile(dataPath, notes);
        return res.status(200).json({ message: `${deletedNote}` })
    });
});

module.exports = router;