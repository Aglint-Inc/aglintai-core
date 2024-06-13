"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./RadioWithText.module.css";

export function RadioWithText({
  as: _Component = _Builtin.HFlex,
  isSelected = false,
  textRadio = "Radio Text",
  onClickRadio = {},
  isText = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "flex_center")}
      tag="div"
      {...onClickRadio}
    >
      <_Builtin.Block className={_utils.cx(_styles, "radio_wrap")} tag="div">
        {isSelected ? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "radio_active")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%222%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        ) : null}
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "radio_inactive")}
          value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%227.5%22%20fill%3D%22white%22%20stroke%3D%22%23D8DCDE%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
      <Text content={textRadio} weight="" />
    </_Component>
  );
}
