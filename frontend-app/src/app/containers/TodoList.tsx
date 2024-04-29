// src/containers/TodoList.tsx
import React, { useState } from "react";
import Popup from "../components/Popup";
import TodoItem from "../components/TodoItem";
import { Todo } from "../page";

interface ListTodo {
  todos: Todo[];
  deleteTodoItem: (id: string) => void;
  editTodoItem: (todo: any, newTodoText: string, newDueDate: Date) => void;
}

function TodoList({ todos, deleteTodoItem, editTodoItem }: ListTodo) {
  const [open, setOpen] = React.useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleOpen = (todo: Todo) => {
    setSelectedTodo(todo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTodo(null);
  };

  return (
    <div className="todoListContainer">
      <h2 className="todosText">Todos</h2>
      {todos
        ?.sort((a, b) =>
          a.attributes.dueDate.localeCompare(b.attributes.dueDate)
        )
        .map((todo) => (
          <TodoItem
            todo={todo}
            key={todo.id}
            deleteTodoItem={deleteTodoItem}
            handleOpen={() => handleOpen(todo)}
          />
        ))}
      {selectedTodo && (
        <Popup
          isOpen={open}
          onClose={handleClose}
          todoText={selectedTodo.attributes.todoText}
          dueDate={new Date(selectedTodo.attributes.dueDate)}
          todo={selectedTodo}
          editTodoItem={editTodoItem}
        />
      )}
    </div>
  );
}

export default TodoList;
