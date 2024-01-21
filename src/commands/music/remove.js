const {SlashCommandBuilder} = require('discord.js');
const {getTrackManager} = require('../../handlers/track/MusicContext')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Remove track frm current play list'),

    async execute(interaction) {
        const trackManager = getTrackManager(interaction.guildId);
        trackManager.setLoop(true);
        await interaction.reply("Loop is on for current playlist");
    }
}