import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    level: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },

    icon: {
      type: String,
      default: "",
    },

    featured: {
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

skillSchema.index({
  category: 1,
  order: 1,
});

const Skill = mongoose.model(
  "Skill",
  skillSchema
);

export default Skill;