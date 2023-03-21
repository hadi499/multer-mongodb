import express from "express";
import {
  getArticles,
  getArticleById,
  createArticle,
} from "../controllers/articles.js";

const router = express.Router();

router.get("/", getArticles);
router.get("/:id", getArticleById);
router.post("/", createArticle);

export default router;
