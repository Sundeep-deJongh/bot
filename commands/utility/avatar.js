const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'avatar',
    description: "Bekijk de avatar van een gebruiker.",
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    global: false,
    options: [
        {
            name: 'user',
            description: 'De gebruiker om de avatar van te bekijken.',
            type: 6,
            required: true

        }
    ],

    run: async (client, interaction, message, args) => {
        try {

            let user = interaction.options.getUser('user') || client.users.cache.get(args[0])|| message.member;

            let embed = new EmbedBuilder()
                .setTitle(`${user.username}'s Avatar`)
                .setImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
                .setColor(0x00AE86)
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setTimestamp();

            interaction.reply({ embeds: [embed] });

        } catch (error) {
            console.error(error);
            return interaction.reply({ content: `An Error Occurred: \`${error.message}\`!`, ephemeral: true });
        }
    }
};