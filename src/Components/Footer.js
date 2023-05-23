import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllTask } from "../Reducer/reducer";

const Footer = () => {
  const tasks = useSelector((state) => state.store.tasks);  //sử dụng useSelector để truy cập vào mảng chứa tasks
  const dispatch = useDispatch();   //sử dụng dispatch để gửi các action từ reducer

  const handleClearAll = () => {   //xử lý action clear all
    dispatch(clearAllTask());
  }

  const selectedTask = () => {
    return tasks.filter(task => task.completed).length
  }

  return (
    <div className="footer">
      <br />
      <p className="selected">{selectedTask()} item selected</p>
      <button onClick={handleClearAll} className="clear">
        Clear All
      </button>
    </div>
  );
};

export default Footer;
