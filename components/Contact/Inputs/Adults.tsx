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

function Adults() {
  const [adults, setAdults] = React.useState("");
  const localeActive = useLocale();
  const ContactData = getContactData(localeActive);

  const handleChange = (event: SelectChangeEvent) => {
    setAdults(event.target.value as string);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label" className="!font-bold">
        Adults
      </InputLabel>
      <Select
        required
        labelId="demo-simple-select-label"
        label="Adults"
        className="w-full bg-white "
        id="demo-simple-select"
        name="adults"
        size="small"
        value={adults}
        onChange={handleChange}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
      </Select>
    </FormControl>
  );
}

export default Adults;
