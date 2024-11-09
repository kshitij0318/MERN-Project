import mongoose from 'mongoose';
import validator from 'validator';

const reservationSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        minLength: [3, "First name must contain at least 3 characters"],
        maxLength: [30,"First name cannot exceed 30 characters"],
    },
    LastName: {
        type: String,
        required: true,
        minLength: [1, "Last name must contain at least 1 character"],
        maxLength: [30,"Last name cannot exceed 30 characters"],
    },
    Email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Provide a valid email id"],
    },
    PhoneNumber: {
        type: String,
        required: true,
        minLength: [10, "Enter a valid phone number"],
        maxLength: [10,"Enter a valid phone number"],
    },
    Date: {
        type: String,
        required: true,
    },
    Time: {
        type: String,
        required: true,
    },
});
export const Reservation = mongoose.model("Reservation", reservationSchema);
