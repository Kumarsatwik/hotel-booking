import express from "express";
import {
  hotelDetailController,
  hotelSearchController,
} from "../controllers/hotel.controller";
import { param } from "express-validator";
const router = express.Router();

router.get("/search", hotelSearchController);
router.get(
  "/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")],
  hotelDetailController
);

export default router;
