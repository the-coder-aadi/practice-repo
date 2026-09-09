import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import usermodel from "../../usermodel.js";
passport.use( new GoogleStrategy(
    {
        clientID:process.env.google_client_id,
        clientSecret:process.env.google_client_secret,
        callbackURL:process.env.google_callback_url
    },

    async(accesstoken, refreshtoken, profile, done)=>{
        try {
            const email = profile.emails[0].value
            let finduser = await usermodel.findOne({email})
            if (!finduser) {
                finduser = await usermodel.create({
                    name:profile.displayName,
                    email:email,
                    googleId:profile.id,
                    provider:"google"
                })
            }
            else{
                if (!finduser.googleId) {
                    finduser.googleId = profile.id
                    finduser.provider = "google"

                    await finduser.save()
                }
            }
            done(null, finduser)
        } catch (error) {
            done(error, null)
        }
    }
))