<?php

$ciudad = $_GET['ciudad'];
$tipo = $_GET['tipo'];
$rango_precio = $_GET['precio'];
$precio = strpos($rango_precio, ';');
$file = fopen("data-1.json", "r") or die("No se puede abrir el archivo");
$json = fread($file, filesize('data-1.json'));
$data = json_decode($json, true);
$min = substr($rango_precio, 0, $precio);
$max = substr($rango_precio, $precio+1);

$v_resultado = array();
$v_resultado_final = array();

/*recorre el precio, siempre se filtra*/
foreach($data as $i){
    $precio = $i['Precio'];
    $precio = substr($precio, strpos($precio,'$')+1);
    $aux = strpos($precio,',');
    $precio = substr($precio,0,$aux).substr($precio,$aux+1);
    if($precio>=$min && $precio<=$max){
        array_push($v_resultado, $i);
    }
}

if(empty($ciudad) && empty($tipo)){
  $v_resultado_final =$v_resultado;
}

if(!empty($ciudad) && !empty($tipo)){
    foreach($v_resultado as $aux){
        if($aux['Ciudad']==$ciudad && $aux['Tipo']==$tipo){
            array_push($v_resultado_final, $aux);
        }
    }
} elseif(!empty($ciudad)){
    foreach($v_resultado as $aux){
        if($aux['Ciudad']==$ciudad){
            array_push($v_resultado_final, $aux);
        }
    }
} elseif(!empty($tipo)){
    foreach($v_resultado as $aux){
        if($aux['Tipo']==$tipo){
            array_push($v_resultado_final, $aux);
        }
    }
}

$res_json = json_encode($v_resultado_final);
echo '{"result":"success", "message":"success", "data":'.$res_json.'}';

fclose($file);
?>
