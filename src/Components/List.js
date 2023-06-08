import React from "react";
import { useSelector } from "react-redux";
import ToDo from "./Todo";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { moveTask, setFilter, setPage } from "../Reducer/reducer";
import Footer from "./Footer";

const List = () => {
  const tasks = useSelector((state) => state.tasks);
  const tasksPerPage = useSelector((state) => state.tasksPerPage);
  const currentPage = useSelector((state) => state.currentPage);
  const filterType = useSelector((state) => state.filterType);
  const dispatch = useDispatch();
  const startIndex = currentPage * tasksPerPage;
  const endIndex = (currentPage + 1) * tasksPerPage;

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  // Hàm reorder tạo ra 1 bản sao của mảng ban đầu và loại bỏ 1 phân tử tại (startIndex) sau đó chèn phần tử tại (endIndex)
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const sourceIndex = startIndex + result.source.index;
    const destinationIndex = startIndex + result.destination.index;
    const adjustedSourceIndex = sourceIndex - currentPage * tasksPerPage;
    const adjustedDestinationIndex =
      destinationIndex - currentPage * tasksPerPage;
    const items = reorder(tasks, adjustedSourceIndex, adjustedDestinationIndex);
    dispatch(moveTask({ tasks: items }));
  };
  // sử dụng reorder để sắp xếp phần tử tại tasks, loại bỏ 1 phân tử tại source và chèn vào destination
  // xong được di chuyển bằng dispatch tới moveTask
  const handlePageChange = (selectedPage) => {
    dispatch(setPage(selectedPage));
  };
  const handleFilterChange = (event) => {
    const selectedFilterType = event.target.value;
    dispatch(setFilter(selectedFilterType));
  };

  const filteredTask = tasks.filter((task) => {
    if (filterType === "completed") {
      return task && task.completed && task.completed === true;
    } else if (filterType === "uncompleted") {
      return task && !task.completed && task.completed === false;
    } else {
      return true;
    }
  });

  const currentTasks = filteredTask.slice(startIndex, endIndex);

  return (
    <>
      <select value={filterType} onChange={handleFilterChange}>
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="uncompleted">Uncompleted</option>
      </select>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="list">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="list"
            >
              {currentTasks.map((task, index) => {
                console.log(task);
                return (
                  task && (
                    <ToDo key={task.id} {...task} index={startIndex + index} />
                  )
                );
              })}
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
