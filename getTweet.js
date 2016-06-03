const Twitter = require('twitter');
const twitter = require('./twitter_config');

const client = new Twitter(twitter.configs);

const params = {screen_name: 'kamaalrkhan', count: 1};
client.get('statuses/user_timeline', params, function(error, tweets, response){
  if (!error) {
    console.log(tweets[0].text);
  }
});
