const notes = require('express').Router();

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);

  // TODO: write request handler for GET /api/notes

  // readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

// POST Route for a new note
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  // TODO implement logic for adding a new note

  // const { username, topic, note } = req.body;

  // if (req.body) {
  //   const newNote = {
  //     username,
  //     note,
  //     topic,
  //     note_id: uuid(),
  //   };

  //   readAndAppend(newNote, './db/notes.json');
  //   res.json(`Note added successfully 🚀`);
  // } else {
  //   res.error('Error in adding note');
  // }
});

// TODO implement logic for deleting a note

module.exports = notes;
