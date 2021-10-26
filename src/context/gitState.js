import React, { useReducer } from 'react'
import axios from 'axios'
import gitContext from './gitContext'
import gitReducer from './gitReducer'
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_REPOSITORIES, GET_USER, SET_USER, SET_ERROR } from './gitActionTypes'

const gitAPI = axios.create({
  baseURL: process.env.REACT_APP_GITHUB_API_URL,
})
const gitToken = process.env.REACT_APP_GITHUB_TOKEN;
if (gitToken) {
  gitAPI.defaults.headers.common.Authorization = `token ${gitToken}`
}

const getErrorMessage = (err, fallback) => {
  if (err.response && err.response.status === 403) {
    return 'GitHub API rate limit reached. Please try again later.'
  }
  if (err.response && err.response.status === 404) {
    return 'The requested GitHub user could not be found.'
  }
  return fallback
}

const GitState = props => {
  const initialState = {
    users: [],
    user: {},
    repositories: [],
    loading: false,
    error: null,
    searched: false
  }

  const [state, dispatch] = useReducer(gitReducer, initialState);

  // Search User
  const searchUsers = async text => {
    if (!text || text.trim() === '') {
      userClear();
    }
    else {
      setLoading();
      try {
        const res = await gitAPI.get(
          `/search/users?q=${text}`
        );
        if (res.data && res.data.items) {
          await Promise.all(
            res.data.items.map(async (item) => {
              const { data } = await gitAPI.get(
                `/users/${item.login}/repos`
              );
              item.repoCount = data.length
              return item
            })
          );
          dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
          });
        }
      } catch (err) {
        dispatch({
          type: SET_ERROR,
          payload: getErrorMessage(err, 'Unable to search users. Please try again.')
        });
      }
    }
  };


  // Get User
  const getUser = async userName => {
    setLoading();
    try {
      const res = await gitAPI.get(
        `/users/${userName}`
      );
      dispatch({ type: GET_USER, payload: res.data });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: getErrorMessage(err, 'Unable to load this user profile.')
      });
    }
  };

  // Set User
  const setUser = obj => {
    dispatch({ type: SET_USER, payload: obj });
  };

  // Get Repos
  const getRepositories = async userName => {
    setLoading();
    try {
      const res = await gitAPI.get(
        `/users/${userName}/repos?sort=created:asc`
      );

      dispatch({
        type: GET_REPOSITORIES,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: getErrorMessage(err, 'Unable to load repositories for this user.')
      });
    }
  };


  // Clear Users
  const userClear = () => dispatch({ type: CLEAR_USERS });

  // Set Loading
  const setLoading = () => dispatch({ type: SET_LOADING })

  return <gitContext.Provider
    value={
      {
        users: state.users,
        user: state.user,
        repositories: state.repositories,
        loading: state.loading,
        error: state.error,
        searched: state.searched,
        searchUsers,
        userClear,
        getUser,
        setUser,
        getRepositories
      }
    }
  >
    {props.children}
  </gitContext.Provider>
}


export default GitState;