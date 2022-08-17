const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Controleer de ping van de bot.',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    global: false,

    run: async (client, interaction) => {
        try {

            const embed = new EmbedBuilder()
                .setTitle('Ping Command')
                .setThumbnail(client.user.displayAvatarURL())
                .setColor(0x00AE86)
                .setDescription(`🏓 Pong! | Latency: **${Math.round(client.ws.ping)} ms**`)
                .setFooter({
                    text: `${client.user.username}`,
                    iconURL: client.user.displayAvatarURL()
                    });

          await interaction.reply({ embeds: [embed] , ephemeral: true });

        } catch (error) {
                console.error(error);
                return interaction.reply({ content: `Er ging iets fout: \`${error.message}\`!`, ephemeral: true });
        }
    }
}