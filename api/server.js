// implement your server here
// require your posts router and connect it here
const express = require("express");

const server = express();

server.use(express.json());

const Posts = require("./posts/posts-model");

server.get("/api/posts", (req, res) => {
  Posts.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "error retrieving posts",
      });
    });
});

server.get("/", (req, res) => {
  res.send(`
    <h2>Shelter API</h>
    <p>Welcome to the Shelter API</p>
  `);
});

module.exports = server;
