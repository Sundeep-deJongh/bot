const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { channels } = require('..');
const client = require('..');

const moment = require('moment');

client.on('interactionCreate', async interaction => {

    if(interaction.customId === 'ticket-create') {
        const guild = interaction.guild;
        const user = interaction.user;

        if(client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic === interaction.user.id)) {

            let AlreadyTicket = new EmbedBuilder()
                .setTitle('Ticket')
                .setDescription('Je hebt al een ticket aangemaakt.')
                .setColor(0x00AE86)
                .setFooter({ text: guild.name, iconURL: client.user.displayAvatarURL() })
                .setTimestamp();

            return interaction.reply({ embeds: [AlreadyTicket], ephemeral: true });
        }

        guild.channels.create({ name: `ticket-${user.username}`, reason: `${user} heeft een ticket gemaakt!` }).then(async (channel) => {

            let everyoneRole = guild.roles.cache.find(r => r.name === '@everyone');
            let ticketRole = guild.roles.cache.find(r => r.id === '1006524966914760816');

            const createdTime = Date.now();
            await channel.setParent('1008821723677872208');
            await channel.setTopic(`Ticket gemaakt op ${moment(createdTime).format('DD-MM-YYYY, HH:mm')}`)

            await channel.permissionOverwrites.edit(user.id, {
                SendMessages: true,
                ViewChannel: true,
            });

            await channel.permissionOverwrites.edit(everyoneRole.id, {
                SendMessages: false,
                ViewChannel: false,
            });

            await channel.permissionOverwrites.edit(ticketRole.id, {
                SendMessages: true,
                ViewChannel: true,
            });

            const TicketCreate = new EmbedBuilder()
                .setTitle('Ticket Aangemaakt')
                .setColor(0x00AE86)
                .setDescription(`Ticket <#${channel.id}> is aangemaakt.`)
                .setFooter({ text: guild.name, iconURL: client.user.displayAvatarURL() })
                .setTimestamp();

            const TicketConfirm = new EmbedBuilder()
                .setTitle(`${user.username}'s Ticket`)
                .setColor(0x00AE86)
                .setDescription(`Bedankt voor het maken van een ticket, ${ticketRole} zal je zo snel mogelijk helpen.`)
                .setFooter({ text: guild.name, iconURL: client.user.displayAvatarURL() })
                .setTimestamp();

            const buttons = new ActionRowBuilder()
                .setComponents(
                      new ButtonBuilder()
                        .setCustomId('ticket-close')
                        .setLabel('Sluiten')
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('🔒'),
                );

            interaction.reply({
                embeds: [TicketCreate],
                ephemeral: true,
            });

            await channel.send({
                embeds: [TicketConfirm],
                components: [buttons],
            })

        });
    }
});