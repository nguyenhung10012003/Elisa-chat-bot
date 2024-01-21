const {SlashCommandBuilder} = require("discord.js");
const {createReply} = require("../../utils/reply");
const {replaceCharFromString} = require("../../utils/string");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('move')
        .setDescription('Find a pokemon move')
        .addStringOption(option => option
            .setName('name')
            .setDescription('Name of a move')
            .setRequired(true)
        ),

    async execute(interaction) {
        const name = replaceCharFromString(interaction.options.getString('name').toLowerCase(), " ", "-");
        await interaction.deferReply();
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/move/${name}`);
            const data = await response.json();
            const reply = createReply("", [
                {
                    title: `Move: ${data.name}`,
                    description: `*${replaceCharFromString(data.flavor_text_entries[0].flavor_text, "\n", " ")}*`,
                    fields: [
                        {
                            name: `Power: ${data.power}`,
                            value: "",
                            inline: true
                        },
                        {
                            name: `Accuracy: ${data.accuracy}`,
                            value: "",
                            inline: true
                        },
                        {
                            name: `Effect chance: ${data.effect_chance}`,
                            value: "",
                            inline: true
                        },
                        {
                            name: `Damage class: ${data.damage_class.name}`,
                            value: "",
                        },
                        {
                            name: `Effects: `,
                            value: data.effect_entries.map(entry => `*- ${entry.effect}*`).join("\n")
                        },
                        {
                            name: "Learned by pokemon: ",
                            value: data.learned_by_pokemon
                                    .slice(0, 4)
                                    .map(pokemon => `*- ${pokemon.name}*`).join("\n")
                                + (data.learned_by_pokemon.length > 4 ? "\n..." : "")
                        }
                    ],
                }
            ]);
            await interaction.followUp(reply);
        } catch (error) {
            await interaction.followUp({content: "Move not found"});
        }
    }
}