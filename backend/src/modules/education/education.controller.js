import Education from "./education.model.js";
import { createCrudController } from "../../utils/createCrudController.js";

export const educationController = createCrudController({
  Model: Education,
  publicFilter: { published: true },
  sort: { order: 1, startDate: -1 },
});