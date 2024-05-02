import express from "express";
import {
  getHotelsById,
  myHotelController,
  showHotelController,
  updateHotelImages,
} from "../controllers/myHotel.controller";
import multer from "multer";
import { verifyToken } from "../middleware/auth";
import { body } from "express-validator";
import { verify } from "crypto";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, //5mb
  },
});

router.post(
  "/addHotel",
  verifyToken,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("pricePerNight")
      .notEmpty()
      .withMessage("Price per night is required and must be a number"),
    body("facilites")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],
  upload.array("imageFiles", 6),
  myHotelController
);

router.get("/", verifyToken, showHotelController);
router.get("/:id", verifyToken, getHotelsById);
router.put(
  "/:hotelId",
  verifyToken,
  upload.array("imageFiles"),
  updateHotelImages
);

export default router;
