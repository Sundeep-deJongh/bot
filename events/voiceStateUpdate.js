const { Player } = require('discord-player');
const { EmbedBuilder } = require('discord.js');

module.exports = async (client, oldState, newState) => {
    if(client.user.id === newState.id) {
        if(oldState.channelId && !newState.channelId) {
            const queue = client.player?.getQueue(newState.guild.id)
            if(queue) {
                if(queue.playing) {
                    if(queue.metadata) {

                        const embed = new EmbedBuilder()
                            .setColor(0x00AE86)
                            .setDescription(`Ik heb de voice channel verlaten.`);

                        queue.metadata.send({
                            embeds: [embed].catch(e => { })
                        })
                        client.player?.deleteQueue(queue.metadata.guild.id);
                    }
                }
            }
        }
    }
}