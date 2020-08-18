const { Router } = require("express");
const router = Router();

const { isAuthenticated } = require("../helpers/auth");

const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditFormNotes,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");

//New note
router.get("/notes/new-note", isAuthenticated, renderNoteForm);

router.post("/notes/create", isAuthenticated, createNewNote);

//Get all notes
router.get("/notes", isAuthenticated, renderNotes);

//Edit notes
router.get("/notes/edit/:id", isAuthenticated, renderEditFormNotes);

//renderiza os dados em um form para editar
router.put("/notes/edit/:id", isAuthenticated, updateNote);

//delete posts

router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

module.exports = router;
