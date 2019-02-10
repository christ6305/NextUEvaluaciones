import React  from 'react';
//import { Grid, Row, Col }from 'react-flexbox-grid'
import './App.css';

import './styles.css'
import Router from './Router.js'
import {NavLink} from 'react-router-dom'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import  {agregaLogin, setProductos } from './actions'

import {Navbar, NavbarBrand,  Nav, NavItem,Container } from 'reactstrap'
import {bindActionCreators} from 'redux'
import Icon from 'react-icons-kit';
import { ic_apps ,ic_shopping_cart, ic_exit_to_app,ic_archive} from 'react-icons-kit/md/';
import {getProductosDB} from './services/database'

const App = (props) => {

    function contarProductos(items) {
       return items.filter(item => item.cantidadSolicitada>0)
    }

    return (
      <div className ={ props.login.loggeado?"estiloAplicacion":"estiloLogin"} >
          <Container>
          {
              props.login.loggeado ?
                <div>

                  <Navbar color="light" light expand="md">
                    <NavbarBrand >La bodega</NavbarBrand>

                      <Nav className="ml-auto" navbar>
                        <NavItem><NavLink  to = '/Dashboard' className ="margenIzquierda10"><Icon className= "colorIcono " size={20} icon={ic_apps}/> </NavLink></NavItem>
                      </Nav>
                      <Nav>
                          <NavItem><NavLink to = '/CarroPagar' className ="margenIzquierda10"><Icon className= "colorIcono" size={20}  icon={ic_shopping_cart}/> {contarProductos (props.productos).length>0?<span class="badge badge-pill badge-danger itemCarrito">{contarProductos (props.productos).length}</span>:""  }  </NavLink></NavItem>
                      </Nav>
                      <Nav>
                        <NavItem><NavLink to = '/Dashboard' className ="margenIzquierda10" onClick ={ ()=>  getProductosDB (props.setProductos)     }><Icon className= "colorIcono" size={20}  icon={ic_archive}/></NavLink></NavItem>
                      </Nav>
                      <Nav>
                        <NavItem><NavLink to = '/' className ="margenIzquierda10" onClick={() => { props.agregaLogin ({usuario:null,loggeado :false})}}><Icon  size={20}  className= "colorIcono" icon={ic_exit_to_app}/></NavLink></NavItem>
                      </Nav>

                  </Navbar>
                </div>
              :<div></div>
          }
          <Router>
          </Router>
          </Container>
      </div>

    )
}


function mapStateToProps (state){
  return {
    login:state.login,
    productos:state.productos
  }
}




const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({ agregaLogin , setProductos}, dispatch)
    }
}

export  default withRouter(  connect(mapStateToProps, mapDispatchToProps)(App));
