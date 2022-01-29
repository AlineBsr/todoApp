const express = require('express');
const bodyParser = require('body-parser');  
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config({ path: `../.env` })
const app = express(); 
const Schema = mongoose.Schema;
const router = express.Router();

app.listen(4000, () => { console.log('server is up and running on port 4000') });

const db = `mongodb+srv://${process.env.REACT_APP_user}:${process.env.REACT_APP_psw}@cluster0.3jya8.mongodb.net/todoDB?retryWrites=true&w=majority`;
mongoose.connect(db)
    .then( () => console.log('successfully connected to db') )
    .catch( err => console.error(err) )

// SCHEMA - blueprint
let todoSchema = new Schema({
    text : String,
    done : Boolean
});

// use todoSchema model mongoose 
let Todo = mongoose.model('Todo', todoSchema);

// ROUTES
app.use(cors);
app.use('/todos', router);
app.use(bodyParser.json());

//To GET all items from db 
router.route("/").get( (req, res) => {
    Todo.find( (err, items) => {
      if (err) {
        console.log(err);
      } else {
        res.json(items);
      }
    });
  });

//TO GET item details
router.route('/:id').get( (req, res) => {
    Todo.findById( req.params.id, (err, item) => {
        if (err) { 
            return res.status(400).send(err)
        }
        return res.status(200).send(item)
    } )
})

//TO ADD item to db
router.route('/add').post( (req, res) => {
    let note = new Todo(req.body)
     // let note = new Todo({
        // text:"text3",
        // done: false,
    // });
    note.save()
        .then( () => {
            console.log("todo successfully created");
            res.status(200).json("todo successfully created");
        })
        .catch( err => {
            res.status(400).send(err);
        });
    console.log(res);
});

//TO UPDATE item 
router.route('/:id').put( (req, res) => {
    Todo.findById( req.params.id, (err, todo) => { 
        if (err) { res.status(400).send(err) }
        todo.text = req.body.text;
        todo.done = req.body.done;
        todo.save((err) => {
            if (err) { res.status(400).send(err) }
            console.log("todo successfully updtated");
            res.json( { message : "todo successfully updtated" });
        });
    });
});

//TO DELETE item
router.route('/:id').delete( (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, todo) => {
        if (err) { res.status(400).send(err) }
        todo.delete( (err) => { 
            if (err) { res.send(err) }
            console.log("todo deleted successfully");
            res.json( { message : "todo deleted successfully" } );
        });
    });
});