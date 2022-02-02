const express = require("express");
const routeTodo = express.Router(); 
const Todo = require("../models/todo.model"); 

//Create
routeTodo.post("/add", (req, res) => {
  let todo = new Todo(req.body);
  todo.save()
    .then( () => res.status(200).send(`${todo.text} is successfully added`) ) 
    .catch( err => res.status(400).send(`error adding document ${err}`) )
});

//Read
routeTodo.get("/", (_, res) => {
  Todo.find( (err, data) => {
    if(err) { res.status(404).send(`ERROR ${err}`) }
    res.status(200).send(data)
  });
});
  
routeTodo.get("/:id", (req, res) => {
  Todo.findById( req.params.id, (err, item) => {
    if (err) { res.status(404).send(`ERROR ${err}`) }
    res.status(200).send(item)
  });
});

//Update
routeTodo.put("/:id",  (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, req.body)
    .then((todo) => {
      todo.done = !todo.done;
      todo.save();
        res.status(200).send(`${todo.text} is successfully updated`)
      })
    .catch((err) => res.status(400).send(`error adding document ${err}`) )
});

//Delete
routeTodo.delete("/:id", (req, res) => {
  Todo.findByIdAndRemove( req.params.id, (err, item) => {
    if (err) { res.status(400).send(err) }
    res.status(200).send(`id ${req.params.id} is successfully deleted`)
  });
});
  
module.exports = { routeTodo };