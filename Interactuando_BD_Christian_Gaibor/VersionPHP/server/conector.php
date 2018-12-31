<?php
	session_start();

	class conectorBD{

		//PARA PROBAR, EDITAR LAS CREDENCIALES DE INGRESO
		
		private $host = 'localhost';
		private $user = 'christian';
		private $password = '12345';
		public $database = 'agenda_db';
		public $conexion;

	  function initConexion($nombre_db){
	  	$this->conexion = new mysqli($this->host, $this->user, $this->password, $nombre_db);
	  	if ($this->conexion->connect_error) {
	  		return $this->conexión->connect_errno;
	  	}else{
	  		return "OK";
	  	}
	  }

	  function userSession(){
	  	if (isset($_SESSION['email'])) {
	  		$response['msg'] = $_SESSION['email'];
	  	}else{
	  		$response['msg'] = '';
	  	}
	  	return json_encode($response);
	  }

	  function verifyUsers(){
	  	$sql = 'SELECT COUNT(email) FROM usuario';
	  	$totalUsers = $this->ejecutarQuery($sql);
	  	while ($row = $totalUsers->fetch_assoc()) {

	  		return $row['COUNT(email)'];
	  	}
	  }

	  function getConexion(){
	  	return $this->conexion;
	  }
	  function ejecutarquery($query){
	  	return $this->conexion->query($query);
	  }
	  function crearTabla($nombre_tbl, $campos){
	  	$this->conexion = new mysqli($this->host,$this->user,$this->password,$this->database);
	  	if($this->conexion->connect_errno){
	  		return $this->conexion->connect_errno;
	  	}else{
	  		//Construcción del script
	      $sql = 'CREATE TABLE IF NOT EXISTS '.$nombre_tbl.' (';
	      $length_array = count($campos);
	      $i = 1;
	      foreach ($campos as $key => $value) {
	        $sql .= $key.' '.$value;
	        if ($i!= $length_array) {
	          $sql .= ', ';
	        }else {
	          $sql .= ');';
	        }
	        $i++;
	      }

	      $query =  $this->ejecutarQuery($sql); //Ejecutar sentencia SQL

	      if($query == 1)
	      {
	        return "OK"; //Devolver respuesta positiva correcta
	      }
	      else{
	        return "Error"; //Devolver error;
	  	  }
	    }
	  }
	  function cerrarConexion(){
	  	$this->conexion->close();
	  }
	  function crearDB(){
	  	$this->conexion =new mysqli($this->host,$this->user,$this->password);
	  	$query = $this->conexion->query('CREATE DATABASE IF NOT EXISTS '.$this->database);
	  	if ($query == 1) {
	  		return "OK";
	  	}else {
	  		return "Error";
	  	}
	  }
	  function nuevaRestriccion($tabla, $restriccion){
	    $sql = 'ALTER TABLE '.$tabla.' '.$restriccion;
	    return $this->ejecutarQuery($sql);
	 }
	  function nuevaRelacion($from_tbl, $to_tbl, $fk_foreign_key_name, $from_field, $to_field){
    	$sql = 'ALTER TABLE '.$from_tbl.' ADD CONSTRAINT '.$fk_foreign_key_name.' FOREIGN KEY ('.$from_field.') REFERENCES '.$to_tbl.'('.$to_field.');';
    	return $this->ejecutarQuery($sql);
    }
    function insertData($tabla, $data){
    $sql = 'INSERT INTO '.$tabla.' (';
    $i = 1;
    foreach ($data as $key => $value) {
      $sql .= $key;
      if ($i<count($data)) {
        $sql .= ', ';
      }else $sql .= ')';
      $i++;
    }
    $sql .= ' VALUES (';
    $i = 1;
    foreach ($data as $key => $value) {
      $sql .= $value;
      if ($i<count($data)) {
        $sql .= ', ';
      }else $sql .= ');';
      $i++;
    }
    return $this->ejecutarQuery($sql);
  }

  //Función para actualizar registro en la base de datos
  function actualizarRegistro($tabla, $data, $condicion){
    $sql = 'UPDATE '.$tabla.' SET ';
    $i=1;
    foreach ($data as $key => $value) {
      $sql .= $key.'='.$value;
      if ($i<sizeof($data)) {
        $sql .= ', ';
      }else $sql .= ' WHERE '.$condicion.';';
      $i++;
    }
    return $this->ejecutarQuery($sql);
  }

  //Función para eliminar registro en base de datos
  function eliminarRegistro($tabla, $condicion){
    $sql = "DELETE FROM ".$tabla." WHERE ".$condicion.";";
    return $this->ejecutarQuery($sql);
  }

  //Función para consultar información en base de datos
  function consultar($tablas, $campos, $condicion = ""){
    $sql = "SELECT ";
    $result = array_keys($campos);
    $ultima_key = end($result);
    foreach ($campos as $key => $value) {
      $sql .= $value;
      if ($key!=$ultima_key) {
        $sql.=", ";
      }else $sql .=" FROM ";
    }

    $result = array_keys($tablas);
    $ultima_key = end($result);
    foreach ($tablas as $key => $value) {
      $sql .= $value;
      if ($key!=$ultima_key) {
        $sql.=", ";
      }else $sql .= " ";
    }

    if ($condicion == "") {
      $sql .= ";";
    }else {
      $sql .= $condicion.";";
    }
    return $this->ejecutarQuery($sql);
  }


}

	class Usuarios
	{
	  public $nombreTabla = 'usuario';

	  public $data = ['email' => 'varchar(50) NOT NULL PRIMARY KEY',
	  'nombre' => 'varchar(50) NOT NULL',
	  'password' => 'varchar(255) NOT NULL',
	  'fecha_nacimiento' => 'date NOT NULL'];
	}

	class Eventos
	{
	  public $nombreTabla = 'evento';

	  public $data = ['id' => 'INT NOT NULL PRIMARY KEY AUTO_INCREMENT',
	  'titulo'=> 'VARCHAR(50) NOT NULL',
	  'fecha_inicio'=> 'date NOT NULL',
	  'hora_inicio' => 'varchar(20)',
	  'fecha_finalizacion'=> 'date',
	  'hora_finalizacion'=> 'varchar(20)',
	  'allday'=> 'tinyint(1) NOT NULL',
	  'id_usuario'=>'varchar(50) NOT NULL'];
	}

 ?>
