const {SlashCommandBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get help'),
    async execute(interaction) {
        await interaction.reply('https://elisa-bot.xyz/docs');
    }
}