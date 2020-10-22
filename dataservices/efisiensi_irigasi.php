<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once dirname(__FILE__) . '/./dbconfig.php';
header("Access-Control-Allow-Origin: *");
$geojson = array(
	 'type'      => 'FeatureCollection',
	 'features'  => array()
);
try {
	$dbcon = new PDO("pgsql:host=".$dbconfig['_pgsql_db_host_'].";port=".$dbconfig['_pgsql_db_port_'].";dbname=".$dbconfig['_pgsql_db_name_'].";user=".$dbconfig['_pgsql_db_user_'].";password=".$dbconfig['_pgsql_db_pass_']."");
	$dbcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	$stmt = $dbcon->prepare("SELECT k_saluran, urut, nomenklatu, nama_di, desa, kecamatan, 
	q_in_jan, q_out_jan, ei_jan, rerata_ei_jan,
	q_in_feb, q_out_feb, ei_feb, rerata_ei_feb,
	q_in_mar, q_out_mar, ei_mar, rerata_ei_mar,
	q_in_apr, q_out_apr, ei_apr, rerata_ei_apr,
	q_in_mei, q_out_mei, ei_mei, rerata_ei_mei,
	q_in_jun, q_out_jun, ei_jun, rerata_ei_jun,
	q_in_jul, q_out_jul, ei_jul, rerata_ei_jul,
	q_in_ags, q_out_ags, ei_ags, rerata_ei_ags,
	q_in_sept, q_out_sept, ei_sept, rerata_ei_sept,
	q_in_okt, q_out_okt, ei_okt, rerata_ei_okt,
	q_in_nov, q_out_nov, ei_nov, rerata_ei_nov,
	q_in_des, q_out_des, ei_des, rerata_ei_des, public.ST_AsGeoJSON(public.ST_Transform((geom),4326),6) AS geojson FROM efisiensi_irigasi");
	if($stmt->execute()){
		$id_count = 0;
		while($rowset = $stmt->fetch(PDO::FETCH_ASSOC)){
			$properties = $rowset;
			unset($properties['geojson']);
			unset($properties['geom']);
				$feature = array(
						 'type' => 'Feature',
						 'id' => $id_count,
						 'properties' => $properties,
						 'geometry' => json_decode($rowset['geojson'], true)
				);
			array_push($geojson['features'], $feature);
			$id_count++;
		}
		header('Content-Type: application/json');
		echo json_encode($geojson, JSON_NUMERIC_CHECK);
		$dbcon = null;
		exit;
	} else {
		header('Content-Type: application/json');
		echo json_encode($geojson, JSON_NUMERIC_CHECK);
		$dbcon = null;
		exit;
	}
} catch (PDOException $e) {
	header('Content-Type: application/json');
	echo json_encode($geojson, JSON_NUMERIC_CHECK);
	$dbcon = null;
	exit;
}
?>