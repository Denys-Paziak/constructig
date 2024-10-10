import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const langs = ["es", "en", "ru"];

const LanguageSelector = ({ fetchData }: { fetchData: () => {} }) => {
  const { i18n, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    t("admin.adminInterface.adminInterfaceChoose")
  );

  const changeLanguage = async (language: string, languageName: string) => {
    await i18n.changeLanguage(language);
    setSelectedLanguage(languageName);
    // fetchData();
  };

  return (
    <div className={"flex justify-center h-[64px]"}>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset">
            {selectedLanguage}
            <ChevronDownIcon
              aria-hidden="true"
              className="-mr-1 h-5 w-5 text-white"
            />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            <MenuItem>
              <a
                href="#"
                onClick={() => changeLanguage("en", "English")}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                <img
                  className="w-5 rounded-sm"
                  src="../../public/uk-flag.svg"
                  alt=""
                />
                {t("admin.adminInterface.adminInterfaceLang1")}
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                onClick={() => changeLanguage("es", "Spanish")}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                <img
                  className="w-5 rounded-sm"
                  src="../../public/spain-flag.svg"
                  alt=""
                />
                {t("admin.adminInterface.adminInterfaceLang2")}
              </a>
            </MenuItem>
            <MenuItem>
              <a
                href="#"
                onClick={() => changeLanguage("ru", "Russian")}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                <img
                  className="w-5 rounded-sm"
                  src="../../public/ru-flag.svg"
                  alt=""
                />
                {t("admin.adminInterface.adminInterfaceLang3")}
              </a>
            </MenuItem>
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
};

export default LanguageSelector;
