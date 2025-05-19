import React from "react";
import { useTranslation } from "react-i18next";

import logoLoader from "../assets/imgs/loader.svg";

function NotFound() {
    const { t } = useTranslation();

        return (
            <div id="notfound-page">
                <div className="notfound">
                    <div className="notfound-404">
                        <img src={logoLoader} alt="Marias Paperdolls" />
                        <h1>Oops!</h1>
                        <h2>{t("notfound.message")}</h2>
                    </div>
                    <a href="/">{t("notfound.gotoHome")}</a>
                </div>
            </div>
        )
}

export default NotFound;