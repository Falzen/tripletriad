<?php

require_once("config.php"); 

if(isset($_GET["action"]) && !empty($_GET["action"])) {
    $action = $_GET["action"];
    switch($action) {

        case "createNewMap" :
            $newMap = json_decode($_REQUEST["content"]);
            var_dump($newMap);
            createNewMap($newMap);
        break;

        case "getAllMaps" :
            getAllMaps();
        break;

        default:
        	echo "nothing happened";
        break;

    }// end switch action
}// end if isset action

function createNewMap($mapToInsert) {
	$db = getConn();


    $stmt = $db->prepare("INSERT INTO map (name, level, height, width, start_position, exit_position, walls) 
    VALUES (?,?,?,?,?,?,?)");

	$stmt->bindParam(1, $mapToInsert->name);
	$stmt->bindParam(2, $mapToInsert->level);
	$stmt->bindParam(3, $mapToInsert->height);
	$stmt->bindParam(4, $mapToInsert->width);
	$stmt->bindParam(5, $mapToInsert->startPosition);
	$stmt->bindParam(6, $mapToInsert->exitPosition);
	$stmt->bindParam(7, serialize($mapToInsert->walls));

    $stmt->execute();
    getAllMaps();
    $db = null;

	echo "insertion réussie.";
}

function getAllMaps() {
    $db = getConn();
    $allMaps = [];
    $query = "SELECT * FROM map ORDER BY level";

    foreach  ($db->query($query) as $row) {
        $oneMap = [];

        array_push($oneMap, $row['id']);
        array_push($oneMap, $row['name']);
        array_push($oneMap, $row['level']);
        array_push($oneMap, $row['width']);
        array_push($oneMap, $row['height']);
        array_push($oneMap, $row['start_position']);
        array_push($oneMap, $row['exit_position']);
        array_push($oneMap, unserialize($row['walls']));

        array_push($allMaps, $oneMap);
    }

    $db = null;
    echo json_encode($allMaps);
}

?>
