const { EmbedBuilder, Client } = require('discord.js');
const { Player } = require('discord-player');
const config = require('.././module.js');

const client = [];

const player = client.player;

player.on('trackStart', (track, queue) => {
   if(queue) {
      if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
      if(queue.metadata) {
         queue.metadata.send({ content: `🎵 Speelt nu: **${track.title}** -> Kanaal: **${queue.connection.channel.name}** 🎧` }).catch(e => { });
      }
   }
});

player.on('trackAdd', (track, queue) => {
   if(queue) {
      if(queue.metadata) {
         queue.metadata.send({ content: `Toegevoegd aan de playlist. ✅` }).catch(e => { });
      }
   }
});

player.on('channelEmpty', (queue) => {
   if(queue){
      if(queue.metadata) {
         queue.metadata.send({ content: `Ik ben gedisconnect omdat er er niemand meer in het kanaal zit.` }).catch(e => { });
      }
   }
});

player.on('queueEnd', (queue) => {
   if(client.config.opt.voiceConfig.leaveOnTimer.status === true) {
      if(queue) {
         setTimeout(() => {
            if(queue.connection) {
               if(!queue.playing) {
                  queue.connection.disconnect();
               }
            }
         }, client.config.opt.voiceConfig.leaveOnTimer.time);
      }
   }
});

player.on('error', (queue, error) => {
   if(queue) {
      if(queue.metadata) {
         queue.metadata.send({ content: `Er is een fout opgetreden: ${error}` }).catch(e => { });
      }
   }
});

setTimeout(async () => {
   const db = require('croxydb');
   db.delete('queue');
   db.delete('loop');
}, 2000);