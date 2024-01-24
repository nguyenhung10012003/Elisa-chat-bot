const fgoDex = require('../api/fgo');

const test1 = async () => {
    const servants = await fgoDex.searchServant({name: 'Kama'}, 'na');
    console.log(servants);
}

const test2 = async () => {
    const servants = await fgoDex.searchServant({name: 'Artoria', rarities: [4, 5]}, 'na');
    console.log(servants);
}

test2();