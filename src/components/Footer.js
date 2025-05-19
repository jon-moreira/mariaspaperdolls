import React from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import LangSwitch from "./LangSwitch";

function Footer (){
  const {t} = useTranslation();
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer-section">
      <div className="container-fluid">
        <div className="row">
          <div className="container text-center">
            <div className="social-links">
              <a
                rel="noopener noreferrer"
                href="https://www.instagram.com/mariaspaperdolls/"
                target="_blank"
              >
                <FontAwesomeIcon icon={faInstagram} size={"3x"}/>
              </a>
              <a
                rel="noopener noreferrer"
                href="https://www.facebook.com/Marias-Paperdolls-332546456914362/"
                target="_blank"
              >
                <FontAwesomeIcon icon={faFacebook} size={"3x"}/>
              </a>
              <a
                rel="noopener noreferrer"
                href="https://www.youtube.com/channel/UCKYv1d2Nt8l0-zeLbo7YpGg"
                target="_blank"
              >
                <FontAwesomeIcon icon={faYoutube} size={"3x"}/>
              </a>
            </div>
            <LangSwitch />
            <div className="copyright" dangerouslySetInnerHTML={{__html: t(`footer.copyright`, { 'year': currentYear })}}></div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;