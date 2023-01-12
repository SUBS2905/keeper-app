const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
});

const Note = mongoose.model("note", noteSchema);
module.exports = Note;
