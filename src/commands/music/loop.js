const {SlashCommandBuilder} = require('discord.js');
const {getTrackManager} = require('../../handlers/track/MusicContext')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('Loop current playlist')
        .addStringOption(option => option
            .setName('state')
            .setDescription('State of loop')
            .setRequired(true)
            .addChoices({name: 'on', value: 'on'}, {name: 'off', value: 'off'})
        ),

    async execute(interaction) {
        const trackManager = getTrackManager(interaction.guildId);
        const state = interaction.options.getString('state');
        if (state === 'off') {
            trackManager.setLoop(false);
            await interaction.reply({content: "Loop is off for current playlist", ephemeral: true});
        } else {
            trackManager.setLoop(true);
            await interaction.reply({content: "Loop is on for current playlist", ephemeral: true});
        }

    }
}