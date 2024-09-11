import React, { useState, useEffect } from "react";

interface Props {
  headerTextColor?: { r: string; g: string; b: string; a: string };
}

// Оголосимо властивості в глобальному об'єкті для TypeScript
declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate: {
        TranslateElement: new (options: object, element: string) => void;
      };
    };
  }
}

const LanguageSelector: React.FC<Props> = ({ headerTextColor }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_translate_element"
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const languages = [
    { code: "en", name: "English", flag_url: "/src/assets/images/uk-flag.svg" },
    { code: "ru", name: "Russian", flag_url: "/src/assets/images/ru-flag.svg" },
    {
      code: "es",
      name: "Spanish",
      flag_url: "/src/assets/images/spain-flag.svg",
    },
  ];

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
    const translateSelect = document.querySelector(
      ".goog-te-combo"
    ) as HTMLSelectElement;
    if (translateSelect) {
      translateSelect.value = code;
      translateSelect.dispatchEvent(new Event("change"));
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left z-50">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 justify-center w-full rounded-md shadow-sm px-4 py-2 bg-transparent text-white text-sm font-medium focus:outline-none"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
          style={{
            color: `${
              headerTextColor
                ? `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`
                : "white"
            }`,
          }}
        >
          {selectedLanguage
            ? languages.find((lang) => lang.code === selectedLanguage)?.name
            : "English"}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
          >
            <path
              d="M19 9L12 16L5 9"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {languages.map((lang) => (
              <a
                key={lang.code}
                href="#"
                onClick={() => handleLanguageChange(lang.code)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {lang.name}
              </a>
            ))}
          </div>
        </div>
      )}

      <div id="google_translate_element" style={{ display: "none" }}></div>
    </div>
  );
};

export default LanguageSelector;
