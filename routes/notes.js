const fs = require('fs');
const notes = require('express').Router();
const {v4: uuidv4} = require('uuid');

const DB_PATH = './db/db.json';

// GET Route for retrieving all the notes
notes.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);

  fs.promises.readFile(DB_PATH)
  .then(data => {
    res.type('json');
    res.send(data);
  })
  .catch(reason => {
    console.error('Failed to load data for GET request:', reason);
    res.status(500).send('Error in reading notes database.')
  });
});

// POST Route for a new note
notes.post('/', (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  // logic for adding a new note

  if (!req.body) {
    return res.status(400).send('Note data sent by client is not well-formed.');
  }

  // construct new note
  const { title, text } = req.body;
  const newNote = {
    title,
    text,
    id: uuidv4(),
  };

  // load JSON db of notes, append new note, and write file
  fs.promises.readFile(DB_PATH)
    .then(data => {
      const notes = JSON.parse(data);
      notes.push(newNote);
      return fs.promises.writeFile(DB_PATH, notes);
    })
    .then(() => res.json(`Note added successfully 🚀`))
    .catch(reason => {
      console.error('Failed while processing notes request:', reason);
      return res.status(500).send('Error in updating notes database.');
    });
});

// logic for deleting a note
notes.delete('/:id', (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send('Delete request did not specify a note id.');
  }

  // load JSON db of notes, filter out the note with the matching id, and write the file
  fs.promises.readFile(DB_PATH)
    .then(data => { 
      const originalNotes = JSON.parse(data);
      const filteredNotes = originalNotes.filter(note => note.id !== id);
      // check to make sure exactly one note was removed
      if (filteredNotes.length === originalNotes.length) {
        throw 'Note not found';
      } else if (filteredNotes.length !== originalNotes.length - 1) {
        throw 'Multiple notes found with matching id';
      }
      return fs.promises.writeFile(DB_PATH, filteredNotes);
    })
    .then(() => res.json(`Note deleted successfully 📝 ↷ 🗑`))
    .catch(reason => {
      console.error('Failed while processing delete request:', reason);
      return res.status(500).send('Error in delete note from database.');
    });
});

module.exports = notes;
