const {SlashCommandBuilder} = require("discord.js");
const {createReply} = require("../../utils/reply");
const {searchAManga} = require("../../api/anime");
const {hexToInt} = require("../../utils/color");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('manga')
        .setDescription('Search a manga')
        .addStringOption(option => option
            .setName('name')
            .setDescription('Name of a manga')
            .setRequired(true)
        ),
    async execute(interaction) {
        const name = interaction.options.getString('name');
        await interaction.deferReply();
        const mangas = await searchAManga(name);
        if (mangas.length === 0) {
            await interaction.editReply(`No manga found with name: ${name}`);
        } else {
            const manga = mangas[0];
            const reply = createReply("", [
                {
                    title: manga.title,
                    description: manga.background,
                    fields: [
                        {
                            name: `Url: ${manga.url}`,
                            value: '',
                        },
                        {
                            name: `Authors: ${manga.authors.map(studio => studio.name).join(', ')}`,
                            value: '',
                        },
                        {
                            name: `Chapters: ${manga.chapters}`,
                            value: ''
                        },
                        {
                            name: `Volumes: ${manga.volumes}`,
                            value: '',
                        },
                        {
                            name: `Start Date: ${manga.published.from.slice(0, 10)}`,
                            value: ''
                        },
                        {
                            name: `End Date: ${manga.published.to.slice(0, 10)}`,
                            value: ''
                        },
                        {
                            name: `Synopsis: `,
                            value: `${manga.synopsis.slice(0, 1020)} ${manga.synopsis.length > 1024 ? '...' : ''}`,
                        },
                    ],
                    image: {
                        url: manga.images.jpg.image_url,
                    },
                    color: hexToInt('#40ff00'),
                }
            ]);
            await interaction.editReply(reply);
        }
    }
};