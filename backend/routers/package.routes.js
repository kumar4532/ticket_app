import express from "express";
import protectedRoutes from "../middlewares/protectedRoutes.js"
import { createPackage, updatePackage } from "../controllers/package.controller.js";

const router = express.Router();

router.use(protectedRoutes)

router.post("/packages", createPackage);
router.put("/packages/:id", updatePackage);

export default router;