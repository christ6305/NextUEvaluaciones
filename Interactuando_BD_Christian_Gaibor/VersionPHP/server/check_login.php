<?php
	require('conector.php');
	$con = new conectorBD();
	$response['conexion'] = $con->initConexion($con->database);

	if ($response['conexion']== 'OK') {
		if($con->verifyUsers() > 0){
				$resultado_consulta = $con->consultar(['usuario'],['email','password'], 'WHERE email="'.$_POST['username'].'"');

				if ($resultado_consulta->num_rows != 0) {
					$fila = $resultado_consulta->fetch_assoc();

					if (password_verify($_POST['password'],$fila['password'])) {
				 	 	$response['msg'] = 'OK';
						$_SESSION['email'] = $fila['email'];
					}else{
						$response['msg'] = 'Contraseña incorrecta';
					}
				}
				else{
						$response['msg'] = 'Nombre de usuario incorrecto';
				}
			}
			else{
				$response['conexion'] = 'Error al inciar la sesion';
			}
		}

	echo json_encode($response);

	$con->cerrarConexion();

 ?>
