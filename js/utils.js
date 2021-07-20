
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function makeMapByAttrFromList(list, attrName) {
	if(!attrName) {
		attrName = 'name';
	}
	let tempMap = new Map();
	for (var i = 0; i < list.length; i++) {
		let elem = list[i];
		if(tempMap.get(elem[attrName]) != null) {
			let tempList = tempMap.get(elem[attrName]);
			tempList.push(elem);
			tempMap.set(elem[attrName], tempList);
		} else {
			tempMap.set(elem[attrName], [elem]);
		}
	}
	return tempMap;
}







function randombetween(min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}
function makeStarterDeck() {
	let tempList = [];
	for (var i = 0; i < 5; i++) {
		tempList.push(allCardsData[i]);
	}
	return tempList;
}


function makeCardsMapByLevels() {
	let cardsDataByLevelMap = new Map();
	cardsDataByLevelMap.set('1', null);
	cardsDataByLevelMap.set('2', null);
	cardsDataByLevelMap.set('3', null);
	cardsDataByLevelMap.set('4', null);
	cardsDataByLevelMap.set('5', null);
	cardsDataByLevelMap.set('6', null);
	cardsDataByLevelMap.set('7', null);

	for(let [key, value] of cardsDataByPowerMap) {
		if(key < 16) {
			if(cardsDataByLevelMap.get('1') == null) {
				cardsDataByLevelMap.set('1', value);
			} else {
				let tempList = cardsDataByLevelMap.get('1');
				tempList.concat(value);
				cardsDataByLevelMap.set('1', tempList);
			}
		}
		else if(key < 20) {
			if(cardsDataByLevelMap.get('2') == null) {
				cardsDataByLevelMap.set('2', value);
			} else {
				let tempList = cardsDataByLevelMap.get('2');
				tempList.concat(value);
				cardsDataByLevelMap.set('2', tempList);
			}
		}
		else if(key < 23) {
			if(cardsDataByLevelMap.get('3') == null) {
				cardsDataByLevelMap.set('3', value);
			} else {
				let tempList = cardsDataByLevelMap.get('3');
				tempList.concat(value);
				cardsDataByLevelMap.set('3', tempList);
			}
		}
		else if(key < 25) {
			if(cardsDataByLevelMap.get('4') == null) {
				cardsDataByLevelMap.set('4', value);
			} else {
				let tempList = cardsDataByLevelMap.get('4');
				tempList.concat(value);
				cardsDataByLevelMap.set('4', tempList);
			}
		}
		else if(key < 27) {
			if(cardsDataByLevelMap.get('5') == null) {
				cardsDataByLevelMap.set('5', value);
			} else {
				let tempList = cardsDataByLevelMap.get('5');
				tempList = tempList.concat(value);
				cardsDataByLevelMap.set('5', tempList);
			}
		}
		else if(key < 28) {
			if(cardsDataByLevelMap.get('6') == null) {
				cardsDataByLevelMap.set('6', value);
			} else {
				let tempList = cardsDataByLevelMap.get('6');
				tempList.concat(value);
				cardsDataByLevelMap.set('6', tempList);
			}
		}
		else if(key < 30) {
			if(cardsDataByLevelMap.get('7') == null) {
				cardsDataByLevelMap.set('7', value);
			} else {
				let tempList = cardsDataByLevelMap.get('7');
				tempList.concat(value);
				cardsDataByLevelMap.set('7', tempList);
			}
		}
	}
	console.log('fddfs', cardsDataByLevelMap)
	return cardsDataByLevelMap;
}


/*
function generateCardStatsList(nb) {
	let statsList = [];
	for (var i = 0; i < nb; i++) {
		statsList.push(generateCardStats());
	}
	return statsList;
}

var max = 14;
var count = 4;

function generateCardStats() {
	var r1 = randombetween(1, max-3);
	var r2 = randombetween(1, max-2-r1);
	var r3 = randombetween(1, max-1-r1-r2);
	var r4 = max - r1 - r2 - r3;
	var r = [];
	var currsum = 0;
	for(var i=0; i<count-1; i++) {
	 r[i] = randombetween(1, max-(count-i-1)-currsum);
	 currsum += r[i];
	}
	r[count-1] = max - currsum;
	return r;
}
*/















/** 
@str : must be ex: 3d6+6 
*/
function rollsWithMod(str, mod) {
	if(mod == undefined) {
		return rolls(str);
	}
	let r1 = rolls(str);
	let r2 = rolls(str);
	
	let res = r1 > r2 ? mod ? r1 : r2 : mod ? r2 : r1;
	let debugMsg = 'Rolling ' + str + ' with ';
	debugMsg += mod ? 'advantage' : 'disadvantage';
	debugMsg += ' -> ' + res;
	console.log('Rolls with '+mod+' ('+str+') : ' + r1 + ' and ' + r2 + ' => ' + res);
	return res;
}
function rolls(str) { // ex: 3d6+4
	if(str.split('d') != null && str.split('d').length != 2) {
		return null;
	}
	let result = 0;
	let staticBonus = 0;
	let nbDice = parseInt(str.split('d')[0]);// ex: 3
	let mods = str.split('d')[1];// ex: 6+4 (string)
	let typeDice = mods.split('+')[0];// ex: 6
	if(mods.split('+').length == 2) {
		staticBonus = parseInt(mods.split('+')[1]);// ex: 4
	}
	let individualRollsStr = '(';
	for(let i=0; i<nbDice; i++) {
		let individualRoll = getRandomInt(1, typeDice);
		result += individualRoll;
		individualRollsStr += individualRoll + ' + ';
	}
	individualRollsStr.length = individualRollsStr.length - 3;
	individualRollsStr += ')';
	result += staticBonus;

	console.log('Roll ('+str+') : ' + individualRollsStr + ' => ' + result);
	return result;
}

function roll(d) {
	return getRandomInt(1, d);
}