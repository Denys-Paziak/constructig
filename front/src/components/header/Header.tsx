import React, { useState } from 'react';

interface MenuItem {
    link: string;
    text: string;
}

interface HeaderProps {
    logo: string | null;
    data: any;
    company: string;
}

export const Header: React.FC<HeaderProps> = ({ logo, data, company }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="bg-blue-200 h-[50px] flex justify-between items-center relative">
            <div className="container mx-auto flex justify-between items-center">
                <div className="logo">
                    {logo ? <img src={URL.createObjectURL(logo)} alt="Logo" className="h-8" /> : company}
                </div>

                <div className="burger-menu">
                    <button onClick={toggleMenu} className="flex flex-col justify-between h-6 w-8 focus:outline-none">
                        <span className="block bg-black h-1 w-full"></span>
                        <span className="block bg-black h-1 w-full mt-1"></span>
                        <span className="block bg-black h-1 w-full mt-1"></span>
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="menu bg-blue-200 absolute top-[50px] right-0 w-full flex flex-col items-center">
                    {data.slider?.visible && <a href='#slider'>slider</a>}
                    {data.services?.visible && <a href='#services'>services</a>}
                    {data.info?.visible && (<a href='#info'>info</a>)}
                    {data.socials?.visible && (<a href='#socials'>socials</a>)}
                </div>
            )}
        </div>
    );
};

export default Header;
