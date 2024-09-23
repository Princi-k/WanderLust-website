const mongoose = require("mongoose");
const { authorize } = require("passport");
const Schema = mongoose.Schema;

const reviewschema = new Schema ({
    comments:String,
    rating :{ type:Number,
             min:1,
             max:5,
            
    } , 
    createdAt:
    {type:Date,
    defaults:Date.now()
},

    author : {
        type : Schema.Types.ObjectId,
        ref:"User",
    }
})

module.exports = mongoose.model("Review",reviewschema);
