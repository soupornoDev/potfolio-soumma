import Certificate from "./certificate.model.js";
import { createCrudController } from "../../utils/createCrudController.js";

export const certificateController = createCrudController({
  Model: Certificate,
  publicFilter: { published: true },
  sort: { order: 1, issueDate: -1 },
});