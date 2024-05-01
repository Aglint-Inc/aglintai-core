"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DashboardWarning.module.css";

export function DashboardWarning({
  as: _Component = _Builtin.Block,
  onClickDismiss = {},
  onClickView = {},
  textWarningTitle = "Job description is changed",
  textDesc = "You may need to adjust the criteria for profile scoring.",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "bannner_wrap", "is_warning")}
      tag="div"
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_flex")}
        id={_utils.cx(
          _styles,
          "w-node-a3c64be4-07cc-f461-ae20-1c08276e82ee-276e82ed"
        )}
        value="%3Csvg%20width%3D%2248%22%20height%3D%2248%22%20viewBox%3D%220%200%2048%2048%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M24%2040C21.0833%2039.9583%2018.4167%2039.25%2016%2037.875C13.5833%2036.4583%2011.625%2034.5%2010.125%2032C8.70833%2029.4583%208%2026.7917%208%2024C8%2021.2083%208.70833%2018.5417%2010.125%2016C11.625%2013.5%2013.5833%2011.5417%2016%2010.125C18.4167%208.75%2021.0833%208.04167%2024%208C26.9167%208.04167%2029.5833%208.75%2032%2010.125C34.4167%2011.5417%2036.375%2013.5%2037.875%2016C39.2917%2018.5417%2040%2021.2083%2040%2024C40%2026.7917%2039.2917%2029.4583%2037.875%2032C36.375%2034.5%2034.4167%2036.4583%2032%2037.875C29.5833%2039.25%2026.9167%2039.9583%2024%2040ZM21.5%2029C20.5833%2029.0833%2020.0833%2029.5833%2020%2030.5C20.0833%2031.4167%2020.5833%2031.9167%2021.5%2032H26.5C27.4167%2031.9167%2027.9167%2031.4167%2028%2030.5C27.9167%2029.5833%2027.4167%2029.0833%2026.5%2029H26V23.5C25.9167%2022.5833%2025.4167%2022.0833%2024.5%2022H21.5C20.5833%2022.0833%2020.0833%2022.5833%2020%2023.5C20.0833%2024.4167%2020.5833%2024.9167%2021.5%2025H23V29H21.5ZM24%2016C23.4167%2016%2022.9375%2016.1875%2022.5625%2016.5625C22.1875%2016.9375%2022%2017.4167%2022%2018C22%2018.5833%2022.1875%2019.0625%2022.5625%2019.4375C22.9375%2019.8125%2023.4167%2020%2024%2020C24.5833%2020%2025.0625%2019.8125%2025.4375%2019.4375C25.8125%2019.0625%2026%2018.5833%2026%2018C26%2017.4167%2025.8125%2016.9375%2025.4375%2016.5625C25.0625%2016.1875%2024.5833%2016%2024%2016Z%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3C%2Fsvg%3E"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "banner_flex")}
        id={_utils.cx(
          _styles,
          "w-node-a3c64be4-07cc-f461-ae20-1c08276e82ef-276e82ed"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "banner_text_wrapper")}
          id={_utils.cx(
            _styles,
            "w-node-a3c64be4-07cc-f461-ae20-1c08276e82f0-276e82ed"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {textWarningTitle}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{textDesc}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "right_buttons")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-block-29", "cursor-pointer")}
            tag="div"
            {...onClickDismiss}
          >
            {"Ignore"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "button_primary")}
            tag="div"
            {...onClickView}
          >
            <_Builtin.Block tag="div">
              {"View"}
              <br />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
