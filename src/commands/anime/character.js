const {SlashCommandBuilder} = require("discord.js");
const {searchACharacter} = require("../../api/anime");
const {createReply} = require("../../utils/reply");
const {getRandomColorInt} = require("../../utils/color");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('character')
        .setDescription('Search a character')
        .addStringOption(option => option
            .setName('name')
            .setDescription('Name of a character')
            .setRequired(true)
        ),
    async execute(interaction) {
        await interaction.deferReply();
        const name = interaction.options.getString('name');
        const characters = await searchACharacter(name);
        if (characters && characters.length === 0) {
            await interaction.editReply(`No character found with name: ${name}`);
        } else {
            const character = characters[0];
            const reply = createReply("", [
                {
                    title: character.name,
                    description: character.about,
                    fields: [
                        {
                            name: `Url: ${character.url}`,
                            value: '',
                        },
                    ],
                    image: {
                        url: character.images.jpg.image_url,
                    },
                    color: getRandomColorInt(),
                }
            ]);
            await interaction.editReply(reply);
        }
    }
}