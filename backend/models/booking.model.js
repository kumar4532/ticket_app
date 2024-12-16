import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    travelers: {
        type: Number,
        required: true
    },
    bookedPackage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'package'
    }
}, {timestamps: true})

const Booking = mongoose.model("booking", bookingSchema);

export default Booking;