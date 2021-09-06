const { Post } = require('../models');

const postSeed = [
    {
        title: "Crazy Squirrel",
        post_text: "Dude, there was this crazy squirrel in my driveway that was knocking on my car window as I was trying to leave for work"
    },
    {
        title: "Aggies, Big Whoop",
        post_text: "What's the deal with the Aggies? It's like a cult obsessed with traditions... Not at all like UT here! Go Longhorns, I love burnt Orange, Austin is the best. Yes, not a cult at all."
    },
    {
        title: "Crypto",
        post_text: "I learned about this thing called crypto today, and apparently it's worth 20 bucks? per one coin? that's kind of dumb, it's all digital how does it have value? Not going anywhere I tell you. -written in 2012"
    }
]

const seedPost = () => Post.bulkCreate(postSeed);

module.exports = seedPost;