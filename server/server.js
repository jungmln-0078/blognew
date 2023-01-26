import express from "express";
import cors from "cors";
import database from "./database.js";
import date from "./date.js";
let app = express();
app.listen(5000);
app.use(cors());
app.use(express.json());
let router = express.Router();
let idx = 1;
router.route("/post").get((req, res) => {
  res.send(database);
});
router.route("/post/:id").put((req, res) => {
  let uptIdx = database.findIndex(p => p.id == req.params.id);
  let post = database[uptIdx];
  post.title = req.body.title;
  post.content = req.body.content;
  post.isupdated = true;
  res.send({ id: post.id });
});
router.route("/post/:id").delete((req, res) => {
  let delIdx = database.findIndex(p => p.id == req.params.id);
  database.splice(delIdx, 1);
  res.end();
});
router.route("/post").post((req, res) => {
  let post = {
    id: idx++,
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    createdate: date(new Date()),
    isupdated: false,
  };
  database.push(post);
  res.send({ id: post.id });
});
app.use(router);
