const lecturerModel = require("../models/lecturer");
const studentModel = require("../models/student");

module.exports.allStudents = async (req, res) => {
  try {
    const students = await studentModel.find();
    return res.json({
      success: true,
      status: 200,
      message: "list of all candidates",
      data: students,
    });
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};

module.exports.searchStudent = async (req, res) => {
  try {
    const search = req.query;
    const students = await studentModel.find(search);
    if (students) {
      return res.json({
        success: true,
        status: 200,
        message: `list all students under ${search.title}`,
        data: students,
      });
    } else {
      return res.json({
        success: false,
        status: 400,
        message: "invalid parameters",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};

module.exports.getProfile = async (req, res) => {
  try {
    const search = req.query;
    const student = await studentModel.findOne(search);
    if (student) {
      return res.json({
        success: true,
        status: 200,
        message: `list all students under }`,
        data: student,
      });
    } else {
      return res.json({
        success: false,
        status: 400,
        message: "invalid parameters",
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
};
