import React from "react";
import * as _Builtin from "./_Builtin";
import { CompanyProfileHeader } from "./CompanyProfileHeader";
import * as _utils from "./utils";
import _styles from "./RecSideNavProfileBlock.module.css";

export function RecSideNavProfileBlock({
  as: _Component = _Builtin.Block,
  slotCompanyList,
  onclickAdd = {},
  backdropProps = {},
  onclickDropdown = {},
  isDropdownBodyVisible = false,
  slotSelectedCompanyLogo,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "comp-switch-dropdown")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cs-dropdown-trigger")}
        tag="div"
        {...onclickDropdown}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-company-image")}
          tag="div"
        >
          {slotSelectedCompanyLogo}
        </_Builtin.Block>
      </_Builtin.Block>
      {isDropdownBodyVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-dropdown-body")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cs-company-list-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cs-company-list")}
              tag="div"
            >
              {slotCompanyList ?? (
                <>
                  <CompanyProfileHeader />
                  <CompanyProfileHeader />
                </>
              )}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cs-company-add-btn", "clickable")}
              tag="div"
              {...onclickAdd}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "icon-block", "_30x30", "rs-add")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "svg-icon")}
                  value="%3Csvg%20width%3D%2213%22%20height%3D%2212%22%20viewbox%3D%220%200%2013%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.93753%200.499999V5.3125H11.75C12.0235%205.33073%2012.1693%205.47656%2012.1875%205.75C12.1693%206.02344%2012.0235%206.16927%2011.75%206.1875H6.93753V11C6.9193%2011.2734%206.77347%2011.4193%206.50003%2011.4375C6.22659%2011.4193%206.08076%2011.2734%206.06253%2011V6.1875H1.25003C0.976593%206.16927%200.830759%206.02344%200.81253%205.75C0.830759%205.47656%200.976593%205.33073%201.25003%205.3125H6.06253V0.499999C6.08076%200.226562%206.22659%200.0807284%206.50003%200.0624993C6.77347%200.0807284%206.9193%200.226562%206.93753%200.499999Z%22%20fill%3D%22white%22%20style%3D%22fill%3Awhite%3Bfill%3Awhite%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block tag="div">{"Add Company"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
