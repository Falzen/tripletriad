<?php
if(!isset($_SESSION)) {
     session_start();
}

require_once("config.php"); 

if(isset($_REQUEST["action"]) && !empty($_REQUEST["action"])) {
    $action = $_REQUEST["action"];
    switch($action) {

        case "getCurrentUserCards" :
            getCurrentUserCards();
        break;

    }
}


function getCurrentUserCards() {

    $userid = $_SESSION["current_user"]->id;

    $db = getConn();
    $allCardsForCurrentUser = [];
    
    $stmt = $db->prepare("SELECT id, power, name, img_src, stat_top, stat_left, stat_right, stat_bottom, element, description 
        FROM cards 
        WHERE id IN (SELECT card_id FROM users_to_cards WHERE user_id = ?)");
    $stmt->bindParam(1, $userid);
    $stmt->execute();

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $oneCard = (object) [
            'id' => $row['id'],
            'power' => $row['power'],
            'name' => $row['name'],
            'img_src' => $row['img_src'],
            'stat_top' => $row['stat_top'],
            'stat_left' => $row['stat_left'],
            'stat_right' => $row['stat_right'],
            'stat_bottom' => $row['stat_bottom'],
            'element' => $row['element'],
            'description' => $row['description'],
        ];
        array_push($allCardsForCurrentUser, $oneCard);
    }
    $db = null;
    return $allCardsForCurrentUser;
}

function getCurrentUserDecks() {
    $userid = $_SESSION["current_user"]->id;

    $db = getConn();
    $allDecksForCurrentUser = [];
    
    $stmt = $db->prepare("SELECT id, cards_ids, name FROM decks WHERE user_id = ?");
    $stmt->bindParam(1, $userid);
    $stmt->execute(); 

    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $oneDeck = (object) [
            'id' => $row['id'],
            'cards_ids' => $row['cards_ids'],
            'name' => $row['name']
        ];
        array_push($allDecksForCurrentUser, $oneDeck);
    }
    $db = null;
    return $allDecksForCurrentUser;

}
