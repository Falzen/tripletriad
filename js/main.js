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
    currentCardLevel: '1',
    isPlayer1Turn: true,
    isPlayer2Turn: false
};

var cardIdCpt = 0;


$(document).ready(function() {
	let output = '';
	for (var i = 0; i < allCardsData.length; i++) {
		output += allCardsData[i].name + " : " + allCardsData[i].attributes.reduce((a, b) => a + b, 0) + "\n";
	}
	init();
});

function updateTurnDisplay() {
    if (gameSettings.isPlayer1Turn) {
        $('#p1Hand .my-turn').show();
        $('#p2Hand .my-turn').hide();
    } else {
        $('#p1Hand .my-turn').hide();
        $('#p2Hand .my-turn').show();
    }
}

function init() {
	prepareBattlefield();
	makeHandsCards();
	bindEvents();
}

function bindEvents() {
    $('.hand:not(.nope) .one-card').click(onCardClick);
    $('.fake-card').click(onFakeCardClick);
    $('#replayBtn').click(restartGame);
    $('#fuckBtn').on('click', function() { makeTauntPopups(10); });
    $('#p2Hand').addClass('nope');
}

function onCardClick(event) {
    //$('#endGameModal').removeClass('hiddenPosition');
    let whosTurnIsIt = gameSettings.isPlayer1Turn ? 'p1' : 'p2';
    if (!$(this).hasClass(whosTurnIsIt)) { return; }
	if ($(this).hasClass('is-selected')) {
		$(this).removeClass('is-selected');
		return;
	}
	selectedCard = event.currentTarget;
	$(this).parent().children('li').removeClass('is-selected').addClass('is-not-selected');
	$(this).addClass('is-selected');
	isCardSelected = true;
}

function onFakeCardClick(event) {
	console.log(event);
    if(!isCardSelected) {
		return;
	}
	handleCardPlay(selectedCard, $(this)[0]);
}

function restartGame() {
    // does NOT create an entry in the browser history
	window.location.replace(window.location.pathname + window.location.search + window.location.hash);
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


function makeHandsCards() {

	let bothHandsStats = makeStarterDeck();
	bothHandsStats = bothHandsStats.concat(makeStarterDeck());
	let p1HandDomOutput = '';
	let p2HandDomOutput = '';
	for (var i = 0; i < bothHandsStats.length; i++) {
		//bothHandsStats.sort(() => (Math.random() > .5) ? 1 : -1);
		let selectedData = bothHandsStats[i]; // /!\ add [0] if method slice() used in drawCardsFromDeck()

		let oneCardData = prepareCardData(selectedData);
		oneCardData.id = i+1;

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

function prepareCardData(data) {
	return {
		id: null,
		name: data.name,
		src: data.src,
		top: data.attributes[0],
		right: data.attributes[1],
		left: data.attributes[2],
		bottom: data.attributes[3]
	};
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
	updateGameTurn();

}

function updateGameTurn() {
    gameSettings.isPlayer1Turn = !gameSettings.isPlayer1Turn;
    gameSettings.isPlayer2Turn = !gameSettings.isPlayer2Turn;
    console.log('gameSettings : ', gameSettings);
    updateTurnDisplay();
}

function handleEndOfGame() {
    let player_p1CardsNb = $('#battlefield .p1').length;
    let player_p2CardsNb = $('#battlefield .p2').length;
    let winnerName = player_p1CardsNb > player_p2CardsNb ? 'Player 1' : 'Player 2';

    $('#winnerName').text(winnerName);
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


function makeRandomDeck() {
	let tempList = [];
	for (var i = 0; i < 5; i++) {
		console.log(allCardsData[i]);
		tempList.push(makeOneCardDom(prepareCardData(allCardsData[i]), 'p1'));
	}
	$('#builtDeck').html(tempList);
}

function addCardToHand(hand, card) {

}