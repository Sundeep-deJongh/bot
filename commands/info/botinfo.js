const { ApplicationCommandType, EmbedBuilder, ApplicationCommandPermissionType } = require('discord.js');
const fs = require("fs");
const yaml = require("yaml");
const moment = require('moment');


module.exports = {
    name: 'botinfo',
    description: 'Geeft informatie over de bot.',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    global: false,

    run: async (client, interaction) => {
        try {
            const configFile = fs.readFileSync('./config.yml', 'utf8');
            const config = yaml.parse(configFile);

            let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);

            let embed = new EmbedBuilder()
                .setTitle('Bot Informatie')
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(`
                    Naam: **${client.user.username}**
                    ID: **${client.user.id}**
                    Gemaakt door: **Sundeep#2005**
                    Uptime: \`\`${days} dagen ${hours} uur ${minutes} minuten ${seconds} seconden\`\`
                    Gemaakt op: \`\`${moment(client.user.createdAt).format('DD-MM-YYYY, HH:mm:ss')}\`\`
                    
                    Ram Gebruik: \`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\`
                    CPU Gebruik: \`\`${(process.cpuUsage().user / 1024 / 1024).toFixed(2)} MB\`\`
                    
                    Node.js Versie: \`\`${process.version}\`\`
                    Discord.js Versie: \`\`${require('discord.js').version}\`\`
                    Operating System: \`\`${process.platform}\`\`
                `)
                .setColor(0x00AE86)
                .setFooter({ text: interaction.guild.name, iconURL: client.user.displayAvatarURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed] , ephemeral: true });



        } catch (error) {
            console.error(error);
            return interaction.reply({ content: `Er ging iets fout: \`${error.message}\`!`, ephemeral: true });
        }
    }
}
