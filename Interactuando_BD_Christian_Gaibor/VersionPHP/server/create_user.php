<?php
	require('conector.php');
	$con = new conectorBD();
	$response['conexion'] = $con->initConexion($con->database);

	if ($response['conexion'] == 'OK'){
		$conexion = $con->getConexion();
		$insert = $conexion->prepare('INSERT INTO usuario (email, nombre, password , fecha_nacimiento) VALUES (?,?,?,?)');
		$insert->bind_param("ssss", $email, $nombre, $password, $fecha_nacimiento);

		$password_desc = "12345";

		$email = "andres@hotmail.com";
		$nombre = "Andres";
		$password = password_hash($password_desc, PASSWORD_DEFAULT);
		$fecha_nacimiento = "1994-09-25";

		$insert->execute();

		$email = 'carlos@mail.com';
		$nombre = 'Carlos';
		$password = password_hash($password_desc, PASSWORD_DEFAULT);
		$fecha_nacimiento = '1988-07-01';

		$insert->execute();

		$email = 'christ@hotmail.com';
		$nombre = 'Christian';
		$password = password_hash($password_desc, PASSWORD_DEFAULT);
		$fecha_nacimiento = '1989-11-12';

		$insert->execute();

		}else{
		$response['msg'] = 'No se pudo conectar a la base de datos';
	}

	echo json_encode($response);

 ?>
