import express from "express";
import protectedRoutes from "../middlewares/protectedRoutes.js"
import { createPackage, deletePackage, getAllPackages, getPackageById, updatePackage } from "../controllers/package.controller.js";

const router = express.Router();

router.use(protectedRoutes)

router.post("/admin/packages", createPackage);
router.put("/admin/packages/:id", updatePackage);
router.delete("/admin/packages/:id", deletePackage);
router.get("/packages", getAllPackages);
router.get("/packages/:id", getPackageById);

export default router;