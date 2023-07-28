const coursesModel = require("../models/Courses");
module.exports.addCourse = async (req, res) => {
  try {
    const { title, code, semester, level } = req.body;
    // if any one of the field from email and password is not filled
    if (!title || !code) {
      return res.json({
        success: false,
        message: "email or password or names is empty",
      });
    }

    let findCourse = await coursesModel.findOne({ code });
    if (findCourse) {
      return res.json({
        success: false,
        message: "course code already exist",
      });
    } else {
      var s = code.slice(3, 6);
      var news = parseInt(s);
      var semesters = " ";
      if (news % 2 === 0) {
        semesters = "second";
      } else {
        semesters = "first";
      }

      var year = code.slice(3, 4);
      var newYear = parseInt(year);
      var levels = "";
      if (newYear === 4) {
        levels = "400";
      } else if (newYear === 3) {
        levels = "300";
      } else if (newYear === 2) {
        levels = "200";
      } else if (newYear === 1) {
        levels = "100";
      }

      let course = new coursesModel(req.body);
      course.semester = semesters;
      course.level = levels;

      await course.save();

      return res.json({
        success: true,
        message: "course added successfully",
        data: course,
      });
    }
  } catch (error) {
    return res.send(error.message);
  }
};

module.exports.getLevelCourses = async (req, res) => {
  try {
    const level = req.query;
    const levels = req.query.level;

    courses = await coursesModel.find(level);
    if (courses.length > 0) {
      return res.json({
        success: true,
        message: `all ${levels} level courses`,
        data: courses,
      });
    } else {
      return res.json({
        success: true,
        message: `no courses yet`,
      });
    }
  } catch (error) {
    return res.send(error.message);
  }
};

module.exports.getCourse = async (req, res) => {
  try {
    query = req.query;
    course = await coursesModel.findOne(query);
    if (course) {
      return res.json({
        success: true,
        status: 200,
        data: course,
      });
    } else {
      return res.json({
        success: false,
        status: 200,
        message: "course does not exist",
      });
    }
  } catch (error) {
    return res.send(error.message);
  }
};

module.exports.addRecommendedbooks = async (req, res) => {
  try {
    const a = req.body;
    const c = req.body.course;

    const b = coursesModel.findOneAndUpdate();
  } catch (error) {}
};
