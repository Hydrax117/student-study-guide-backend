const { default: mongoose } = require("mongoose");

const LecturersSchema = mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userType: String,
  password: String,
  token: String,
});

module.exports = mongoose.model("lecturers", LecturersSchema);
