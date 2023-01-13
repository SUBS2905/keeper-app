const dotenv = require("dotenv");
const express = require("express");
dotenv.config({ path: "./config.env" });

require("./db/connection");
const Note = require("./model/noteSchema");

const app = express();
app.use(express.json());

const middleware = (req, res, next) => next();

app.get("/", middleware, (req, res) => {
  res.send("Home Route");
});

app.get("/notes", (req, res) => {
  Note.find({}, (err, notes) => {
    if (err) res.status(500);
    else {
      res.json(notes);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  Note.findByIdAndDelete(req.params.id, (err, note) => {
    if (err) res.status(500);
    else {
      res.json(note);
    }
  });
});

app.post("/", async (req, res) => {
  const { title, content } = req.body;
  if (!title) {
    res.status(400).json("Please enter title");
  }

  try {
    const note = new Note({ title, content });
    await note.save();
    res.status(201).json("Note saved successfully");
  } catch (err) {
    res.status(500);
    console.log("Something went wrong");
    console.log(err);
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running at port 5000");
});
