const {SlashCommandBuilder} = require('discord.js');
const {getTrackManager} = require('../../handlers/track/MusicContext')
const {search} = require("../../api/youtube");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add')
        .setDescription('Add a track to current playlist')
        .addStringOption(option => option
            .setName('q')
            .setDescription('Name or link song')
            .setRequired(true)
        ),
    async execute(interaction) {
        const q = interaction.options.getString('q');
        await interaction.deferReply({ephemeral: true});
        const trackManager = getTrackManager(interaction.guildId);
        const {url, title} = await search(q);
        trackManager.addToQueue({url, title});
        await interaction.editReply(`Added ${title} to current playlist`);
    }
}