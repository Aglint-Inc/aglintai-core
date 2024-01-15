import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CdExperienceCard.module.css";

export function CdExperienceCard({
  as: _Component = _Builtin.Block,
  slotLogo,
  isLogoVisible = true,
  textRole = "Marketing manager @Apple",
  textDate = "3 years (Jan 2017 - Dec 2023)",
  isActive = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "cd-experience-card")} tag="div">
      {isLogoVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-688")}
          tag="div"
        >
          {slotLogo}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "div-block-689")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-color-black")}
          tag="div"
        >
          {textRole}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {textDate}
        </_Builtin.Block>
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cd-experience-active")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
