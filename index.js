const redux = require("redux");
const createStore = redux.createStore;

//  TO COMBINE MULTIPLE REDUCERS INTO A SINGLE ROOT
const combineReducers = redux.combineReducers;

//  TO provide DETAILED INFO ABOUT YOUR STATE
const { createLogger } = require("redux-logger");
const logger = createLogger();

//  TO ACCESS PROCESSES BEFORE THEY REACH THE REDUCER
const applyMiddleWare = redux.applyMiddleware;

/* ==================  THIS IS THE ACTIONS  =====================*/

const BUY_CAKE = "BUY_CAKE";

function buycake() {
  return {
    type: BUY_CAKE,
    info: "first cake bought",
  };
}

const BUY_ICE_CREAM = "BUY_ICE_CREAM";
function buyiceCream() {
  return {
    type: BUY_ICE_CREAM,
    info: "first ice  bought",
  };
}

/* ==================  THIS IS THE INITIAL STATES  =====================*/

const CakeState = {
  numberOfCakes: 10,
};

const iceState = {
  numberOfIce: 20,
};

/* ==================  THESE ARE THE REDUCERS  =====================*/

const CakeReducer = (state = CakeState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };

    default:
      return state;
  }
};

const IceReducer = (state = iceState, action) => {
  switch (action.type) {
    case BUY_ICE_CREAM:
      return {
        ...state,
        numberOfIce: state.numberOfIce - 1,
      };

    default:
      return state;
  }
};

/* ==================  THIS COMBINES BOTH REDUCERS INTO ONE ROOTREDUCER  =====================*/

const rootReducer = combineReducers({
  cake: CakeReducer,
  ice: IceReducer,
});

/* ==================  ACCEPTS THE REDUCERS AND MIDDLEWARES  =====================*/
const store = createStore(rootReducer, applyMiddleWare(logger));
console.log("initial state", store.getState());
const unsubscribe = store.subscribe(() => {});

/* ==================  DISPLAYS DATA  =====================*/
store.dispatch(buycake());
store.dispatch(buycake());
store.dispatch(buycake());
store.dispatch(buycake());
store.dispatch(buyiceCream());
store.dispatch(buyiceCream());
store.dispatch(buyiceCream());
store.dispatch(buyiceCream());
unsubscribe();
