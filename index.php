<?php
	require('php/config.php');
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>items</title>
		<link rel="stylesheet" href="css/login.css">
	</head>
	<body>
		<div id="mainContainer">

			<div id="inputContainer">
				<div class="one-input-container">
					<label for="pseudoInput">pseudo</label><input type="text" id="pseudoInput" />
				</div>
				<div class="one-input-container">
					<label for="mdpInput">mdp</label><input type="text" id="mdpInput" />
				</div>
				<a href="#" onclick="handleSignIn(); return false;">Créer un compte</a>
				<button onclick="handleLogIn()">Se connecter</button>
			</div>
		</div>

	<!-- jquery -->
	<script	src="js/utils/jquery.js"></script>
	<script	src="js/login.js"></script>
	</body>
</html>