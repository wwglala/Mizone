import React from "react";
import { getName } from "@hahaha-ui/utils";

export function Button() {
  if (__DEV__) {
    console.log("======");
  }
  return <div className="a">{getName()}</div>;
}
