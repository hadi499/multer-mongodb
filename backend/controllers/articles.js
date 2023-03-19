import Article from "../models/articleModel.js";
import mongoose from "mongoose";

export const getArticles = async (req, res) => {
  const articles = await Article.find({});
  res.json(articles);
};

export const getArticleById = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "id not found." });
  } else {
    const article = await Article.findById(req.params.id);
    res.json(article);
  }
};

export const createArticle = async (req, res) => {
  const url = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;
  // const post = new Article({
  //   title: req.body.title,
  //   body: req.body.body,
  //   image: req.file.filename,
  // });
  const post = new Article({
    title: req.body.title,
    body: req.body.body,
    image: url,
  });
  try {
    await post.save();
    res.status(200).json(post);
  } catch (err) {
    res.status(400).json(err);
  }
};
