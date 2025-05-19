import React, { useEffect } from "react";
import Elements from "./Elements";

function Catalog(props) {
  const area = props.match.path.substr(props.match.path.lastIndexOf("/") + 1);

  useEffect(() => {
    //Set image bg
    var bgObj = document.querySelectorAll(".set-bg");

    for (let i = 0; i < bgObj.length; i++) {
      bgObj[i].style.backgroundImage =
        "url(" + bgObj[i].getAttribute("setbg") + ")";
    }
  });

  return (
    <main className="catalog-section">
      <div className={`row ${area}-area`}>
        <Elements baseUrl={`works/${area}`} dataValue={area} />
      </div>
    </main>
  );
}

export default Catalog;
