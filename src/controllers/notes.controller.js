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
  newNote.user = req.user.id;

  await newNote
    .save()
    .then(() => {
      req.flash("success_msg", "Nota salva com sucesso!");
      res.redirect("/notes");
    })
    .catch((err) => {
      req.flash("error_msg", "Erro ao salvar a nota!");
    });
};

//Renderiza todas as notas na view all-notes
NotesController.renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id }).sort({
    createdAt: "desc",
  });
  res.render("notes/all-notes", { notes });
};

//renderiza a nota para a edição utilizando findbyId
NotesController.renderEditFormNotes = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user != req.user.id) {
    req.flash("error_msg", "Not Authorized!");
    return res.redirect("/notes");
  }

  // console.log(note);
  res.render("notes/edit-note", { note });
};

//Envia a atualização para o bd
NotesController.updateNote = async (req, res) => {
  const { title, description } = req.body;

  await Note.findByIdAndUpdate(req.params.id, {
    title,
    description,
  })
    .then(() => {
      req.flash("success_msg", "Nota editada com sucesso!");
      res.redirect("/notes");
    })
    .catch((err) => {
      req.flash("error_msg", "Erro ao editar a nota!");
      res.redirect("/notes");
    });
};

//Deletar nota
NotesController.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
    .then(() => {
      req.flash("success_msg", "Nota excluída com sucesso!");
      res.redirect("/notes");
    })
    .catch((err) => {
      req.flash("error_msg", "Erro ao excluir a nota!");
      res.redirect("/notes");
    });
};

module.exports = NotesController;
