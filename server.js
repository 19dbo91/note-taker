const express = require("express");
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const notesRouter = require('./routes/notes');
const apiRouter = require('./routes/api');

app.use('/', notesRouter);
app.use('/api', apiRouter);


app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);