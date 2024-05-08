import React from "react";
import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
  selectedHotelfacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelFacilityFilter = ({ selectedHotelfacilities, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Facilities</h4>
      {hotelFacilities.map((hotelFacility) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            value={hotelFacility}
            className="rounded"
            checked={selectedHotelfacilities.includes(hotelFacility)}
            onChange={onChange}
          />
          <span>{hotelFacility} </span>
        </label>
      ))}
    </div>
  );
};

export default HotelFacilityFilter;
