const router = require('express').Router();
const { User, Post, Comment } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  Post.findAll({
    include: [Comment]
  }).then(data => {
    const blogs = data.map((d) => d.get({plain: true}));
    console.log(blogs);
    res.render('home', {blogs ,
    loggedIn: req.session.loggedIn});
  })
})

router.get("/post/:id", withAuth, async (req, res) => {

  try {
    const dbPostsData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ["user_id", "post_id", "text"],
          include: {
            model: User,
            attributes: ['username'],
          }
        },
      ],
    });
    const Posts = dbPostsData.get({ plain: true });
    console.log(Posts);
    res.render("viewpost", { 
      Posts, 
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/api/users/addpost", async (req, res) => {

  try {
    console.log(req.session.user_id, req.body.textBody, req.body.subject)
    const postData = await Post.create({
      user_id: req.session.user_id,
      post_text: req.body.textBody,
      title: req.body.subject
      // posting_date: req.body.posting_date
    });
 
    res.status(200).json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/Comments/:id", withAuth, async (req, res) => {
 
  try {
    const dbCommentsData = await Comment.findByPk(req.params.id);

    const Comments = dbCommentsData.get({ plain: true });

    res.render("comments", { Comments, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login',);
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup',);
});

router.get('/newpost', (req, res) => {
  res.render('newpost');
});


module.exports = router;