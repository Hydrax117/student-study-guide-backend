const { default: mongoose } = require("mongoose");

const MaterialsSchema = mongoose.Schema({
  title: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: "courses" },
  file: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "lectures" },
});

module.exports = mongoose.model("materials", MaterialsSchema);
