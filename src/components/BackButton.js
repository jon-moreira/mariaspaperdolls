import React from "react";
import { useTranslation } from "react-i18next";

function BackButton() {
  const { t } = useTranslation();

  const handleBackButton = (e) => {
    e.preventDefault();
    window.history.back();
  };

  return (
    <div className="row">
      <div className="col-12 text-center">
        <button className="btn-back" onClick={handleBackButton}>
          «« {t("back")}
        </button>
      </div>
    </div>
  );
}

export default BackButton;