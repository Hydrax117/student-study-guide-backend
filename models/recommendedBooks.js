const { default: mongoose } = require("mongoose");

const RecommendedBooksSchema = mongoose.Schema({
  title: String,
  image: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
});

module.exports = mongoose.model("recommendedbooks", RecommendedBooksSchema);
