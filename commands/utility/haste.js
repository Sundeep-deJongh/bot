const { ApplicationCommandType, EmbedBuilder } = require('discord.js');
const client = require("../../index");
const hastebin = require('hastebin-save');

module.exports = {
    name: 'haste',
    description: 'Plaats iets in een hastebin.',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    global: false,
    options: [
        {
            name: 'content',
            description: 'De inhoud van de paste.',
            type: 3,
            required: true,
        }
    ],

    run: async (client, interaction, message, args) => {
        try {

            const content = interaction.options.getString('content');

            hastebin.upload(content, link => {

                const embed = new EmbedBuilder()
                    .setColor(0x00AE86)
                    .setDescription("https://haste.jazzkuh.com/" + `${link}`)

                interaction.reply({ embeds: [embed], ephemeral: true } );
            })


        } catch (error) {
            console.error(error);
            return interaction.reply({ content: `Er ging iets fout: \`${error.message}\`!`, ephemeral: true });
        }
    }
}