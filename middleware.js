const Listing = require("./models/Listing.js");
const Review = require("./models/Review.js");
const {listingSchema} = require("./schema.js");
const {reviewschema} = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");


module.exports.isLoggedIn = (req,res,next) => {
    if (!req.isAuthenticated()) {
      req.session.redirectUrl = req.originalUrl;
       req.flash("error","Please login first !");
       return res.redirect("/login");
      
    }
     next();
};

module.exports.saveRedirectUrl = (req,res,next) => {
   if(req.session.redirectUrl)
 {  res.locals.redirectUrl = req.session.redirectUrl ;

 }next();
}

module.exports.isOwner = async(req,res,next) => {
   let {id} = req.params ;
   let listing = await Listing.findById(id);
   if(!listing.owner._id.equals (res.locals.currUser._id)){
         req.flash("error","You are not listing owner")
         return res.redirect(`/listings/${id}`);
   }
   next();
}

module.exports.validateListing = (req,res,next) => {
   let {error} = listingSchema.validate(req.body);
   if(error){
       let msgErr = error.details.map((el) => el.message).join(",");
       throw new ExpressError(404,msgErr);
   }else{
       next();
   }
}

module.exports.validateReview = (req,res,next)=>{
   let {error} = reviewschema.validate(req.body);
   if(error){
       let msgErr = error.details.map((el) => el.message).join(",");
       throw new ExpressError(404,msgErr);
   }else{
       next();
   }
}

module.exports.isReviewAuthor = async(req,res,next) => {
    let {id,reviewId} = req.params ;
    let review = await Review.findById(reviewId);
    if(!review.author._id.equals (res.locals.currUser._id)){
          req.flash("error","You cannot delete review.")
          return res.redirect(`/listings/${id}`);
    }
    next();
 }