import { useTranslation } from "react-i18next";

const langs = ['es','en', "ru"];

const LanguageSelector = ({fetchData}: {fetchData: () => {}}) => {
  const { i18n } = useTranslation();

  const changeLanguage = async (language: string) => {
      await i18n.changeLanguage(language); // Перемикання мови
      fetchData();
  };


  return (
    <div className={"flex justify-center h-[64px]"}>
      <div className="flex items-center gap-4">
          {langs.map(lang => {

              if (lang === i18n.language) {
                  return <button
                      type="button"
                      className={"bg-blue-800 text-white py-2 px-6 text-sm rounded hover:bg-blue-800"}
                      onClick={() => {
                          changeLanguage(lang);
                      }}
                  >
                      {lang}
                  </button>
              }else {
                  return <button
                      type="button"
                      className={"bg-blue-600 text-white py-2 px-6 text-sm rounded hover:bg-blue-800"}
                      onClick={() => {
                          changeLanguage(lang);
                      }}
                  >
                      {lang}
                  </button>
              }


          })}
      </div>
    </div>
  );
};

export default LanguageSelector;
