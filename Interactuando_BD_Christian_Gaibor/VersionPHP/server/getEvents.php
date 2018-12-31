<?php
	require('./conector.php');
  $con = new ConectorBD();
  $response['msg'] = $con->initConexion($con->database);

  if ($response['msg']=='OK') {
    $resultado = $con->consultar(['evento'],['*'], "WHERE id_usuario ='".$_SESSION['email']."'",'');
    $i = 0;

    while($fila = $resultado->fetch_assoc()){
      $response['evento'][$i]['id']=$fila['id'];
      $response['evento'][$i]['title']=$fila['titulo'];
      if ($fila['allday'] == 0){
        $allDay = false;
        $response['evento'][$i]['start']=$fila['fecha_inicio'].'T'.$fila['hora_inicio'];
        $response['evento'][$i]['end']=$fila['fecha_finalizacion'].'T'.$fila['hora_finalizacion'];
      }else{
        $allDay= true;
        $response['evento'][$i]['start']=$fila['fecha_inicio'];
        $response['evento'][$i]['end']="";
      }

      $response['evento'][$i]['allDay']=$allDay;
      $i++;
    }

   $response['getData'] = "OK";
  }
  echo json_encode($response);

 ?>
