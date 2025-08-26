import { Router } from "express";
import { CustomerController } from "./user.controller";

const router = Router();
const controller = new CustomerController();

router.get("/", controller.findAll);
router.get("/:id", controller.findOne);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

export default router;
