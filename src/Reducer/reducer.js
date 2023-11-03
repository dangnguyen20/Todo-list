import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //khởi tạo trạng thái ban đầu
  tasks: [],
  currentPage: 0,
  tasksPerPage: 5,
  filterType: "",
  searchQuery: "",
  initialState: {
    user: null,
    error: null,
  },
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
      state.currentPage = 0;
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
      state.tasks = state.tasks.filter((task) => !task.completed);
      state.currentPage = 0;
    },
    completedTask: (state, action) => {
      const { id } = action.payload;
      if (id) {
        const task = state.tasks.find((item) => item.id === id);
        if (task) {
          task.completed = true;
        }
      }
      return state;
    },
    uncompletedTask: (state, action) => {
      const { id } = action.payload;
      if (id) {
        const task = state.tasks.find((item) => item.id === id);
        if (task) {
          task.completed = false;
        }
      }
      return state;
    },
    completeAllTasks: (state) => {
      state.tasks.forEach((task) => {
        task.completed = true;
      });
      // return { ...state };
    },
    uncompleteAllTask: (state) => {
      state.tasks.forEach((task) => {
        task.completed = false;
      });
      return state;
    },
    deleteTask: (state, action) => {
      const { id } = action.payload;
      return {
        ...state,
        tasks: state.tasks.filter((item) => item.id !== id),
      };
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
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      return state;
    },
    loginSuccess: (state, action) => {    
      state.user = action.payload;
      state.error = null;
    },
    loginFail: (state, action) => {
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  clearAllTask,
  completedTask,
  uncompletedTask,
  completeAllTasks,
  uncompleteAllTask,
  deleteTask,
  moveTask,
  setPage,
  setFilter,
  setSearchQuery,
  loginSuccess,
  loginFail,
} = taskSlice.actions;
export default taskSlice.reducer;
