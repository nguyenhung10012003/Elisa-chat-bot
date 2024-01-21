const {SlashCommandBuilder} = require('discord.js');
const {textToImage} = require('../../api/openai')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('imagine')
        .setDescription('Create your image with AI')
        .addStringOption(option =>
                             option.setName('prompt')
                                 .setDescription('Prompt to create image')
                                 .setRequired(true)
        ),
    async execute(interaction) {
        const prompt = interaction.options.getString('prompt');
        try {
            await interaction.deferReply();
            const images = await textToImage(prompt);

            if (images) {
                const embeds = images.map((img) => {
                    return {
                        color: 0x0099ff,
                        title: 'AI Generated Image',
                        image: {
                            url: img.url,
                        },
                    };
                })
                await interaction.editReply({
                                                content: `Here is your image:`,
                                                embeds: embeds
                                            });
            }
        } catch (error) {
            console.error('Error generating image:', error);
            await interaction.reply('An error occurred while generating the image.');
        }
    },
};