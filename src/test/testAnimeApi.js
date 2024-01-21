const animeDex = require('../api/anime');

const test1 = async () => {
    const result = await animeDex.searchAnAnime('naruto');
    console.log(result);
}

test1();