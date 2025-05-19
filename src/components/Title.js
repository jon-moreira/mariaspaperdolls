import React from "react";
import { useTranslation } from "react-i18next";

function Title(props) {
  const { t } = useTranslation();

  return <h1 className="section-title">{t(props.titleId)}</h1>;
}

export default Title;
