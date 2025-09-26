import mongoose, { Document, Model } from "mongoose";

interface IBlog extends Document {
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

const blogSchema = new mongoose.Schema<IBlog>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>("Blog", blogSchema);
export default Blog;
