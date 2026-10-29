import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 180,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    excerpt: {
      type: String,
      default: "",
      trim: true,
      maxlength: 500,
    },

    content: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      default: "",
    },

    tags: {
      type: [String],
      default: [],
    },

    seoTitle: {
      type: String,
      default: "",
    },

    seoDescription: {
      type: String,
      default: "",
    },

    published: {
      type: Boolean,
      default: false,
    },

    publishedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

blogSchema.index({ published: 1, publishedAt: -1 });

export default mongoose.model("Blog", blogSchema);