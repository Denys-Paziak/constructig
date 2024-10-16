import { useTranslation } from "react-i18next";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

interface Props {
  fetchData?: () => void;
}

const LanguageSelector: React.FC<Props> = ({ fetchData }) => {
  const { t } = useTranslation();
  const [lang, setLang] = useState<any>();

  const changeLanguage = async (language: string) => {
    localStorage.setItem("siteLang", language);
    setLang(language);
    await fetchData!();
  };

  useEffect(() => {
    let localLang: string | null = localStorage.getItem("siteLang");
    if (localLang) {
      setLang(localLang);
    }
  }, []);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm">
          {lang === "en"
            ? t("admin.adminInterface.adminInterfaceLang1")
            : lang === "es"
            ? t("admin.adminInterface.adminInterfaceLang2")
            : lang === "ru"
            ? t("admin.adminInterface.adminInterfaceLang3")
            : t("admin.adminInterface.adminInterfaceChoose")}

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
              onClick={() => changeLanguage("en")}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              <img className="w-5" src="../uk-flag.svg" alt="uk flag" />
              {t("admin.adminInterface.adminInterfaceLang1")}
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              onClick={() => changeLanguage("es")}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              <img className="w-5" src="../spain-flag.svg" alt="spain flag" />
              {t("admin.adminInterface.adminInterfaceLang2")}
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              onClick={() => changeLanguage("ru")}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              <img className="w-5" src="../ru-flag.svg" alt="ru flag" />
              {t("admin.adminInterface.adminInterfaceLang3")}
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default LanguageSelector;
