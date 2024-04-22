// src/query/schema.ts
import { gql } from "@apollo/client";
export const GETQUERY = gql`
  {
    todos(sort: "id:desc") {
      data {
        id
        attributes {
          todoText
          createdAt
          dueDate
        }
      }
    }
  }
`;

export const ADDMUT = gql`
  mutation createTodo($todoText: String!, $dueDate: Date!) {
    createTodo(data: { todoText: $todoText, dueDate: $dueDate }) {
      data {
        id
        attributes {
          todoText
          createdAt
          dueDate
        }
      }
    }
  }
`;

export const UPDATEMUT = gql`
  mutation updateTodo($id: ID!, $todoText: String!, $dueDate: Date!) {
    updateTodo(id: $id, data: { todoText: $todoText, dueDate: $dueDate }) {
      data {
        id
        attributes {
          todoText
          createdAt
          dueDate
        }
      }
    }
  }
`;

export const DELETEMUT = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      data {
        id
        attributes {
          todoText
          createdAt
          dueDate
        }
      }
    }
  }
`;