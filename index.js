const { Client, GatewayIntentBits, Partials, Collection, EmbedBuilder } = require('discord.js');
const { Player } = require('discord-player')
const chalk = require('chalk');
const fs = require('fs');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ], partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction,
    ]
});

client.commands = new Collection();
client.slashCommands = new Collection();
client.prefix = ['!'];

module.exports = client;

[
    'command',
    'event'
].forEach((handler) => {
        require(`./handlers/${handler}`)(client);
});

client.login(process.env.TOKEN);