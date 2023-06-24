const express = require('express');
const router = express.Router();
const fs = require('fs');
const db = require('../db/db.json');

router.get('/', (req, res)=>{
  //res.send("getting notes");

  res.json(db);  
});

router.post('/', (req, res)=>{
    res.send("writing new notes");
    // TODO: read db.json
});

router.put('/', (req, res)=>{
    res.send("updating notes");
});

// TODO: can chain get and put..


router.delete('/:id', (req, res)=>{
    
    res.send(`deleting notes #${req.params.id}`);
});

// TODO: catch delete without id/invalid id
// TODO: catch any other

module.exports = router;