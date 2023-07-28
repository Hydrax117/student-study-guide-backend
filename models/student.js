const { default: mongoose } = require("mongoose");

const StudentsSchema = mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  regNo: String,
  level: String,
  userType: String,
  password: String,
  token: String,
});

module.exports = mongoose.model("Students", StudentsSchema);
