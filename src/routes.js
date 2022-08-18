/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const {
  tambahNotes,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteById,
  deleteNoteUseId,
} = require("./handler");
const { handler } = require("@hapi/hapi/lib/cors");
// const { addNoteHandler } = require("../test");

routes = [
  {
    method: "POST",
    path: "/notes",
    handler: tambahNotes,
  },
  {
    method: "GET",
    path: "/notes",
    handler: getAllNotesHandler,
  },
  {
    method: "GET",
    path: "/notes/{id}",
    handler: getNoteByIdHandler,
  },
  {
    method: "PUT",
    path: "/notes/{id}",
    handler: editNoteById,
  },
  {
    method: "DELETE",
    path: "/notes/{id}",
    handler: deleteNoteUseId,
  },
];

module.exports = { routes };
