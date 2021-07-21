/*
BACKLOG
- 
- 

DONE
- 
- 

AMELIO
- 
- 

*/

var isCardSelected = false;
var selectedCard;
var allCardsInPlay = []; // filled in makeHandsCards()
var allCardsInPlayById = new Map(); // filled in makeHandsCards()
var gameSettings = {
	currentTurnNb: 1,
	lastTurnNb: 9,
	currentCardLevel: '1'
};
var frontSettings = {
	isPlayer1Turn: true,
	isPlayer2Turn: false
}


$(document).ready(function() {
	let output = '';
	for (var i = 0; i < allCardsData.length; i++) {
		output += allCardsData[i].name + " : " + allCardsData[i].attributes.reduce((a, b) => a + b, 0) + "\n";
	}
	init();
});

function init() {
	rivets.bind($('#mainContainer'), {
		frontSettings: frontSettings
	});


	prepareBattlefield();
	makeHandsCards();

	$(document).on('click', '.hand:not(.nope) .one-card', function(ev) {
		//$('#endGameModal').removeClass('hiddenPosition');
		if($(this).hasClass('is-selected')) {
			$(this).removeClass('is-selected');
			return;
		}
		selectedCard = ev.currentTarget;
		$(this).parent().children('li').removeClass('is-selected').addClass('is-not-selected');
		$(this).addClass('is-selected');
		isCardSelected = true;
	});

	$('.fake-card').on('click', function(ev) {
		if(!isCardSelected) {
			return;
		}
		handleCardPlay(selectedCard, $(this)[0]);
	});

	$('#fuckBtn').on('click', function(ev) {
		makeTauntPopups(10);
	});
	
	$('#replayBtn').on('click', function(ev) {
		// does NOT create an entry in the browser history
		window.location.replace(window.location.pathname + window.location.search + window.location.hash);
	});
}

function prepareBattlefield() {
	let output = `<li id="0_0" class="fake-card"></li>
		<li id="0_1" class="fake-card"></li>
		<li id="0_2" class="fake-card"></li>
		<li id="1_0" class="fake-card"></li>
		<li id="1_1" class="fake-card"></li>
		<li id="1_2" class="fake-card"></li>
		<li id="2_0" class="fake-card"></li>
		<li id="2_1" class="fake-card"></li>
		<li id="2_2" class="fake-card"></li>`;

	$('ul#battlefield').html(output);
}


function makeHandsCards() {	debugger;
 let output = "";

 for(let i=0; i<allCardsData.length; i++) {
 	let card = allCardsData[i];
 	output += "VALUES (" + card.id + ",";
 	output += card.power + ",";
 	output += "'" + card.name + "',";
 	output += "'" + card.src + "',";
 	output += card.attributes[0] + ",";
 	output += card.attributes[1] + ",";
 	output += card.attributes[2] + ",";
 	output += card.attributes[3] + ",";
 	output += "'" + card.element + "',";
 	output += "'" + card.description + "')";

 	if(i != allCardsData.length -1) {
 		output += ", ";
 	}
 }
 console.log(output);
	//let bothHandsStats = drawCardsFromDeck(10, cardsDataByLevelMap.get(gameSettings.currentCardLevel));
	let bothHandsStats = makeStarterDeck();
	bothHandsStats = bothHandsStats.concat(makeStarterDeck());
	let p1HandDomOutput = '';
	let p2HandDomOutput = '';
	for (var i = 0; i < bothHandsStats.length; i++) {
		//bothHandsStats.sort(() => (Math.random() > .5) ? 1 : -1);
		let selectedData = bothHandsStats[i]; // /!\ add [0] if method slice() used in drawCardsFromDeck()

		let oneCardData = {
			id: i+1,
			name: selectedData.name,
			src: selectedData.src,
			top: selectedData.attributes[0],
			right: selectedData.attributes[1],
			left: selectedData.attributes[2],
			bottom: selectedData.attributes[3]
		}
		allCardsInPlay.push(oneCardData);
		if(i%2 ==0) {
			p1HandDomOutput += makeOneCardDom(oneCardData, 'p1');
		} else {
			p2HandDomOutput += makeOneCardDom(oneCardData, 'p2');
		}
	}
	$('#p1Hand .hand-container').html(p1HandDomOutput);
	$('#p2Hand .hand-container').html(p2HandDomOutput);
	allCardsInPlayById = makeMapByAttrFromList(allCardsInPlay, 'id');
}

function drawCardsFromDeck(nb, deck) {
	let tempList = []
	for (var i = 0; i < nb; i++) {
		let randomCardIndex = getRandomInt(0, deck.length-1);
		tempList.push(deck[randomCardIndex]);
		//tempList.push(allCardsData.splice(randomCardIndex, 1));
	}
	return tempList;
}









function makeOneCardDom(data, who) {

	let domOutput = `<li class="one-card ${who}" data-cardid="${data.id}" style="background-image: url('${data.src}'); background-size: contain;">
						<div class="stats-container">
							<div class="top">${data.top}</div>
							<div class="middle">
								<div class="left">${data.left}</div>
								<div class="right">${data.right}</div>
							</div>
							<div class="bottom">${data.bottom}</div>
						</div>
					</li>`;
	return domOutput;
}


function handleCardPlay(selectedCard, emptySpot) {
	// transfer the card to the battlefield
	selectedCard.id = emptySpot.id;
	$(emptySpot).replaceWith(selectedCard);
	$('.hand').toggleClass('nope');

	// get adjacent ids
	let idsToCheck = getAdjacentCoordinates(selectedCard);

	// check for battle
	checkForBattle(selectedCard, idsToCheck);

	if(gameSettings.currentTurnNb == gameSettings.lastTurnNb) {
		handleEndOfGame();
	} else {
		gameSettings.currentTurnNb++;
	}

	// next player's turn
	frontSettings.isPlayer1Turn = !frontSettings.isPlayer1Turn;
	frontSettings.isPlayer2Turn = !frontSettings.isPlayer2Turn;

}

function handleEndOfGame() {
	let player_p1CardsNb = $('#battlefield .p1').length;
	let player_p2CardsNb = $('#battlefield .p2').length;
	if(player_p1CardsNb > player_p2CardsNb) {
		$('#winnerName').text('Player 1');
	} else if(player_p1CardsNb < player_p2CardsNb) {
		$('#winnerName').text('Player 2');
	}
	$('#endGameModal').removeClass('hiddenPosition');
}

function checkForBattle(selectedCard, coords) {
	for (var i = 0; i < coords.length; i++) {
		let oneIdToCheck = coords[i];
		if(!oneIdToCheck) {
			continue;
		}
		let domToCheck = $(oneIdToCheck);
		if($(domToCheck).hasClass('one-card')) {
			let directionFromPlayedCard = 
				i == 0 ? 'top' :
				i == 1 ? 'left' :
				i == 2 ? 'right' : 'bottom';

			doBattle(selectedCard, domToCheck[0], directionFromPlayedCard);
		}
	}
}

function doBattle(selectedCard, enemyCard, playedDir) {
	let playedCard = allCardsInPlayById.get((1*selectedCard.dataset.cardid))[0];
	let adjacentCard = allCardsInPlayById.get((1*enemyCard.dataset.cardid))[0];
	let adjacentDir = 
		playedDir == 'top' ? 'bottom' :
		playedDir == 'bottom' ? 'top' :
		playedDir == 'left' ? 'right' :
		playedDir == 'right' ? 'left' : 'ERROR directions comparison';
	
	let looserCard = 'equality';
	let winnerClass = '';

	// if the played cards looses
	if(playedCard[playedDir] < adjacentCard[adjacentDir]) {
		return;
		// looserCard = selectedCard;
		// winnerClass = $(enemyCard)[0].classList.contains('p1') ? 'p1' : 'p2';
	} 

	// if the played cards wins
	else if(adjacentCard[adjacentDir] < playedCard[playedDir]) {
		looserCard = enemyCard;
		winnerClass = $(selectedCard)[0].classList.contains('p1') ? 'p1' : 'p2';
	}

	if(looserCard == 'equality') {
		return;
	}

    $(looserCard).removeClass('p1').removeClass('p2').addClass(winnerClass);
}

function getAdjacentCoordinates(card) {
	let idsToCheck = [];
	let yOrigin = 1*(card.id.split('_')[0]);
	let xOrigin = 1*(card.id.split('_')[1]);

	// if not on top row, check upper cell
	if(yOrigin != 0) {
		idsToCheck.push('#' + (yOrigin-1) + '_' + xOrigin);
	} else {
		idsToCheck.push(null);
	}
	// if not on the left row, check cell on the left
	if(xOrigin != 0) {
		idsToCheck.push('#' + yOrigin + '_' + (xOrigin-1));
	} else {
		idsToCheck.push(null);
	}
	// if not on the right row, check cell on the right
	if(xOrigin != 2) {
		idsToCheck.push('#' + yOrigin + '_' + (xOrigin+1));
	} else {
		idsToCheck.push(null);
	}
	// if not on bottom row, check lower cell
	if(yOrigin != 2) {
		idsToCheck.push('#' + (yOrigin+1) + '_' + xOrigin);
	} else {
		idsToCheck.push(null);
	}

	return idsToCheck;
}

function makeTauntPopups(nb) {
	let loop = setInterval(function() {
		injectOneTauntPopup(nb);
		nb--;
		if(nb == 0) {
			clearInterval(loop);
		}
	}, 75);
}

function injectOneTauntPopup(identifier) {
	let output = '';
	let top = getRandomInt(0, 75);
	let left = getRandomInt(0, 75);
	output += 	`<div id="${identifier}" class="tauntPopup" style="top: ${top}%; left: ${left}%;">
					<p>Ha ha ha !</p>
				</div>`;
	$('#pageContainer').append(output);

	setTimeout(function() {
		$('#'+identifier).remove();
	}, 750);

}