const { GiveawaysManager } = require('discord-giveaways');
const client = require("../index");
const manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    default: {
        botsCanWin: false,
        embedColor: 0x00AE86,
        embedColorEnd: 0x00AE86,
        reaction: '🎉'
    }
});

client.giveawaysManager = manager;