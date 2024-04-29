// src/components/Popup.tsx

import { useState } from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  todoText: string;
  dueDate: Date;
  todo: any;
  editTodoItem: (todo: any, newTodoText: string, newDueDate: Date) => void;
}

export default function Popup({
  isOpen,
  onClose,
  todoText,
  dueDate,
  todo,
  editTodoItem,
}: PopupProps) {
  const [newTodoText, setNewTodoText] = useState<string>(todoText);
  const [newDueDate, setNewDueDate] = useState<Date>(new Date(dueDate));
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Check if both fields are filled out
    if (!newTodoText || !newDueDate) {
      setError("Both fields are required.");
    } else {
      // Call the editTodoItem function with the updated values from state
      editTodoItem(todo, newTodoText, newDueDate);
      onClose(); // Close the popup after successful update
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
            min={new Date().toISOString().split("T")[0]} // Set min value to today's date
            onChange={(e) => setNewDueDate(new Date(e.target.value))}
          />

          {error && <div className="errorContainer">{error}</div>}

          <div className="centeringWrapper">
            <button
              type="button"
              className="bg-default todoInputButton"
              // Call handleSubmit and close the popup when the button is clicked
              onClick={() => {
                handleSubmit();
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
