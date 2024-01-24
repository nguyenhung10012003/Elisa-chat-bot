const {MessageEmbed, SlashCommandBuilder} = require('discord.js');
const yugiohDex = require('../../api/yugioh');
const {getRandomColorInt} = require("../../utils/color");


module.exports = {
    data: new SlashCommandBuilder()
        .setName('card')
        .setDescription('Search for a Yu-Gi-Oh! card')
        .addStringOption((option) => {
            return option.setName('name')
                .setDescription('Name of the card')
                .setRequired(true);
        }),
    async execute(interaction) {
        await interaction.deferReply();
        const cardName = interaction.options.getString('name');
        const cards = await yugiohDex.getCardByName(cardName);
        if (cards.length === 0 || !cards) {
            await interaction.editReply(`No card found with the name ${cardName}`);
        } else {
            const embeds = cards.slice(0, 4).map((card) => {
                return {
                    title: card.name,
                    description: card.desc,
                    color: getRandomColorInt(),
                    image: {
                        url: card.card_images[0].image_url,
                    },
                    url: card.ygoprodeck_url,
                    footer: {
                        text: card.id,
                    }
                }
            });
            await interaction.editReply({embeds});
        }
    }
}