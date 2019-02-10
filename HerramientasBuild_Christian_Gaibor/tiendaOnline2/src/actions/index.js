import {AGREGA_LOGIN, SET_PRODUCTOS, AGREGA_PRODUCTO} from '../constants';

export function agregaLogin(payload){
    return  { type: AGREGA_LOGIN, payload};
}

export function setProductos (payload){
  return  ({type:SET_PRODUCTOS , payload})
}

export function agregaProducto (payload){
  return  ({type:AGREGA_PRODUCTO , payload})
}
