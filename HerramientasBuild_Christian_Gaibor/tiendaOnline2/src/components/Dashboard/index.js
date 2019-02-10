
import React from 'react';
import {connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import {agregaProducto }  from '../../actions'
import Item from './item'
import {Container, Row, Navbar, NavbarBrand, Nav, NavItem, Input} from 'reactstrap'

class Dashboard extends React.Component{

  constructor (props){
    super (props);
   this.state= ({txtbusqueda:''})
    this.handleChange = this.handleChange.bind(this);
  }

  ordenar (items){
    return items.sort((a,b)=> a.id < b.id)
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  filtrar (items, cadena){
    return items.filter (item => item.nombre.toLowerCase().includes (cadena.toLowerCase()))
  }

  render (){
          return (
              <div className= "margenArriba25" >
              <Container className='bg-light'>
                  <Navbar color="light" light expand="md">
                    <NavbarBrand >Catálogo de productos</NavbarBrand>
                      <Nav className="ml-auto" navbar>
                        <NavItem>¿Qué estas buscando?</NavItem><br/>
                        <Input onChange={this.handleChange} type="text" name="txtbusqueda"> </Input>
                      </Nav>
                  </Navbar>
                <Row>
                  {
                    this.state.txtbusqueda ?
                      this.props.productos && this.props.productos.length>0 ?
                      this.ordenar(this.filtrar(  this.props.productos, this.state.txtbusqueda)).map (producto =>
                            <Item producto = {producto} history = {this.props.history} addToCart = {this.props.addToCart}  key = {producto.id}></Item>
                          )
                      : "No se han encontrado productos para su venta."
                    : this.props.productos && this.props.productos.length>0 ?
                      this.ordenar(  this.props.productos).map (producto =>
                      <Item producto = {producto} history = {this.props.history} addToCart = {this.props.addToCart}  key = {producto.id}></Item>
                      )
                      : "No se han encontrado productos para su venta."
                  }
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
    addToCart: (payload) =>{
      dispatch (agregaProducto(payload))
    }
  }
}

const connectDashboardPage= connect ( mapStateToProps, mapDispatchToProps) (Dashboard)

export default withRouter( connectDashboardPage )  ;
