const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const http=require("http")
const {Server}=require("socket.io")
const router = require("./routes/productRoute");
const passport = require("passport");
const session = require("express-session");
const User = require("./models/User"); // User modelini import et
require("./auth"); // Passport konfiqurasiyası

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;
const app = express();

// Session konfiqurasiya
app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
app.use(express.json());
app.use("/api/products", router);
const server=http.createServer(app)
const io=new Server(server,{
  cors:{
    origin:"http://localhost:5173", 
    methods:["Get","Post"]
  }
})
io.on("connection",(socket)=>{
  console.log(`yeniIstifadeci Qosuldi ${socket.id}`)
  socket.on("send_message",(data)=>{
    console.log("mesaj Alindi: ",data)
    io.emit("receive_message",data)
  })
  socket.on("disconnect",()=>{
    console.log(`istifadeci ayrldi: ${socket.id}`)
  })
})

mongoose.connect(DB_URL).then(() => {
 
  console.log("MongoDB bağlantısı uğurludur!");
});

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.get("/auth/google", passport.authenticate("google", { scope: ["email", "profile"] }));
app.get("/auth/github", passport.authenticate("github", { scope: ["email", "profile"] }));

app.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/home",
    failureRedirect: "/auth/failure",
  })
);
app.get(
  "/github/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/home",
    failureRedirect: "/auth/failure",
  })
);
app.get("http://localhost:5173/home",(req,res)=>{
  res.send(`<a href="/"> ${req.user.name}</a>`)
})
app.get("/", (req, res) => {
  res.send('<a href="/auth/github">Github ilə Giriş</a>');
});

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Google ilə Giriş</a>');
});
app.get("/protected", isLoggedIn, (req, res) => {
  res.send(`Salamun Aleykum ${req.user.name}! Email: ${req.user.email}`);
});

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

app.get("/auth/failure", (req, res) => {
  res.send("Giriş uğursuz oldu!");
});
server.listen(PORT,()=>{
  console.log(`Server is going to http://localhost:${PORT}`)
})