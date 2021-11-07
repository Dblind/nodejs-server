import express, { json, response } from "express";
import fs from 'fs';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const appTest = express();
appTest.use(express.json());

// appTest.use(function(request, response, next) {
//   console.log("Middleware 1");
//   next();
// });
// appTest.use(function(request, response, next) {
//   console.log("Middleware 2");
//   // response.send("Middleware 2 Send");
//   next();
// });
// appTest.use("/about", function(request, response, next) {
//   console.log("Middleware 3");
//   response.send("Middleware 3. About");
//   // next();
// });

// appTest.get("/", function (req, res) {
//   console.log("run indexTest");
//   res.send("<h2>Index Test</h2>");

// });

// appTest.get("/about", function(request, response) {
//   response.send("<h2>About Page</h2>"); 
// });

appTest.use("/static", express.static(__dirname + "/public"));
// appTest.use(function (request, response, next) {
//   let now = new Date();
//   let hour = now.getHours();
//   let minutes = now.getMinutes();
//   let seconds = now.getSeconds();
//   let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`;
//   console.log(data);
//   fs.appendFile("server.log", data + "\n", function () { });
//   next();
// })


appTest.get("/", function (request, response) {
  // response.send({name: "ann", salery: 300, });
  // response.send(["name", "ann", "salery", 300,]);
  // response.sendFile(__dirname + "/index.html");
  response.sendStatus(200);
  console.log(__dirname);
})

//https://cloud.mongodb.com/v2/6184ef4f46e0c3244e959043#clusters
const DB_URL = "mongodb+srv://admin:admin@cluster0.ggemf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const mongoose = require("mongoose");
import mongoose from 'mongoose';
const testScheme = new mongoose.Schema({ name: String, status: String, });
mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true, });
const TestModel = mongoose.model("tEsTst", testScheme);
const test2 = new TestModel({ name: "tEsTst_1", status: "have" });
let responseDB;
// test2.save()
//   .then(function (doc) {
//     mongoose.disconnect();
//     responseDB = doc;
//     console.log(doc);
//   })
//   .catch(function (error) {
//     console.log(error);
//     mongoose.disconnect();
//   }); 

// TestModel.deleteOne({ status: "have", })
//   .then(function(doc) {
//     mongoose.disconnect();
//     responseDB = doc;
//   })
//   .catch(function(error) {
//     mongoose.disconnect();
//     responseDB = error;
//   })

// TestModel.updateOne({ status: "have", }, { name: "name update", })
//   .then(function (doc) {
//     mongoose.disconnect();
//     responseDB = doc;
//   })
//   .catch(function (error) {
//     mongoose.disconnect();
//     responseDB = doc;
//   })

appTest.get("/db", function (request, response) {
  response.json(responseDB);
})

appTest.get("/users", function (request, response) {
  const users = TestModel.find()
    .then(function (doc) {
      response.json(doc);
    })
    .catch(function (error) { response.json(error.message); });
})

appTest.listen(3000);
appTest.listen(3001);