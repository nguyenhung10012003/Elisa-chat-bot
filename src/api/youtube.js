const Youtube = require('@googleapis/youtube');
require('dotenv').config();
const youtube = Youtube.youtube({
                                    version: 'v3',
                                    auth: process.env.GOOGLE_API_KEY
                                })

const search = async (key) => {
    const result = await youtube.search
        .list({q: key, part: ['snippet'], type: ['video']});
    return {
        title: result.data.items[0].snippet.title,
        url: `https://www.youtube.com/watch?v=${result.data.items[0].id.videoId}`,
    };
}

module.exports = {search}