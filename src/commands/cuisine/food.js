const {SlashCommandBuilder} = require('discord.js');
const {getTrackManager} = require('../../handlers/track/MusicContext')
const {createReply} = require("../../utils/reply");
const {getRandomColorInt} = require("../../utils/color");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('food')
        .setDescription('Find a disher')
        .addStringOption(option => option
            .setName('dish')
            .setDescription('The dish you want to find')
            .setRequired(true)
        ),

    async execute(interaction) {
        const dish = interaction.options.getString('dish');
        await interaction.deferReply();
        try {
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${dish}`)
                .then(response => response.json())

            if (res.meals) {
                const meal = res.meals[0];
                const reply = createReply("", [
                    {
                        title: meal.strMeal,
                        url: meal.strYoutube,
                        description: meal.strInstructions,
                        fields: [
                            {
                                name: `Origin: ${meal.strArea}`,
                                value: '',
                                inline: true
                            },
                            {
                                name: 'Ingredients: ',
                                value: new Array(20).fill(0).map((_, i) => {
                                    if (meal[`strIngredient${i + 1}`] === null || meal[`strIngredient${i + 1}`].length === 0) return "";
                                    return "- " + meal[`strIngredient${i + 1}`] + " - " + meal[`strMeasure${i + 1}`]
                                }).filter(i => i.length > 0).join('\n'),
                            }
                        ],
                        image: {
                            url: meal.strMealThumb,
                        },
                        color: getRandomColorInt(),
                    },
                ])
                await interaction.editReply(reply);
            } else {
                await interaction.editReply({content: 'No meal found!'});
            }

        } catch (error) {
            console.log(error)
            await interaction.editReply({content: 'There was an error while trying to execute this command!'});
        }
    }
}