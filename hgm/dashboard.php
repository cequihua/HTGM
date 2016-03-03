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

   $sql="SELECT caudal, amperes, voltios, energia FROM scb_estado where id = (select max(id) id from scb_estado);";

   /* Ejecuta y almacena el resultado de la orden 
      SQL en $resultado_set */
   $resultado_set = pg_Exec ($conexion, $sql);
   $filas = pg_NumRows($resultado_set);


   /* Presenta la informacion almacenada en $resultado_set */
   for ($j=0; $j < $filas; $j++) {
      $data = array( 
        'caudal' => pg_result($resultado_set, $j, 0), 
        'amperes' => pg_result($resultado_set, $j, 1), 
        'voltios' =>  pg_result($resultado_set, $j, 2),
        'energia' =>  pg_result($resultado_set, $j, 3)
      );
   }


   /* Cierra la conexion con la base de datos */
   pg_close($conexion);
  //print_r($data);
  $jsondata["success"] = true;
    $jsondata["data"]["message"] = sprintf("Se han encontrado resultados");
    $jsondata["data"] = $data;

    header('Content-type: application/json; charset=utf-8');
    echo json_encode($jsondata, JSON_FORCE_OBJECT);
?>