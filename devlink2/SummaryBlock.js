import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SummaryBlock.module.css";

export function SummaryBlock({
  as: _Component = _Builtin.Block,
  title = "Overview",
  description = "Eike led software as a Senior System Software Engineer at NVIDIA Corporation, specializing in autonomous vehicles.",
  descriptionTextProps = {},
  wrapperProps = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cvs-intro-overview-block")}
      tag="div"
      {...wrapperProps}
    >
      <_Builtin.Block className={_utils.cx(_styles, "cvs-intro-top")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "icon-block")} tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon-embed")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip0_3341_29934)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12.667%206.00008L13.5003%204.16675L15.3337%203.33341L13.5003%202.50008L12.667%200.666748L11.8337%202.50008L10.0003%203.33341L11.8337%204.16675L12.667%206.00008ZM7.66699%206.33342L6.00033%202.66675L4.33366%206.33342L0.666992%208.00008L4.33366%209.66675L6.00033%2013.3334L7.66699%209.66675L11.3337%208.00008L7.66699%206.33342ZM12.667%2010.0001L11.8337%2011.8334L10.0003%2012.6667L11.8337%2013.5001L12.667%2015.3334L13.5003%2013.5001L15.3337%2012.6667L13.5003%2011.8334L12.667%2010.0001Z%22%20fill%3D%22%2317494D%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cclippath%20id%3D%22clip0_3341_29934%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2Fclippath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-kale-800")}
          tag="div"
        >
          {title}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Paragraph
        className={_utils.cx(_styles, "text-kale-600")}
        {...descriptionTextProps}
      >
        {description}
      </_Builtin.Paragraph>
    </_Component>
  );
}
