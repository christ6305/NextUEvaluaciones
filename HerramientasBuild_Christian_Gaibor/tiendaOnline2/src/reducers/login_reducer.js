import {AGREGA_LOGIN} from '../constants';

const login_reducer = (state ={}, action)=>{
  switch (action.type) {
    case AGREGA_LOGIN: return {usuario:action.payload.usuario, loggeado: action.payload.loggeado};
    default: return  state;
  }
}

export default login_reducer;
