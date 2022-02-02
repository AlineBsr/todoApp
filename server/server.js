const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config({ path: "../.env" })

//Def routes
const { routeTodo } = require("./routes/todo.route");
const { routeAuth } = require("./routes/auth.route");

const port = 4000;

//Connect Server
app.listen(port, () => {
  console.log("server is up and running on port " + port);
});

const db = process.env.REACT_APP_ATLAS_URI;

mongoose.connect(db)
  .then(() => console.log("successfully connected to db"))
  .catch((err) => console.log(err));

//Routes
app.use(cors());
app.use(bodyParser.json());
app.use("/todos", routeTodo);
app.use("/users", routeAuth);

// https://blog.bitsrc.io/react-production-deployment-part-1-netlify-703686631dd1