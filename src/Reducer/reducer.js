import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //khởi tạo trạng thái ban đầu
  tasks: [],
};

const taskSlice = createSlice({
  //sử dụng tạo slice
  name: "tasks", //tên slice
  initialState, //trạng thái ban đầu
  reducers: {
    addTask: (state, action) => {
      state.tasks.unshift(action.payload);
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
  },
});

export const {
  addTask,
  updateTask,
  clearAllTask,
  completedTask,
  uncompletedTask,
  deleteTask,
} = taskSlice.actions;
export default taskSlice.reducer;
