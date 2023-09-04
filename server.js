const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

const notesRouter = require("./routes/notes");
const apiRouter = require('./routes/api');

const uuid = require('./helpers/uuid');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


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