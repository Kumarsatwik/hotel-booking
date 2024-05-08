type Props = {
  selectedPrice?: string;
  onChange: (value?: string) => void;
};

const PriceFilter = ({ selectedPrice, onChange }: Props) => {
  return (
    <div>
      <h4 className="text-md font-semibold mb-2">Max Price</h4>
      <select
        value={selectedPrice}
        className="w-full p-2 border rounded-lg"
        onChange={(event) =>
          onChange(event.target.value ? event.target.value : undefined)
        }
      >
        <option value="">Select Max Price</option>
        {["50 - 200", "200 - 500", "500 - 1000"].map((price) => (
          <option>{`${price}`}</option>
        ))}
      </select>
    </div>
  );
};

export default PriceFilter;
