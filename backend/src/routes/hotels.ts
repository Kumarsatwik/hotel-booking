import express from "express";
import {
  hotelDetailController,
  hotelSearchController,
  hotelPaymentController,
} from "../controllers/hotel.controller";
import { param } from "express-validator";
import { verifyToken } from "../middleware/auth";
const router = express.Router();

router.get("/search", hotelSearchController);
router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  hotelDetailController
);

router.get(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  hotelPaymentController
);

export default router;
