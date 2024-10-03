import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language); // Перемикання мови
  };

  return (
    <>
      {/* {!isDropdownOpen && (
        <div
          id="dropdown"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-2"
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <a
                onClick={toggleDropdown}
                href="#"
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <img
                  className="w-6"
                  src="/src/assets/images/uk-flag.svg"
                  alt="lang icon"
                />
                English
              </a>
            </li>
            <li>
              <a
                onClick={toggleDropdown}
                href="#"
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <img
                  className="w-6"
                  src="/src/assets/images/spain-flag.svg"
                  alt="lang icon"
                />
                Spanish
              </a>
            </li>
            <li>
              <a
                onClick={toggleDropdown}
                href="#"
                className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <img
                  className="w-6"
                  src="/src/assets/images/ru-flag.svg"
                  alt="lang icon"
                />
                Russian
              </a>
            </li>
          </ul>
        </div>
      )} */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => {
            changeLanguage("es");
          }}
        >
          ES
        </button>
        <button type="button" onClick={() => changeLanguage("en")}>
          EN
        </button>
      </div>
    </>
  );
};

export default LanguageSelector;
