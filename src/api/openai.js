const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
                              apiKey: process.env['OPENAI_API_KEY'], // Specify your API key here
                          });

async function textToImage(prompt) {
    try {
        const res = await openai.images.generate({
                                                     model: "dall-e-2",
                                                     prompt: prompt,
                                                     size: "1024x1024",
                                                     response_format: "url"
                                                 });
        return res.data;
    } catch (err) {
        console.log(`Error generating image with openai: ${err}`);
        return null;
    }
}

async function chat(content) {
    try {
        const completion = await openai.chat.completions.create({
                                                                    messages: [{
                                                                        role: "system",
                                                                        content: content
                                                                    }],
                                                                    model: "gpt-3.5-turbo",
                                                                });
        return completion.choices;
    } catch (err) {
        console.log(`Error generating chat with openai: ${err}`);
    }


}

module.exports = {textToImage, chat}