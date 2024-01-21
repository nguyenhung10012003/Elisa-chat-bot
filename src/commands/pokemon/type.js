const {SlashCommandBuilder} = require("discord.js");
const {createReply} = require("../../utils/reply");
const {replaceCharFromString} = require("../../utils/string");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('type')
        .setDescription('Pokemon type')
        .addStringOption(option => option
            .setName('name')
            .setDescription('Name of a type')
            .setRequired(true)
        ),

    async execute(interaction) {
        const name = replaceCharFromString(interaction.options.getString('name').toLowerCase(), " ", "-");
        await interaction.deferReply();
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/type/${name}`);
            const data = await res.json();
            const reply = createReply("", [
                {
                    title: `Type: ${data.name}`,
                    description: ``,
                    fields: [
                        {
                            name: `Damage taken x2 from: ${data.damage_relations.double_damage_from.map(type => `${type.name}`).join(", ")}`,
                            value: "",
                        },
                        {
                            name: `Damage taken x0.5 from: ${data.damage_relations.half_damage_from.map(type => `${type.name}`).join(", ")}`,
                            value: "",
                        },
                        {
                            name: `No damage taken from: ${data.damage_relations.no_damage_from.map(type => `${type.name}`).join(", ")}`,
                            value: "",
                        },
                        {
                            name: `Damage deal x2 to: ${data.damage_relations.double_damage_to.map(type => `${type.name}`).join(", ")} `,
                            value: "",
                        },
                        {
                            name: `Damage deal x0.5 to: ${data.damage_relations.half_damage_to.map(type => `${type.name}`).join(", ")} `,
                            value: "",
                        },
                        {
                            name: `No damage deal to: ${data.damage_relations.no_damage_to.map(type => `${type.name}`).join(", ")} `,
                            value: "",
                        },
                        {
                            name: `Pokemon with this type: ${data
                                    .pokemon.slice(0, 4).map(pokemon => `${pokemon.pokemon.name}`).join(", ")}`
                                + (data.pokemon.length > 4 ? " ..." : ""),
                            value: "",
                        },
                        {
                            name: `Moves with this type: ${data
                                    .moves.slice(0, 4).map(move => `${move.name}`).join(", ")}`
                                + (data.moves.length > 4 ? " ..." : ""),
                            value: "",
                        }
                    ],
                    color: 7655679,
                }
            ]);
            await interaction.followUp(reply);
        } catch (e) {
            console.log(e);
            await interaction.followUp("No type found !!!");
        }
    }
}