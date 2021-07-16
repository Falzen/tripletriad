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
$(document).ready(function() {
	init();
});

function init() {
	// rivets.bind($('#mainContainer'), {
	// 	settings: settings, 
	// 	player: player, 
	// 	shop: shop,
	// 	locationContainer: currentLocation
	// });

	$(document).on('click', '.hand:not(.nope) .one-card', function(ev) {
		if($(this).hasClass('is-selected')) {
			$(this).removeClass('is-selected');
			return;
		}
		selectedCard = ev.currentTarget;
		console.log(selectedCard);
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

	makeHandsCards();
}

var allCardsInPlay = [];
var allCardsInPlayById = new Map();
function makeHandsCards() {
	let bothHandsStats = generateCardStatsList(10);
	let p1HandDomOutput = '';
	let p2HandDomOutput = '';
	for (var i = 0; i < bothHandsStats.length; i++) {
		bothHandsStats[i].sort(() => (Math.random() > .5) ? 1 : -1);
		let oneCardData = {
			id: i+1,
			top: bothHandsStats[i][0],
			left: bothHandsStats[i][1],
			right: bothHandsStats[i][2],
			bottom: bothHandsStats[i][3]
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
function makeOneCardDom(data, who) {

	let domOutput = `<li class="one-card ${who}" data-cardid="${data.id}">
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
	
	let looser = playedCard[playedDir] < adjacentCard[adjacentDir] ? 'playedCard' :
				adjacentCard[adjacentDir] < playedCard[playedDir] ? 'adjacentCard' : 'equality';

	if(looser == 'equality') {
		return;
	}



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