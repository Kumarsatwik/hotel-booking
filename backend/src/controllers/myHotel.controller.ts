import { Request, Response } from "express";
import cloudinary from "cloudinary";
import hotel, { HotelType } from "../models/hotel";
import Hotel from "../models/hotel";

export const myHotelController = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    const uploadPromises = imageFiles.map(async (image) => {
      const b64 = Buffer.from(image.buffer).toString("base64");
      let dataURI = "data:" + image.mimetype + ";base64," + b64;
      const res = await cloudinary.v2.uploader.upload(dataURI);
      return res.url;
    });

    const image = await Promise.all(uploadPromises);
    console.log(image);
    newHotel.imageFiles = image;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = await Hotel.create(newHotel);
    await hotel.save();

    res.status(201).send(hotel);
  } catch (error) {
    console.log("Error creating hotel:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
