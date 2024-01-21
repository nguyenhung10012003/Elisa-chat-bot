const {SlashCommandBuilder} = require('discord.js');
const {searchAnAnime} = require("../../api/anime");
const {createReply} = require("../../utils/reply");
const {getRandomColorInt} = require("../../utils/color");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('anime')
        .setDescription('Search an anime')
        .addStringOption(option => option
            .setName('name')
            .setDescription('Name of an anime')
            .setRequired(true)
        ),

    async execute(interaction) {
        const name = interaction.options.getString('name');
        await interaction.deferReply();
        const animes = await searchAnAnime(name);
        if (animes.length === 0) {
            await interaction.editReply(`No anime found with name: ${name}`);
        } else {
            const anime = animes[0];
            const reply = createReply("", [
                {
                    title: anime.title,
                    description: anime.background,
                    fields: [
                        {
                            name: `Url: ${anime.url}`,
                            value: '',
                        },
                        {
                            name: `Season: ${anime.season} - anime.year`,
                            value: '',
                        },
                        {
                            name: `Studios: ${anime.studios.map(studio => studio.name).join(', ')}`,
                            value: '',
                        },
                        {
                            name: `Episodes: ${anime.episodes}`,
                            value: ''
                        },
                        {
                            name: `Duration: ${anime.duration}`,
                            value: '',
                        },
                        {
                            name: `Start Date: ${anime.aired.from.slice(0, 10)}`,
                            value: ''
                        },
                        {
                            name: `End Date: ${anime.aired.to.slice(0, 10)}`,
                            value: ''
                        },
                        {
                            name: `Synopsis: `,
                            value: anime.synopsis,
                        },
                    ],
                    image: {
                        url: anime.images.jpg.image_url
                    },
                    color: getRandomColorInt(),
                }
            ]);
            await interaction.followUp(reply);
        }
    }
}