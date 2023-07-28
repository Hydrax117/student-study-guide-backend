const MaterialsModel = require("../models/Materials");
module.exports.addMaterial = async (req, res) => {
    try {
      const { title, course, owner, file } = req.body;
      // if any one of the field from email and password is not filled
      if (!title) {
        return res.json({
          success: false,
          message: "email or password or names is empty",
        });
      }
  
      let findCourse = await MaterialsModel.findOne({ code });
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
