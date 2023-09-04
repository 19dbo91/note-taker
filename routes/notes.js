const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../db/db.json');
const uuid = require('../helpers/uuid');

const middleware = express.json();

const path =  'db/db.json'

// router.get('/', (req, res)=>{
//     res.sendFile(path.join(__dirname,'./public/index.html'))
// });

// router.get('/notes', (req, res)=>{
//     res.sendFile(path.join(__dirname,'./public/notes.html'))
// });
  


router.get('/', (req, res)=>{
    console.info(`${req.method} request received to get all notes`);
    return res.json(db);  
});

router.get('/', (req, res)=>{
    console.info(`${req.method} request received to get all notes`);
    return res.json(db);  
});


module.exports = router;