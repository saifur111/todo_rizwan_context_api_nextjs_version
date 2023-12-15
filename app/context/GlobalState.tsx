"use client"
import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Action, State, todoReducer } from "../reducer/todoReducer";


const initialState:State = {
  isLoading:true,
  todos: [],
};

const getLocalData = ()=>{
  if(typeof localStorage !== undefined){
    const dataFromLocal = localStorage.getItem("state");
    return dataFromLocal ? JSON.parse(dataFromLocal) : initialState;
  }
}

export const GlobalTodoContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: getLocalData(),
  dispatch: () => 0,
});


export const GlobalTodoContextProvider = (props:{ children?:React.ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer,getLocalData());

  useEffect(()=>{
    if(typeof localStorage !== undefined) {localStorage.setItem("state",JSON.stringify(state));}
  },[state]);

 
  return (
    <GlobalTodoContext.Provider value={{
      state,
      dispatch,
    }}>
      {props.children}
    </GlobalTodoContext.Provider>
  );
};

export const useTodoContext =()=>useContext(GlobalTodoContext);
