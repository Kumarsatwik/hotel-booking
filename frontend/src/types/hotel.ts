// export type HotelType = {
//   _id: string;
//   userId: string;
//   name: string;
//   city: string;
//   country: string;
//   description: string;
//   type: string;
//   adultCount: number;
//   childCount: number;
//   facilities: string[];
//   pricePerNight: number;
//   starRating: number;
//   numberOfRating: number;
//   imageFiles: string[];
//   lastUpdated: Date;
// };

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
};

export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};
