import express from 'express';
import fileUpload from 'express-fileupload';
import mongoose from "mongoose"

import Post from './Post.js';
import router from './router.js';

const DB_URL = "mongodb+srv://admin:admin@cluster0.ggemf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const PORT = 3002;
const STARTED_MESSAGE = " -- Server run on port: " + PORT;

const app = express();
app.use(express.json());
app.use(express.static("static"));
app.use(fileUpload({}));
app.use("/api", router);
// app.use("/users", usersRouter); // example more routers

// app.post("/", async (request, response) => {
//   try {
//     const { author, title, content, picture, } = request.body;
//     const post = await Post.create({ author, title, content, picture, });
//     console.log(request.body);
//   } catch (err) {
//     response.status(200).json(err);
//   }
// })

async function startApp() {
  try {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true, });
    console.log("MongoDB connected.");
    app.listen(PORT, () => console.log(STARTED_MESSAGE));

  } catch (error) {
    console.log(error);
  }
}

startApp();