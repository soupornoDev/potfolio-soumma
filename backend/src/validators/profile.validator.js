import { z } from "zod";

const mediaSchema = z.object({
  url: z.string().url().or(z.literal("")),
  publicId: z.string().max(255),
});

const contactSchema = z.object({
  email: z.string().email().or(z.literal("")),
  phone: z.string().max(30),
  location: z.string().max(150),
});

const socialLinksSchema = z.object({
  linkedin: z.string().url().or(z.literal("")),
  github: z.string().url().or(z.literal("")),
  website: z.string().url().or(z.literal("")),
});

const seoSchema = z.object({
  title: z.string().max(70),
  description: z.string().max(160),
  keywords: z.array(
    z.string().max(50)
  ).max(20),
});

export const profileSchema = z.object({
  name: z.string().trim().min(1).max(100),

  professionalTitle: z.string().max(150),

  tagline: z.string().max(250),

  about: z.string().max(5000),

  profileImage: mediaSchema,

  resume: mediaSchema,

  contact: contactSchema,

  socialLinks: socialLinksSchema,

  seo: seoSchema,
});