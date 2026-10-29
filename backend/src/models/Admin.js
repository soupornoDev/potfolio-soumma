import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      required: [true, "Admin name is required"],

      trim: true,

      maxlength: 100,
    },

    email: {
      type: String,

      required: [true, "Email is required"],

      unique: true,

      lowercase: true,

      trim: true,

      maxlength: 255,
    },

    password: {
      type: String,

      required: true,

      select: false,
    },

    role: {
      type: String,

      enum: ["admin"],

      default: "admin",
    },

    isActive: {
      type: Boolean,

      default: true,
    },

    lastLoginAt: {
      type: Date,

      default: null,
    },
  },

  {
    timestamps: true,
  }
);

const Admin = mongoose.model(
  "Admin",

  adminSchema
);

export default Admin;