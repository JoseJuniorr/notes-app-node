const NotesController = {};

NotesController.renderNoteForm = (req, res) => {
  res.render("notes/new-note");
};

NotesController.createNewNote = (req, res) => {
  console.log(req.body);
  res.send("create new note");
};

NotesController.renderNotes = (req, res) => {
  res.send("list all notes");
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
