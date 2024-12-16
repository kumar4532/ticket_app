import Booking from "../models/booking.model.js";
import Package from '../models/package.model.js'

export const createBooking = async(req, res) => {
    try {
        const { id } = req.params
        const { name, email, number, travelers } = req.body

        const newBooking = await Booking.create({
            name,
            email,
            number,
            travelers,
            bookedPackage: id
        })

        const populatedBooking = await Booking.findById(newBooking._id).populate("bookedPackage");

        return res.status(200).json(populatedBooking)
    } catch (error) {
        console.error("Error while creating booking", error);
        return res.status(500).json("Internal server error")
    }
}