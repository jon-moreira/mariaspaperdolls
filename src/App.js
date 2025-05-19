import React from "react";
import { useTranslation } from "react-i18next";

import "./App.css";

function App() {
  const { t } = useTranslation();

  return (
    <section className="container home">
      <div className="justify-content-center media">
        <video
          disablePictureInPicture
          controls
          controlsList="nodownload"
          className="videoPlayer"
          autoPlay
          muted
          playsInline
          src="./videos/marias-intro.mp4"
        >
          Your browser doesn’t support video playback.
        </video>
      </div>
      <div className="row">
          <div
            className="col-10 offset-1 description"
            dangerouslySetInnerHTML={{ __html: t("home.description") }}
          />
        </div>
    </section>
  );
}

export default App;