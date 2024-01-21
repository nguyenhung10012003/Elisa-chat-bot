const {ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a member')
        .addUserOption(option => option
            .setName('user')
            .setDescription('user to ban')
            .setRequired(true)
        ).addStringOption(option => option
            .setName('reason')
            .setDescription('reason to ban')
            .setRequired(false)
        )
    ,
    async execute(interaction) {
        const target = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';

        const confirm = new ButtonBuilder()
            .setCustomId('confirm')
            .setLabel('Confirm Ban')
            .setStyle(ButtonStyle.Danger);

        const cancel = new ButtonBuilder()
            .setCustomId('cancel')
            .setLabel('Cancel')
            .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder()
            .addComponents(cancel, confirm);

        await interaction.reply({
                                    content: `Are you sure you want to ban ${target} for reason: ${reason}?`,
                                    components: [row],
                                });
    },
};