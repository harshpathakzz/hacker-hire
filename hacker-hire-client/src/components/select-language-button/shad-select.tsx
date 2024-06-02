import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languageOptions } from "@/constants/languageOptions";

interface LanguageOption {
  id: number;
  name: string;
  label: string;
  value: string;
}

export function SelectLang() {
  const [selectedOption, setSelectedOption] = useState<LanguageOption | null>(
    languageOptions[0] || null
  );

  const handleSelect = (value: string) => {
    const selectedOption = languageOptions.find(
      (option) => option.value === value
    );
    if (selectedOption) {
      setSelectedOption(selectedOption);
      console.log("Selected Language Option:", selectedOption);
    }
  };

  return (
    <Select value={selectedOption?.value || ""} onValueChange={handleSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {languageOptions.map((lang) => (
            <SelectItem key={lang.id} value={lang.value}>
              {lang.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
