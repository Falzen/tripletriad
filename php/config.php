<?php
	function getConn() {
		try {
			$db = new PDO('mysql:host=localhost;dbname=full_rpg;charset=utf8', 'root', '');
			$db->setAttribute(PDO::ATTR_CASE, PDO::CASE_LOWER); // always lower case.
			$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); // errors will trigger exceptions.
			return $db;
		}
		catch(Exception $e){
			echo 'Une erreur est survenue.';
			die('Erreur : ' . $e->getMessage());
		}
	}
?>