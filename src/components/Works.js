import React, { useEffect } from "react";
import Elements from "./Elements";

function Works() {
  useEffect(() => {
    //Set image bg
    var bgObj = document.querySelectorAll(".set-bg");

    for (let i = 0; i < bgObj.length; i++) {
      bgObj[i].style.backgroundImage =
        "url(" + bgObj[i].getAttribute("setbg") + ")";
    }
  });

  return (
    <main className="working-section">
        <div className="row working-area">
          <Elements baseUrl="works" dataValue="works" />
        </div>
      </main>
  );
}

export default Works;