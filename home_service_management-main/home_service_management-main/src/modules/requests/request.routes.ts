import { Router } from "express";
import { RequestController } from "./request.controller";

const router = Router();
const controller = new RequestController();

router.post("/", (req, res, next) => controller.create(req, res, next));
router.get("/", (req, res, next) => controller.findAll(req, res, next));
router.get("/:id", (req, res, next) => controller.findOne(req, res, next));
router.put("/:id", (req, res, next) => controller.update(req, res, next));
router.delete("/:id", (req, res, next) => controller.remove(req, res, next));

// functionality for assigning a provider to a request
router.post("/:id/assign", (req, res, next) =>
  controller.assignProvider(req, res, next)
);

export default router;
