import React from "react";

function Children() {
  const [children, setChildren] = React.useState("");

  return (
    <div className="w-full">
      <label htmlFor="children" className="block mb-1 text-sm font-Bold text-grey3">
        Children
      </label>
      <select
        required
        id="children"
        name="children"
        value={children}
        onChange={(event) => setChildren(event.target.value)}
        className="w-full bg-white border border-gray-300 rounded-md px-3 py-[9px] text-sm font-Bold text-grey3"
      >
        <option value="" disabled>
          Children
        </option>
        {Array.from({ length: 14 }, (_, i) => i).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Children;
