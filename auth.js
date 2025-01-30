require("dotenv").config()
const passport=require("passport")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const User=require("./models/User")
const GitHubStrategy = require('passport-github2').Strategy;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/google/callback"
  },
  async (accessToken, refreshToken, profile, done)=>{
    try{
    let user=await User.findOne({ googleId: profile.id })
      if(!user){
         user=await User.create({
          googleId:profile.id,
          name:profile.displayName,
          email:profile.emails[0].value,
          photo:profile.photos[0].value

         })
      }
      done(null,user)
    }catch(err){done(err,null)}
    })
  
);
passport.serializeUser((user,done)=>{
  done(null,user.id)
})
passport.deserializeUser(async (id,done)=>{
  try{
    const user=await User.findById(id)
    done(null,user)
  }catch(err){
    done(err,null)
  }
})
const GITHUB_CLIENT_ID=process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET=process.env.GITHUB_CLIENT_SECRET
passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://localhost:8080/auth/github/callback"
},
async (accessToken, refreshToken, profile, done)=> {
  try{const user=await User.findOne({ githubId: profile.id })
  
  if(!user){
    user=await User.create({
      githubId:profile.id,
          name:profile.displayName,
          email:profile.emails[0].value,
          photo:profile.photos[0].value
    })
  }
  done(null,user)}catch(err){
    done(err,null)
  }
  })

);
passport.serializeUser((user,done)=>{
  done(null,user.id)
})
passport.deserializeUser(async (id,done)=>{
  try{
    const user=await User.findById(id)
    done(null,user)
  }catch(err){
    done(err,null)
  }
})