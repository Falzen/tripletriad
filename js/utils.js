
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
















/*  debug  */
function printAllCardsDBinsertion() {
	let output = "INSERT INTO `cards` (`id`, `power`, `name`, `img_src`, `stat_top`, `stat_right`, `stat_bottom`, `stat_left`, `element`, `description`) VALUES ";

	for(let i=0; i<allCardsData.length; i++) {
		let card = allCardsData[i];
		output += "(" + card.id + ",";
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
}