const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
  res.send("getting notes");
  // TODO: pass on something back to index.js
  // TODO: find out what is that something... array of objs? 
});

router.put('/', (req, res)=>{
    res.send("updating notes");
});

// TODO: can chain get and put..


router.delete('/:id', (req, res)=>{
    res.send("deleting notes");
});

// TODO: catch delete without id/invalid id
// TODO: catch any other

module.exports = router;