import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CompanyListingLinks.module.css";

export function CompanyListingLinks({
  as: _Component = _Builtin.Block,
  textLinkName = "Website",
  slotIcon,
  onClickLink = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "company-list-pill")}
      tag="div"
      {...onClickLink}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-icons-links")}
        tag="div"
      >
        {slotIcon}
      </_Builtin.Block>
      <_Builtin.Block tag="div">{textLinkName}</_Builtin.Block>
    </_Component>
  );
}
