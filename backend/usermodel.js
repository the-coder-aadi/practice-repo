import mongoose from "mongoose";

const userschema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
       default:null
        },

        googleId:{
            type:String,
            default:null
        },

        provider:{
            type:String,
            enum:["local", "google"],
            default:"local"
        },


        resetToken: {
            type: String,
            default: null
        },

        resetTokenExpiry: {
            type: Date,
            default: null
        },

        imageurl: {
            type: String
        }

        //  option:{
        //     type:String,
        //     enum:["low", "medium", "high"],
        //     required:true
        //  }

    },
    { timestamps: true }
)

const usermodel = mongoose.model("dummydata's", userschema)
export default usermodel