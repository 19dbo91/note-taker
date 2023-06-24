const express = require('express');
const path = require('path');


const PORT = process.env.PORT || 3001;
const app = express();

const notesRouter = require("./routes/notes");


app.use(express.static('public')); // can be used instead of HOME

//HOME
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname,'./public/index.html'))
});


//HOME -> NOTES
app.get('/notes', (req, res)=>{
  res.sendFile(path.join(__dirname,'./public/notes.html'))
});

app.use('/api/notes', notesRouter);

//SEND ERRORS -> HOME
app.use('*',(req, res) => {
  console.log("sent HOME")
  res.sendFile(path.join(__dirname,'./public/index.html'));
});


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);