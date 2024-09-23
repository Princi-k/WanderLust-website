const User = require("../models/User.js");

module.exports.renderSignupForm = (req,res) => {
    res.render("user/signup.ejs");
}

module.exports.signupUser = async(req,res) => {
    try { 
     let {username,email,password} = req.body ;
     const newUser = await new User({email,username});
     await User.register(newUser,password);
     req.logIn(newUser,(err) => {
         if(err){
             return next(err);
         }else{
             req.flash("success","Welcome to WanderLust ! ")
             res.redirect("/listings");
         }
     });
    }catch (e){
     req.flash("error",e.message);
     res.redirect("/signup");
    }
 }

module.exports.renderLoginForm = (req,res) => {
    res.render("./user/login.ejs");
}

module.exports.logInUser = async(req,res) => {
    req.flash("success","Welcomeback to WanderLust!");
    let redirectUrl = res.locals.redirectUrl || "/listings" ;
    res.redirect(redirectUrl);
}

module.exports.logoutUser = (req,res,next) => {
    req.logOut((err) => {
           if(err){
             next(err);
           }
           req.flash("success","You logged out!");
           res.redirect("/listings");
    })
 }

