const { ApplicationCommandType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');

module.exports = {
    name: 'panel',
    description: 'Maak een ticket panel aan.',
    type: ApplicationCommandType.ChatInput,
    default_permissions: 'administrator',
    cooldown: 3000,
    global: false,
    options: [
        {
            name: 'kanaal',
            description: 'Het kanaal waar de ticket panel in moet komen.',
            type: 7,
            required: true,
        }
    ],

    run: async (client, interaction) => {
        try {

            const channel = interaction.options.getChannel('kanaal');
            const embed = new EmbedBuilder()
                .setTitle('Ticket')
                .setColor(0x00AE86)
                .setThumbnail(client.user.displayAvatarURL())
                .setDescription('Klik op de onderstaande knop om een ticket aan te maken!')
                .setFooter({ text: interaction.guild.name, iconURL: client.user.displayAvatarURL() })
                .setTimestamp();

            const buttons = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('ticket-create')
                        .setLabel('Maak Ticket')
                        .setStyle(ButtonStyle.Danger)
                        .setEmoji('🎫'),
                )

            channel.send({
                embeds: [embed],
                components: [buttons],
            })

            interaction.reply({
                content: `Ticket panel is aamgemaakt in ${channel}`,
                ephemeral: true,
            })



        } catch (error) {
            console.error(error);
            return interaction.reply({ content: `Er ging iets fout: \`${error.message}\`!`, ephemeral: true });
        }
    }
}