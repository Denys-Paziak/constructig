import React, { useState, useEffect } from "react";

const LanguageSelector: React.FC = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>("");
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);

        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    autoDisplay: true, // Вмикаємо автоматичне визначення мови
                },
                "google_translate_element"
            );
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const languages = [
        { code: "en", name: "Англійська" },
        { code: "uk", name: "Українська" },
        { code: "pl", name: "Польська" },
        { code: "de", name: "Німецька" },
        { code: "fr", name: "Французька" },
        { code: "es", name: "Іспанська" },
    ];

    const handleLanguageChange = (code: string) => {
        setSelectedLanguage(code);
        const translateSelect = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (translateSelect) {
            translateSelect.value = code;
            translateSelect.dispatchEvent(new Event('change'));
        }
        setIsOpen(false); // Закриваємо меню після вибору
    };

    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)} // Перемикаємо видимість списку
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 focus:outline-none"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                >
                    {selectedLanguage ? languages.find(lang => lang.code === selectedLanguage)?.name : "Виберіть мову"}
                </button>
            </div>

            {isOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {languages.map(lang => (
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

            {/* Прихований контейнер для віджета Google Translate */}
            <div id="google_translate_element" style={{ display: 'none' }}></div>
        </div>
    );
};

export default LanguageSelector;
