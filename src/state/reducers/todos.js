import * as actionTypes from "../actions/actionTypes";

const initialState = [];

const todoReducer = (todos = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.CREATE_TODOS:
      return [...todos, payload];
    case actionTypes.RETRIEVE_TODOS:
      return payload;
    case actionTypes.UPDATE_TODO:
      return todos.map((todo) => {
        if (todo.id === payload.id) {
          return {
            ...todo,
            ...payload,
          };
        } else {
          return todo;
        }
      });

    case actionTypes.DELETE_TODO:
      return todos.filter(({ id }) => id !== payload.id);

    default:
      return todos;
  }
};

export default todoReducer;
