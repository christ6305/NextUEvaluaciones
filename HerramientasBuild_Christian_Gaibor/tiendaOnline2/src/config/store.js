import {createStore,  combineReducers } from 'redux'
import login_reducer from '../reducers/login_reducer'
import productos_reducer from '../reducers/productos_reducer'
const rootReducer = combineReducers({
  login:login_reducer,
  productos: productos_reducer
})


const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

)

export default store;
