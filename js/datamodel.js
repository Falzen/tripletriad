
class Character {
    constructor(data) {
        this.name = data.name;
        this.level = data.level;
        this.stats = {
        	hp: {
        		name: 'hp',
        		value: data.stats.hp,
        		root: data.stats.hp,
        		totalBonus: 0,
        	},
        	maxHp: {
        		name: 'maxHp',
        		value: data.stats.maxHp,
        		root: data.stats.maxHp,
        		totalBonus: 0
        	},
			ac: {
				name: 'ac',
				value: data.stats.ac,
				root: data.stats.ac,
				totalBonus: 0
			},
			str: {
				name: 'str',
				value: data.stats.str,
				root: data.stats.str,
				totalBonus: 0
			},
			const: {
				name: 'const',
				value: data.stats.const,
				root: data.stats.const,
				totalBonus: 0
			},
			intel: {
				name: 'intel',
				value: data.stats.intel,
				root: data.stats.intel,
				totalBonus: 0
			},
			dex: {
				name: 'dex',
				value: data.stats.dex,
				root: data.stats.dex,
				totalBonus: 0
			},
			luck: {
				name: 'luck',
				value: data.stats.luck,
				root: data.stats.luck,
				totalBonus: 0
			},
        };
        this.iterableStats = [];
        this.backpack = data.backpack;
        this.money = data.money;
    }
}

class Player extends Character {
    constructor(data) {
        super(data);
        this.skills = data.skills;
    }
}

class BuyAndSell_Methods {
    constructor(data) {
    	this.sellingPrice = data.sellingPrice;
    	this.buyingPrice = data.buyingPrice;
    }
    buy(event, rivetsBinding) {
    	console.log('buy()');
    	let elem = rivetsBinding.eq ? rivetsBinding.eq : rivetsBinding.it;
        console.log(JSON.stringify(elem));
    	let buyingPrice = elem.buyingPrice;
        if(player.money < buyingPrice) {
        	return;
        }
        player.money = parseInt(player.money) - parseInt(buyingPrice);
        var boughtElement = shop.inventory.splice(rivetsBinding.index, 1);
        player.backpack.push(boughtElement[0]);
    }
    sell(event, rivetsBinding) {
    	console.log('sell()');
    	let elem = rivetsBinding.eq ? rivetsBinding.eq : rivetsBinding.it;
    	if(elem.isEquipped) {
    		elem.isEquipped = false;
    		refreshPlayerStats();
    	}

        player.money += elem.sellingPrice;
        var soldElement = player.backpack.splice(rivetsBinding.index, 1);
        shop.inventory.push(soldElement[0]);

    }
}





class Item_Entity extends BuyAndSell_Methods {
    constructor(data) {
        super(data);
    	this.name = data.name;
		this.description = data.description;
		this.isAvailableInFight = data.isAvailableInFight;
		this.iconPath = data.iconPath;
		this.quantity = data.quantity;
		this.doEffect = data.doEffect;
	}
    //  doEffect(event, rivetsBinding) {
    //      this.doEffect(event, rivetsBinding);
    //  }
}


class Equipment_Entity extends BuyAndSell_Methods {
    constructor(data) {
    	console.log('data.bonuses : ', data.bonuses);
        super(data);
    	this.type = data.type;
		this.name = data.name;
		this.iconPath = data.iconPath;
		this.description = data.description;
		this.damageDice = data.damageDice;
		this.bonuses = {
			maxHp : data.bonuses.maxHp,
			hp : data.bonuses.hp,
			ac : data.bonuses.ac,
			str : data.bonuses.str,
			const : data.bonuses.const,
			intel : data.bonuses.intel,
			dex : data.bonuses.dex,
			luck : data.bonuses.luck,
		};
		this.isEquipment = true;
		this.isEquipped = false;
	}
}









