const {SlashCommandBuilder} = require('discord.js');
const {replaceCharFromString} = require('../../utils/string')
const {createReply} = require('../../utils/reply')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pokemon')
        .setDescription('Find a pokemon')
        .addStringOption(option => option
            .setName('name')
            .setDescription('Name of pokemon to find')
            .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.deferReply();
        const name = replaceCharFromString(interaction.options.getString('name').toLowerCase(), " ", "-");
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

            const pokemon = await res.json();
            const {height, weight, sprites, stats, types, abilities} = pokemon;
            const img = sprites.other["official-artwork"].front_default;
            const description = replaceCharFromString((await res2.json()).flavor_text_entries[0].flavor_text, "\n", " ");
            const content = ``;
            const atk = stats[1].base_stat;
            const def = stats[2].base_stat;
            const spa = stats[3].base_stat;
            const spd = stats[4].base_stat;
            const sp = stats[5].base_stat;
            const hp = stats[0].base_stat;
            const type = types.map(type => type.type.name).join(", ");
            const ability = abilities.map(ability => ability.ability.name).join(", ");
            const reply = createReply("", [
                {
                    description: description,
                    fields: [
                        {
                            name: `Name: ${name}`,
                            value: "",
                            inline: true
                        },
                        {
                            name: `Height: ${height}`,
                            value: "",
                            inline: true
                        },
                        {
                            name: `Weight: ${weight}`,
                            value: "",
                            inline: true
                        },
                        {
                            name: `Types: ${type}`,
                            value: ""
                        },
                        {
                            name: `Abilities: ${ability}`,
                            value: ""
                        },
                        {
                            name: "Base status:",
                            value: `**HP:** ${hp} | **ATK:** ${atk} | **DEF:** ${def} | **SPA:** ${spa} | **SPD:** ${spd} | **SP:** ${sp}`
                        }
                    ],
                    title: `Pokemon: ${name}`,
                    color: 2039798,
                    thumbnail: {
                        url: img
                    }
                }
            ]);
            await interaction.followUp(reply);

        } catch (err) {
            console.log(err);
            await interaction.followUp("Pokemon not found !!!");
        }
    }
}