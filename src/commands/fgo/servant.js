const {SlashCommandBuilder} = require("discord.js");
const {searchServant} = require("../../api/fgo");
const {getRandomColorInt} = require("../../utils/color");
const {createReply} = require("../../utils/reply");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("servant")
        .setDescription("Servant info")
        .addStringOption(option => option
            .setName("name")
            .setDescription("Servant name")
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName("server")
            .setDescription("Choose server")
            .addChoices({name: "JP", value: "jp"}, {name: "NA", value: "na"}, {name: "CN", value: "cn"}, {
                name: "KR",
                value: "kr"
            })
            .setRequired(true)
        )
        .addStringOption(option => option
            .setName('genders')
            .setDescription('Genders of servant, each separated by space or `","`')
        )
        .addStringOption(option => option
            .setName('attributes')
            .setDescription('Attribute of servant, each separated by space or `","`')
        )
        .addStringOption(option => option
            .setName('rarities')
            .setDescription('Rarity of servant, each separated by space or `","`')
        )
        .addStringOption(option => option
            .setName('class')
            .setDescription('Class of servant')
        ),
    async execute(interaction) {
        await interaction.deferReply();
        const name = interaction.options.getString("name");
        const server = interaction.options.getString("server");
        const genders = interaction.options.getString("genders")?.split(/, | /);
        const attributes = interaction.options.getString("attributes")?.split(/, | /);
        const rarities = interaction.options.getString("rarities")?.split(/, | /);
        const servantClass = interaction.options.getString("class");
        try {
            const servants = await searchServant({name, genders, servantClass, attributes, rarities}, server);
            if (servants.length === 0) await interaction.editReply('No servant found!');
            else {
                const embeds = servants.slice(0, 5).map(servant => {
                    return {
                        title: servant.name,
                        description: "",
                        color: getRandomColorInt(),
                        fields: [
                            {
                                name: `Class: ${servant.className}`,
                                value: '',
                                inline: true
                            },
                            {
                                name: `Gender: ${servant.gender}`,
                                value: '',
                                inline: true,
                            },
                            {
                                name: `Attribute: ${servant.attribute}`,
                                value: '',
                                inline: true,
                            },
                            {
                                name: `Rarity: ${servant.rarity}`,
                                value: '',
                            },
                            {
                                name: `ATK Base: ${servant.atkBase} | ATK Max: ${servant.atkMax}`,
                                value: '',
                            },
                            {
                                name: `HP Base: ${servant.hpBase} | HP Max: ${servant.hpMax}`,
                                value: '',
                            },
                        ],
                        thumbnail: {
                            url: servant.extraAssets.faces.ascension["1"],
                        },
                        image: {
                            url: servant.extraAssets.charaGraph.ascension["1"],
                        },
                    }
                });
                await interaction.editReply(createReply("", embeds));
            }
        } catch (err) {
            await interaction.editReply({content: err.toString(), ephemeral: true});
        }
    }
}