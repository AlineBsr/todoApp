import React, { useState, useEffect } from "react";
import axios from "axios";

import Loader from "./Loader";
import "./stylesheets/Todo.css";

export default function TodoApp() {
  const [todo, setTodo] = useState();
  const [addItem, setAddItem] = useState('');
  const [isLoading, setIsLoading] = useState();
  const baseUrl = "http://localhost:4000/todos/";
    
  // toggle done prop
  const handleItemClick = (id) => {
    axios.put( baseUrl + id )
      .then( res => console.log(res.data) )
      .catch( err => console.error(err) )
      .finally( () => {
        setIsLoading(false);
        getItems();
      })
  };

  // set new item
  const handleInputChange = (e) => {
      setAddItem( { 
        text: e.target.value,
        done: false,
      });
  };

  // ADD new item to db 
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let newItem = {...addItem}
    newItem.text !== undefined && 
    axios.post(`${baseUrl}/add`, newItem )
      .then( res =>  console.log(res.data) )
      .catch( err => console.error(err) )
      .finally( () => setIsLoading(false) )
    getItems();
    setAddItem('');
  };

  // DEL item done from db
  const handleTrashClick = (id) => {
    setIsLoading(true);
    axios.delete( baseUrl + id )
      .then( res => console.log(res.data) )
      .catch( err => console.error(err) ) 
      .finally( () => setIsLoading(false) )
    getItems();
  };

  // GET all data
  const getItems = () => {
    axios.get( baseUrl )
      .then( res => setTodo(res.data) )
      .catch( err =>  console.error(err) )
      .finally( () => setIsLoading(false) )
  }

  useEffect(() => {
    getItems();

  }, [addItem]);

  if (!todo) { return null; }

  return (
    <>
      <nav className="navbar navbar-light bg-light p-3">
        <a className="navbar-brand" href="#">
          TodoApp
        </a>
      </nav>
      <div className="container p-3 ">
        <div className="row">
          {/* TODOS UNDONE */}
          <div className="col-md-6">
            <div className="todolist">
              <h1>Todos</h1>
              <form onSubmit={ (e) => handleFormSubmit(e) } >
                <input
                  className="form-control form-contrµol-lg "
                  placeholder="add todo"
                  value={ addItem && `${addItem.text}` }
                  onChange={ (e) => handleInputChange(e) }
                />
              </form>
              { isLoading && <Loader /> }
              <ul className="p-2" id="not-done">
                {todo && todo.map( (item) => item.done === false && (
                    <li
                      className="list-unstyled"
                      key={item._id}
                    >
                      <label onClick={ () => handleItemClick(item._id) } >
                        {item.text}
                      </label>
                    </li> )
                  )}
              </ul>
              { todo.length > 0 && 
              <div id="todo-footer">
                <span>
                  {todo && todo.filter((item) => !item.done).length > 1
                    ? todo.filter((item) => !item.done).length + " items left"
                    : todo.filter((item) => !item.done).length === 0
                    ? ""
                    : todo.filter((item) => !item.done).length + " item left" }
                </span>
              </div>
              }
            </div>
          </div>
          {/* TODOS DONE */}
          <div className="col-md-6">
            <div className="todolist">
              <ul id="done-items">
              <h1>Done</h1>
                {todo &&
                  todo.map( (item) => item.done === true && (
                    <li key={item._id} className="list-unstyled">
                       <button
                        className="btn  " //float-right paddingZero
                        onClick={ () => handleTrashClick(item._id) }
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                      <label onClick={ () => handleItemClick(item._id) } >
                        {item.text}
                      </label>
                    </li> )
                  )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
