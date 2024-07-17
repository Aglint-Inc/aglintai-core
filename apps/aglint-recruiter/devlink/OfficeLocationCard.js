"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalBadge } from "./GlobalBadge";
import * as _utils from "./utils";
import _styles from "./OfficeLocationCard.module.css";

export function OfficeLocationCard({
  as: _Component = _Builtin.Block,
  textCountry = "Amsterdam",
  textAddress = (
    <>
      {"Keizersgracht 241-2, "}
      <br />
      {"1016 EA Amsterdam, "}
      <br />
      {"Netherlands"}
    </>
  ),
  textHeadquater = "Headquarters",
  isHeadQuaterVisible = true,
  textJobPostCount = "2Job Post",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-430")}
      id={_utils.cx(
        _styles,
        "w-node-_7647a0d8-4712-5784-4dd2-2bfcd85a668e-d85a668e"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "text-regular",
          "fw-semibold",
          "text-kale-800"
        )}
        tag="div"
      >
        {textCountry}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "text-kale-600")} tag="div">
        {textAddress}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "job-post-tag")} tag="div">
        <GlobalBadge textBadge={textJobPostCount} />
      </_Builtin.Block>
    </_Component>
  );
}
