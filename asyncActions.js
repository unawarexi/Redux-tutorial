const redux = require("redux");
const createStore = redux.createStore;

// appluing middleware
const applyMiddleWare = redux.applyMiddleware;
const thunkMiddleWare = require("redux-thunk").default;

// for fetching
const axios = require("axios");
const { response } = require("express");

const initialStore = {
  loading: false,
  users: [],
  error: "",
};

// creating initialsate

const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

/**
 *  the payload acts like an argument
 *  taking from store and assigning it to the inistates
 *
 */

const fetchUserReq = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

const fetchUserSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: users,
  };
};

const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};

const reducer = (state = initialStore, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };

    case FETCH_USER_FAILURE:
      return {
        loading: false,
        error: action.payload,
        users: [],
      };
  }
};

/*========================== USING API IN REDUX TO GET INFO ========================*
 *  AXIOS : requests to an api endpoint
 *  REDUX-THUNK:  define async action creators
 *       this is a middleware
 *
 * redux-thunk helps an action creator return a "function" instead of an action object
 *
 * NOTE:  the return funtion() doesn't have to be pure
 *  2. allow to have side effects e.g aync api calls
 *   3. can dispatch actions recieving (dispatch) as argument
 */

// ASYNC ACTION CREATOR : returns an action
const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUserReq())
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        // response.data array of users
        const users = response.data.map(user => user.id)
        dispatch(fetchUserSuccess(users))
      })
      .catch((error) => {
        // error.message is the error description

        dispatch(fetchUserFailure(error.message))
      });
  };
};


const store = createStore(reducer, applyMiddleWare(thunkMiddleWare));
store.subscribe(() => {console.log(store.getState())} )
store.dispatch(fetchUsers())
