const {SlashCommandBuilder, ChannelType, ButtonBuilder, ActionRowBuilder, ButtonStyle} = require('discord.js');
const {search} = require('../../api/youtube');
const {getTrackManager} = require('../../handlers/track/MusicContext');
const {createReply} = require("../../utils/reply");
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
        await interaction.deferReply({ephemeral: true});
        try {
            const {url, title} = await search(q);
            if (!voiceChannel) {
                return interaction.followUp('You need to choose a voice channel to play music!');
            }
            const trackManager = getTrackManager(voiceChannel.guildId);
            if (!trackManager.isConnected()) {
                trackManager.connectVoiceChannel(voiceChannel);
                trackManager.addToQueue({url, title});
                trackManager.start();
                await interaction.followUp({content: `Now playing: ${title}`, ephemeral: true});
            } else {
                const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId('yes')
                            .setLabel('Yes')
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setCustomId('no')
                            .setLabel('No')
                            .setStyle(ButtonStyle.Danger)
                    );
                const reply = createReply(
                    "Music is playing now, do you want to add this song to queue?",
                    [],
                    [row],
                    true
                );
                const res = await interaction.editReply(reply)

                const filter = i => i.user.id === interaction.user.id;
                try {
                    const collected = await res.awaitMessageComponent({filter, time: 30000});
                    if (collected.customId === 'yes') {
                        trackManager.addToQueue({url, title});
                        await collected.update({content: `Added ${title} to queue`, ephemeral: true, components: []});
                    } else {
                        await collected.update({content: `Action canceled`, ephemeral: true, components: []});
                    }
                } catch (error) {
                    await interaction.editReply({content: `Action canceled`, ephemeral: true, components: []});
                }
            }
        } catch (error) {
            console.error(error);
            await interaction.followUp('Error during playback, please try again later.');
        }
    },
};
