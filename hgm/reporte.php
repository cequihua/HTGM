<?php 

	$conexion = pg_pconnect("host=localhost port=5432 dbname=smv user=odoo password=odoo");

   if (!$conexion) {
        echo "<CENTER>
              Problemas de conexion con la base de datos.
              </CENTER>";
        exit;
   }

   $sql="select caudala,caudalb,caudalc,caudald,caudale,preciona,precionb,precionc,preciond,precione
from scb_reporte where id = (select max(id) id from scb_reporte);";

   /* Ejecuta y almacena el resultado de la orden 
      SQL en $resultado_set */
   $resultado_set = pg_Exec ($conexion, $sql);
   $filas = pg_NumRows($resultado_set);


   /* Presenta la informacion almacenada en $resultado_set */
   for ($j=0; $j < $filas; $j++) {
      $data = array( 
        'caudala' => pg_result($resultado_set, $j, 0), 
        'caudalb' => pg_result($resultado_set, $j, 1), 
        'caudalc' =>  pg_result($resultado_set, $j, 2),
        'caudald' =>  pg_result($resultado_set, $j, 3),
        'caudale' =>  pg_result($resultado_set, $j, 4),
        'preciona' =>  pg_result($resultado_set, $j, 5),
        'precionb' =>  pg_result($resultado_set, $j, 6),
        'precionc' =>  pg_result($resultado_set, $j, 7),
        'preciond' =>  pg_result($resultado_set, $j, 8),
        'precione' =>  pg_result($resultado_set, $j, 9)
      );
   }


   /* Cierra la conexion con la base de datos */
   pg_close($conexion);

  $jsondata["success"] = true;
  $jsondata["data"] = $data;

  header('Content-type: application/json; charset=utf-8');
  echo json_encode($jsondata, JSON_FORCE_OBJECT);
?>