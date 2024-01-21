const {SlashCommandBuilder} = require('discord.js');
const ChampionDex = require('../../api/lol');
const {createReply} = require("../../utils/reply");
const {hexToInt} = require("../../utils/color");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('champion')
        .setDescription('Search a League of Legends champion')
        .addStringOption(option => option
            .setName('name')
            .setDescription('Name of the champion')
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('language')
            .setDescription('Choose a language')
            .setRequired(false)
        ),

    async execute(interaction) {
        await interaction.deferReply();
        const championDex = new ChampionDex();
        const name = championDex.getName(interaction.options.getString('name'));
        const language = interaction.options.getString('language');
        if (name) {
            try {
                const champion = await championDex.getChampion(name, language);
                if (champion) {
                    const championSplash = championDex.getChampionSplash(name, champion.data[name].skins[0].num);
                    const championSquare = championDex.getChampionSquare(name);
                    const reply = createReply("", [{
                        title: `${champion.data[name].name} - ${champion.data[name].title}`,
                        description: `*${champion.data[name].lore}*`,
                        color: hexToInt('#FF0000'),
                        thumbnail: {
                            url: championSquare
                        },
                        image: {
                            url: championSplash
                        },
                        fields: [
                            {
                                name: 'Tags:',
                                value: champion.data[name].tags.join(', ')
                            }
                        ]
                    }]);
                    await interaction.editReply(reply);
                } else {
                    await interaction.editReply('Champion not found');
                }
            } catch (e) {
                if (e.message === 'Invalid language') {
                    await interaction.editReply('Invalid language. Use /languages to see all available languages');
                } else {
                    await interaction.editReply('An error occurred');
                }
                console.log(e);
            }
        } else {
            await interaction.editReply("Champion not found")
        }
    }
}