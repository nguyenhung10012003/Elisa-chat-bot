const {removeSpacesAndLowercase} = require("../utils/string");

class ChampionDex {
    constructor() {
        this.BASE_URL = 'https://ddragon.leagueoflegends.com/cdn';
        this.VERSION = '14.1.1';
        this.languages = [
            "en_US",
            "cs_CZ",
            "de_DE",
            "el_GR",
            "en_AU",
            "en_GB",
            "en_PH",
            "en_SG",
            "es_AR",
            "es_ES",
            "es_MX",
            "fr_FR",
            "hu_HU",
            "it_IT",
            "ja_JP",
            "ko_KR",
            "pl_PL",
            "pt_BR",
            "ro_RO",
            "ru_RU",
            "th_TH",
            "tr_TR",
            "vi_VN",
            "zh_CN",
            "zh_MY",
            "zh_TW"
        ];
        this.language = 'en_US';
        this.champions = [
            "Aatrox", "Ahri", "Akali", "Akshan", "Alistar", "Amumu", "Anivia", "Annie", "Aphelios", "Ashe", "AurelionSol", "Azir", "Bard", "Belveth", "Blitzcrank", "Brand", "Braum", "Briar", "Caitlyn", "Camille", "Cassiopeia", "Chogath", "Corki", "Darius", "Diana", "Draven", "DrMundo", "Ekko", "Elise", "Evelynn", "Ezreal", "Fiddlesticks", "Fiora", "Fizz", "Galio", "Gangplank", "Garen", "Gnar", "Gragas", "Graves", "Gwen", "Hecarim", "Heimerdinger", "Hwei", "Illaoi", "Irelia", "Ivern", "Janna", "JarvanIV", "Jax", "Jayce", "Jhin", "Jinx", "Kaisa", "Kalista", "Karma", "Karthus", "Kassadin", "Katarina", "Kayle", "Kayn", "Kennen", "Khazix", "Kindred", "Kled", "KogMaw", "KSante", "Leblanc", "LeeSin", "Leona", "Lillia", "Lissandra", "Lucian", "Lulu", "Lux", "Malphite", "Malzahar", "Maokai", "MasterYi", "Milio", "MissFortune", "MonkeyKing", "Mordekaiser", "Morgana", "Naafiri", "Nami", "Nasus", "Nautilus", "Neeko", "Nidalee", "Nilah", "Nocturne", "Nunu", "Olaf", "Orianna", "Ornn", "Pantheon", "Poppy", "Pyke", "Qiyana", "Quinn", "Rakan", "Rammus", "RekSai", "Rell", "Renata", "Renekton", "Rengar", "Riven", "Rumble", "Ryze", "Samira", "Sejuani", "Senna", "Seraphine", "Sett", "Shaco", "Shen", "Shyvana", "Singed", "Sion", "Sivir", "Skarner", "Sona", "Soraka", "Swain", "Sylas", "Syndra", "TahmKench", "Taliyah", "Talon", "Taric", "Teemo", "Thresh", "Tristana", "Trundle", "Tryndamere", "TwistedFate", "Twitch", "Udyr", "Urgot", "Varus", "Vayne", "Veigar", "Velkoz", "Vex", "Vi", "Viego", "Viktor", "Vladimir", "Volibear", "Warwick", "Xayah", "Xerath", "XinZhao", "Yasuo", "Yone", "Yorick", "Yuumi", "Zac", "Zed", "Zeri", "Ziggs", "Zilean", "Zoe", "Zyra"
        ];
    }

    setLanguage(language) {
        if (this.languages.includes(language)) {
            this.language = language;
        } else {
            throw new Error('Invalid language');
        }
    }

    getAllLanguages() {
        return this.languages;
    }

    getName(name) {
        return this.champions.find(champion => champion.toLowerCase() === removeSpacesAndLowercase(name));
    }

    getChampion(name, language) {
        if (language) {
            this.setLanguage(language);
        }
        return fetch(`${this.BASE_URL}/${this.VERSION}/data/${this.language}/champion/${name}.json`)
            .then(res => res.json())
            .catch(err => console.error(err));
    }

    getChampionSplash(name, skin) {
        return `${this.BASE_URL}/img/champion/splash/${name}_${skin}.jpg`;
    }

    getChampionSquare(name) {
        return `${this.BASE_URL}/${this.VERSION}/img/champion/${name}.png`;
    }
}

module.exports = ChampionDex;