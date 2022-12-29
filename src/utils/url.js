const {Configuration, OpenAIApi} = require('openai');
require('dotenv').config();

const configuration = new Configuration({
    organization: "org-faXAyTmzkn6IAFncX2i3ZZRv",
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function getUrl(prompt){
    const response = await openai.createImage({
        prompt,
        n: 1,
        size: "1024x1024",
      });
    return response.data.data[0].url;
};

module.exports = getUrl;