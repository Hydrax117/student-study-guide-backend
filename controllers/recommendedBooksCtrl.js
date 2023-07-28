const coursesModel = require("../models/Courses");
const recommendedBooksModel = require("../models/recommendedBooks");

module.exports.addBook = async (req, res) => {
  try {
    const { title, image, course } = req.body;
    console.log(course);
    var c = await coursesModel.findOne({ code: "csc101" });
    console.log(c);
    var d = "";
    if (c) {
      d = c._id;
      console.log(d);
    }
    const book = new recommendedBooksModel(req.body);
    book.course = d;
    await book.save();
    return res.json({
      success: true,
      status: 200,
      message: "added",
      data: book,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};

module.exports.getBooks = async (req, res) => {
  try {
    const course = req.query.course;
    var a = await coursesModel.findOne({ code: course });
    c = a.title;
    var b = a._id;
    const books = await recommendedBooksModel.find({ course: b });
    return res.json({
      success: true,
      status: 200,
      message: `${course}, ${c}, recommended books`,
      data: books,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};
