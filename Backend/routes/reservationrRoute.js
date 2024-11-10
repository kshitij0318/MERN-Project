import express from 'express';

import { sendReservation, getReservations, updateReservation, deleteReservation, searchReservations } from '../controller/reservation.js';

const router = express.Router();

router.post("/send",sendReservation);

router.get("/all", getReservations);

router.get("/search", searchReservations);

router.put("/update/:id", updateReservation);

router.delete("/delete/:id", deleteReservation);


export default router;