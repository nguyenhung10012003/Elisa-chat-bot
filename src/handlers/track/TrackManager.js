const {
    joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior,
    AudioPlayerStatus, VoiceConnectionStatus, entersState
} = require("@discordjs/voice");
require('dotenv').config();
const ytdl = require('ytdl-core-discord')


class TrackManager {
    constructor() {
        this.queue = [];
        this.loop = false;
        this.current = 0;
        this.volume = 50;
        this.connection = null;
        this.player = null;
    }

    connectVoiceChannel(voiceChannel) {
        this.connection = joinVoiceChannel({
                                               channelId: voiceChannel.id,
                                               guildId: voiceChannel.guild.id,
                                               adapterCreator: voiceChannel.guild.voiceAdapterCreator,
                                               selfMute: false,
                                           });
        this.player = createAudioPlayer({
                                            behaviors: {
                                                noSubscriber: NoSubscriberBehavior.Pause,
                                            },
                                        });

        this.connection.on('stateChange', (oldState, newState) => {
            console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
        });

        this.connection.on(VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
            try {
                await Promise.race([
                                       entersState(this.connection, VoiceConnectionStatus.Signalling, 5_000),
                                       entersState(this.connection, VoiceConnectionStatus.Connecting, 5_000),
                                   ]);
                // Seems to be reconnecting to a new channel - ignore disconnect
            } catch (error) {
                // Seems to be a real disconnect which SHOULDN'T be recovered from
                this.connection.destroy();
            }
        });

        this.player.on('stateChange', (oldState, newState) => {
            console.log(`Audio player transitioned from ${oldState.status} to ${newState.status}`);
        });

        this.player.on('error', error => {
            console.error(error);
            this.playNext();
        });
    }

    destroyVoiceChannel() {
        this.connection.destroy();
    }

    isConnected() {
        return !(!this.connection);
    }

    addToQueue(song) {
        console.log(song)
        this.queue.push(song);
    }

    removeFromQueue(index) {
        if (index <= this.current) this.current--;
        this.queue.splice(index, 1);
    }

    async playNext() {
        this.current++;
        if (this.current >= this.queue.length) {
            this.current = 0;
            if (this.loop) {
                this.player.play(createAudioResource(
                    await ytdl(this.queue[this.current].url, {highWaterMark: 1 << 25, filter: 'audioonly'}))
                );
            } else {
                this.connection.destroy();
            }
        } else {
            this.player.play(createAudioResource(
                await ytdl(this.queue[this.current].url, {highWaterMark: 1 << 25, filter: 'audioonly'}))
            );
        }
    }

    async start() {
        if (this.queue.length === 0) throw "No track found"
        const stream = await ytdl(this.queue[0].url, {highWaterMark: 1 << 25, filter: 'audioonly'});
        const resource = createAudioResource(stream);
        this.player.play(resource);
        this.connection.subscribe(this.player);
        this.player.on(AudioPlayerStatus.Idle, () => {
            this.playNext();
        })
    }

    setLoop(isLoop) {
        this.loop = isLoop;
    }

    pause() {
        this.player.pause();
    }

    unpause() {
        this.player.unpause();
    }

    emptyQueue() {
        this.queue = []
    }

    currentSong() {
        return this.queue[this.current];
    }

    listTrack() {
        return this.queue;
    }

}

module.exports = TrackManager;