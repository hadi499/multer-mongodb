import mongoose from "mongoose";
import dotenv from "dotenv";
import articles from "./data/article.js";
import Article from "./models/articleModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Article.deleteMany();

    const article = articles.map((article) => {
      return { ...article };
    });

    await Article.insertMany(article);

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
