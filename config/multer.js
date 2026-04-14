const multer = require("multer")
const path = require("path");
const uploadPath = path.join(__dirname, "../uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(" RECEIVED FIELD:", file.fieldname);
    cb(null, "uploads/")
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + file.originalname
    cb(null, uniqueName)
  }
})

const upload = multer({ storage })
module.exports = upload
