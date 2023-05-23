export const ADD_TASK = "ADD_TASK";
export const UPDATED_TASK = "UPDATED_TASK";
export const CLEAR_ALL_TASK = "CLEAR_ALL_TASK";
export const COMPLETED_TASK = "COMPLETED_TASK";
export const UNCOMPLETED_TASK = "UNCOMPLETED_TASK";

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const updateTask = (id, task) => ({
  type: UPDATED_TASK,
  payload: {
    id,
    task,
  },
});

export const clearAllTask = () => ({
  type: CLEAR_ALL_TASK,
});

export const completedTask = (id) => ({
  type: COMPLETED_TASK,
  payload: {
    id,
  },
});

export const uncompletedTask = (id) => ({
  type: UNCOMPLETED_TASK,
  payload: {
    id,
  },
});
