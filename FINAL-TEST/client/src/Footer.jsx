import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";
import translationData from "./translationData.json";

const Footer = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const translation = translationData[language].footer;
  const handleLanguageChange = (language) => {
    setLanguage(language);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>{translation.title}</h3>
      <div
        style={{
          display: "flex",
          alignContent: "center",
        }}
      >
        <span
          style={{
            marginRight: "12px",
          }}
        >
          {translation.language}
        </span>
        <div>
          <span
            className={`language-picker ${language === "vn" ? "selected" : ""}`}
            style={{
              marginRight: "10px",
              fontWeight: language === "vn" ? "bold" : "normal",
            }}
            onClick={() => handleLanguageChange("vn")}
          >
            VN
          </span>
          <span
            style={{
              fontWeight: language === "en" ? "bold" : "normal",
            }}
            className={`language-picker ${language === "en" ? "selected" : ""}`}
            onClick={() => handleLanguageChange("en")}
          >
            US
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
