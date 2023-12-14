import { TodoDto } from "../types";

export type Action =
  | {
      type: "LOADING";
      payload: {
        isLoading: boolean;
      };
    }
  | {
      type: "ADD__TODO";
      payload: {
        todos: TodoDto[];
      };
    }
  | {
      type: "DELETE__TODO";
      payload: {
        todo: TodoDto;
        id:Number;
      };
    }
  | {
      type: "UPDATE__TODO";
      payload: {
        todo: TodoDto;
        id:Number;
        input:String;
      };
    }
  | {
      type: "COMPLETE__TODO";
      payload: {
        todo: TodoDto;
        id:Number;
      };
    }

export type State = {
  isLoading?: boolean;
  todos:TodoDto[];
};

export const todoReducer = (prevState:State, action:Action) => {
  const { type, payload } = action;
  switch (type) {
    case "ADD__TODO":
      return {
        ...prevState,
        todos: [...prevState.todos, payload],
      };
    case "DELETE__TODO":
      const filteredTodos = [...prevState.todos].filter(
        (todo) => todo.id !== payload.id
      );
      return {
        ...prevState,
        todos: filteredTodos,
      };
    case "UPDATE__TODO":
      const updatedTodos = [...prevState.todos].map((todo) => {
        if (todo.id === payload.id) {
          
          return {
            ...todo,
            input: payload.input,
          };
        } else {
          return todo;
        }
      });
      return {
        ...prevState,
        todos: updatedTodos,
      };
    case "COMPLETE__TODO":
      const completedTodos = [...prevState.todos].map((todo) => {
        if (todo.id === payload.id) {
          return {
            ...todo,
            isComplete: !todo.isComplete,
          };
        } else {
          return todo;
        }
      });
      return {
        ...prevState,
        todos: completedTodos,
      };
    default:
      return prevState;
  }
};
