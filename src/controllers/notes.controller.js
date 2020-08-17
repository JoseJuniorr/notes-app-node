const Note = require("../models/Note");

const NotesController = {};

NotesController.renderNoteForm = (req, res) => {
  res.render("notes/new-note");
};

NotesController.createNewNote = async (req, res) => {
  const { title, description } = req.body;

  const newNote = new Note({
    title: title,
    description: description,
  });

  await newNote
    .save()
    .then(() => {
      console.log("Nota salva com sucesso!");
    })
    .catch((err) => {
      console.log("Erro ao salvar a nota no bd!" + err);
    });

  // console.log(req.body);
  res.send("create new note");
};

NotesController.renderNotes = async (req, res) => {
  const notes = await Note.find();
  res.render("notes/all-notes", { notes });
};

NotesController.renderEditFormNotes = (req, res) => {
  res.send("form edit notes");
};

NotesController.updateNote = (req, res) => {
  res.send("update notes");
};

NotesController.deleteNote = (req, res) => {
  res.send("deletar nota");
};

module.exports = NotesController;
