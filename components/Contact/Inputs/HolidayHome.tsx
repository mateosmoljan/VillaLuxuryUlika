import { getContactData } from "@/lib/contact";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useLocale } from "next-intl";
import React from "react";

function HolidayHome() {
  const [home, setHome] = React.useState("");
  const localeActive = useLocale();
  const ContactData = getContactData(localeActive);

  const handleChange = (event: SelectChangeEvent) => {
    setHome(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label" className="!font-Bold">
        Holiday Home
      </InputLabel>
      <Select
        required
        labelId="demo-simple-select-label"
        className="w-full bg-white"
        id="demo-simple-select"
        size="small"
        name="holidayHome"
        value={home}
        label="Holiday home"
        onChange={handleChange}
        placeholder="Holiday home"
      >
        <MenuItem value={"House Lucia"} className="!pl-4">
          House Lucia
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default HolidayHome;
