import { Router } from "express";
import { FeedbackController } from "./feedback.controller";

const router = Router();
const controller = new FeedbackController();

router.post("/", (req, res, next) => controller.create(req, res, next));
router.get("/", (req, res, next) => controller.findAll(req, res, next));
router.get("/:id", (req, res, next) => controller.findOne(req, res, next));
router.put("/:id", (req, res, next) => controller.update(req, res, next));
router.delete("/:id", (req, res, next) => controller.remove(req, res, next));

export default router;
