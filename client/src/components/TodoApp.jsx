import React, { useState, useEffect } from "react";
import axios from "axios";

import List from "./List";
import "../stylesheets/Todo.css";

export default function TodoApp(props) {
  const { setIsLoading, baseUrl } = props ;

  const [todo, setTodo] = useState();
  const [addItem, setAddItem] = useState("");
  // const baseUrl = "http://localhost:4000";

  // toggle done prop
  const handleItemClick = (id) => {
    axios.put(`${baseUrl}/todos/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err))
      .finally(() => {
        setIsLoading(false);
        getItems();
      });
  };

  // set new item with user input
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
      axios.post(`${baseUrl}/todos/add`, newItem)
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err))
        .finally(() =>  setIsLoading(false));
    getItems();
    setAddItem("");
  };

  // DEL item done from db
  const handleTrashClick = (id) => {
    setIsLoading(true);
    axios.delete(`${baseUrl}/todos/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
    getItems();
  };

  // GET all data
  const getItems = () => {
    setIsLoading(true);
    axios.get(`${baseUrl}/todos`)
      .then((res) => setTodo(res.data))
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getItems();
  }, []);

  if (!todo) {
    return null;
  }

  return (
    <>
      <div className="container p-3 ">
        <div className="row">
        <List typeList="itemsTodo" todo={todo} addItem={addItem} handleItemClick={handleItemClick} handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} />
        <List typeList="itemsDone" todo={todo} handleItemClick={handleItemClick} handleTrashClick={handleTrashClick} />
        </div>
      </div>
    </>
  );
}