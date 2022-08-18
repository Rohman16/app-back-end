const { nanoid } = require("nanoid");
const { notes } = require("./notes");

const tambahNotes = (request, h) => {
  const { title, tags, body } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const myNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };
  notes.push(myNote);

  const isSuccess = notes.filter((nte) => nte.id === id).length > 0;

  if (isSuccess) {
    const resp = h.response({
      status: "success",
      message: "You have new Note",
      data: {
        noteId: id,
      },
    });
    resp.code(201);
    return resp;
  }
  const resp = h.response({
    status: "fail",
    message: "The notes fail to add",
  });
  resp.code(500);
};

const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const resp = h.response({
    status: "fail",
    message: "Catatan Tidak ada",
  });
  resp.code(404);
  return resp;
};

const editNoteById = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const resp = h.response({
      status: "success",
      message: "Note are Updated",
    });
    resp.code(200);
    return resp;
  }

  const resp = h.response({
    status: "fail",
    message: "Notes fail to update",
  });
  resp.code(404);
  return resp;
};

const deleteNoteUseId = (req, h) => {
  const { id } = req.params;
  const index = notes.findIndex((x) => x.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const resp = h.response({
      status: "success",
      message: "Notes sudah dihapus",
    });
    resp.code(200);
    return resp;
  }

  const resp = h.resp({
    status: "fail",
    message: "Notes Gagal dihapus",
  });
  resp.code(404);
  return resp;
};

module.exports = {
  tambahNotes,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteById,
  deleteNoteUseId,
};
