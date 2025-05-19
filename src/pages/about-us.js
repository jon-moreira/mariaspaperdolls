import React from "react";
import { useTranslation } from "react-i18next";

function AboutUs() {
  const { t } = useTranslation();

  return (
    <section className="container about-us">
      <div className="row">
        <div className="col-lg-9 offset-lg-1 top">
          <h1>{t("about-us.title")}</h1>
          <div dangerouslySetInnerHTML={{ __html: t("about-us.quote") }} />
        </div>
      </div>
      <div className="row">
        <div
          className="col-12 description"
          dangerouslySetInnerHTML={{ __html: t("about-us.description") }}
        />
      </div>
      <div className="row">
        <div className="col-12 process">
          <h2>{t("about-us.process")}</h2>
          <div className="row">
            <img
              alt="process-1"
              className="col-6 col-sm-3"
              src={process.env.PUBLIC_URL + "/imgs/wip/wip-pro-01.jpg"}
            />
            <img
              alt="process-2"
              className="col-6 col-sm-3"
              src={process.env.PUBLIC_URL + "/imgs/wip/wip-pro-02.jpg"}
            />
            <img
              alt="process-3"
              className="col-6 col-sm-3"
              src={process.env.PUBLIC_URL + "/imgs/wip/wip-pro-03.jpg"}
            />
            <img
              alt="process-4"
              className="col-6 col-sm-3"
              src={process.env.PUBLIC_URL + "/imgs/wip/wip-pro-04.jpg"}
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div
          className="col-12 description"
          dangerouslySetInnerHTML={{ __html: t("about-us.process-description") }}
        />
      </div>
    </section>
  );
}

export default AboutUs;
