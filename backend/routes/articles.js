import express from "express";
import upload from "../controllers/upload.js";

import {
  getArticles,
  getArticleById,
  createArticle,
} from "../controllers/articles.js";

const router = express.Router();

router.get("/", getArticles);
router.get("/:id", getArticleById);
router.post("/", upload.single("image"), createArticle);

export default router;
