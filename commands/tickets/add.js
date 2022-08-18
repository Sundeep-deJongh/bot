const { ApplicationCommandType, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder} = require('discord.js');
const client = require("../../index");

module.exports = {
    name: 'add',
    description: 'Voeg iemand toe aan een ticket.',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    global: false,
    options: [
        {
            name: 'member',
            description: 'De member die je wil toevoegen aan een ticket.',
            type: 6,
            required: true,
        }
    ],

    run: async (client, interaction) => {
        try {

            let user = interaction.options.getUser('member');
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

            await interaction.channel.permissionOverwrites.edit(user.id, {
                SendMessages: true,
                ViewChannel: true,
            });

            const AddedMember = new EmbedBuilder()
                .setTitle(`Member toegevoegd!`)
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(0x00AE86)
                .setDescription(`
                Er is een member toegevoegd aan de ticket!
                
                **Member:**
                ${user}
                
                **Toegevoegd door:**
                ${interaction.user}
                `)
                .setFooter({ text: guild.name, iconURL: client.user.displayAvatarURL() })
                .setTimestamp();

            interaction.reply({
                embeds : [AddedMember],
                ephemeral: true,
            })

        } catch (error) {
            console.error(error);
            return interaction.reply({ content: `Er ging iets fout: \`${error.message}\`!`, ephemeral: true });
        }
    }
}