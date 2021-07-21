


$(document).ready(function() {

});

function emptyLoginFields() {
	$('#pseudoInput').val('');
	$('#mdpInput').val('');
}

function handleSignIn() {
	let inputs = getInputValues();
	if(!inputs.pseudoInput || !inputs.mdpInput) {
		alert('saisie incohérente');
		return;
	}
	doSignIn(inputs.pseudoInput, inputs.mdpInput);	
}
function doSignIn(pseudo, mdp) {

	$.ajax({
		url : 'php/userManager.php', 
		type : 'POST',
		data: {
			"action": 'doSignin',
			"pseudo": pseudo,
			"mdp": mdp
		},
		success: function(resultat, status){
			let currentUser = JSON.parse(resultat);
			if(currentUser != null) {
				let currentUser = JSON.parse(resultat);
				window.location.href = 'game.php';

			} else {
				alert('incorrect');
				emptyLoginFields();
			}
		},
		error : function(resultat, statut, erreur){
			console.log('doSignIn ERROR');
			console.log('resultat : ', resultat);
			console.log('status : ', status);
			console.log("error");
		}
	});
}

function handleLogIn() {
	let inputs = getInputValues();
	if(!inputs.pseudoInput || !inputs.mdpInput) {
		alert('saisie incohérente');
		return;
	}
	doLogin(inputs.pseudoInput, inputs.mdpInput);	
}

function doLogin(pseudo, mdp) {

	$.ajax({
		url : 'php/userManager.php', 
		type : 'POST',
		data: {
			"action": 'doLogin',
			"pseudo": pseudo,
			"mdp": mdp
		},
		success: function(resultat, status){
			let currentUser = JSON.parse(resultat);
			if(currentUser != null) {
				let currentUser = JSON.parse(resultat);
				window.location.href = 'mypage.php';

			} else {
				alert('incorrect');
				emptyLoginFields();
			}
		},
		error : function(resultat, statut, erreur){
			console.log('doLogin ERROR');
			console.log('resultat : ', resultat);
			console.log('status : ', status);
			console.log("error");
		}
	});
}

function getInputValues() {
	return {
		pseudoInput: $('#pseudoInput').val(),
		mdpInput: $('#mdpInput').val()
	};
}