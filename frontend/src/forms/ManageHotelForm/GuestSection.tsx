import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 gap-2 bg-gray-300 px-5 py-10">
        <label className="flex-1 text-gray-700 text-sm font-bold">
          Adults
          <input
            type="number"
            className="border rounded w-full py-1 px-2 font-normal"
            placeholder="Adults"
            {...register("adultCount", {
              required: "The field is required",
              valueAsNumber: true,
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-red-500 text-sm font-bold">
              {errors.adultCount.message}
            </span>
          )}
        </label>
        <label className="flex-1 text-gray-700 text-sm font-bold">
          Children
          <input
            type="number"
            className="border rounded w-full py-1 px-2 font-normal"
            placeholder="Children"
            {...register("childCount", {
              required: "The field is required",
              valueAsNumber: true,
            })}
          />
          {errors.childCount?.message && (
            <span className="text-red-500 text-sm font-bold">
              {errors.childCount.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestSection;
