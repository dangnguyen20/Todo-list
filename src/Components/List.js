import React from "react";
import {  useSelector } from "react-redux";
import ToDo from "./Todo";

const List = () => {
  const tasks = useSelector((state) => state.store.tasks);
  return (
    <ul>
      {tasks.map((task) => (
        <ToDo 
          key={task.id} 
          {...task}
        />
      ))}
    </ul>
  );
};

export default List;    