import React from 'react'
import {connect } from 'react-redux'
import {Container,Row, Col , Button} from 'reactstrap'
import { withRouter } from 'react-router-dom';


const Producto =  (props)=> {

    return (
            <div className= "margenArriba25">
              {
                props.productos && props.productos.length>0 ?
                props.productos.filter( productoIten => Number (productoIten.id) === Number(props.id)).map(producto=>
                  <div key={producto.id}>
                    <Container className='bg-light'>
                      <Row>
                        <Col><h1>{producto.nombre}</h1></Col>
                      </Row>
                      <Row>
                          <Col xs= "12" lg="8">
                            <img  alt = {producto.nombre} className = 'imagenDetalle' src = {`/images/${producto.imagen}`}></img>
                          </Col>

                          <Col xs="12" lg="4">
                            <h3>Precio:{`${producto.precio}` }</h3>
                            <h4>Unidades disponibles:{`${producto.cantidad}` }</h4>
                          </Col>
                      </Row>

                      <Row>
                        <Col><Button color= "primary" onClick ={()=>props.history.goBack ()} >Atras</Button></Col>
                      </Row>
                    </Container>
                  </div>
                  )
              : "Favor inicie sesión"
              }
            </div>
    )

}

function mapStateToProps (state){
  return {
    productos:state.productos
  }
}

export default withRouter( connect ( mapStateToProps) (Producto) )  ;
