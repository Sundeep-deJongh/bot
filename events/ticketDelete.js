const { EmbedBuilder, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require('discord.js');
const client = require('..');

client.on('interactionCreate', async interaction => {

    const guild = interaction.guild;
    const user = interaction.user;

    if(interaction.customId === 'ticket-close') {
        const buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('ticket-delete-confirm')
                    .setLabel('Sluit ticket')
                    .setStyle(ButtonStyle.Danger)
                    .setEmoji('🔒'),
            )

        const TicketDeleted = new EmbedBuilder()
            .setTitle(`Ticket verwijderen`)
            .setColor(0x00AE86)
            .setDescription(`Weet je zeker dat je dit ticket wilt verwijderen?`)
            .setFooter({ text: guild.name, iconURL: client.user.displayAvatarURL() })
            .setTimestamp();


        interaction.reply({
            embeds: [TicketDeleted],
            components: [buttons],
            ephemeral: true,
        })
    }

    if(interaction.customId === 'ticket-delete-confirm') {
        interaction.channel.delete('Ticket verwijderd.');
    }
});