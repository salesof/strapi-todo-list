// src/containers/TodoList.tsx
import TodoItem from "../components/TodoItem";

interface ListTodo {
  todos: any;
  deleteTodoItem: any;
}

function TodoList({ todos, deleteTodoItem }: ListTodo) {
  return (
    <div className="todoListContainer">
      <h2 className="todosText">Todos</h2>
      {todos
        ?.sort((a: any, b: any) =>
          a.attributes.dueDate.localeCompare(b.attributes.dueDate)
        )
        .map((todo: any) => {
          return (
            <TodoItem
              todo={todo}
              key={todo.id}
              deleteTodoItem={deleteTodoItem}
            />
          );
        })}
    </div>
  );
}
export default TodoList;
