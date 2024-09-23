const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controller/user.js")

router.route("/signup")
      .get(userController.renderSignupForm)
      .post(wrapAsync(userController.signupUser));

router.route("/login")
      .get(userController.renderLoginForm)
      .post(saveRedirectUrl,
    passport.authenticate('local', { failureRedirect: '/login' ,
         failureFlash : true})
    ,userController.logInUser);

//logout route
router.get("/logout",userController.logoutUser)

module.exports = router;