import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../Reducer/reducer";

const Forms = () => {
  const [task, setTask] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setTask(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      const newTask = {
        id: Date.now(),
        task,
        completed: false,
        currentDate: new Date().toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      };
      console.log(newTask);
      dispatch(addTask(newTask));
      setTask("");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          value={task}
          onChange={handleChange}
          placeholder="Add new list item"
          className="input input__lg"
        />
        <button type="submit" className="btn btn__lg">
          Add
        </button>
      </form>
    </>
  );
};

export default Forms;
