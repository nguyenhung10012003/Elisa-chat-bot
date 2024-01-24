const {SlashCommandBuilder} = require('discord.js');
const {getTrackManager} = require('../../handlers/track/MusicContext')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pause current song'),

    async execute(interaction) {
        const trackManager = getTrackManager(interaction.guildId);
        trackManager.pause();
        await interaction.reply({content: 'Paused current song', ephemeral: true})
    }
}