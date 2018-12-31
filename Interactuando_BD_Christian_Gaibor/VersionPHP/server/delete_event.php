<?php
	require('conector.php');
	$con = new conectorBD();
	$response['conexion'] = $con->initConexion($con->database);

	if ($response['conexion'] == 'OK') {
		if ($con->eliminarRegistro('evento', 'id='.$_POST['id'])) {
			$response['msg'] = 'OK';
		}else{
			$response['msg'] = "Ha ocurrido un error al eliminar el registro";
		}
	}else{
		$response['msg'] = 'Error en la conexion con la base de datos';
	}

	echo json_encode($response);


 ?>
