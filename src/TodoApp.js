import React, { useState, useEffect } from "react";
import axios from "axios";

import Navbar from "./components/Navbar"
import List from "./components/List";
import "./stylesheets/Todo.css";

export default function TodoApp() {
  const [todo, setTodo] = useState();
  const [addItem, setAddItem] = useState("");
  const [isLoading, setIsLoading] = useState();
  const baseUrl = "http://localhost:4000/todos/";
  
  // toggle done prop
  const handleItemClick = (id) => {
    axios.put(baseUrl + id)
      .then( res => console.log(res.data))
      .catch( err => console.error(err))
      .finally( () => {
        setIsLoading(false);
        getItems();
      });
  };

  // set new item
  const handleInputChange = (e) => {
    setAddItem({
      text: e.target.value,
      done: false,
    });
  };

  // ADD new item to db
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let newItem = { ...addItem };
    newItem.text !== undefined &&
      axios.post(`${baseUrl}/add`, newItem)
        .then( res => console.log(res.data))
        .catch( err => console.error(err))
        .finally( () => setIsLoading(false));
    getItems();
    setAddItem("");
  };

  // DEL item done from db
  const handleTrashClick = (id) => {
    setIsLoading(true);
    axios.delete(baseUrl + id)
      .then( res => console.log(res.data))
      .catch( err => console.error(err))
      .finally( () => setIsLoading(false));
    getItems();
  };

  // GET all data
  const getItems = () => {
    setIsLoading(true);

    axios.get(baseUrl)
      .then( res => setTodo(res.data))
      .catch( err => console.error(err))
      .finally( () => setIsLoading(false));
  };

  useEffect(() => {
    getItems();
  }, [addItem]);

  if (!todo) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="container p-3 ">
        <div className="row">
          <List
            type="itemsTodo"
            todo={todo}
            handleItemClick={handleItemClick} 
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
          />
          <List 
            type="itemsDone" 
            todo={todo}
            handleItemClick={handleItemClick}
            handleTrashClick={handleTrashClick}
          />
        </div>
      </div>
    </>
  );
}