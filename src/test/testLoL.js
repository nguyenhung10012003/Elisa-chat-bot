const ChampionDex = require('../api/lol');
const championDex = new ChampionDex();
const test1 = async () => {
    const champion = await championDex.getChampion('Aatrox');
    console.log(champion);
};

test1();