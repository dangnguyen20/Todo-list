import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { completedTask, deleteTask, uncompletedTask, updateTask } from "../Reducer/reducer";

const ToDo = ({ task, id, completed }) => {
  const [isEditing, setEditing] = useState(false);
  const [editTask, setEditTask] = useState(task);
  const dispatch = useDispatch();

  const handleCheckboxChange = (event) => {
    const isCompleted = event.target.checked;
    if (isCompleted) {
      dispatch(completedTask({ id, completed: isCompleted }));
    } else {
      dispatch(uncompletedTask({ id, completed: false }));
    }
  };

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleInputChange = (event) => {
    setEditTask(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (editTask.trim()) {
      dispatch(updateTask({ id, task: editTask }));
      setEditing(false);
    } else {
      dispatch(deleteTask({ id }));
    }
  };

  const handleBLur = (  ) => {
    if (editTask.trim()) {
      dispatch(updateTask({ id, task: editTask }));
    } else {
      setEditTask(task);
    }
    setEditing(false);
  };
  return (
      <li className="todo">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckboxChange}
          className="cb"
        />
        {isEditing ? (
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              value={editTask}
              onChange={handleInputChange}
              onBlur={handleBLur}
              autoFocus
              className="edit-input"
            />
          </form>
        ) : (
          <span onDoubleClick={handleDoubleClick} className="todo-text">
            {task}
          </span>
        )}
      </li>
  );
};

export default ToDo;
