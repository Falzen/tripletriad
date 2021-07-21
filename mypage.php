<?php
    session_start();
    if (!isset($_SESSION["current_user"]))
    {
    	header("location:login.php");
        exit();
    }
    echo $_SESSION["current_user"]->id;
	require_once('php/config.php');
	require_once('php/cardManager.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>items</title>
	<link rel="stylesheet" href="css/basicstyle.css">
	<link rel="stylesheet" href="css/mypage.css">
</head>
<body>
<div id="mainContainer">
	<!-- = = = = = = = = = = = = = = = = = =  -->
	<!-- = = = = = = = = = = = = = = = = = =  -->
	<!-- Rivets examples -->
	<!-- <div rv-if="settings.showById.townNavigation">
	</div>

	<table>
		<tr rv-each-it="player.backpack" >
			<td>{ it.name }</td>
			<td rv-if="it.isEquipment">
				<button rv-on-click="it.toggleEquipment">equip</button>
			</td>
		</tr>
	</table> -->
	<!-- = = = = = = = = = = = = = = = = = =  -->
	<!-- = = = = = = = = = = = = = = = = = =  -->

	<div id="pageContainer">
		<div id="pageContent">
			<ul id="menu">
				<li id="myCards_menuItem" class="menu-item" data-sectionid="myCards">Mes cartes</li>
				<li id="myStats_menuItem" class="menu-item" data-sectionid="myStats">Mes stats</li>
			</ul>
			<div id="contentContainer">
				<section id="myCards" class="menu-content">
					<ul id="cardsList">
					<?php
					// TODO make a map, comme ça quand on a la list des Id des cartes par deck, on peut les récupérer facilement
						$currentUserCards = getCurrentUserCards();
		                foreach ($currentUserCards as $key => $value) {
		                    echo '<li class="one-card">' 
		                        .'<div class="img-container">'
		                        	. '<img src="' . $value->img_src . '" />'
		                        	. '<span class="one-stat" id="stat_top">' . $value->stat_top . '</span>'
		                        	. '<span class="one-stat" id="stat_right">' . $value->stat_right . '</span>'
		                        	. '<span class="one-stat" id="stat_bottom">' . $value->stat_bottom . '</span>'
		                        	. '<span class="one-stat" id="stat_left">' . $value->stat_left . '</span>'
	                        	.'</div>' 
		                        . '<p class="card-name">' . $value->name . '</p>'
		                        .
		                    '</li>';
		                }

					?>
				</ul>
					<p>liste des decks</p>

					<?php
						$allDecksForCurrentUser = getCurrentUserDecks();

		                foreach ($allDecksForCurrentUser as $key => $value) {
		                	// TODO quand currentUserCards sera une map, facile d'afficher les decks :)
		                	echo $value->name . ' ' . $value->cards_ids;
		                	$cardsIdInDeck = explode(',', $value->cards_ids);
		                }

					?>
					<ul id="decksList">

					</ul>
				</section>

				<section id="myStats" class="menu-content">
					<p>Victoires : </p>
					<p>Nuls : </p>
					<p>Défaites : </p>
				</section>
			</div>
		</div>

	</div> <!-- end #pageContainer -->

</div> <!-- end #mainContainer -->


<!-- jquery -->
<script	src="js/utils/jquery.js"></script>
<script	src="js/utils/rivets.js"></script>

<script	src="js/utils.js"></script>
<script	src="js/allCardsData.js"></script>
<script	src="js/mypage.js"></script>

</body>
</html>