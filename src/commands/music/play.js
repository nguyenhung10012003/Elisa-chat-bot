const {SlashCommandBuilder, ChannelType} = require('discord.js');
const {search} = require('../../api/youtube');
const {getTrackManager} = require('../../handlers/track/MusicContext');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play music')
        .addStringOption(option =>
                             option.setName('q')
                                 .setDescription('Link or song name')
                                 .setRequired(true)
        )
        .addChannelOption(option =>
                              option.setName('channel')
                                  .setDescription('Channel to play music')
                                  .addChannelTypes(ChannelType.GuildVoice)
                                  .setRequired(true)
        ),
    async execute(interaction) {
        const q = interaction.options.getString('q');
        const voiceChannel = interaction.options.getChannel('channel');
        await interaction.deferReply();
        try {
            const {url, title} = await search(q);
            if (!voiceChannel) {
                return interaction.followUp('You need to be in a voice channel to play music!');
            }
            const trackManager = getTrackManager(voiceChannel.guildId);
            if (!trackManager.isConnected()) {
                trackManager.connectVoiceChannel(voiceChannel);
                trackManager.addToQueue({url, title});
                trackManager.start();
                await interaction.followUp(`Now playing: ${title}`);
            } else {
                await interaction.followUp(`Another peoples is playing music. Do you want to join with them ?`)
            }
        } catch (error) {
            console.error(error);
            await interaction.followUp('Error during playback, please try again later.');
        }
    },
};
