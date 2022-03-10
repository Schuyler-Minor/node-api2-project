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
        message: "The posts information could not be retrieved",
      });
    });
});

server.get("/api/posts/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "The post information could not be retrieved" });
    });
});

module.exports = server;
