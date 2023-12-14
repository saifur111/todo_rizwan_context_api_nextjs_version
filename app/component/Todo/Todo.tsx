"use client"
import styles from "./todo.module.css";
import { MdDelete, MdOutlineDownloadDone, MdTask } from "react-icons/md";
import { RiTaskFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { useTodoContext } from "../../context/GlobalState";
import { useState } from "react";
import { TodoDto } from "@/app/types";

interface Props {
  todo: TodoDto;
}

function Todo({ todo }:Props) {
  const { dispatch } = useTodoContext();
  const [updateInput, setUpdateInput] = useState(todo.input);
  const [isEdit, setIsEdit] = useState(null);

  const handleDelete = (_id:Number) => {
    dispatch({
      type: "DELETE__TODO",
      payload: {
        id:_id,
      },
    });
  };

  const handleUpdate = (_id:Number) => {
    console.log("Update :",_id)
    setIsEdit(null);
    dispatch({
      type: "UPDATE__TODO",
      payload: {
        id:_id,
        input: updateInput,
      },
    });
  };

  const handleComplete = (_id:Number) => {
    dispatch({
      type: "COMPLETE__TODO",
      payload: {
        id:_id,
      },
    });
  };

  return (
    <div className={styles.single__todo}>
      <div className={styles.todo__text}>
        {isEdit === todo.id ? (
          <textarea
            rows={6}
            className={styles.textarea}
            value={updateInput}
            onChange={(e) => setUpdateInput(e.target.value)}
          />
        ) : (
          <div className="flex flex-row text-3xl items-start space-x-3"><h1 className={todo.isComplete && styles.line__through} >{todo.input} </h1> 
          {todo.isComplete && <MdOutlineDownloadDone />}</div>
        )}
      </div>

      <div className={styles.todo__icons}>
        {isEdit === todo.id ? (
          <RiTaskFill onClick={() => handleUpdate(todo.id)} />
        ) : (
          <div>
            <MdDelete onClick={() => handleDelete(todo.id)} />
            <MdTask onClick={() => handleComplete(todo.id)} />
            <FaEdit onClick={() => setIsEdit(todo.id)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Todo;
