const redux = require("redux");
const createStore = redux.createStore;
const combineReducers = redux.combineReducers;
const { createLogger } = require("redux-logger");
const logger = createLogger();
const applyMiddleWare = redux.applyMiddleware;

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

const CakeState = {
  numberOfCakes: 10,
};

const iceState = {
  numberOfIce: 20,
};

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

const rootReducer = combineReducers({
  cake: CakeReducer,
  ice: IceReducer,
});

const store = createStore(rootReducer, applyMiddleWare(logger));
console.log("initial state", store.getState());
const unsubscribe = store.subscribe(() => {});

store.dispatch(buycake());
store.dispatch(buycake());
store.dispatch(buycake());
store.dispatch(buycake());
store.dispatch(buyiceCream());
store.dispatch(buyiceCream());
store.dispatch(buyiceCream());
store.dispatch(buyiceCream());
unsubscribe();
