const {SlashCommandBuilder} = require('discord.js');
const {getTrackManager} = require('../../handlers/track/MusicContext')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip current track'),

    async execute(interaction) {
        const trackManager = getTrackManager(interaction.guildId);
        await trackManager.playNext();
        await interaction.reply({content: `Skipped current track`, ephemeral: true});
    }
}