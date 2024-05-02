import { Request, Response } from "express";
import cloudinary from "cloudinary";
import hotel from "../models/hotel";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";

export const myHotelController = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel: HotelType = req.body;

    const image = await uploadImages(imageFiles);
    newHotel.imageUrls = image;
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

export const showHotelController = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.status(200).json(hotels);
  } catch (error) {
    console.log("Error fetching hotels:", error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
};

export const getHotelsById = async (req: Request, res: Response) => {
  const id = req.params.id.toString();
  try {
    const hotels = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });
    return res.json(hotels);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching hotels" });
  }
};

export const updateHotelImages = async (req: Request, res: Response) => {
  try {
    const updatedHotel: HotelType = req.body;
    updatedHotel.lastUpdated = new Date();
    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: req.params.hotelId,
        userId: req.userId,
      },
      updatedHotel,
      { new: true }
    );
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const files = req.files as Express.Multer.File[];
    const image = await uploadImages(files);
    hotel.imageUrls = [...image, ...(updatedHotel.imageUrls || [])];
    await hotel.save();
    return res.status(201).json(hotel);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const image = await Promise.all(uploadPromises);
  return image;
}
