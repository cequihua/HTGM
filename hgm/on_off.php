<?php

   /* ********************* */
   /* Conexion a PostgreSQL */
   /* ********************* */

   /* Conexion a la base de datos */
   $jsondata = array();
   $conexion = pg_pconnect("host=localhost port=5432 dbname=smv user=odoo password=odoo");

   if (!$conexion) {
        echo "<CENTER>
              Problemas de conexion con la base de datos.
              </CENTER>";
        exit;
   }

   $sql="update scb_bomba set state = (select case state when 'APAGADO~' then 'ENCENDIDO~' else 'APAGADO~' end from scb_bomba)";
   $resultado_set = pg_Exec ($conexion, $sql);

   /* Cierra la conexion con la base de datos */
   pg_close($conexion);
	//print_r($data);
	$jsondata["success"] = true;
  $jsondata["data"]["message"] = sprintf("Se han encontrado resultados");
  $jsondata["data"] = true;

   	header('Content-type: application/json; charset=utf-8');
  	echo json_encode($jsondata, JSON_FORCE_OBJECT);
?>