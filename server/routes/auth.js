const passport = require('passport')
const express= require('express')
const router = express()


router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get("/login/failed" , (req ,res ) => {
    res.status(401).json({
        error : true ,
        message : 'Login failed'
    })
})

router.get('/login/success' , (req , res) => {
    console.log("SSSSSSSSSSSSSSSSSSSSSSS");
    if(req.user) {
        console.log(req.user);
           res.status(200).json({
                error : false ,
                message : 'Succesfully logged in' ,
                user : req.user
    })
    } else {
        console.log("not authorized");
        res.status(403).json({
        error : true ,
        message : 'Not authorized'
    })
    }
})

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login/failed' }),
  (req, res) => {
    // Access user data from the request object (req.user)
    const user = req.user;
    console.log(user);

    // Redirect or respond with authentication success
    res.redirect('/login/success');
  }
);

router.get('/logout' , (req , res) => {
    req.logOut()
    res.redirect('/login/success')
})

module.exports = router