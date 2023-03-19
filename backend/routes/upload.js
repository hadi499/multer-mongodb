import path from "path";
import express from "express";
import multer from "multer";

import Article from "../models/articleModel.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), async (req, res) => {
  const post = new Article({
    title: req.body.title,
    body: req.body.body,
    image: req.file.filename,
  });
  try {
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
});
export default router;
