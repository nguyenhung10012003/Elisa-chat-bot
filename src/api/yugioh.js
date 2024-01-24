const BASE_URL = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
const FRAME_TYPE = [
    'normal',
    'effect',
    'fusion',
    'ritual',
    'synchro',
    'xyz',
    'link',
    'spell',
    'trap',
    "skill",
    "token",
    "normal-pendulum",
    "effect-pendulum",
    "fusion-pendulum",
    "ritual-pendulum",
    "synchro-pendulum",
    "xyz-pendulum",
    "link-pendulum"
];

const RACE = [
    "Aqua",
    "Beast",
    "Beast-Warrior",
    "Creator-God",
    "Cyberse",
    "Dinosaur",
    "Divine-Beast",
    "Dragon",
    "Fairy",
    "Fiend",
    "Fish",
    "Insect",
    "Machine",
    "Plant",
    "Psychic",
    "Pyro",
    "Reptile",
    "Rock",
    "Sea Serpent",
    "Spellcaster",
    "Thunder",
    "Warrior",
    "Winged Beast",
    "Wyrm",
    "Zombie",
    "Normal",
    "Field",
    "Equip",
    "Continuous",
    "Quick-Play",
    "Ritual",
    "Counter",
];

const getCardByName = async (name) => {
    return await fetch(`${BASE_URL}?name=${name}`).then((res) => res.json().then(res => res.data));
}

const getCardById = async (id) => {
    return await fetch(`${BASE_URL}?id=${id}`).then((res) => res.json());
}

const getBanList = async (banList) => {
    return await fetch(`${BASE_URL}?banlist=${banList}`).then((res) => res.json());
}

const searchCard = async (options) => {
    const {fname, id, level, atk, def, race} = options;
    let url = `${BASE_URL}?`;
    if (fname) url += `fname=${fname}&`;
    if (id) url += `id=${id}&`;
    if (level) url += `level=${level}&`;
    if (atk) url += `atk=${atk}&`;
    if (def) url += `def=${def}&`;
    if (race && RACE.find((r) => {
        return r.toLowerCase() === race.toLowerCase();
    })) {
        url += `race=${race}`
    }

    return await fetch(url).then((res) => res.json().then(res => res.data));
}

module.exports = {
    getCardByName,
    getCardById,
    getBanList,
    searchCard,
}