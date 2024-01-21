const {createReply} = require("../../utils/reply");
const {getAllGroupCommand} = require("../../utils/command");
const {getRandomColorInt} = require("../../utils/color");
const {SlashCommandBuilder} = require("discord.js");
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Get info about Elisa bot'),
    async execute(interaction) {
        const groupCommands = getAllGroupCommand();
        const reply = createReply(
            "Welcome to **Elisa bot**! 👋 🎉 Make  your Discord server more interesting with ease!\n\n" +
            "Should you need any assistance or have questions, feel free and visit my website where you can connect with our helpful community members and get the support you need.\n\n" +
            "Let your creativity shine and make your server stand out with Elisa bot! ✨\n\n" +
            `Learn more about Elisa bot at: ${process.env.CHATBOT_WEBSITE}\n\n`,
            [
                {
                    title: 'Features',
                    description: 'Elisa bot is a multi-purpose bot that can do many things, such as: play music in your Discord server, gaming, ask-gpt, image generator, food and more.',
                    color: getRandomColorInt(),
                    fields: groupCommands.filter(group => group.group !== 'others').map(group => {
                        return {
                            name: group.group,
                            value: group.description,
                        }
                    })
                }
            ]
        )
        await interaction.reply(reply);
    }
};