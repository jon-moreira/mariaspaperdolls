import React from "react";

import BackButton from "../components/BackButton";
import Catalog from "../components/Catalog";
import Title from "../components/Title";

function CatalogPage(props) {
  const area = props.match.path.substr(props.match.path.lastIndexOf("/") + 1);

  return (
    <section className="container catalog">
      <Title titleId={`elements.${area}`} />
      <Catalog {...props} />
      <BackButton />
    </section>
  );
}

export default CatalogPage;
