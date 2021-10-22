import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_REPOSITORIES, GET_USER, SET_USER } from './gitActionTypes'

const gitReducer = (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case CLEAR_USERS:
      return {
        ...state,
        loading: false,
        users: []
      }
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      }
    case GET_REPOSITORIES:
      return {
        ...state,
        repos: action.payload,
        loading: false,
      }
    default:
      return state;
  }
}

export default gitReducer;