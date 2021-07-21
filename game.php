<?php
    session_start();
    if (!isset($_SESSION["current_user"]))
    {
    	header("location:login.php");
        exit();
    }

	require_once('php/config.php');
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>items</title>
	<link rel="stylesheet" href="css/style.css">
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
		<div id="gameContainer">
			<div id="p1Hand" class="hand">
				<ul class="hand-container"></ul>
				<div rv-if="frontSettings.isPlayer1Turn" class="my-turn p1">my turn</div>
			</div>

			<div id="battlefieldContainer">
				<ul id="battlefield">
				</ul>
			</div>

			<div id="p2Hand" class="hand nope">
				<ul class="hand-container"></ul>
				<div rv-if="frontSettings.isPlayer2Turn" class="my-turn p2">my turn</div>
			</div>

		</div> <!-- end #gameContainer -->

		<div id="endGameModal" class="modal hiddenPosition">
			<h1><span id="winnerName">Player X</span> wins !</h1>
			<div id="endGameBtns">
				<button id="fuckBtn">FUUUCK!!</button>
				<button id="replayBtn">Rejouer</button>
			</div>
		</div>
	</div> <!-- end #pageContainer -->

</div> <!-- end #mainContainer -->


<!-- jquery -->
<script	src="js/utils/jquery.js"></script>
<script	src="js/utils/rivets.js"></script>

<script	src="js/utils.js"></script>
<script	src="js/allCardsData.js"></script>
<script	src="js/main.js"></script>

</body>
</html>