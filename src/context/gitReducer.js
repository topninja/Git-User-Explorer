import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_REPOSITORIES, GET_USER, SET_USER, SET_ERROR, CLEAR_ERROR } from './gitActionTypes'

const gitReducer = (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        error: null,
        searched: true
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      }
    case CLEAR_USERS:
      return {
        ...state,
        loading: false,
        users: [],
        error: null,
        searched: false
      }
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      }
    case GET_REPOSITORIES:
      return {
        ...state,
        repositories: action.payload,
        loading: false,
        error: null,
      }
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
}

export default gitReducer;