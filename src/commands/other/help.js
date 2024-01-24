const {SlashCommandBuilder} = require("discord.js");
const {getAllCommand} = require("../../utils/command");
const {createReply} = require("../../utils/reply");
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Get help')
        .addStringOption(option => option.setName('command').setDescription('The command you want to get help for').setRequired(false)),
    async execute(interaction) {
        const command = interaction.options.getString('command');
        const commands = getAllCommand();
        if (command) {
            const cmd = commands.find(cmd => cmd.name === command);
            if (cmd) {
                await interaction.reply(createReply(
                    ``,
                    [
                        {
                            title: `/${cmd.name}`,
                            description: `Usage: ${cmd.usage}`,
                            fields: [
                                {
                                    name: `Options: `,
                                    value: cmd.options.map(option => {
                                        return `**${option.name}** - ${option.description}`
                                    }).join('\n')
                                }
                            ]
                        },
                    ]
                ));
            } else {
                await interaction.reply("Command not found");
            }
        } else {
            await interaction.reply("Use `/help <command>` to get help for a specific command.\n\n Visit my website to learn more about me: " + process.env.CHATBOT_WEBSITE);
        }
    }
}