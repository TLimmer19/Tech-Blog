const { Comment } = require('../models');

const commentSeed = [
    {
        text: "Run. Away. They are learning.",
        post_id: 1
    },
    {
        text: "Are you listening to yourself right now?",
        post_id: 2
    },
    {
       text: "catch me in 2021 when I have 10 lambos and a mansion",
       post_id: 3
    }
]

const seedComment = () => Comment.bulkCreate(commentSeed);

module.exports = seedComment;