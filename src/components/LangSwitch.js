import React from "react";
import { useTranslation } from "react-i18next";

function LangSwitch() {
  const { t, i18n } = useTranslation();

  const switchLang = (event) => {
    event.preventDefault();
    i18n.changeLanguage(event.target.getAttribute("data-value"));
  };

  return (
    <ul className="languages">
      <li>
        <button
          data-value="pt"
          className="btn-switch-lang"
          onClick={switchLang}
        >
          {t("language.portuguese")}
        </button>
      </li>
      <li>
        <button
          data-value="en"
          className="btn-switch-lang"
          onClick={switchLang}
        >
          {t("language.english")}
        </button>
      </li>
    </ul>
  );
};

export default LangSwitch;