import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";
//working
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

export const getReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find();
        res.status(200).json({
            success: true,
            data: reservations,
        });
    } catch (error) {
        return next(error);
    }
};
//working
export const searchReservations = async (req, res, next) => {
    // Extract PhoneNumber from query parameters
    const { PhoneNumber } = req.query; 

    // Initialize search criteria
    let searchCriteria = {};

    // Validate PhoneNumber to ensure it is a string and not empty
    if (PhoneNumber && typeof PhoneNumber === "string" && PhoneNumber.trim() !== "") {
        searchCriteria.PhoneNumber = { $regex: PhoneNumber.trim(), $options: "i" }; // Case-insensitive search
    }

    // Check if search criteria is empty
    if (Object.keys(searchCriteria).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide a valid PhoneNumber for search",
        });
    }

    try {
        // Perform the search in the database
        const reservations = await Reservation.find(searchCriteria);

        res.status(200).json({
            success: true,
            data: reservations,
        });
    } catch (error) {
        return next(error);
    }
};

//working
export const updateReservation = async (req, res, next) => {
    const { PhoneNumber, FirstName, LastName, Email, Date, Time } = req.body;
    if (!FirstName || !LastName || !Email || !PhoneNumber || !Date || !Time) {
        return next(new ErrorHandler("Please fill all the details in the reservation form", 400));
    }
    try {
        const reservation = await Reservation.findOneAndUpdate(
            { PhoneNumber },
            { FirstName, LastName, Email, PhoneNumber, Date, Time },
            { new: true, runValidators: true }
        );
        if (!reservation) {
            return next(new ErrorHandler("Reservation not found", 404));
        }
        res.status(200).json({
            success: true,
            message: "Reservation has been updated.",
            data: reservation,
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
//working
export const deleteReservation = async (req, res, next) => {
    const { PhoneNumber } = req.body;
    if (!PhoneNumber) {
        return next(new ErrorHandler("Please provide a phone number to delete", 400));
    }
    try {
        const reservation = await Reservation.findOneAndDelete({ PhoneNumber });
        if (!reservation) {
            return next(new ErrorHandler("Reservation not found", 404));
        }
        res.status(200).json({
            success: true,
            message: "Reservation has been deleted.",
        });
    } catch (error) {
        return next(error);
    }
};