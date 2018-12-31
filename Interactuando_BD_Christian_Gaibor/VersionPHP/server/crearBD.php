<?php
	require('./conector.php');
	$con = new ConectorBD();

	$conexion['msg'] = "Creando base de datos ".$con->database;
	$database = $con->crearDB();

	if ($database != "OK"){
	 	$conexion['msg'] = "Error";
	}else{
	  $conexion['msg'] = "OK";
	}

	 echo json_encode($conexion);

 ?>php
