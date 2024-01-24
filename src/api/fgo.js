const BASE_URL = "https://api.atlasacademy.io"
const GENDERS = ['male', 'female', 'unknown'];
const ATTRIBUTES = ['human', 'sky', 'earth', 'star', 'beast', 'void'];
const CLASSES = ['saber', 'archer', 'lancer', 'rider', 'caster', 'assassin', 'berserker', 'shielder', 'ruler', 'alterEgo', 'avenger', 'demonGodPillar', 'moonCancer', 'foreigner', 'pretender', 'grandCaster', 'beastII', 'ushiChaosTide', 'beastI', 'beastILost', 'beastIIIR', 'beastIIIL', 'beastIV', 'beastUnknown', 'unknown', 'agarthaPenth', 'cccFinaleEmiyaAlter', 'salemAbby', 'uOlgaMarie', 'uOlgaMarieAlienGod', 'beast', 'beastVI', 'beastVIBoss', 'uOlgaMarieFlare', 'atlasUnmappedClass'];
const getServant = (id, region) => {
    return fetch(`${BASE_URL}/nice/${region.toUpperCase()}/servant/${id}`)
        .then(res => res.json())
        .catch(err => console.log(err))
}

const searchServant = (params, region) => {
    const {name, genders, attributes, rarities, servantClass} = params;
    let url = `${BASE_URL}/nice/${region.toUpperCase()}/servant/search?`;
    if (name) url += `name=${name}&`;
    if (genders) genders.forEach(gender => {
        if (GENDERS.includes(gender))
            url += `gender=${gender}&`;
        else throw `Gender is not valid member. Permitted: ${GENDERS.reduce((acc, curr) => acc + ', ' + curr)}`
    });
    if (attributes) attributes.forEach(attribute => {
        if (ATTRIBUTES.includes(attribute))
            url += `attribute=${attribute}&`;
        else throw `Attribute is not valid member. Permitted: ${ATTRIBUTES.reduce((acc, curr) => acc + ', ' + curr)}`
    });
    if (rarities) rarities.forEach(rarity => {
        if (rarity >= 1 && rarity <= 5)
            url += `rarity=${rarity}&`;
        else throw `Rarity is not valid member. Permitted: 1-5`
    });
    if (servantClass) {
        if (CLASSES.includes(servantClass))
            url += `className=${servantClass}&`;
        else throw `Class is not valid member. Permitted: ${CLASSES.reduce((acc, curr) => acc + ', ' + curr)}`
    }
    url = url.slice(0, -1);
    console.log(url);
    return fetch(url)
        .then(res => res.json())
        .catch(err => console.log(err))
}

module.exports = {
    getServant,
    searchServant
}