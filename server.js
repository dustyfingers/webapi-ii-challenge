const express = require("express");
const db = require("./data/db.js");
const server = express();

server.use(express.json());

// The `db.js` publishes the following methods:
//
// - `find()`: calling find returns a promise that resolves to an array of all the `posts` contained in the database.
// - `findById()`: this method expects an `id` as it's only parameter and returns the post corresponding to the `id` provided or an empty array if no post with that `id` is found.
// - `insert()`: calling insert passing it a `post` object will add it to the database and return an object with the `id` of the inserted post. The object looks like this: `{ id: 123 }`.
// - `update()`: accepts two arguments, the first is the `id` of the post to update and the second is an object with the `changes` to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
// - `remove()`: the remove method accepts an `id` as its first parameter and upon successfully deleting the post from the database it returns the number of records deleted.
// - `findPostComments()`: the findPostComments accepts a `postId` as its first parameter and returns all comments on the post associated with the post id.
// - `findCommentById()`: accepts an `id` and returns the comment associated with that id.
// - `insertComment()`: calling insertComment while passing it a `comment` object will add it to the database and return an object with the `id` of the inserted comment. The object looks like this: `{ id: 123 }`. This method will throw an error if the `post_id` field in the `comment` object does not match a valid post id in the database.
//
// | DELETE | /api/posts/:id          | Removes the post with the specified id and returns the **deleted post object**. You may need to make additional calls to the database in order to satisfy this requirement. |
// | PUT    | /api/posts/:id          | Updates the post with the specified `id` using data from the `request body`. Returns the modified document, **NOT the original**.


// index/'sanity' route
server.get("/", (req, res) => {
  res.status(200).json({ api: "up..." });
});


// posts routes
// fetch all posts route
server.get("/api/posts", async (req, res) => {
  const posts = await db.find();
  res.status(200).json({ api: posts });
});

// create post route
server.post("/api/posts", async (req, res) => {
  db.insert(req.body);
  const posts = await db.find();
  res.status(200).json({ api: posts });
});

// fetch single post route
server.get("/api/posts/:id", async (req, res) => {
  const post = await db.findById(req.params.id);
  res.status(200).json({ api: post });
});

// edit single post route
server.put("/api/posts/:id", (req, res) => {
  res.status(200).json({ api: "PUT TO /api/posts/id" });
});

// delete single post route
server.delete("/api/posts/:id", (req, res) => {
  res.status(200).json({ api: "DELETE TO /api/posts/id" });
});


// comment routes
// get all comments for a single post route
server.get("/api/posts/:id/comments", async (req, res) => {
  const comments = await db.findPostComments(req.params.id);
  res.status(200).json({ api: comments });
});

// create a new comment for a specified post
server.post("/api/posts/:id/comments", async (req, res) => {
  const comment = await db.insertComment(req.body);
  res.status(200).json({ api: comment });
});

module.exports = server;
