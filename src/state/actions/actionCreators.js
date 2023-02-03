import * as actionTypes from "./actionTypes";

import TodoService from "../services/TodoService";

export const createTodo = (title, description) => async (dispatch) => {
  try {
    const res = await TodoService.create({ title, description });

    dispatch({
      type: actionTypes.CREATE_TODOS,
      payload: res.data,
    });
    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveTodos = () => async (dispatch) => {
  try {
    const res = await TodoService.getAll();

    dispatch({
      type: actionTypes.RETRIEVE_TODOS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateTodo = (id, data) => async (dispatch) => {
  try {
    const res = await TodoService.update(id, data);

    dispatch({
      type: actionTypes.UPDATE_TODO,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  try {
    await TodoService.remove(id);

    dispatch({
      type: actionTypes.DELETE_TODO,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const findTodosByTitle = (title) => async (dispatch) => {
  try {
    const res = await TodoService.findByTitle(title);

    dispatch({
      type: actionTypes.RETRIEVE_TODOS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
