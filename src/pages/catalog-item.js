import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Lightbox from "react-image-lightbox";
import "../../node_modules/react-image-lightbox/style.css"; // This only needs to be imported once in your app
import LazyLoad from "react-lazyload";
import { Redirect } from "react-router-dom";
import ReactGA from "react-ga";

import data from "../assets/data.json";

import BackButton from "../components/BackButton";
import Title from "../components/Title";

function CatalogItem(props) {
  const { t } = useTranslation();
  let galleryImages = [];
  let galleryExpositions = [];
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const filter = Object.keys(props.match.params)[0];
  const area = props.match.params[filter];

  const collectionData = useMemo(() => {
    return data[filter].filter((element) => element.name === area);
  }, [area, filter]);

  if (!collectionData.length) {
    return (
      <Redirect
        to={{
          pathname: "/not-found",
        }}
      />
    );
  }

  collectionData.forEach((collection) => {
    collection.images.length &&
      collection.images.forEach((img) => {
        const imgURL =
          process.env.PUBLIC_URL +
          "/imgs/works/" +
          filter +
          "/" +
          area +
          "/" +
          img.src;

        galleryImages.push({ url: imgURL, caption: img.name });
      });

    collection.expositions &&
      collection.expositions.length &&
      collection.expositions.forEach((img) => {
        const imgURL =
          process.env.PUBLIC_URL +
          "/imgs/works/" +
          filter +
          "/" +
          area +
          "/" +
          img.src;

        galleryExpositions.push({ url: imgURL, caption: img.name });
      });
  });

  const handleClick = (event, index, url) => {
    event.preventDefault();
    event.stopPropagation();
    ReactGA.set({ photo: url });
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <section className="container catalog">
      {t(`elements.${area}`) !== `elements.${area}` ? (
        <Title titleId={`elements.${area}`} />
      ) : (
        <Title titleId={`elements.${area}.title`} />
      )}

      {t(`elements.${area}.description`) !== `elements.${area}.description` && (
        <div className="row">
          <div className="col-12 description">
            <span
              dangerouslySetInnerHTML={{
                __html: t(`elements.${area}.description`),
              }}
            />
          </div>
        </div>
      )}

      <div className="row area">
        {galleryImages &&
          galleryImages.map(({ url, caption }, index) => (
            <div
              key={`image-${index + 1}`}
              className="item col-6 col-md-4 col-lg-3 text-center"
            >
              <a href={url} onClick={(event) => handleClick(event, index, url)}>
                <LazyLoad throttle={200}>
                  <img alt={`img-${caption}`} src={url} />
                </LazyLoad>
              </a>
            </div>
          ))}
      </div>
      <div className="row area">
        {galleryExpositions &&
          galleryExpositions.map(({ url, caption }, index) => (
            <div
              key={`image-exhibition-${index + 1}`}
              className="item col-6 col-md-4 col-lg-3 text-center"
            >
              <a href={url} onClick={(event) => handleClick(event, index, url)}>
                <LazyLoad throttle={200}>
                  <img alt={`img-${caption}`} src={url} />
                </LazyLoad>
              </a>
            </div>
          ))}
      </div>

      <BackButton />
      {!!isOpen && (
        <Lightbox
          mainSrc={galleryImages[photoIndex].url}
          nextSrc={galleryImages[(photoIndex + 1) % galleryImages.length].url}
          prevSrc={
            galleryImages[
              (photoIndex + galleryImages.length - 1) % galleryImages.length
            ].url
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + galleryImages.length - 1) % galleryImages.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % galleryImages.length)
          }
          imageTitle={galleryImages[photoIndex].caption}
        />
      )}
    </section>
  );
}

export default CatalogItem;
