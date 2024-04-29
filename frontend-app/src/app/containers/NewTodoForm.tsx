import { useState } from "react";

function NewTodoForm({
  addTodo,
}: {
  addTodo: (todoText: string, dueDate: string) => void;
}) {
  const [todo, setTodo] = useState({ todo: "", dueDate: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = () => {
    // Check if both fields are filled out
    if (!todo.todo || !todo.dueDate) {
      setError("Both fields are required.");
      return;
    }
    // Call the addTodo function with the todoText and dueDate
    addTodo(todo.todo, todo.dueDate);
    // Clear the input fields after adding the todo
    setTodo({ todo: "", dueDate: "" });
    setError("");
  };

  return (
    <>
      <div className="todoContainer">
        <input
          className="todoInput"
          type="text"
          placeholder="Add new todo here"
          id="todoText"
          name="todo"
          value={todo.todo}
          onChange={handleChange}
        />

        <label className="todoLabel">Pick a due date:</label>
        <input
          className="todoInput"
          type="date"
          id="dueDate"
          name="dueDate"
          value={todo.dueDate}
          min={new Date().toISOString().split("T")[0]} // Set min value to today's date
          onChange={handleChange}
        />

        {error && <div className="errorContainer">{error}</div>}

        <div className="centeringWrapper">
          <input
            className="todoInputButton"
            type="button"
            value="Add Todo"
            onClick={handleSubmit} // Call handleSubmit when the button is clicked
          />
        </div>
      </div>
    </>
  );
}

export default NewTodoForm;
