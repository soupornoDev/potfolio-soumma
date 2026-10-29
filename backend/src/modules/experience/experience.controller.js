// backend/src/modules/experience/experience.controller.js

import Experience from "./experience.js";
import { createCrudController } from "../../utils/createCrudController.js";

const experienceController = createCrudController(Experience, {
  resourceName: "Experience",
});

export const {
  getAll: getExperiences,
  getById: getExperienceById,
  create: createExperience,
  update: updateExperience,
  remove: deleteExperience,
} = experienceController;