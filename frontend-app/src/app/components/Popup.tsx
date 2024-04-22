// src/components/Popup.tsx

import { useState } from "react";
import { UPDATEMUT } from "@/query/schema";
import { useMutation } from "@apollo/client";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  todoText: string;
  dueDate: Date;
  todo: any;
}

export default function Popup({
  isOpen,
  onClose,
  todoText,
  dueDate,
  todo,
}: PopupProps) {
  const [newTodoText, setNewTodoText] = useState<string>(todoText);
  const [newDueDate, setNewDueDate] = useState<Date>(new Date(dueDate));
  const [todos, setTodos] = useState<any[]>([]);
  const [updateTodo] = useMutation(UPDATEMUT);

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Call the editTodoItem function with the updated values from state
    editTodoItem(todo, newTodoText, newDueDate);
  };

  const editTodoItem = async (
    todo: any,
    newTodoText: string,
    newDueDate: Date
  ) => {
    if (newTodoText != null && newDueDate != null) {
      await updateTodo({
        //updating the todo
        variables: {
          id: todo.id,
          todoText: newTodoText,
          dueDate: newDueDate.toISOString().split("T")[0], // Convert Date to string
        },
      })
        .then(({ data }: any) => {
          const updatedTodo = data?.updateTodo?.data;
          // Update the todos list
          const moddedTodos = todos.map((_todo) => {
            if (_todo.id === updatedTodo.id) {
              return updatedTodo;
            } else {
              return _todo;
            }
          });
          setTodos(moddedTodos);
        })
        .catch((error) => {
          // Handle error if necessary
          console.error("Error updating todo:", error);
        });
    }
  };

  return (
    <div id="editWindow" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h3>Editing todo</h3>
        <label className="todoLabel">Enter new todo text or description:</label>
        <form className="editItemForm todoContainer">
          <input
            type="text"
            className="todoInput"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
          ></input>

          <label className="todoLabel">Enter new due date:</label>
          <input
            className="todoInput"
            type="date"
            id="dueDate"
            value={newDueDate.toISOString().split("T")[0]} // Convert Date to string
            onChange={(e) => setNewDueDate(new Date(e.target.value))}
          />

          <div className="centeringWrapper">
            <button
              type="button"
              className="bg-default todoInputButton"
              // Call handleSubmit and close the popup when the button is clicked
              onClick={() => {
                handleSubmit();
                onClose();
              }}
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
