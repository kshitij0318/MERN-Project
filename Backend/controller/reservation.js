import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation = async (req, res, next) => {
    const { FirstName, LastName, Email, PhoneNumber, Date, Time } = req.body;
    if (!FirstName || !LastName || !Email || !PhoneNumber || !Date || !Time) {
        return next(new ErrorHandler("Please fill all the details in the reservation form", 400));
    }
    try {
        await Reservation.create({
            FirstName,
            LastName,
            Email,
            PhoneNumber,
            Date,
            Time,
        });
        res.status(200).json({
            success: true,
            message: "Reservation has been confirmed.",
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const validationErrors = Object.values(error.errors).map(
                (err) => err.message
            );
            return next(new ErrorHandler(validationErrors.join(", "), 400));
        }
        return next(error);
    }
};  
