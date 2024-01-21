const searchAnAnime = (query) => {
    return fetch(`https://api.jikan.moe/v4/anime?q=${query}&page=1&limit=1`)
        .then((res) => res.json())
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(`Error: ${err}`);
        });
};

const searchAManga = (query) => {
    return fetch(`https://api.jikan.moe/v4/manga?q=${query}&page=1&limit=1`)
        .then((res) => res.json())
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(`Error: ${err}`);
        });
};

const searchACharacter = (query) => {
    return fetch(`https://api.jikan.moe/v4/characters?q=${query}&page=1&limit=1`)
        .then((res) => res.json())
        .then((result) => {
            return result.data;
        }).catch((err) => {
            console.log(`Error: ${err}`);
        });
};

module.exports = {
    searchAnAnime,
    searchAManga,
    searchACharacter,
}