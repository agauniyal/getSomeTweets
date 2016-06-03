import { Tweets } from '../imports/api/tweets.js';

// replace with import when I understand it fairly well
const Twitter = require('twitter');
const twitter = require('./twitter_config');

const client = new Twitter(twitter.configs);

let numOfTweets = 10;
let userScreenName = 'kamaalrkhan';

// should be placed somewhere else, but since it is a lone function, I'm writing here only
// updateDB() => updates collection with last [n] tweets of user
function updateDB(collection, tweets, n) {
  if (collection.find().count() === 0) {
    for (let i = 0; i < n; ++i) {
      collection.insert({ text: tweets[i].text });
    }
  }
}

const params = { screen_name: userScreenName, count: numOfTweets };

client.get('statuses/user_timeline', params, Meteor.bindEnvironment(function(error, tweets, response) {
  if (!error) {
    updateDB(Tweets, tweets, numOfTweets);
  } else {
    // maybe do something else with errors
    console.log(error);
  }
}));
