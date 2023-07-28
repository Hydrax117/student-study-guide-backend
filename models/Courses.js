const { default: mongoose } = require("mongoose");

const CoursesSchema = mongoose.Schema({
  title: String,
  code: String,
  semester: String,
  level: String,
  materials: [
    {
      material: { type: mongoose.Schema.Types.ObjectId, ref: "materials" },
    },
  ],
  books: [
    {
      books: { type: mongoose.Schema.Types.ObjectId, ref: "recommendedbooks" },
    },
  ],
});

module.exports = mongoose.model("courses", CoursesSchema);
