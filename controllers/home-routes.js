const router = require('express').Router();
const { Post, Comment } = require('../models');
// Import the custom middleware
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  Post.findAll({
    include: [Comment]
  }).then(data => {
    console.log(data)
    const hbsObj = {
      postArr: data
    }
    res.render('home', {hbsObj,
    loggedIn: req.session.loggedIn});
  })
})

router.get("/Posts/:id", withAuth, async (req, res) => {

  try {
    const dbPostsData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: Comments,
          attributes: ["user", "post_date", "text"],
        },
      ],
    });
    const Posts = dbPostsData.get({ plain: true });
    res.render("posts", { 
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
    const dbCommentsData = await Comments.findByPk(req.params.id);

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