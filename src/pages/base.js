import React from "react";
import PageLoader from "../components/PageLoader";

function Base() {
  return <PageLoader>{this.props.children}</PageLoader>;
}

export default Base;
