
import {SET_PRODUCTOS, AGREGA_PRODUCTO} from '../constants';

const eliminaDeLista =  (listado, item) => listado.filter (itemLista => itemLista.id !== item.id);

const inicializa = (productos)=>{
  return productos.map ((producto)=>{producto.cantidadSolicitada=0; producto.cantidadEvento= 0; return producto})
}

const adicionar  = (productos,producto)=>{
  if (producto.cantidadEvento<= producto.cantidad){
    producto.cantidad= producto.cantidad- producto.cantidadEvento;
    producto.cantidadSolicitada = producto.cantidadSolicitada + producto.cantidadEvento;
  }

  return [...eliminaDeLista(productos, producto), producto]
}

const productos_reducer = (state =[], action)=>{
  switch (action.type) {
    case SET_PRODUCTOS: return inicializa( action.payload);
    case AGREGA_PRODUCTO : return adicionar (state,action.payload);
    default: return  state;

  }
}

export default productos_reducer;
