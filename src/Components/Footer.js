import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAllTask } from "../Reducer/reducer";
import Pagination from "./Pagination";

const Footer = ({ onPageChange }) => {
  const tasks = useSelector((state) => state.tasks); //sử dụng useSelector để truy cập vào mảng chứa tasks
  const dispatch = useDispatch(); //sử dụng dispatch để gửi các action từ reducer

  const handleClearAll = () => {
    //xử lý action clear all
    dispatch(clearAllTask());
  };

  const selectedTask = useMemo(() => {
    if (!tasks || !Array.isArray(tasks)) {
      return 0;
    }
    return tasks ? tasks.filter((task) => task && task.completed).length : 0;
  }, [tasks]);

  return (
    <div className="footer">
      <br />
      <p className="selected">{selectedTask} item selected</p>
      <Pagination onPageChange={onPageChange} />
      <button onClick={handleClearAll} className="clear">
        Clear All
      </button>
    </div>
  );
};

export default Footer;
