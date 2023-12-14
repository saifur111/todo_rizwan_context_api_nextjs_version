"use client"
import { useRef } from "react";
import { useTodoContext } from "../../context/GlobalState";
import styles from "./addtodo.module.css";

function AddTodo() {
  const { dispatch } = useTodoContext();
  const input = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.current.value.trim().length === 0) {
      alert("Empty input!");
    } else {
      dispatch({
        type: "ADD__TODO",
        payload: {
          input: input.current.value,
          id: Date.now(),
          isComplete: false,
        },
      });
    }
    input.current.value = "";
  };
  return (
    <div className={styles.todo__input}>
      <div className={styles.todo__heading}>
        <h1>Task Management</h1>
      </div>
      <form className={styles.add__todo} onSubmit={handleSubmit}>
        <div>
          <input type="text" name="todo" ref={input} />
        </div>
        <div>
          <button className={styles.btn}>Add Todo</button>
        </div>
      </form>
    </div>
  );
}

export default AddTodo;
