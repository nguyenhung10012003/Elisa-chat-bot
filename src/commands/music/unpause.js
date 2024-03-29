const {SlashCommandBuilder} = require('discord.js');
const {getTrackManager} = require('../../handlers/track/MusicContext')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unpause')
        .setDescription('Unpause current song'),

    async execute(interaction) {
        const trackManager = getTrackManager(interaction.guildId);
        trackManager.unpause();
        await interaction.reply({content: 'Unpaused current song', ephemeral: true});
    }
}