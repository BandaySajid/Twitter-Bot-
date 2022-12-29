const { ETwitterStreamEvent, TweetStream, TwitterApi, ETwitterApiError } = require('twitter-api-v2');
require('dotenv').config();

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  // Following access tokens are not required if you are
  // at part 1 of user-auth process (ask for a request token)
  // or if you want a app-only client (see below)
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const bearer_client = new TwitterApi(process.env.BEARER_TOKEN);

const rwClient = client.readWrite;



async function tweet(tweetCallBack) {
  try {
    // const myTweets = await rwClient.v2.userMentionTimeline(myTwitterId);
    // console.log(myTweets.data);

    const stream = await bearer_client.v2.searchStream();
    
    // Assign yor event handlers
    // Emitted on Tweet

    stream.on(ETwitterStreamEvent.Data, async(tweet)=>{
      tweetCallBack(rwClient, tweet);
    });

    // Emitted only on initial connection success
    stream.on(ETwitterStreamEvent.Connected, () => console.log('Stream is started.'));
    stream.on(ETwitterStreamEvent.ConnectionClosed, () => console.log('Connection has been closed.'));    

    await stream.connect({ autoReconnect: true, autoReconnectRetries: Infinity });

  }
  catch (err) {
    console.log(err.message)
  }
};

module.exports = tweet;
