import { useState } from "react";

function AddTodo({
  addTodo,
}: {
  addTodo: (todoText: string, dueDate: string) => void;
}) {
  const [todo, setTodo] = useState({ todo: "", dueDate: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodo((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = () => {
    // Call the addTodo function with the todoText and dueDate
    addTodo(todo.todo, todo.dueDate);
    // Clear the input fields after adding the todo
    setTodo({ todo: "", dueDate: "" });
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
          required
          value={todo.todo}
          onChange={handleChange}
        />

        <label className="todoLabel">Pick a due date:</label>
        <input
          className="todoInput"
          type="date"
          id="dueDate"
          name="dueDate"
          required
          value={todo.dueDate}
          onChange={handleChange}
        />

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

export default AddTodo;
