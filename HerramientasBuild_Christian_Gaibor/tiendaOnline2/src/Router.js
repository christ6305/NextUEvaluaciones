import React from 'react';
import { Switch, Route} from 'react-router-dom'
import {Login} from './components/Login'
import Dashboard from './components/Dashboard'
import Producto from './components/Producto'
import CarroPagar from './components/CarroPagar'
const Router = () =>(
  <Switch>
    <Route exact path = '/' component ={Login}/>
    <Route exact path = '/Dashboard' component ={Dashboard}/>
    <Route exact path = '/Producto/:productoId'
        render= { props => <Producto id = {props.match.params.productoId }/>}
       />
     <Route exact path = '/CarroPagar' component ={CarroPagar}/>
  </Switch>
)

export default Router;
