const TrackManager = require("./TrackManager");
const trackManagers = new Map();
const getTrackManager = (guildId) => {
    if (!trackManagers.has(guildId)) trackManagers.set(guildId, new TrackManager());
    return trackManagers.get(guildId);
}

const getTrackManagers = () => {
    return trackManagers;
}

const deleteContext = (guildId) => {
    if (trackManagers.has(guildId)) trackManagers.delete(guildId);
}

module.exports = {getTrackManager, getTrackManagers, deleteContext}