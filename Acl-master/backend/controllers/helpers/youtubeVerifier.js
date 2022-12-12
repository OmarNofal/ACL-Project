const axios = require('axios');

async function isAValidYoutubeVideo(videoURL) {
    try {
        await axios.get('https://youtube.com/oembed?url=' + videoURL)
        return true;
    }
    catch(error) {
        return false;
    }
}

module.exports = isAValidYoutubeVideo;