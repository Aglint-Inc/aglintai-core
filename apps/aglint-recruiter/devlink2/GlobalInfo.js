"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TextWithIcon } from "./TextWithIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./GlobalInfo.module.css";

export function GlobalInfo({
  as: _Component = _Builtin.Block,
  textTitle = "How it Works",
  textDescription = "The interview is complete. Click the button for requesting interviewer feedback.",
  iconName = "info",
  color = "neutral",
  slotWidget,
  showWidget = false,
  showDescription = true,
  onClickClose = {},
  showCloseButton = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "global_banner")}
      id={_utils.cx(
        _styles,
        "w-node-_8bbee309-4a2b-c35e-9a03-3f599e1158c1-9e1158c1"
      )}
      tag="div"
      data-banner-color={color}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "info_main_block")}
        tag="div"
      >
        <TextWithIcon
          iconName={iconName}
          textContent={textTitle}
          iconSize="3"
          fontWeight="medium"
          color="inherit"
        />
        {showDescription ? (
          <_Builtin.Block tag="div">
            <Text content={textDescription} color="neutral" weight="" />
          </_Builtin.Block>
        ) : null}
        {showWidget ? (
          <_Builtin.Block tag="div">{slotWidget}</_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {showCloseButton ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "info_close")}
          tag="div"
          {...onClickClose}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2219%22%20height%3D%2219%22%20rx%3D%229.5%22%20fill%3D%22currentColor%22%2F%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2219%22%20height%3D%2219%22%20rx%3D%229.5%22%20stroke%3D%22%23DAD9D6%22%2F%3E%0A%3Cmask%20id%3D%22mask0_4585_227390%22%20style%3D%22mask-type%3Aalpha%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%224%22%20y%3D%224%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%3Crect%20x%3D%224%22%20y%3D%224%22%20width%3D%2212%22%20height%3D%2212%22%20fill%3D%22%23D9D9D9%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask0_4585_227390)%22%3E%0A%3Cpath%20d%3D%22M10%2010.5266L7.46351%2013.0633C7.39426%2013.1324%207.30721%2013.1678%207.20238%2013.1695C7.09763%2013.1711%207.00901%2013.1357%206.93651%2013.0633C6.86409%2012.9908%206.82788%2012.9029%206.82788%2012.7998C6.82788%2012.6966%206.86409%2012.6088%206.93651%2012.5363L9.47313%209.99976L6.93651%207.46326C6.86734%207.39401%206.83192%207.30697%206.83026%207.20214C6.82867%207.09739%206.86409%207.00876%206.93651%206.93626C7.00901%206.86385%207.09684%206.82764%207.20001%206.82764C7.30317%206.82764%207.39101%206.86385%207.46351%206.93626L10%209.47289L12.5365%206.93626C12.6058%206.8671%2012.6928%206.83168%2012.7976%206.83001C12.9024%206.82843%2012.991%206.86385%2013.0635%206.93626C13.1359%207.00876%2013.1721%207.0966%2013.1721%207.19976C13.1721%207.30293%2013.1359%207.39076%2013.0635%207.46326L10.5269%209.99976L13.0635%2012.5363C13.1327%2012.6055%2013.1681%2012.6926%2013.1698%2012.7974C13.1713%2012.9021%2013.1359%2012.9908%2013.0635%2013.0633C12.991%2013.1357%2012.9032%2013.1719%2012.8%2013.1719C12.6968%2013.1719%2012.609%2013.1357%2012.5365%2013.0633L10%2010.5266Z%22%20fill%3D%22%2363635E%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
