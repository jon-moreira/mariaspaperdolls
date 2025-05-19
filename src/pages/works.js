import React from "react";

import Title from "../components/Title";
import Works from "../components/Works";

function WorksPage() {
  return (
    <section className="container works">
      <Title titleId="works" />
      <Works />
    </section>
  );
}
export default WorksPage;
