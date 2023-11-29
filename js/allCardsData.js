
//stats :  top right bottom left
var allCardsData = [
	{"id": 1, "power": 10, "src": "img/cards/card (02).png", "name": "Fungar", "attributes": [5, 1, 1, 3], "element": "N/A"}, 
	{"id": 3, "power": 10, "src": "img/cards/card (04).png", "name": "RedBat", "attributes": [6, 1, 1, 2], "element": "N/A"}, 
	{"id": 8, "power": 10, "src": "img/cards/card (09).png", "name": "BloodSoul", "attributes": [2, 1, 6, 1], "element": "N/A"}, 
	{"id": 0, "power": 11, "src": "img/cards/card (01).png", "name": "Geezard", "attributes": [1, 4, 5, 1], "element": "N/A"}, 
	{"id": 4, "power": 11, "src": "img/cards/card (05).png", "name": "Blobra", "attributes": [2, 3, 1, 5], "element": "N/A"}, 
	{"id": 5, "power": 11, "src": "img/cards/card (06).png", "name": "Gayla", "attributes": [2, 1, 4, 4], "element": "Thunder"}, 
	{"id": 6, "power": 11, "src": "img/cards/card (07).png", "name": "Gesper", "attributes": [1, 5, 4, 1], "element": "N/A"}, 
	{"id": 7, "power": 11, "src": "img/cards/card (08).png", "name": "Fastitocalon-F", "attributes": [3, 5, 2, 1], "element": "Earth"}, 
	{"id": 2, "power": 12, "src": "img/cards/card (03).png", "name": "BiteBug", "attributes": [1, 3, 3, 5], "element": "N/A"}, 
	{"id": 11, "power": 12, "src": "img/cards/card (12).png", "name": "Grat", "attributes": [7, 1, 3, 1], "element": "N/A"}, 
	{"id": 9, "power": 13, "src": "img/cards/card (10).png", "name": "Caterchipillar", "attributes": [4, 2, 4, 3], "element": "N/A"}, 
	{"id": 12, "power": 13, "src": "img/cards/card (13).png", "name": "Buel", "attributes": [6, 2, 2, 3], "element": "N/A"}, 
	{"id": 20, "power": 13, "src": "img/cards/card (21).png", "name": "Jelleye", "attributes": [3, 2, 1, 7], "element": "N/A"}, 
	{"id": 14, "power": 14, "src": "img/cards/card (15).png", "name": "GlacialEye", "attributes": [6, 1, 4, 3], "element": "Ice"}, 
	{"id": 17, "power": 14, "src": "img/cards/card (18).png", "name": "Anacondaur", "attributes": [5, 1, 3, 5], "element": "Poison"}, 
	{"id": 18, "power": 14, "src": "img/cards/card (19).png", "name": "Creeps", "attributes": [5, 2, 5, 2], "element": "Thunder"}, 
	{"id": 10, "power": 15, "src": "img/cards/card (11).png", "name": "Cockatrice", "attributes": [6, 1, 2, 6], "element": "Thunder"}, 
	{"id": 13, "power": 15, "src": "img/cards/card (14).png", "name": "Mesmerize", "attributes": [5, 3, 3, 4], "element": "N/A"}, 
	{"id": 15, "power": 15, "src": "img/cards/card (16).png", "name": "Belhelmel", "attributes": [3, 4, 5, 3], "element": "N/A"}, 
	{"id": 16, "power": 15, "src": "img/cards/card (17).png", "name": "Thrustaevis", "attributes": [5, 3, 2, 5], "element": "Wind"}, 
	{"id": 19, "power": 15, "src": "img/cards/card (20).png", "name": "Grendel", "attributes": [4, 4, 5, 2], "element": "Thunder"}, 
	{"id": 21, "power": 15, "src": "img/cards/card (22).png", "name": "GrandMantis", "attributes": [5, 2, 5, 3], "element": "N/A"}, 
	{"id": 23, "power": 16, "src": "img/cards/card (24).png", "name": "Armadodo", "attributes": [6, 3, 1, 6], "element": "Earth"}, 
	{"id": 25, "power": 16, "src": "img/cards/card (26).png", "name": "Fastitcalon", "attributes": [7, 5, 1, 3], "element": "Earth"}, 
	{"id": 26, "power": 16, "src": "img/cards/card (27).png", "name": "SnowLion", "attributes": [7, 1, 5, 3], "element": "Ice"}, 
	{"id": 47, "power": 16, "src": "img/cards/card (48).png", "name": "PuPu", "attributes": [3, 10, 2, 1], "element": "N/A"}, 
	{"id": 22, "power": 17, "src": "img/cards/card (23).png", "name": "Forbidden", "attributes": [6, 6, 3, 2], "element": "N/A"}, 
	{"id": 27, "power": 17, "src": "img/cards/card (28).png", "name": "Ochu", "attributes": [5, 6, 3, 3], "element": "N/A"}, 
	{"id": 28, "power": 17, "src": "img/cards/card (29).png", "name": "SAM08G", "attributes": [5, 6, 2, 4], "element": "Fire"}, 
	{"id": 29, "power": 17, "src": "img/cards/card (30).png", "name": "DeathClaw", "attributes": [4, 4, 7, 2], "element": "Fire"}, 
	{"id": 30, "power": 17, "src": "img/cards/card (31).png", "name": "Cactaur", "attributes": [6, 2, 6, 3], "element": "N/A"}, 
	{"id": 31, "power": 17, "src": "img/cards/card (32).png", "name": "Tonberry", "attributes": [3, 6, 4, 4], "element": "N/A"}, 
	{"id": 32, "power": 17, "src": "img/cards/card (33).png", "name": "AbyssWorm", "attributes": [7, 2, 3, 5], "element": "Earth"}, 
	{"id": 38, "power": 17, "src": "img/cards/card (39).png", "name": "Wendigo", "attributes": [7, 3, 1, 6], "element": "N/A"}, 
	{"id": 24, "power": 18, "src": "img/cards/card (25).png", "name": "TriFace", "attributes": [3, 5, 5, 5], "element": "Poison"}, 
	{"id": 33, "power": 18, "src": "img/cards/card (34).png", "name": "Turtapod", "attributes": [2, 3, 6, 7], "element": "N/A"}, 
	{"id": 36, "power": 18, "src": "img/cards/card (37).png", "name": "Bomb", "attributes": [2, 7, 6, 3], "element": "Fire"}, 
	{"id": 37, "power": 18, "src": "img/cards/card (38).png", "name": "Blitz", "attributes": [1, 6, 4, 7], "element": "Thunder"}, 
	{"id": 41, "power": 18, "src": "img/cards/card (42).png", "name": "BlueDragon", "attributes": [6, 2, 7, 3], "element": "Poison"}, 
	{"id": 35, "power": 19, "src": "img/cards/card (36).png", "name": "T-Rexaur", "attributes": [4, 6, 2, 7], "element": "N/A"}, 
	{"id": 39, "power": 19, "src": "img/cards/card (40).png", "name": "Torama", "attributes": [7, 4, 4, 4], "element": "N/A"}, 
	{"id": 40, "power": 19, "src": "img/cards/card (41).png", "name": "Imp", "attributes": [3, 7, 3, 6], "element": "N/A"}, 
	{"id": 43, "power": 19, "src": "img/cards/card (44).png", "name": "Hexadragon", "attributes": [7, 5, 4, 3], "element": "Fire"}, 
	{"id": 57, "power": 19, "src": "img/cards/card (58).png", "name": "X-ATM092", "attributes": [4, 8, 4, 3], "element": "N/A"}, 
	{"id": 34, "power": 20, "src": "img/cards/card (35).png", "name": "Vysage", "attributes": [6, 5, 4, 5], "element": "N/A"}, 
	{"id": 42, "power": 20, "src": "img/cards/card (43).png", "name": "Adamantiose", "attributes": [4, 5, 5, 6], "element": "Earth"}, 
	{"id": 50, "power": 20, "src": "img/cards/card (51).png", "name": "Malboro", "attributes": [7, 7, 4, 2], "element": "Poison"}, 
	{"id": 51, "power": 20, "src": "img/cards/card (52).png", "name": "RubyDragon", "attributes": [7, 2, 7, 4], "element": "Fire"}, 
	{"id": 59, "power": 20, "src": "img/cards/card (60).png", "name": "Gerogero", "attributes": [1, 8, 8, 3], "element": "Poison"}, 
	{"id": 60, "power": 20, "src": "img/cards/card (61).png", "name": "Iguion", "attributes": [8, 2, 8, 2], "element": "N/A"}, 
	{"id": 45, "power": 21, "src": "img/cards/card (46).png", "name": "Behemoth", "attributes": [3, 6, 5, 7], "element": "N/A"}, 
	{"id": 46, "power": 21, "src": "img/cards/card (47).png", "name": "Chimera", "attributes": [7, 6, 5, 3], "element": "Water"}, 
	{"id": 48, "power": 21, "src": "img/cards/card (49).png", "name": "Elastiod", "attributes": [6, 2, 6, 7], "element": "N/A"}, 
	{"id": 49, "power": 21, "src": "img/cards/card (50).png", "name": "GIM47N", "attributes": [5, 5, 7, 4], "element": "N/A"}, 
	{"id": 52, "power": 21, "src": "img/cards/card (53).png", "name": "Elnoyle", "attributes": [5, 3, 7, 6], "element": "N/A"}, 
	{"id": 53, "power": 21, "src": "img/cards/card (54).png", "name": "TonberryKing", "attributes": [4, 6, 7, 4], "element": "N/A"}, 
	{"id": 54, "power": 21, "src": "img/cards/card (55).png", "name": "Wedge, Biggs", "attributes": [6, 6, 2, 7], "element": "N/A"}, 
	{"id": 63, "power": 21, "src": "img/cards/card (64).png", "name": "Oilboyle", "attributes": [1, 8, 4, 8], "element": "N/A"}, 
	{"id": 65, "power": 21, "src": "img/cards/card (66).png", "name": "Krysta", "attributes": [7, 5, 8, 1], "element": "N/A"}, 
	{"id": 44, "power": 22, "src": "img/cards/card (45).png", "name": "IronGiant", "attributes": [6, 5, 6, 5], "element": "N/A"}, 
	{"id": 55, "power": 22, "src": "img/cards/card (56).png", "name": "Fujin, Raijin", "attributes": [2, 8, 8, 4], "element": "N/A"}, 
	{"id": 56, "power": 22, "src": "img/cards/card (57).png", "name": "Elvoret", "attributes": [7, 8, 3, 4], "element": "Wind"}, 
	{"id": 58, "power": 22, "src": "img/cards/card (59).png", "name": "Grenaldo", "attributes": [7, 2, 8, 5], "element": "N/A"}, 
	{"id": 61, "power": 23, "src": "img/cards/card (62).png", "name": "Abadon", "attributes": [6, 8, 4, 5], "element": "N/A"}, 
	{"id": 62, "power": 23, "src": "img/cards/card (63).png", "name": "Trauma", "attributes": [4, 8, 5, 6], "element": "N/A"}, 
	{"id": 64, "power": 23, "src": "img/cards/card (65).png", "name": "ShumiTribe", "attributes": [6, 5, 8, 4], "element": "N/A"}, 
	{"id": 68, "power": 23, "src": "img/cards/card (69).png", "name": "Tri-Point", "attributes": [8, 5, 2, 8], "element": "Thunder"}, 
	{"id": 75, "power": 23, "src": "img/cards/card (76).png", "name": "Catoblepas", "attributes": [1, 8, 7, 7], "element": "N/A"}, 
	{"id": 80, "power": 23, "src": "img/cards/card (81).png", "name": "MinMog", "attributes": [9, 3, 9, 2], "element": "N/A"}, 
	{"id": 66, "power": 24, "src": "img/cards/card (67).png", "name": "Propagator", "attributes": [8, 4, 4, 8], "element": "N/A"}, 
	{"id": 67, "power": 24, "src": "img/cards/card (68).png", "name": "JumboCactaur", "attributes": [8, 8, 4, 4], "element": "N/A"}, 
	{"id": 70, "power": 24, "src": "img/cards/card (71).png", "name": "MobileType8", "attributes": [8, 6, 7, 3], "element": "N/A"}, 
	{"id": 71, "power": 24, "src": "img/cards/card (72).png", "name": "Sphinxara", "attributes": [8, 3, 5, 8], "element": "N/A"}, 
	{"id": 76, "power": 24, "src": "img/cards/card (77).png", "name": "UltimaWeapon", "attributes": [7, 7, 2, 8], "element": "N/A"}, 
	{"id": 82, "power": 24, "src": "img/cards/card (83).png", "name": "Quezacotl", "attributes": [2, 9, 9, 4], "element": "Thunder"}, 
	{"id": 86, "power": 24, "src": "img/cards/card (87).png", "name": "Sacred", "attributes": [5, 1, 9, 9], "element": "Earth"}, 
	{"id": 97, "power": 24, "src": "img/cards/card (98).png", "name": "Doomtrain", "attributes": [3, 1, 10, 10], "element": "Poison"}, 
	{"id": 69, "power": 25, "src": "img/cards/card (70).png", "name": "Gargantua", "attributes": [5, 6, 6, 8], "element": "N/A"}, 
	{"id": 72, "power": 25, "src": "img/cards/card (73).png", "name": "Tiamat", "attributes": [8, 8, 5, 4], "element": "N/A"}, 
	{"id": 73, "power": 25, "src": "img/cards/card (74).png", "name": "BGH251F2", "attributes": [5, 7, 8, 5], "element": "N/A"}, 
	{"id": 74, "power": 25, "src": "img/cards/card (75).png", "name": "RedGiant", "attributes": [6, 8, 4, 7], "element": "N/A"}, 
	{"id": 77, "power": 25, "src": "img/cards/card (78).png", "name": "ChubbyChocobo", "attributes": [4, 4, 8, 9], "element": "N/A"}, 
	{"id": 78, "power": 25, "src": "img/cards/card (79).png", "name": "Angelo", "attributes": [9, 6, 7, 3], "element": "N/A"}, 
	{"id": 79, "power": 25, "src": "img/cards/card (80).png", "name": "Gilgamesh", "attributes": [3, 7, 9, 6], "element": "N/A"}, 
	{"id": 81, "power": 25, "src": "img/cards/card (82).png", "name": "Chicobo", "attributes": [9, 4, 8, 4], "element": "N/A"}, 
	{"id": 84, "power": 25, "src": "img/cards/card (85).png", "name": "Ifrit", "attributes": [9, 6, 2, 8], "element": "Fire"}, 
	{"id": 85, "power": 25, "src": "img/cards/card (86).png", "name": "Siren", "attributes": [9, 6, 2, 8], "element": "N/A"}, 
	{"id": 87, "power": 25, "src": "img/cards/card (88).png", "name": "Minotaur", "attributes": [9, 9, 2, 5], "element": "Earth"}, 
	{"id": 90, "power": 25, "src": "img/cards/card (91).png", "name": "Leviathan", "attributes": [7, 10, 1, 7], "element": "Water"}, 
	{"id": 92, "power": 25, "src": "img/cards/card (93).png", "name": "Pandemonia", "attributes": [10, 1, 7, 7], "element": "Wind"}, 
	{"id": 94, "power": 25, "src": "img/cards/card (95).png", "name": "Alexander", "attributes": [9, 10, 4, 2], "element": "Holy"}, 
	{"id": 83, "power": 26, "src": "img/cards/card (84).png", "name": "Shiva", "attributes": [6, 7, 4, 9], "element": "Ice"}, 
	{"id": 88, "power": 26, "src": "img/cards/card (89).png", "name": "Carbuncle", "attributes": [8, 4, 10, 4], "element": "N/A"}, 
	{"id": 89, "power": 26, "src": "img/cards/card (90).png", "name": "Diablos", "attributes": [5, 10, 8, 3], "element": "N/A"}, 
	{"id": 91, "power": 26, "src": "img/cards/card (92).png", "name": "Odin", "attributes": [8, 10, 3, 5], "element": "N/A"}, 
	{"id": 95, "power": 26, "src": "img/cards/card (96).png", "name": "Phoenix", "attributes": [7, 2, 7, 10], "element": "Fire"}, 
	{"id": 96, "power": 26, "src": "img/cards/card (97).png", "name": "Bahumut", "attributes": [10, 8, 2, 6], "element": "N/A"}, 
	{"id": 106, "power": 26, "src": "img/cards/card (107).png", "name": "Rinoa", "attributes": [4, 10, 2, 10], "element": "N/A"}, 
	{"id": 107, "power": 26, "src": "img/cards/card (108).png", "name": "Edea", "attributes": [10, 10, 3, 3], "element": "N/A"}, 
	{"id": 93, "power": 27, "src": "img/cards/card (94).png", "name": "Cerberus", "attributes": [7, 4, 6, 10], "element": "N/A"}, 
	{"id": 98, "power": 27, "src": "img/cards/card (99).png", "name": "Eden", "attributes": [4, 4, 9, 10], "element": "N/A"}, 
	{"id": 99, "power": 27, "src": "img/cards/card (100).png", "name": "Ward", "attributes": [10, 7, 2, 8], "element": "N/A"}, 
	{"id": 101, "power": 27, "src": "img/cards/card (102).png", "name": "Laguna", "attributes": [5, 10, 3, 9], "element": "N/A"}, 
	{"id": 103, "power": 27, "src": "img/cards/card (104).png", "name": "Quistis", "attributes": [9, 6, 10, 2], "element": "N/A"}, 
	{"id": 104, "power": 27, "src": "img/cards/card (105).png", "name": "Irvine", "attributes": [2, 6, 9, 10], "element": "N/A"}, 
	{"id": 102, "power": 28, "src": "img/cards/card (103).png", "name": "Selphie", "attributes": [10, 8, 4, 6], "element": "N/A"}, 
	{"id": 100, "power": 29, "src": "img/cards/card (101).png", "name": "Kiros", "attributes": [6, 7, 6, 10], "element": "N/A"}, 
	{"id": 105, "power": 29, "src": "img/cards/card (106).png", "name": "Zell", "attributes": [8, 5, 10, 6], "element": "N/A"}, 
	{"id": 108, "power": 29, "src": "img/cards/card (109).png", "name": "Seifer", "attributes": [6, 9, 10, 4], "element": "N/A"}, 
	{"id": 109, "power": 35, "src": "img/cards/card (110).png", "name": "Squall", "attributes": [10, 10, 9, 6], "element": "N/A"}
];


function compare( a,  b ) {
  if ( a.power < b.power ){
    return -1;
  }
  if ( a.power > b.power ){
    return 1;
  }
  return 0;
}

// allCardsData.sort( compare );

var cardsDataByPowerMap = makeMapByAttrFromList(allCardsData, "power");
/*
qte10to15 :  22
qte16to19 :  22
qte20to22 :  19
qte23to24 :  14
qte25to26 :  22
qte26to27 :  6
qte28to29 :  4
*/


