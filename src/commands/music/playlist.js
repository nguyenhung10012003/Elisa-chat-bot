const {SlashCommandBuilder} = require('discord.js');
const {getTrackManager} = require('../../handlers/track/MusicContext')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('playlist')
        .setDescription('List track in current playlist'),

    async execute(interaction) {
        const trackManager = getTrackManager(interaction.guildId);
        const list = trackManager.listTrack();
        if (list.length === 0) {
            await interaction.reply({content: "No track in current playlist", ephemeral: true});
        } else {
            const embed = {
                color: 0x3498db,
                title: '🎶 Current Playlist 🎶',
                fields: [],
            };
            list.forEach((track, index) => {
                embed.fields.push({
                                      name: `${index + 1}. ${track.title}`,
                                      value: `Link: ${track.url}`,
                                      inline: false,
                                  });
            });

            await interaction.reply({embeds: [embed]});
        }
    }
}