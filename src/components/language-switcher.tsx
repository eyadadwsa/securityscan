"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useEffect, useState } from "react";

type Language = {
  code: string;
  name: string;
  nativeName: string;
  direction: "ltr" | "rtl";
};

const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", direction: "ltr" },
  { code: "fr", name: "French", nativeName: "Français", direction: "ltr" },
  { code: "es", name: "Spanish", nativeName: "Español", direction: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", direction: "rtl" },
  { code: "zh", name: "Chinese", nativeName: "中文", direction: "ltr" },
];

const LanguageSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState("en");

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);
    document.documentElement.lang = savedLanguage;

    // Set direction for RTL languages
    const selectedLang = languages.find((lang) => lang.code === savedLanguage);
    if (selectedLang) {
      document.documentElement.dir = selectedLang.direction;
    }
  }, []);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem("language", value);
    document.documentElement.lang = value;

    // Set direction for RTL languages
    const selectedLang = languages.find((lang) => lang.code === value);
    if (selectedLang) {
      document.documentElement.dir = selectedLang.direction;
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"sm"}>
          <Globe size={16} className="text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[180px]" align="end">
        <DropdownMenuRadioGroup
          value={language}
          onValueChange={handleLanguageChange}
        >
          {languages.map((lang) => (
            <DropdownMenuRadioItem
              key={lang.code}
              className="flex gap-2"
              value={lang.code}
            >
              <span>{lang.nativeName}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {lang.code.toUpperCase()}
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { LanguageSwitcher };
