import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

const Pagination = ({ onPageChange }) => {
  const tasks = useSelector((state) => state.tasks);
  const tasksPerPage = useSelector((state) => state.tasksPerPage);

  const pageCount = Math.ceil(tasks.length / tasksPerPage);
  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    onPageChange(selectedPage);
  };

  return (
    <div className="pagination">
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Pagination;
