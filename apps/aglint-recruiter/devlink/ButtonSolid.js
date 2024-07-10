"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./ButtonSolid.module.css";

export function ButtonSolid({
  as: _Component = _Builtin.Block,
  onClickButton = {},
  size = "1",
  color = "accent",
  highContrast = "false",
  isLeftIcon = false,
  slotIcon,
  textButton = "Button Text",
  isRightIcon = false,
  isDisabled = false,
  isLoading = false,
  iconName = "shapes",
  iconSize = "4",
  iconColor = "inherit",
  iconWeight = "medium",
}) {
  return (
    <_Component className={_utils.cx(_styles, "radix-button")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "default_state")}
        tag="div"
        button-size-solid={size}
        button-color-solid={color}
        button-high-contrast-solid={highContrast}
        {...onClickButton}
      >
        {isLeftIcon ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "align-items-center")}
            tag="div"
          >
            {slotIcon ?? (
              <GlobalIcon
                size={iconSize}
                iconName={iconName}
                color={iconColor}
                weight={iconWeight}
              />
            )}
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block tag="div">
          <_Builtin.Block tag="div">{textButton}</_Builtin.Block>
        </_Builtin.Block>
        {isRightIcon ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "align-items-center")}
            tag="div"
          >
            {slotIcon ?? (
              <GlobalIcon
                size={iconSize}
                iconName={iconName}
                weight={iconWeight}
                color={iconColor}
              />
            )}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isDisabled ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "disabled_state")}
          tag="div"
          button-size-solid={size}
        >
          {isLeftIcon ? (
            <_Builtin.Block tag="div">
              {slotIcon ?? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icon_placeholder")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22currentColor%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.19995%209.59961C3.19995%206.93294%204.79995%204.53294%207.99995%201.59961C11.2%204.53294%2012.8%206.93294%2012.8%209.59961C12.8%2012.2506%2010.6509%2014.3996%207.99995%2014.3996C5.34899%2014.3996%203.19995%2012.2506%203.19995%209.59961ZM11.6825%208.85622C10.3183%208.34223%208.84038%209.02583%207.45548%209.66637C6.32816%2010.1878%205.26251%2010.6807%204.37003%2010.4759C4.30243%2010.1949%204.26662%209.90141%204.26662%209.59961C4.26662%207.58578%205.36194%205.62302%207.99995%203.06475C10.3129%205.30776%2011.44%207.09299%2011.6825%208.85622Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              )}
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block tag="div">{textButton}</_Builtin.Block>
          {isRightIcon ? (
            <_Builtin.Block tag="div">
              {slotIcon ?? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icon_placeholder")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22currentColor%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.19995%209.59961C3.19995%206.93294%204.79995%204.53294%207.99995%201.59961C11.2%204.53294%2012.8%206.93294%2012.8%209.59961C12.8%2012.2506%2010.6509%2014.3996%207.99995%2014.3996C5.34899%2014.3996%203.19995%2012.2506%203.19995%209.59961ZM11.6825%208.85622C10.3183%208.34223%208.84038%209.02583%207.45548%209.66637C6.32816%2010.1878%205.26251%2010.6807%204.37003%2010.4759C4.30243%2010.1949%204.26662%209.90141%204.26662%209.59961C4.26662%207.58578%205.36194%205.62302%207.99995%203.06475C10.3129%205.30776%2011.44%207.09299%2011.6825%208.85622Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              )}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
      {isLoading ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "loading_state")}
          tag="div"
          button-size-solid={size}
        >
          <_Builtin.Block tag="div">
            <_Builtin.Image
              className={_utils.cx(_styles, "loader_place_holder")}
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/665d7ff94b360c4b8af3b8f8_kOnzy.gif"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
