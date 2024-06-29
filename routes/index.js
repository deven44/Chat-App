var express = require('express');
var router = express.Router();
const userModel = require('./users')
const messageModel = require('./message')
const groupModel = require('./group')
var users = require('./users')
var passport = require('passport')  


var localStrategy = require('passport-local')
passport.use(new localStrategy(users.authenticate()))


router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search/:username', async function (req, res, next) {
  const loggedInUser = req.user;
  var regex = new RegExp(`^${req.params.username}`)
  const searcheduser = await userModel.find({username:regex}) 
 res.json(searcheduser);
});
router.post('/creategroup',isloggedIn, async function (req, res, next) {
    const admin = await userModel.findOne({username:req.session.passport.user})
  
   const group=  await groupModel.create({
       admin:admin._id,
       name: req.body.name,
    })
    await admin.joinedGroups.push(admin._id)
    await admin.save()
    res.redirect( '/home' );

});

router.get('/chathistory/:username', async function (req, res, next) {
  const loggedInUser = req.user;
  const chats = await messageModel.find({
       $or:[
            {
              sender:loggedInUser.username,
              receiver:req.params.username
            },
            {sender:req.params.username,
            receiver:loggedInUser.username,
            }
          ]
   
        });
 
  res.json(chats)
});

router.get('/addfriend/:username', async function (req, res, next) {
  const loggedInUser = req.user;
  const frienduser= await userModel.findOne({username:req.params.username})
  if(loggedInUser.friends.indexOf(frienduser._id)===-1){

    loggedInUser.friends.push(frienduser._id);
    frienduser.friends.push(loggedInUser._id);
    await loggedInUser.save();
    await frienduser.save();
    await loggedInUser.populate('friends')
    console.log(loggedInUser); 
    res.json(loggedInUser)
  }
});

router.post('/register', (req, res, next) => {
  var newUser = {
    //user data here
    username: req.body.username,
    email: req.body.email,
    //user data here
  };
  userModel
    .register(newUser, req.body.password)
    .then((result) => {
      passport.authenticate('local')(req, res, () => {
        //destination after user register
        res.send(result)
      });
    })
    .catch((err) => {
      res.send(err);
    });
});


router.get('/login', (req, res, next) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
  }),
  (req, res, next) => { }
);

function isloggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  else res.redirect('/login');
}


router.get('/logout', (req, res, next) => {
  if (req.isAuthenticated())
    req.logout((err) => {
      if (err) res.send(err);
      else res.redirect('/');
    });
  else {
    res.redirect('/');
  }
});

router.get('/home', isloggedIn, async (req, res, next) => {
  const loggedInUser = req.user
  await loggedInUser.populate("friends")
  await loggedInUser.populate("joinedGroups")
  
  

  res.render('home', { loggedInUser })
})




module.exports = router;
