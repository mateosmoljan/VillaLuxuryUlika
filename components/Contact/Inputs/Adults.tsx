import React from "react";

function Adults() {
  const [adults, setAdults] = React.useState("");

  return (
    <div className="w-full">
      <label htmlFor="adults" className="block mb-1 text-sm font-Bold text-grey3">
        Adults
      </label>
      <select
        required
        id="adults"
        name="adults"
        value={adults}
        onChange={(event) => setAdults(event.target.value)}
        className="w-full bg-white border border-gray-300 rounded-md px-3 py-[9px] text-sm font-Bold text-grey3"
      >
        <option value="" disabled>
          Adults
        </option>
        {Array.from({ length: 14 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Adults;
