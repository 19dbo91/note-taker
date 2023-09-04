const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const notesRouter = require("./routes/notes");
const apiRouter = require('./routes/api');

app.use('/', notesRouter)
app.use('/api', apiRouter)

// //SEND ERRORS -> HOME
// app.get('*',(req, res) => {
//   console.log("sent HOME")
//   res.sendFile(path.join(__dirname,'./public/index.html'));
// });


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);