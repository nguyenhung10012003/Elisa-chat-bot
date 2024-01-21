const {Events} = require('discord.js');

module.exports = {
    name: Events.ClientError,
    once: false,
    execute(client, error) {
        console.error(error);
    }
}