const {SlashCommandBuilder} = require('discord.js');
const {getRandomQuote, getQuoteByAuthor} = require('../../api/quote');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Random quote')
        .addStringOption(option => option
            .setName('author').setDescription('Author of the quote')),

    async execute(interaction) {
        const author = interaction.options.getString('author');
        await interaction.deferReply();
        const quote = author ? await getQuoteByAuthor(author) : await getRandomQuote();
        if (quote.content) {
            await interaction.editReply(`***"${quote.content}"*** - ${quote.author || 'unknown'}`);
        } else {
            await interaction.editReply(`No quote found for ${author}`);
        }
    }
}