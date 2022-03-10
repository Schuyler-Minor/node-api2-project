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

server.post("/api/posts", (req, res) => {
  const body = req.body;
  if (!body.title || !body.contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
    return;
  } else {
    Posts.insert(body)
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((err) => {
        res.status(500).json({
          message: "There was an error while saving the post to the database",
        });
      });
  }
});

server.put("/api/posts/:id", (req, res) => {
  const post = req.body;
  Posts.update(req.params.id, post)
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        if (!body.title || !body.contents) {
          res.status(400).json({
            message: "Please provide title and contents for the post",
          });
        }
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "The post information could not be modified" });
    });
});

module.exports = server;
