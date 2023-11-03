import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  completedTask,
  deleteTask,
  uncompletedTask,
  updateTask,
} from "../Reducer/reducer";
import { Draggable } from "react-beautiful-dnd";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ToDo = ({ task, id, completed, index, createdDate }) => {
  const [isEditing, setEditing] = useState(false);
  const [editTask, setEditTask] = useState(task);
  const [isMenu, setMenu] = useState(null);
  const open = Boolean(isMenu);
  const dispatch = useDispatch();
  const current = new Date();
  current.setDate(current.getDate());
  // console.log(current.toDateString());

  const handleMenuClick = (event) => {
    setMenu(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenu(null);
  };
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

  const handleEditClick = () => {
    // console.log("Edit");
    setEditing(true);
  };

  const handleDeleteClick = () => {
    // console.log("Delete");
    dispatch(deleteTask({ id }));
  };

  return (
    <Draggable
      key={`${task.id}_${index}`}
      draggableId={`${task.id}_${index}`}
      index={index}
    >
      {(provided, snapshot) => (
        <li
          className={`todo ${snapshot.isDragging ? "dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
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
            <div className="task-container">
              <span onDoubleClick={handleDoubleClick} className="todo-text">
                {task}
              </span>
              <span className="created-date">{createdDate}</span>
              <div className="button-container">
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleMenuClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={isMenu}
                  open={open}
                  onClose={handleMenuClose}
                >
                  <MenuItem selected={false} onClick={handleMenuClose}>
                    <button onClick={handleEditClick}>Edit</button>
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose} selected={false}>
                    <button onClick={handleDeleteClick}>Delete</button>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          )}
        </li>
      )}
    </Draggable>
  );
};

export default ToDo;
