const {SlashCommandBuilder} = require('discord.js');
const {chat} = require('../../api/openai')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ask')
        .setDescription('Ask Gpt 3.5')
        .addStringOption(option =>
                             option.setName('question')
                                 .setDescription('Your question go here')
                                 .setRequired(true)
        ),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        try {
            await interaction.deferReply();
            const answers = await chat(question);
            if (answers) {
                await interaction.editReply(`Reply for "${question}": \n` + answers[0].message.content)
            }

        } catch (err) {
            console.error('Error generating answer:', err);
            await interaction.reply('An error occurred while generating answer.');
        }
    },
};