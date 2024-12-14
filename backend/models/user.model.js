import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    number: {
        type: String,
        required: true
    },
    travelers: {
        type: Number,
        required: true
    },
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Package'
        }
    ]
}, {timestamps: true})

const User = mongoose.model("User", userSchema);

export default User;