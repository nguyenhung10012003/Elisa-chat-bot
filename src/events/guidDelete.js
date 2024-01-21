const {Events} = require('discord.js');
const {deleteContext} = require('../handlers/track/MusicContext')

module.exports = {
    name: Events.GuildDelete,
    execute: (client) => {
        deleteContext(client.guild.id)
    }
}