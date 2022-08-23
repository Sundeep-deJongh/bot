module.exports = {

    opt: {
        DJ: {
            commands: ['back', 'clear', 'filter', 'loop', 'pause', 'resume', 'skip', 'stop', 'volume']
        },

        voiceConfig: {
            leaveOnEnd: false,
            autoSelfDeaf: true,

            leaveOnTimer: {
                status: true,
                time: 30000,
            }
        },
        maxVol: 100,
        loopMessage: false,

        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25,
            }
        }
    }
}