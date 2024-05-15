import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ImportJobCard.module.css";

export function ImportJobCard({
  as: _Component = _Builtin.Block,
  slotCompanyLogo,
  textHeader = "Import Job from Greenhouse",
  textDescription = "Enter your Greenhouse API key. Your job listings will be automatically synced.",
  bgColorProps = {},
  onClickCard = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cj-option-block", "grey")}
      tag="div"
      {...bgColorProps}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cj-option-icon-block")}
        tag="div"
      >
        {slotCompanyLogo}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cj-option-info")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textHeader}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {textDescription}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "click-fake-div")}
        tag="div"
        {...onClickCard}
      />
    </_Component>
  );
}
