const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"Please Enter Product Name"],
        trim: true
    },
    description:{
        type: String,
        required: [true,"Please Enter Product Description"],
    },
    price:{
        type:Number,
        required:[true,"Please Enter Product Price"],
        maxlength:[8,"Price cannot exceed 8 digits."]
    },
    ratings:{
        type:Number,
        default:0
    },
    images:[
        {public_id:{
            type:String,
            required: true,
        },
        url:{
            type:String,
            required: true,
        },}
    ],
    sizeChart:{
        public_id:{
            type:String,
        },
        url:{
            type:String,
        },
    },
    category:{
        type: String,
        required: [true, "Please Enter Product Category"],
    },
    subCategory:{
        type: String,
    },
    stock:{
        type:Number,
        required: [true,"Please Enter Product Stock"],
        maxlength: [4,"Stock cannot exceed 4 digits"],
        default:1
    },
    numOfReviews:{
        type: Number,
        default: 0,
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name:{
                type:String,
                required: true,
            },
            rating:{
                type: Number,
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    featured: {
        type: Boolean,
        default: false
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Product",productSchema);