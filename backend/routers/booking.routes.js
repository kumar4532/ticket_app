import express from "express";
import protectedRoutes from "../middlewares/protectedRoutes.js"
import { createBooking } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/bookings/:id", protectedRoutes, createBooking)

export default router;