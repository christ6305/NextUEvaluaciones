<?php
  require('./conector.php');
  $con = new ConectorBD();
  $response['conexion'] = $con->initConexion($con->database);

  if($response['conexion'] == 'OK'){
      $data['titulo'] = '"'.$_POST['titulo'].'"';
      $data['fecha_inicio'] = '"'.$_POST['start_date'].'"';
      $data['hora_inicio'] = '"'.$_POST['start_hour'].':00"';
      $data['fecha_finalizacion'] = '"'.$_POST['end_date'].'"';
      $data['hora_finalizacion'] = '"'.$_POST['end_hour'].':00"';
      $data['allday'] = $_POST['allDay'];
      $data['id_usuario'] = '"'.$_SESSION['email'].'"';

    if($con->insertData('evento', $data)){
      $resultado = $con->consultar(['evento'],['MAX(id)']);
      while($fila = $resultado->fetch_assoc()){
        $response['id']=$fila['MAX(id)'];
      }

      $response['msg'] = 'OK';
    }else{
      $response['msg'] = "Ha ocurrido un error al guardar el registro";
    }
  }else{
      $response['msg'] = 'Error en la conexion con la base de datos';
  }

  echo json_encode($response);

 ?>
