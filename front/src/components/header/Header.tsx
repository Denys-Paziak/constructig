import React, { useEffect, useRef, useState } from "react";

interface HeaderProps {
  logo: string | null;
  data: any;
  company: string;
  headerColorBg: { r: string; g: string; b: string; a: string };
  headerTextColor: { r: string; g: string; b: string; a: string };
  screen: string;
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  data,
  company,
  headerColorBg,
  headerTextColor,
  screen,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const googleTranslateRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    const checkGoogleTranslate = () => {
      if (
        window.google &&
        window.google.translate &&
        window.google.translate.TranslateElement &&
        googleTranslateRef.current // Перевірка, що реф не є null
      ) {
        clearInterval(intervalId!);
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages:
              "af,ach,ak,am,ar,az,be,bem,bg,bh,bn,br,bs,ca,chr,ckb,co,crs,cs,cy,da,de,ee,el,en,eo,es,es-419,et,eu,fa,fi,fo,fr,fy,ga,gaa,gd,gl,gn,gu,ha,haw,hi,hr,ht,hu,hy,ia,id,ig,is,it,iw,ja,jw,ka,kg,kk,km,kn,ko,kri,ku,ky,la,lg,ln,lo,loz,lt,lua,lv,mfe,mg,mi,mk,ml,mn,mo,mr,ms,mt,ne,nl,nn,no,nso,ny,nyn,oc,om,or,pa,pcm,pl,ps,pt-BR,pt-PT,qu,rm,rn,ro,ru,rw,sd,sh,si,sk,sl,sn,so,sq,sr,sr-ME,st,su,sv,sw,ta,te,tg,th,ti,tk,tl,tn,to,tr,tt,tum,tw,ug,uk,ur,uz,vi,wo,xh,yi,yo,zh-CN,zh-TW,zu",
            layout:
              window.google.translate.TranslateElement.InlineLayout.VERTICAL,
          },
          googleTranslateRef.current
        );
      }
    };

    intervalId = setInterval(checkGoogleTranslate, 100);
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <div
      className="h-[50px] flex justify-between items-center relative"
      style={{
        backgroundColor: `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${headerColorBg.b}, ${headerColorBg.a})`,
      }}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo">
          {logo ? <img src={logo} alt="Logo" className="h-8" /> : company}
        </div>

        {(screen === "mobile" || screen === "tablet") && (
          <div
            onClick={toggleMenu}
            className={`flex items-center flex-col gap-1.5 cursor-pointer burger-menu ${
              isMenuOpen ? "active" : ""
            }`}
          >
            <span className="w-7 h-0.5 rounded-full bg-black ease-in-out duration-300"></span>
            <span className="w-7 h-0.5 rounded-full bg-black ease-in-out duration-300"></span>
            <span className="w-7 h-0.5 rounded-full bg-black ease-in-out duration-300"></span>
          </div>
        )}

        {screen === "desktop" && (
          <div
            className="flex items-center gap-6"
            style={{
              color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
            }}
          >
            <div ref={googleTranslateRef}>vfdio</div>
            {data.slider?.visible && <a href="#slider">slider</a>}
            {data.services?.visible && <a href="#services">services</a>}
            {data.info?.visible && <a href="#info">info</a>}
            {data.socials?.visible && <a href="#socials">socials</a>}
          </div>
        )}
      </div>

      {(screen === "mobile" || screen === "tablet") && isMenuOpen && (
        <div
          className="menu absolute top-[50px] right-0 w-full h-svh flex flex-col items-center"
          style={{
            backgroundColor: `rgba(${headerColorBg.r}, ${headerColorBg.g}, ${headerColorBg.b}, ${headerColorBg.a})`,
          }}
        >
          {data.slider?.visible && (
            <a
              href="#slider"
              style={{
                color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
              }}
            >
              slider
            </a>
          )}
          {data.services?.visible && (
            <a
              href="#services"
              style={{
                color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
              }}
            >
              services
            </a>
          )}
          {data.info?.visible && (
            <a
              href="#info"
              style={{
                color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
              }}
            >
              info
            </a>
          )}
          {data.socials?.visible && (
            <a
              href="#socials"
              style={{
                color: `rgba(${headerTextColor.r}, ${headerTextColor.g}, ${headerTextColor.b}, ${headerTextColor.a})`,
              }}
            >
              socials
            </a>
          )}
        </div>
      )}
    </div>
  );
};
