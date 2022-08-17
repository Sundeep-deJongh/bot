const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'userinfo',
    description: 'Geeft informatie over een user.',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    global: false,
    options: [
        {
            name: 'user',
            description: 'De user waar je informatie van wilt zien.',
            type: 6,
            required: true

        }
    ],

    run: async (client, interaction, message, args) => {
        try {

            let user = interaction.options.getUser('user') || client.users.cache.get(args[0]) || message.member;
            let member = interaction.options.getMember('user');

            let rolename;
            let roles = member.roles.cache.sort((a, b) => b.position - a.position).map(role =>  role.toString()).slice(0, -1);
            rolename = roles.join(', ');

                if(member.roles.cache.size < 1) rolename = 'Geen';
                if(!member.roles.cache.size || member.roles.cache.size - 1 < 1) roles = `\`Geen\``

                const flags = user.flags.toArray();
                const badges = [];

            flags.map(flag => {
                switch(flag) {
                    case 'HypeSquadOnlineHouse3':
                        badges.push('<:Balance:1008809257212313600>');
                        break;
                    case 'HypeSquadOnlineHouse2':
                        badges.push('<:brilliance:807212146919866389>');
                        break;
                    case 'HypeSquadOnlineHouse1':
                        badges.push('<:Bravery:1008809294269010040>');
                        break;
                    case 'CertifiedModerator':
                        badges.push('<:Moderator:1008809342109221055>');
                        break;
                    case 'VerifiedBot':
                        badges.push('<:verifiedbot1:1008809383326654504><:verifiedbot2:1008809407427133562>');
                        break;
                    case 'PremiumEarlySupporter':
                        badges.push('<:Badge_EarlySupporter:1008809439509364806>');
                        break;
                    case 'Staff':
                        badges.push('<:Staff_Icon:1008809507285127228>')
                        break;
                    case 'VerifiedDeveloper':
                        badges.push('<:Badge_Developer:1008809473957179545>');
                        break;
                    case 'BugHunterLevel1':
                        badges.push('<:BugHunter:1008809096876675072>');
                        break;
                    case 'BugHunterLevel2':
                        badges.push('<:BugHunter2:1008809118330523839>');
                        break;
                    case 'Partner':
                        badges.push('<:Partner:1008809559869108244>');
                        break;
                    case 'Hypesquad':
                        badges.push('<:HyperSquad:1008809063955566744>');
                        break;
                }
            });

            const highestRole = member.roles.highest;
            var embedColor = member.roles.highest.color;

            switch(highestRole.name) {
                case '@everyone':
                    embedColor = 0x36393F;
                    break;
                    default:
                        embedColor = highestRole.color;
            }


            const embed = new EmbedBuilder()
                .setAuthor({ name: `${user.tag}`, iconURL: `${user.avatarURL()}`})
                .setColor(embedColor)
                .setThumbnail(user.avatarURL())
                .setDescription(` **Userinfo**
                Naam: **${user.tag}**
                ID: \`\`${user.id}\`\`
                Badges: **${badges.join(' ')}**

                **Member Informatie**
                  Account gemaakt op: \`\`${moment(user.createdAt).format('DD-MM-YYYY, HH:mm')}\`\`
                  Server gejoined op: \`\`${moment(member.joinedAt).format('DD-MM-YYYY, HH:mm')}\`\`
                  
                **Rollen**
                ${rolename || 'Geen'}
               `)
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setTimestamp();

            await interaction.reply({ embeds: [embed], ephemeral: true });

        } catch (error) {
            console.error(error);
            return interaction.reply({ content: `Er ging iets fout: \`${error.message}\`!`, ephemeral: true });
        }
    }
}