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
    res.render('home', hbsObj);
  })
})

// router.get('/', async (req, res) => {
//   Post.findByPk(req.params.id,{
//     include: [Comment]
//   }).then(data => {
//     console.log(data)
//     const hbsObj = {
//       postArr: data
//     }
//     res.render('home', hbsObj);
//   })
// })
// router.post("/api/users/addpost", async (req, res) => {
 
//   try {
//     const postData = await Posts.create({
//       user: req.body.user,
//       text: req.body.text,
//       posting_date: req.body.posting_date
//     });
   
//     res.status(200).json(postData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });
// router.get("/Comments/:id", withAuth, async (req, res) => {
 
//   try {
//     const dbCommentsData = await Comments.findByPk(req.params.id);

//     const Comments = dbCommentsData.get({ plain: true });

//     res.render("comments", { Comments, loggedIn: req.session.loggedIn });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });


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

// router.get('/newpost', (req, res) => {
//   res.render('newpost');
// });


module.exports = router;