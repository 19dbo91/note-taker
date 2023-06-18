const express = require('express');
const path = require('path');
const notesRouter = require("./routes/notes");

const PORT = process.env.PORT || 3001;

const app = express();

//app.use(express.static('public')); // can be used instead of HOME

//Home
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname,'./public/index.html'))
});

//HOME -> NOTES
app.use('/api/notes', notesRouter);




app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);