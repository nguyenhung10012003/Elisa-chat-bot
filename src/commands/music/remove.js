const {SlashCommandBuilder} = require('discord.js');
const {getTrackManager} = require('../../handlers/track/MusicContext')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription('Remove track frm current play list')
        .addIntegerOption(option => option
            .setName('index')
            .setDescription('Index of track in playlist')
            .setRequired(true)
        ),

    async execute(interaction) {
        const trackManager = getTrackManager(interaction.guildId);
        const index = interaction.options.getInteger('index');
        if (trackManager.removeFromQueue(index))
            await interaction.reply({content: `Removed track at index ${index}`, ephemeral: true});
        else await interaction.reply({content: `Invalid index`, ephemeral: true});
    }
}