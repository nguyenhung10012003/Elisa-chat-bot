const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('autoplay')
		.setDescription('Auto play music'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};