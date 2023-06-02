import React from "react";
import { useSelector } from "react-redux";
import ToDo from "./Todo";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { moveTask } from "../Reducer/reducer";

const List = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

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

    const items = reorder(tasks, result.source.index, result.destination.index);
    dispatch(moveTask({ tasks: items }));
  };
  // sử dụng reorder để sắp xếp phần tử tại tasks

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="list"
          >
            {tasks &&
              tasks.map((task, index) => (
                <ToDo key={task.id} {...task} index={index} />
              ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default List;
