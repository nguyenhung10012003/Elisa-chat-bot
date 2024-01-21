const {SlashCommandBuilder} = require('discord.js');
const {getRandomAnimeQuote, getRandomAnimeQuoteByCharacter} = require('../../api/quote');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote-anime')
        .setDescription('Random anime quote')
        .addStringOption(option => option
            .setName('character').setDescription('Character name')),

    async execute(interaction) {
        const character = interaction.options.getString('character');
        await interaction.deferReply();
        const quote = character ? await getRandomAnimeQuoteByCharacter(character) : await getRandomAnimeQuote();
        if (quote.content) {
            await interaction.editReply(
                `***"${quote.content}"*** - ${quote.author || 'unknown'} from ${quote.anime || 'unknown'}`
            );
        } else {
            await interaction.editReply(`No quote found for ${character}`);
        }
    }
}