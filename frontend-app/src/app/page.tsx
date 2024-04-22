// src/app/page.tsx
"use client";
import { useEffect, useState } from "react";
import AddTodo from "./containers/AddTodo";
import TodoList from "./containers/TodoList";
import { useQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { ADDMUT, DELETEMUT, GETQUERY } from "@/query/schema";
import { useMutation } from "@apollo/client";

export default function Home() {
  const [todos, setTodos] = useState<[]>([]);
  const [createTodo] = useMutation(ADDMUT);
  const [deleteMUT] = useMutation(DELETEMUT);

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
        <AddTodo addTodo={addTodo} />
        <TodoList todos={todos} deleteTodoItem={deleteTodoItem} />
      </main>
    </div>
  );
}
