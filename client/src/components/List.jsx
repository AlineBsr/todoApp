import React, { useState } from "react";
import Loader from "./Loader";

export default function List(props) {
  const { typeList, todo, addItem, isLoading, handleItemClick,
         handleTrashClick, handleFormSubmit, handleInputChange } = props;

  const itemsDone = todo.filter( (item) => {
    if (item.done === true) {
      return item;
    }
  });

  const itemsTodo = todo.filter( (item) => {
    if (item.done === false) {
      return item;
    }
  });

  if (typeList === "itemsDone") {
    return (
      <div className="col-md-6">
        <div className="todolist">
          <ul id="done-items">
            <h1>Done</h1>
            {itemsDone &&
              itemsDone.map( (item) => item.done && (
                <li key={item._id} className="list-unstyled">
                  <button
                    className="btn"
                    onClick={() => handleTrashClick(item._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                  <label onClick={() => handleItemClick(item._id)}>
                    {item.text}
                  </label>
                </li>
                )
              )}
          </ul>
        </div>
      </div>
    );
  }

  if (typeList === "itemsTodo") {
    return (
      <>
        <div className="col-md-6">
          <div className="todolist">
            <h1>Todos</h1>
            <form onSubmit={(e) => handleFormSubmit(e)}>
              <input
                className="form-control form-contrµol-lg "
                placeholder="add todo"
                value={addItem && addItem.text  }
                onChange={(e) => handleInputChange(e)}
              />
            </form>
            {isLoading && <Loader />}
            <ul className="p-2" id="not-done">
              {itemsTodo && itemsTodo.map( (item) => item.done === false && (
                <li className="list-unstyled" key={item._id}>
                  <label onClick={() => handleItemClick(item._id)}>
                    {item.text}
                  </label>
                </li>
                )
              )}
            </ul>
            {todo.length > 0 && (
              <div id="todo-footer">
                <span>
                  {todo && todo.filter( (item) => !item.done).length > 1
                    ? todo.filter((item) => !item.done).length + " items left"
                    : todo.filter((item) => !item.done).length === 0
                    ? ""
                    : todo.filter((item) => !item.done).length + " item left"}
                </span>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}
