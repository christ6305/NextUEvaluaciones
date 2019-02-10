import React from 'react';
import {connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Item from './item'
import {setProductosDB } from '../../services/database.js'
import  {setProductos} from '../../actions'
import {Container,Row, Col , Button} from 'reactstrap'

class CarroPagar extends React.Component{

  itemsCarro (items){
     return items.filter(item => item.cantidadSolicitada>0)
  }

  itemsSuma(items){
    return items.map ( item=> item.cantidadSolicitada *  item.precio ).reduce ((prev, next)=> prev+ next,0);
  }

  pagar =()=>{
    const {setProductos } = this.props
    setProductosDB (this.props.productos.map (({cantidadSolicitada, cantidadEvento, ...item})=> item ), setProductos, this.props.history);
  }

  render(){
    return (
        <div className= "margenArriba25">
          <Container className='bg-light'>
            <Row>
              <Col><h1>Carrito de compras</h1></Col>
            </Row>
            <Row>
              <Col>
                {
                  this.props.productos && this.props.productos.length ?
                    this.itemsCarro(this.props.productos).map (producto=>
                      <Item producto = {producto} key = {producto.id}></Item>
                    )
                    :<div>No hay carrito</div>
                }
              </Col>
              <Col>
                <h1>Total:
                {
                  this.itemsSuma (this.props.productos).toFixed(2)
                }
                </h1>
                <Button onClick ={this.pagar } >Pagar</Button>
              </Col>
            </Row>
          </Container>
      </div>
    )
  }
}

function mapStateToProps (state){
  return {
    productos:state.productos
  }
}

function mapDispatchToProps(dispatch){
  return {
    setProductos: (payload) =>{
      dispatch (setProductos(payload))
    }
  }
}

const CarroPagarConnected= connect ( mapStateToProps , mapDispatchToProps) (CarroPagar)

export default withRouter( CarroPagarConnected )  ;
