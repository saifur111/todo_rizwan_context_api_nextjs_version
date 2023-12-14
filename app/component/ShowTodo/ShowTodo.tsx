"use client"
import { useState } from "react";
import { useTodoContext } from "../../context/GlobalState";
import Todo from "../Todo/Todo";
import styles from "./showtodo.module.css";

function ShowTodo() {
  const {state } = useTodoContext();
  return (
    <ul className={styles.show__todo}>
      {
        state.todos.length > 0 ? state.todos.map((todo, index) => (
          <Todo todo={todo} key={index}/>
        )) : <h1>No task Added yet.</h1>
      }
      
    </ul>
  );
}

export default ShowTodo;
