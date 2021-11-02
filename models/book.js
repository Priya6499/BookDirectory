const mongoose = require("mongoose");
const schema = mongoose.Schema;

const bookSchema = new schema({
  bookId: Number,
  title: String,
  authorName: String,
  publicationYear: Date,
  language: String,
  category: String,
});

module.exports = mongoose.model("book", bookSchema );
