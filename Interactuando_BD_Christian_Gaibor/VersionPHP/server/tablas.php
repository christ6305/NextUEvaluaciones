<?php
  require('conector.php');
  $con = new ConectorBD();
  $usuarios = new Usuarios();
  $eventos = new Eventos();
  $resonse['usuario'] = '';
  $response['evento']='';

  //TABLA USUARIO
  $result = $con->crearTabla($usuarios->nombreTabla, $usuarios->data);
  if( $result == "OK"){
    $response['msg'] = 'OK';
    $response['usuario'] = 'OK';
  }else{
    $response['msg'] .= "Error";
  }

  //TABLA EVENTO
  $result = $con->crearTabla($eventos->nombreTabla, $eventos->data);
  if( $result == "OK"){
    $response['msg'] = 'OK';
    $response['evento'] = 'OK';
  }else{
    $response['msg'] .= "Error";
  }

  if($response['evento'] =='OK' AND $response['usuario'] == 'OK' ){

    $result =  $con->nuevaRestriccion($eventos->nombreTabla, 'ADD KEY id_usuario (id_usuario)');
    if( $result == "OK"){
      $response['Index'] = 'OK';
    }

    $result =  $con->nuevaRelacion($eventos->nombreTabla, $usuarios->nombreTabla, 'fk_usuarioemail_evento', 'id_usuario', 'email');
    if( $result == "OK"){
      $response['fk'] = 'OK';
    }
  }else{
    $response['msg'] = 'Verifique los datos de ingreso';
  }

  echo json_encode($response);
?>
