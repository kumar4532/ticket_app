import Booking from "../models/booking.model.js";

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

export const getBookings = async(req, res) => {
    try {
        const bookings = await Booking.find();

        if (bookings.length == 0) {
            return res.status(400).json("There is no booked package yet.")
        }

        const populatedBookings = await Promise.all(
            bookings.map((booking) => (
                booking.populate("bookedPackage")
            ))
        )

        return res.status(200).json(populatedBookings)
    } catch (error) {
        console.error("Error while creating booking", error);
        return res.status(500).json("Internal server error")
    }
}