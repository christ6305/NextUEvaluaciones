import React from 'react'
import { Container, Row } from 'reactstrap'
import {Button, Input, Form } from 'reactstrap'


class Item extends React.Component{

  constructor(props) {
      super(props);
      this.state = {valor: 0};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({valor: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    const { addToCart, producto} = this.props;
    producto.cantidadEvento = Number(this.state.valor)
    addToCart (producto)
  }

  render (){
    const { producto , history} = this.props;
    return (
      <div key={producto.id} className= 'marco'>
        <img className = 'imagenCatalogo' alt = {producto.nombre}   src = {`/images/${producto.imagen}`}></img>
        <h4>{producto.nombre}</h4>
        <div><h6><span>Precio:</span><span>{`${producto.precio}$` }</span></h6></div>
        <div><h6><span>Unidades disponibles:</span><span>{`${producto.cantidad}` }</span></h6></div>
        <Container>
          <Row>
              <Button color= "primary" onClick = {()=> history.push(`/Producto/${producto.id}`)}>Ver mas</Button>
              <Form className= "margenIzquierda10" onSubmit={this.handleSubmit}>
                <Container>
                  <Row>
                    <Button  color="warning" >Añadir</Button>
                    <Input min = "0" max= {producto.cantidad} className= "cantidad" type="number" value={this.state.valor} onChange={this.handleChange} />
                  </Row>
                </Container>
               </Form>
          </Row>
        </Container>
      </div>
    )
  }
}

export default Item
