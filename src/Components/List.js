import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ToDo from "./Todo";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import {
  completeAllTasks,
  moveTask,
  setFilter,
  setPage,
  uncompleteAllTask,
} from "../Reducer/reducer";
import Footer from "./Footer";
import Search from "../Utils/Search";

const List = () => {
  const tasks = useSelector((state) => state.tasks);
  const tasksPerPage = useSelector((state) => state.tasksPerPage);
  const currentPage = useSelector((state) => state.currentPage);
  const filterType = useSelector((state) => state.filterType);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchTask, setSearchTask] = useState("");
  const dispatch = useDispatch();
  const startIndex = currentPage * tasksPerPage;
  //caculate the index of the first task to show on the current page
  const endIndex = (currentPage + 1) * tasksPerPage;
  //caculate the index of the last task
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    //check if the dragged item was not dropped on a valid destination

    let sourceIndex = startIndex + result.source.index;
    //this caculate index of the dragged task
    let destinationIndex = startIndex + result.destination.index;
    //this caculate the index where the task was dropped

    if (filterType !== "all") {
      //if the filter is not "all", the code below will be executed
      const sourceTask = filteredTasks[result.source.index];
      sourceIndex = tasks.findIndex((task) => task.id === sourceTask.id);

      const destinationTask = filteredTasks[result.destination.index];
      destinationIndex = tasks.findIndex(
        (task) => task.id === destinationTask.id
      );
    } else {
      sourceIndex -= currentPage * tasksPerPage;
      destinationIndex -= currentPage * tasksPerPage;
    }

    const updatedTasks = reorder(tasks, sourceIndex, destinationIndex);
    dispatch(moveTask({ tasks: updatedTasks }));
  };

  const handlePageChange = (selectedPage) => {
    dispatch(setPage(selectedPage));
  };

  const handleFilterChange = (event) => {
    const selectedFilterType = event.target.value;
    dispatch(setFilter(selectedFilterType));
    dispatch(setPage(0));
  };

  const handleSelectAll = () => {
    setSelectAll((task) => !task);
    if (selectAll) {
      dispatch(uncompleteAllTask());
    } else {
      dispatch(completeAllTasks());
    }
  };

  const handleSearch = (query) => {
    setSearchTask(query);
  };

  useEffect(() => {
    const fetchFilteredTasks = () => {
      let filteredResults = [];
      if (filterType === "completed") {
        filteredResults = tasks.filter((task) => task.completed);
      } else if (filterType === "uncompleted") {
        filteredResults = tasks.filter((task) => !task.completed);
      } else {
        filteredResults = tasks;
      }
      filteredResults = filteredResults.filter((task) =>
        task.task.toLowerCase().includes(searchTask.toLocaleLowerCase())
      );
      setFilteredTasks(filteredResults);
    };
    fetchFilteredTasks();
  }, [tasks, filterType, searchTask]);

  const currentTasks = filteredTasks.slice(startIndex, endIndex);

  return (
    <>
      <div className="filter-container">
        <select
          value={filterType}
          onChange={handleFilterChange}
          className="sorting"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
        <div className="btn-all-container">
          <input
            onChange={handleSelectAll}
            type="checkbox"
            checked={selectAll}
            className="btn-all"
          />
          <span>Select All</span>
        </div>
        <Search onChange={handleSearch} />
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="list"
            >
              {currentTasks.map((task, index) => (
                <ToDo
                  key={task.id}
                  {...task}
                  index={startIndex + index}
                  createdDate={task.currentDate}
                />
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <Footer onPageChange={handlePageChange} />
    </>
  );
};

export default List;
