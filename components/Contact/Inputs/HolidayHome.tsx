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
        {ContactData.data[0].home}
      </InputLabel>
      <Select
        required
        labelId="demo-simple-select-label"
        className="w-full bg-white"
        id="demo-simple-select"
        size="small"
        name="holidayHome"
        value={home}
        label={ContactData.data[0].home}
        onChange={handleChange}
        placeholder={ContactData.data[0].home}
      >
        <MenuItem value={"Villa Luxury Ulika"} className="!pl-4">
          Villa Luxury Ulika
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default HolidayHome;
