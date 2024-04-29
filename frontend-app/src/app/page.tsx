// src/app/page.tsx
"use client";
import { useEffect, useState } from "react";
import NewTodoForm from "./containers/NewTodoForm";
import TodoList from "./containers/TodoList";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { ADDMUT, DELETEMUT, GETQUERY, UPDATEMUT } from "@/query/schema";
import { useMutation } from "@apollo/client";

export interface Todo {
  id: string;
  attributes: {
    todoText: string;
    dueDate: string;
  };
}
export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [createTodo] = useMutation(ADDMUT);
  const [deleteMUT] = useMutation(DELETEMUT);
  const [updateTodo] = useMutation(UPDATEMUT);

  const { loading, error, data } = useQuery(GETQUERY, {
    fetchPolicy: "no-cache",
  }); //Fetching all todos

  useEffect(() => {
    setTodos(data?.todos?.data); //Storing all the todos
  }, [data]);

  const addTodo = async (todoText: string, dueDate: string) => {
    await createTodo({
      //Creating a new todo
      variables: {
        todoText: todoText, //Passing the todo text
        dueDate: dueDate, //Passing the todo due date
      },
    }).then(({ data }: any) => {
      setTodos([...todos, data?.createTodo?.data] as any); //Adding the new todo to the list
    });
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

  const deleteTodoItem = async (todo: any) => {
    if (confirm("Do you really want to delete this item?")) {
      await deleteMUT({
        //Deleting the todo
        variables: {
          id: todo.id,
        },
      }).then(({ data }: any) => {
        const newTodos = todos.filter((_todo: any) => _todo.id !== todo.id);
        setTodos(newTodos as any);
      });
    }
  };

  return (
    <div>
      <main className="main">
        <NewTodoForm addTodo={addTodo} />
        <TodoList
          todos={todos}
          deleteTodoItem={deleteTodoItem}
          editTodoItem={editTodoItem}
        />
      </main>
    </div>
  );
}
