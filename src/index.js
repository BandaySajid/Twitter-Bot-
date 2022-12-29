const getUrl = require('./utils/url');
const getImage = require('./utils/image');
const tweet = require('./utils/twitter');
const fsPromises = require('fs/promises');

try {
    tweet(async (rwClient, tweet) => {
        if (tweet.data.text.includes('@BandayySajid') || tweet.data.text.includes('gen')) {
            const text = tweet.data.text.split('(')[1].trim();
            const prompt = text.replace(text[text.length - 1], '');
            console.log('user prompt : ' + prompt);
            getUrl(prompt).then((url) => {
                getImage(url, async (image_name) => {
                    const mediaId = await rwClient.v1.uploadMedia(image_name);
                    await rwClient.v2.reply(
                        `Here is your image of ${prompt}`,
                        tweet.data.id,
                        {
                            media: { media_ids: [mediaId] }
                        }
                    ).then(() => {
                        console.log('reply to tweet successful');
                        fsPromises.rm(image_name);
                    }).catch((err) => {
                        console.log(err);
                    });
                });
            });
        }
    });
} catch (error) {
    console.log(error.message);
}