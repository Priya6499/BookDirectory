var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const bookModel = require("../models/book");
const db = "mongodb://localhost:27017/sampleDataBase";

/* Establish Connection */

mongoose.connect(db, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connection established Successfully");
  }
});

/* GET users listing. */

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

/* Add Book to DataBase */

/* 
 API => http://localhost:3000/users/addBook

Request Body =>  {
  "bookId" : "1",
 "title" : "AAA",
 "authorName" : "aaa",
 "publicationYear" : "01/01/1999",
 "Language" : "Tamil",
 "Category" : "Action"
}

 */

router.post("/addBook", (req, res) => {
  let bookData = req.body;
  let book = new bookModel(bookData);
  try {
    book.save((err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(data);
      }
    });
  } catch (err) {
    console.log(err);
  }
});

/* Get all Book from DataBase */

/* API => http://localhost:3000/users/getAllBooks */

router.get("/getAllBooks", (req, res) => {
  bookModel.find({}, (err, data) => {
    try {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(err);
    }
  });
});

/* Get Book by Title from DataBase */

/* API => http://localhost:3000/users/getBookByTitle?title=AAA */

router.get("/getBookByTitle", (req, res) => {
  let bookTitle = req.query.title;
  bookModel.findOne({ title: bookTitle }, (err, data) => {
    try {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(err);
    }
  });
});

/* Delete Book by Title from DataBase */

/* API => http://localhost:3000/users/deleteBookByTitle?title=AAA */

router.delete("/deleteBookByTitle", (req, res) => {
  let bookTitle = req.query.title;
  bookModel.findOneAndDelete({ title: bookTitle }, (err, data) => {
    try {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(data);
      }
    } catch (err) {
      console.log(err);
    }
  });
});

module.exports = router;
