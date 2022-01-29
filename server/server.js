const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Schema = mongoose.Schema;
const router = express.Router();
require('dotenv').config({ path: `../.env` })

// Connect Server
app.listen(4000, () => {
  console.log("server is up and running on port 4000");
});

const db = `mongodb+srv://${process.env.REACT_APP_user}:${process.env.REACT_APP_psw}@cluster0.3jya8.mongodb.net/todoDB?retryWrites=true&w=majority`;

mongoose.connect(db)
  .then(() => console.log("successfully connected to db"))
  .catch((err) => console.log(err));

//Todo Schema
let todoSchema = new Schema({
  text: String,
  done: Boolean,
});
let Todo = mongoose.model("Todo", todoSchema);

//Routes

app.use(cors());
app.use(bodyParser.json());
app.use("/todos", router);

//read
router.route("/").get( (_, res) => {
  Todo.find( (err, data) => {
    if (err) {  res.send(400).send(`ERROR ${err}`) }
    res.status(200).send(data);
  });
});

router.route('/:id').get( (req, res) => {
    Todo.findById( req.params.id, (err, item) => {
      if (err) { res.status(400).send(err) }
      res.status(200).send(item)
    });
});

//create
router.route("/add").post(function (req, res) {
    let todo = new Todo(req.body)
    todo.save()
      .then( () => res.status(200).send(`${todo.text} is successfully added`) ) 
      .catch( err => res.status(400).send(`error adding document ${err}`) )
});

//update
router.route("/:id").put(function (req, res) {
    Todo.findByIdAndUpdate(req.params.id, req.body)
    .then((todo) => {
      todo.done = !todo.done;
      todo.save();
      res.status(200).send(`${todo.text} is successfully updated`)
    })
    .catch((err) => res.status(400).send(`error adding document ${err}`) )
});

//delete
router.route("/:id").delete(function (req, res) {
  Todo.findByIdAndRemove( req.params.id, (err, item) => {
    if (err) { res.status(400).send(err) }
    res.status(200).send(`id ${req.params.id} is successfully deleted`)
  });
});