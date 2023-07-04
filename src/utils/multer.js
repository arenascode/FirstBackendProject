import multer from "multer";

//Here I indicate yo multer where I'm going to storage files
const storage = multer.diskStorage({
  // Here I reference to folder where storage files.
  destination: function (req, file, cb) {
    let folder = `uploads/`;

    if (file.fieldname === "profileImg") {
      folder += "profiles";
    } else if (file.fieldname === "productImg") {
      folder += "products";
    } else if (file.fieldname === "userDocument") {
      folder += "documents";
    }
    cb(null, folder);
  },
  // filename made reference at final name thats storage file
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix); //originalname indicates that mantain the orginal name.
  },
});

export const uploader = multer({ storage });
