const { ApplicationCommandType, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'kick een member van de discord.',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    global: false,
    options: [
        {
            name: 'user',
            description: 'De gebruiker om te kicken.',
            type: 6,
            required: true
        },
        {
            name: 'reden',
            description: 'De reden van de kick.',
            type: 3,
        }
    ],

    run: async (client, interaction) => {
        try {

            const inputMember = interaction.options.getUser('user');
            let reason = interaction.options.getString('reden');

            const member = interaction.guild.members.cache.find(members => (
                members.user.username === inputMember) || (members.user.id === inputMember) || (members.user.tag === inputMember)
            );

            if(!member) return await interaction.editReply({ content: `Geen member gevonden met de naam \`${inputMember}\`!`, ephemeral: true });

            const memberPosition = member.roles.highest.position;
            const AuthorPosition = interaction.member.roles.highest.position;

            if(AuthorPosition < memberPosition) return await interaction.editReply({ content: `Je kan geen member kicken die een hogere rol heeft dan jouw rol!`, ephemeral: true });
            if(!member.kickable) return await interaction.editReply({ content: `Ik kan deze member niet kicken!`, ephemeral: true });
            if(!reason) reason = 'Geen reden opgegeven.';

            const kicked = await member.kick({
                "reden": reason
            });

            const authorUsername = interaction.user.username;
            const memberAvatar = kicked.user.avatarURL();
            const memberUsername = kicked.user.username;

            const kickEmbed = new EmbedBuilder()
                .setColor(0x00AE86)
                .setThumbnail(memberAvatar)
                .setTitle(`${memberUsername} is gekickt!`)
                .setDescription(`${memberUsername} is gekickt door ${authorUsername} met de reden: \`${reason}\``)
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() })
                .setTimestamp();

            await interaction.reply({
                embeds: [kickEmbed]
            })

        } catch (error) {
            console.error(error);
            return interaction.deferReply({ content: `Er ging iets fout: \`${error.message}\`!`, ephemeral: true });
        }
    }
}