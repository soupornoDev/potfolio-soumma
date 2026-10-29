import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      default: "",
    },

    publicId: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 180,
    },

    description: {
      type: String,
      required: true,
      maxlength: 5000,
    },

    category: {
      type: String,
      required: true,
      maxlength: 100,
    },

    thumbnail: {
      type: mediaSchema,
      default: () => ({}),
    },

    gallery: {
      type: [mediaSchema],
      default: [],
    },

    technologies: {
      type: [String],
      default: [],
    },

    githubUrl: {
      type: String,
      default: "",
    },

    liveUrl: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    published: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.index({
  published: 1,
  featured: -1,
  order: 1,
});

const Project = mongoose.model(
  "Project",
  projectSchema
);

export default Project;