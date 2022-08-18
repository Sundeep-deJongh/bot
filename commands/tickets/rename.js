const { ApplicationCommandType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const client = require("../../index");

module.exports = {
    name: 'rename',
    description: 'Hernoem een ticket.',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    global: false,
    options: [
        {
            name: 'naam',
            description: 'De naam van het ticket.',
            type: 3,
            required: true,
        }
    ],

    run: async (client, interaction) => {
        try {

            let name = interaction.options.getString('naam');
            let topic = interaction.channel.topic;
            let guild = interaction.guild;

            const NoTicket = new EmbedBuilder()
                .setColor(0x00AE86)
                .setDescription(`Je kan dit command alleen gebruiken in een ticket!`);

            if(topic === null || !topic.includes('Ticket')) {
                interaction.reply({
                    embeds : [NoTicket],
                    ephemeral: true,
                })
                return;
            }

            interaction.channel.setName('ticket-' + name);

            const renamedTicket = new EmbedBuilder()
                .setTitle(`Ticket hernoemd!`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(0x00AE86)
                .setDescription(`
                Het ticket is hernoemd!
                
                **Nieuwe ticket naam:**
                ${name}
                
                **Hernoemd door:**
                ${interaction.user}
                `)
                .setFooter({ text: guild.name, iconURL: client.user.displayAvatarURL() })
                .setTimestamp();

            interaction.reply({
                embeds: [renamedTicket]
            });

        } catch (error) {
            console.error(error);
            return interaction.reply({ content: `Er ging iets fout: \`${error.message}\`!`, ephemeral: true });
        }
    }
}