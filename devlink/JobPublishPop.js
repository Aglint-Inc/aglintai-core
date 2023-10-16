import React from "react";
import * as _Builtin from "./_Builtin";
import { Checkbox } from "./Checkbox";
import { ButtonPrimarySmall } from "./ButtonPrimarySmall";
import * as _utils from "./utils";
import _styles from "./JobPublishPop.module.css";

export function JobPublishPop({
  as: _Component = _Builtin.Block,
  textLink = "www.google.com/dshbkvhsdbkfhvbksdds..",
  onClickCopy = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "publishing-pop-wrapper")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-482")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-483")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "one-line-clamp")}
            tag="div"
          >
            {textLink}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "copy-publish-wrappers")}
          tag="div"
          {...onClickCopy}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.5%2010C3.77614%2010%204%2010.2239%204%2010.5C4%2010.7761%203.77614%2011%203.5%2011H1C0.447715%2011%200%2010.5523%200%2010V1C0%200.447715%200.447715%200%201%200H10C10.5523%200%2011%200.447715%2011%201V3.5C11%203.77614%2010.7761%204%2010.5%204C10.2239%204%2010%203.77614%2010%203.5V1H1V10H3.5ZM6%206V15H15V6H6ZM6%205H15C15.5523%205%2016%205.44772%2016%206V15C16%2015.5523%2015.5523%2016%2015%2016H6C5.44772%2016%205%2015.5523%205%2015V6C5%205.44772%205.44772%205%206%205Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-485")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-484")}
          tag="div"
        >
          <Checkbox />
          <_Builtin.Block tag="div">{"Activate sourcing"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <ButtonPrimarySmall />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
