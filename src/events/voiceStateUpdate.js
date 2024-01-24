const {Events} = require('discord.js');
const {getTrackManager} = require("../handlers/track/MusicContext");

module.exports = {
    name: Events.VoiceStateUpdate,
    execute: (oldState, newState) => {
        const trackManager = getTrackManager(oldState.guild.id);
        if (trackManager.channelId === oldState.channelId && oldState.channelId !== newState.channelId) {
            if (oldState.channel.members.size === 1) {
                trackManager.setIdle();
            }
        }
    }
}