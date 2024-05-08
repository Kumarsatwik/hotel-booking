import express from "express";
import { hotelSearchController } from "../controllers/hotel.controller";
const router = express.Router();

router.get("/search", hotelSearchController);

export default router;
