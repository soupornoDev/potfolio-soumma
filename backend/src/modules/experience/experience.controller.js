import Experience from "./experience.model.js";
import { createCrudController } from "../../utils/createCrudController.js";

export const experienceController = createCrudController({
  Model: Experience,
  publicFilter: { published: true },
  sort: { order: 1, startDate: -1 },
});