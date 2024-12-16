import express from "express";
import protectedRoutes from "../middlewares/protectedRoutes.js"
import { createBooking, getBookings } from "../controllers/booking.controller.js";

const router = express.Router();

router.post("/bookings/:id", protectedRoutes, createBooking)
router.get("/bookings", protectedRoutes, getBookings)

export default router;