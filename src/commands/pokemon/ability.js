const {SlashCommandBuilder} = require("discord.js");
const {replaceCharFromString} = require("../../utils/string");
const {createReply} = require("../../utils/reply");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ability')
        .setDescription('Find a Pokemon ability')
        .addStringOption(option => option
            .setName('name')
            .setDescription('Name of an ability')
            .setRequired(true)
        ),

    async execute(interaction) {
        const name = replaceCharFromString(interaction.options.getString('name').toLowerCase(), " ", "-");
        await interaction.deferReply();
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/ability/${name}`);
            const data = await res.json();
            const reply = createReply("", [
                {
                    title: `Ability: ${data.name}`,
                    description: `*${replaceCharFromString(data.effect_entries
                                                               .filter((effect) => {
                                                                   return effect.language.name === "en"
                                                               })[0].effect, "\n", " ")}*`,
                    fields: [
                        {
                            name: `Generation: ${data.generation.name}`,
                            value: "",
                        },
                        {
                            name: `Pokemon with this ability: `,
                            value: `${data.pokemon
                                .slice(0, 4)
                                .map(pokemon => `*- ${pokemon.pokemon.name}*`).join("\n")
                            + (data.pokemon.length > 4 ? "\n..." : "")}`,
                        },
                    ],
                    color: 16741235,
                }
            ]);
            await interaction.followUp(reply);
        } catch (e) {
            await interaction.followUp("No ability found");
        }
    }
}