import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

const Pagination = ({ onPageChange }) => {
  const tasks = useSelector((state) => state.tasks);
  const tasksPerPage = useSelector((state) => state.tasksPerPage);
  const filterType = useSelector((state) => state.filterType);
  const currentPage = useSelector((state) => state.currentPage);

  // Filter the tasks based on the selected filter type
  const filteredTasks = tasks.filter((task) => {
    if (filterType === "completed") {
      return task.completed;
    } else if (filterType === "uncompleted") {
      return !task.completed;
    } else {
      return true;
    }
  });

  const pageCount = Math.ceil(filteredTasks.length / tasksPerPage);
  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    onPageChange(selectedPage);
  };

  if (tasks.length === 0) {
    return null; // Render nothing if there are no tasks
  }

  return (
    <div className="pagination">
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        initialPage={currentPage}
        forcePage={currentPage}
      />
    </div>
  );
};

export default Pagination;
