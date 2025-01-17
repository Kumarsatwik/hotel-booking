import React, { useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import SearchResultsCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import HotelFacilityFilter from "../components/HotelFacilityFilter";
import PriceFilter from "../components/PriceFilter";
const Search = () => {
  const search = useSearchContext();

  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelType, setSelectedHotelType] = useState<string[]>([]);
  const [selectedHotelFacilities, setSelectedHotelFacilities] = useState<
    string[]
  >([]);
  const [selectedPrice, setSelectedPrice] = useState<string | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelType,
    facilities: selectedHotelFacilities,
    maxPrice: selectedPrice,
    sortOption: sortOption,
  };

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;
    setSelectedHotelType((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((item) => item !== hotelType)
    );
  };

  const handleHotelFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const facility = event.target.value;
    setSelectedHotelFacilities((prevHotelFacility) =>
      event.target.checked
        ? [...prevHotelFacility, facility]
        : prevHotelFacility.filter((item) => item !== facility)
    );
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () =>
    apiClient.searchHotels(searchParams)
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          {/* TODO FILTERS */}
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHoteltypes={selectedHotelType}
            onChange={handleHotelTypeChange}
          />
          <HotelFacilityFilter
            selectedHotelfacilities={selectedHotelFacilities}
            onChange={handleHotelFilterChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: string) => setSelectedPrice(value)}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotel Found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          {/* TODO sort Options */}
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDesc">
              Price Per Night (high to low)
            </option>
          </select>
        </div>
        {hotelData?.data.map((hotel) => (
          <SearchResultsCard hotel={hotel} />
        ))}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
