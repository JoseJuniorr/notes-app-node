const { Router } = require("express");
const router = Router();

const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditFormNotes,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");

//New note
router.get("/notes/new-note", renderNoteForm);

router.post("/notes/create", createNewNote);

//Get all notes
router.get("/notes", renderNotes);

//Edit notes
router.get("/notes/edit/:id", renderEditFormNotes);

//renderiza os dados em um form para editar
router.put("/notes/edit/:id", updateNote);

//delete posts

router.delete("/notes/delete/:id", deleteNote);

module.exports = router;
