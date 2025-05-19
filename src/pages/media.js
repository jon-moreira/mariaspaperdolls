import React, { useMemo } from "react";
import { Chrono } from "react-chrono";
import { useTranslation } from "react-i18next";
import data from "../assets/data.json";
import Title from "../components/Title";

function MediaPage() {
  const { t } = useTranslation();
  const dotItems = useMemo(() => {
    return data.media.map((mediaData) => {
      return { title: t(`media.${mediaData.date}`) };
    });
  }, [t]);
  
  const items = useMemo(() => {
    return data.media.map(({ title, img, link, linkTitle }, index) => {
      return (
        <div key={`media-id-${index}`}>
          <p>{title}</p>
          <img className="rounded" alt={title} src={img} />
          {!!link && (
            <p>
              <a href={link} target="_new">
                <span dangerouslySetInnerHTML={{ __html: t(`media.${linkTitle}`) }}></span>
              </a>
            </p>
          )}
        </div>
      );
    });
  }, [t]);

  return (
    <section className="container">
      <Title titleId="media.title" />
      <div className="row">
        <div className="col-12">
          <Chrono
            items={dotItems}
            hideControls={1}
            mode="VERTICAL_ALTERNATING"
            theme={{
              cardBgColor: "transparent",
              primary: "#979797",
              secondary: "transparent", //"#001418",
              //   cardForeColor: "violet"
            }}
          >
            {items}
          </Chrono>
        </div>
      </div>
    </section>
  );
}

export default MediaPage;
