const { ApplicationCommandType, EmbedBuilder, ApplicationCommandPermissionType } = require('discord.js');
const moment = require('moment');
const fs = require("fs");
const yaml = require('yaml');

module.exports = {
    name: 'serverinfo',
    description: 'Geeft informatie over de discord server.',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    global: false,

    run: async (client, interaction) => {
        try {

            const configFile = fs.readFileSync('./config.yml', 'utf8');
            const config = yaml.parse(configFile);

            const { guild } = interaction;
            const {} = guild;

            let verificationLevel;
            switch (guild.verificationLevel) {
                case 0:
                    verificationLevel = 'Niet gecontroleerd';
                    break;
                case 1:
                    verificationLevel = 'Laag';
                    break;
                case 2:
                    verificationLevel = 'Gemiddeld';
                    break;
                case 3:
                    verificationLevel = 'Hoog';
                    break;
                case 4:
                    verificationLevel = 'Extreem Hoog';
            }

            const channels = interaction.guild.channels.cache;
            const roles = interaction.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());


            let embed = new EmbedBuilder()
                .setAuthor({ name: guild.name, iconURL: client.user.displayAvatarURL() })
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription(` **Server Informatie**
                Naam: **${guild.name}**
                ID: **${guild.id}**
                Aangemaakt op: \`\`${moment(guild.createdAt).format('DD-MM-YYYY, HH:mm:ss')}\`\`
                Aangemaakt door: ${config.owner}
                Verificatie Level: \`\`${verificationLevel}\`\`
                
                **Server Statistieken**
                Members: \`\`${guild.memberCount}\`\`
                Kanalen: \`\`${guild.channels.cache.size}\`\`
                Rollen: \`\`${roles.length}\`\`
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
