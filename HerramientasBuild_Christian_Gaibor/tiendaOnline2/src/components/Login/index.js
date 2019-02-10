import React from 'react'
import {connect } from 'react-redux'
import { getUsers, getProductosDB } from '../../services/database';
import  {agregaLogin} from '../../actions'
import  {setProductos} from '../../actions'
import {bindActionCreators} from 'redux'
import {Button, Container, Row, Col, Alert,Input , FormGroup ,Label} from 'reactstrap';

class Login extends React.Component{
  constructor (props){
    super (props);
    this.state = {
      username:'',
      password:'',
      loggeado:false,
      errors:{},
      formIsValid:false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  validateForm(){
    console.log ("a")
    let {username, password} = this.state
    let errors={}
    let formIsValid = true
    if (!username){
      formIsValid = false;
      errors["username"]= "Introduce el correo"
    }
    if (!password){
      formIsValid = false;
      errors["password"]= "Introduce la contraseña"
    }

    this.setState({
      errors:errors,
      formIsValid:formIsValid
    })
    console.log (this.state)
    return formIsValid;
  }

  render(){
    return (<div >
      <Container>
      <Row className = " contenedor ">
      <Col md = {{ size: 6, offset: 3 }} className = "text-center  d-flex align-items-center ">
        <Container >
          <Row>
            <Col   >
              <h3 className="text-white ">Inicia Sesion</h3>
            </Col>
          </Row>
          <Row>
            <Col >
              <form name ="form" onSubmit={ this.handleSubmit  }>
                  <Container>
                    <Row>
                        <Col  >
                          <FormGroup>
                            <Label className="text-white"  >Correo electronico:</Label>
                            <Input required className ="texto" type ="text" name ="username" onChange={this.handleChange}  ></Input>
                          </FormGroup>

                        </Col>
                    </Row>
                    <Row>
                        <Col >
                          <FormGroup>
                              <Label className="text-white">Contraseña:</Label>
                              <Input required className ="texto"  type ="password" name ="password" onChange={this.handleChange} ></Input>
                          </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                          {
                             !this.state.errors.formIsValid && this.state.username && this.state.password && this.state.formIsValid ? <Alert color ="danger" >Error en el inicio de sesión</Alert>   :""
                          }

                          <Button color="success">Ingresar</Button>
                        </Col>
                    </Row>
                  </Container>
              </form>
            </Col>
          </Row>
        </Container>
      </Col>
      </Row>
      </Container>
    </div>)

  }

  handleSubmit(e){
    e.preventDefault();
    const { agregaLogin , setProductos} = this.props;

    if (this.validateForm()){
        fetch (getUsers()).then(
          data=>(data.json())
        ).then(
          data=>{
            if( data.some(e => e.usuario === this.state.username && String(e.password) === String(this.state.password))){
              this.setState({loggeado:true});
              this.props.history.push("/dashboard")
              agregaLogin({usuario:this.state.username, loggeado:true})
              getProductosDB (setProductos)
            }else{

            }
          }
        )
      }
    }
}

function mapStateToProps (state){
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      ...bindActionCreators({ agregaLogin, setProductos }, dispatch)
    }
}

const connectLoginPage= connect ( mapStateToProps,mapDispatchToProps) (Login)
export {connectLoginPage as Login}
