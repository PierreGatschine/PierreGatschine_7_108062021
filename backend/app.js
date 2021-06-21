const express = require('express');
const helmet = require('helmet');

const app = express();

const usersRoutes = require("./routes/users");
const postsRoutes = require("./routes/post");
const moderationRoutes = require("./routes/moderation")



app.use(helmet()); 
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("api/auth", usersRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/moderation", moderationRoutes);


module.exports = app;