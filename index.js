const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dvsra4hfa",
  api_key: "341811486793292",
  api_secret: "IT96T7WYxMcm2NQA5eeCOcJDC8s",
});

const upload = multer({ dest: "uploads/" });

var bodyParser = require("body-parser");
const {
  studentLogin,
  lecturerLogin,
  studentRegister,
  lecturerRegister,
} = require("./auth/auth");
const {
  addCourse,
  getLevelCourses,
  getCourse,
} = require("./controllers/courseCtrl");
const { addBook, getBooks } = require("./controllers/recommendedBooksCtrl");
const { getProfile } = require("./controllers/studentCtrl");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Set up Global configuration access
dotenv.config();

app.listen(process.env.PORT, () => {
  console.log("server started at http://localhost:" + process.env.PORT);
});
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to the database!"));

app.get("/", (req, res) => {
  res.send("yaaay this app is working");
});
app.get("/courses", getLevelCourses);
app.get("/get-course", getCourse);
app.get("/get-books", getBooks);
app.get("/student/profile", getProfile);
app.post("/student/login", studentLogin);
app.post("/lecturer/login", lecturerLogin);
app.post("/add-course", addCourse);
app.post("/student/register", studentRegister);
app.post("/lecturer/register", lecturerRegister);
app.post("/add-book", addBook);
// Route for handling file uploads
app.post("/materials/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "documents", // You can customize the folder where the file will be stored in Cloudinary
      resource_type: "auto", // Automatically detect the resource type (document, image, video, etc.)
    });

    // Cleanup: delete the temporary file created by multer
    const fs = require("fs");
    fs.unlinkSync(req.file.path);

    res.json({ url: result.secure_url });
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).json({ error: "Error uploading file" });
  }
});
