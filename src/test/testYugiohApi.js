const yugiohDex = require('../api/yugioh');

const test1 = async () => {
    const card = await yugiohDex.getCardByName('Dark Magician');
    console.log(card);
}

const test2 = async () => {
    const cards = await yugiohDex.searchCard({fname: 'Magician', atk: 2500, level: 7});
    console.log(cards);
}

test2();