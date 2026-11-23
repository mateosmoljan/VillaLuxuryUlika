import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import React, { useTransition } from "react";
import en_src from "@/public/assets/icons/flags/en.png";
import de_src from "@/public/assets/icons/flags/de.png";
import hr_src from "@/public/assets/icons/flags/hr.png";
import it_src from "@/public/assets/icons/flags/it.png";
import Image, { StaticImageData } from "next/image";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

interface LanguageLabel {
  code: string;
  name: string;
  src: StaticImageData;
}

function LanguageSwitch() {
  const [isPanding, startTransition] = useTransition();
  const router = useRouter();
  const localeActive = useLocale();
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };

  const languageLabels: LanguageLabel[] = [
    { code: "en", name: "English", src: en_src },
    { code: "de", name: "Deutsch", src: de_src },
    { code: "hr", name: "Hrvatski", src: hr_src },
    { code: "it", name: "Italiano", src: it_src },
  ];

  return (
    <div className="nav_switch overflow-y-visible">
      <FormControl sx={{}}>
        <Select
          value={localeActive}
          defaultValue={localeActive}
          onChange={handleChange}
          disabled={isPanding}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          size="small"
        >
          {languageLabels.map((label) => (
            <MenuItem key={label.code} value={label.code}>
              <Image
                src={label.src}
                alt={label.name}
                width={24}
                height={24}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default LanguageSwitch;
