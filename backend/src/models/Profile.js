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

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    location: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const socialLinksSchema = new mongoose.Schema(
  {
    linkedin: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },
  },
  {
    _id: false,
  }
);

const seoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: 70,
      default: "",
    },

    description: {
      type: String,
      maxlength: 160,
      default: "",
    },

    keywords: {
      type: [String],
      default: [],
    },
  },
  {
    _id: false,
  }
);

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    professionalTitle: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },

    tagline: {
      type: String,
      trim: true,
      maxlength: 250,
      default: "",
    },

    about: {
      type: String,
      trim: true,
      maxlength: 5000,
      default: "",
    },

    profileImage: {
      type: mediaSchema,
      default: () => ({}),
    },

    resume: {
      type: mediaSchema,
      default: () => ({}),
    },

    contact: {
      type: contactSchema,
      default: () => ({}),
    },

    socialLinks: {
      type: socialLinksSchema,
      default: () => ({}),
    },

    seo: {
      type: seoSchema,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model(
  "Profile",
  profileSchema
);

export default Profile;