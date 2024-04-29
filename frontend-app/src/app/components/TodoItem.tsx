// src/coomponents/TodoItem.tsx

import React from "react";

interface ItemTodoProps {
  todo: any;
  deleteTodoItem: FunctionStringCallback;
  handleOpen: () => void;
}

function TodoItem({ todo, deleteTodoItem, handleOpen }: ItemTodoProps) {
  const dueDate = todo.attributes.dueDate;
  let d = new Date(dueDate);
  let formatDueDate = d.toLocaleDateString("fi-FI", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <div className="todoItem">
        <div className="todoTextContainer">{todo.attributes.todoText}</div>
        <div className="deadlineContainer">
          Due:{" "}
          {todo.attributes.dueDate ? (
            <span>{formatDueDate}</span>
          ) : (
            <span>-</span>
          )}
        </div>
        <div className="btnContainer">
          <i>
            <button className="bg-default" onClick={handleOpen}>
              Edit
            </button>
          </i>
          <i>
            <button className="bg-danger" onClick={() => deleteTodoItem(todo)}>
              Del
            </button>
          </i>
        </div>
      </div>
    </>
  );
}
export default TodoItem;
