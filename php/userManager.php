<?php
if(!isset($_SESSION)) {
     session_start();
}

require_once("config.php"); 

if(isset($_REQUEST["action"]) && !empty($_REQUEST["action"])) {
    $action = $_REQUEST["action"];
    switch($action) {

        case "doSignin" :
            $ps = $_REQUEST["pseudo"];
            $pw = $_REQUEST["mdp"];
            doSignin($ps, $pw);
        break;

        case "doLogin" :
            $ps = $_REQUEST["pseudo"];
            $pw = $_REQUEST["mdp"];
            doLogin($ps, $pw);
        break;
    }
}


function doSignin($pseudo, $pw) {
	$db = getConn();


    $stmt = $db->prepare("INSERT INTO users (pseudo, password) 
    VALUES (?,?)");

	$stmt->bindParam(1, $pseudo);
	$stmt->bindParam(2, $pw);

    $stmt->execute();
    $db = null;

	echo doLogin($pseudo, $pw);
}

function doLogin($pseudo, $pw) {
    $db = getConn();
    $allMaps = [];
    $stmt = $db->prepare("SELECT * FROM users WHERE pseudo = ? AND password = ?");
    $stmt->bindParam(1, $pseudo);
    $stmt->bindParam(2, $pw);
    $stmt->execute();

    $oneMember = null;
    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        //TODO jaouter les champs qu'on veut SAUF password O_o
        $oneMember = (object) [
            'id' => $row['id'],
            'pseudo' => $row['pseudo']
        ];
    }
    $db = null;
    if($oneMember != null) {
        $_SESSION["current_user"] = $oneMember;
    }
    echo json_encode($oneMember);
}