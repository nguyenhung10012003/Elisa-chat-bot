const {SlashCommandBuilder} = require("discord.js");
const {createReply} = require("../../utils/reply");
const {replaceCharFromString} = require("../../utils/string");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('item')
        .setDescription('Find a Pokemon item')
        .addStringOption(option => option
            .setName('name')
            .setDescription('Name of a item')
            .setRequired(true)
        ),
    async execute(interaction) {
        const name = replaceCharFromString(interaction.options.getString('name').toLowerCase(), " ", "-");
        await interaction.deferReply();
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/item/${name}`);
            const data = await response.json();
            const reply = createReply("", [
                {
                    title: `Item: ${data.name}`,
                    description: `*${replaceCharFromString(data.flavor_text_entries[0].text, "\n", " ")}*`,
                    fields: [
                        {
                            name: `Cost: ${data.cost}`,
                            value: "",
                        },
                        {
                            name: `Effect: `,
                            value: data.effect_entries
                                .map(entry => `*- ${replaceCharFromString(entry.effect, "\n", " ")}*`).join("\n")
                        },
                        {
                            name: `Attributes: `,
                            value: data.attributes.map(attribute => `*- ${attribute.name}*`).join("\n")
                        },
                    ],
                    thumbnail: {
                        url: data.sprites.default
                    },
                    color: 16768371,
                }
            ]);
            await interaction.followUp(reply);
        } catch (e) {
            await interaction.followUp("No item found");
        }
    }
}