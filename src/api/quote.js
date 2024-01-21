const getRandomQuote = () => {
    return fetch('https://api.quotable.io/quotes/random')
        .then(response => response.json())
        .then(data => {
            return {content: data[0].content, author: data[0].author}
        })
        .catch(error => console.log(error));
}

const getQuoteByAuthor = (author) => {
    return fetch(`https://api.quotable.io/quotes?author=${author}`)
        .then(response => response.json())
        .then(data => {
            const randomInt = Math.floor(Math.random() * data.results.length);
            return {content: data.results[randomInt].content, author: data.results[randomInt].author}
        })
        .catch(error => console.log(error));
}

const getRandomAnimeQuote = () => {
    return fetch('https://animechan.xyz/api/random')
        .then(response => response.json())
        .then(data => {
            return {content: data.quote, author: data.character, anime: data.anime}
        })
        .catch(error => console.log(error));
}

const getRandomAnimeQuoteByAnime = (anime) => {
    return fetch(`https://animechan.xyz/api/random/anime?title=${anime}`)
        .then(response => response.json())
        .then(data => {
            return {content: data.quote, author: data.character, anime: data.anime}
        })
        .catch(error => console.log(error));
}

const getRandomAnimeQuoteByCharacter = (character) => {
    return fetch(`https://animechan.xyz/api/random/character?name=${character}`)
        .then(response => response.json())
        .then(data => {
            return {content: data.quote, author: data.character, anime: data.anime}
        })
        .catch(error => console.log(error));
}

module.exports = {
    getRandomQuote,
    getQuoteByAuthor,
    getRandomAnimeQuote,
    getRandomAnimeQuoteByAnime,
    getRandomAnimeQuoteByCharacter
}