import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ResponsiveBanner.module.css";

export function ResponsiveBanner({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "responsive_banner")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "banner_wrap")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "banner_icon")} tag="div">
          <_Builtin.Image
            loading="lazy"
            width="auto"
            height="auto"
            alt="computer "
            src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/65b10152afa8fa3df2e79bdd_Computer.svg"
          />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "banner_text")} tag="div">
          <_Builtin.Block tag="div">
            {"Please open on desktop for a better view."}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {"Your window is too small for optimal use of aglint."}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
