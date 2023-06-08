import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //khởi tạo trạng thái ban đầu
  tasks: [],
  currentPage: 0,
  tasksPerPage: 5,
  filterType: "",
};
const taskSlice = createSlice({
  //sử dụng tạo slice
  name: "tasks", //tên slice
  initialState, //trạng thái ban đầu
  reducers: {
    addTask: (state, action) => {
      if (Array.isArray(state.tasks)) {
        state.tasks.unshift(action.payload);
      } else {
        state.tasks = [action.payload];
      }
    },
    updateTask: (state, action) => {
      const { id, task } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === id ? { ...item, task } : item
        ),
      };
    },
    clearAllTask: (state) => {
      state.tasks = [];
    },
    completedTask: (state, action) => {
      const { id } = action.payload;
      const updatedTask = state.tasks.map((item) =>
        item.id === id ? { ...item, completed: true } : item
      );
      return { ...state, tasks: updatedTask };
    },
    uncompletedTask: (state, action) => {
      const { id } = action.payload;
      const updatedTask = state.tasks.map((item) =>
        item.id === id ? { ...item, completed: false } : item
      );
      return { ...state, tasks: updatedTask };
    },
    deleteTask: (state, action) => {
      const { id } = action.payload;
      return { ...state, tasks: state.tasks.filter((item) => item.id !== id) };
    },
    moveTask: (state, action) => {
      const { tasks } = action.payload;
      return { ...state, tasks };
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
      return state;
    },
    setFilter: (state, action) => {
      state.filterType = action.payload;
      return state;
    },
  },
});

export const {
  addTask,
  updateTask,
  clearAllTask,
  completedTask,
  uncompletedTask,
  deleteTask,
  moveTask,
  setPage,
  setFilter,
} = taskSlice.actions;
export default taskSlice.reducer;
