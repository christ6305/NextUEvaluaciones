import React from 'react'
import {Row, Col } from 'reactstrap'

class Item extends React.Component{

  render (){
    const { producto } = this.props;
    return (
      <div key={producto.id}>
        <Row>
          <Col xs= "12" lg="4" className="text-center">
            <img alt = {producto.nombre}  height = {100} src = {`/images/${producto.imagen}`}></img>
          </Col>
          <Col xs= "12" lg="8">
            <div><span>Precio:</span><span>{`${producto.precio}$` }</span></div>
            <div><span>Unidades solicitadas:</span><span>{`${producto.cantidadSolicitada}` }</span></div>
            <div><span>Subtotal:</span><span>{(producto.cantidadSolicitada*producto.precio).toFixed(2) }</span></div>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Item
