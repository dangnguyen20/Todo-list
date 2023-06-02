import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  completedTask,
  deleteTask,
  uncompletedTask,
  updateTask,
} from "../Reducer/reducer";
import { Draggable } from "react-beautiful-dnd";

const ToDo = ({ task, id, completed, index }) => {
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

  const handleBLur = () => {
    if (editTask.trim()) {
      dispatch(updateTask({ id, task: editTask }));
    } else {
      setEditTask(task);
    }
    setEditing(false);
  };

  return (
    <Draggable
      key={`${task.id}_${index}`}
      draggableId={`${task.id}_${index}`}
      index={index}
    >
      {(provided) => (
        <li
          className="todo"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
      )}
    </Draggable>
  );
};

export default ToDo;
