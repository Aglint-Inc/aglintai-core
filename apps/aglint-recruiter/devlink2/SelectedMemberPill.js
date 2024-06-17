"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./SelectedMemberPill.module.css";

export function SelectedMemberPill({
  as: _Component = _Builtin.Block,
  isReverseShadow = false,
  isShadow = false,
  slotMemberAvatar,
  onClickRemove = {},
  textMemberName = "Chinmai (You)",
  isCloseButton = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "avatar_selectionpill")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "avatar_block")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "slot_avatar")} tag="div">
          {slotMemberAvatar ?? <SlotComp componentName="Avatar" />}
        </_Builtin.Block>
        {isShadow ? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "shadow_embed")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.285714%22%20y%3D%220.285714%22%20width%3D%2215.4286%22%20height%3D%2215.4286%22%20rx%3D%227.71429%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.285714%22%20y%3D%220.285714%22%20width%3D%2215.4286%22%20height%3D%2215.4286%22%20rx%3D%227.71429%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.571429%22%20stroke-miterlimit%3D%221.30541%22%20stroke-dasharray%3D%222.29%202.29%22%2F%3E%0A%3Cpath%20d%3D%22M7.97656%2012.3594C6.10156%2012.3594%204.8125%2011.4531%204.65625%2010.0625H6.04688C6.27344%2010.7656%206.94531%2011.2266%208.02344%2011.2266C9.15625%2011.2266%209.96094%2010.6875%209.96094%209.92188V9.90625C9.96094%209.33594%209.53125%208.9375%208.49219%208.6875L7.1875%208.375C5.60938%208%204.89844%207.3125%204.89844%206.10156V6.09375C4.89844%204.69531%206.24219%203.64062%208.03125%203.64062C9.79688%203.64062%2011.0234%204.52344%2011.2109%205.89844H9.875C9.69531%205.23438%209.03906%204.77344%208.02344%204.77344C7.02344%204.77344%206.28906%205.28906%206.28906%206.03125V6.04688C6.28906%206.61719%206.71094%206.97656%207.70313%207.21875L9%207.53125C10.5859%207.91406%2011.3516%208.60156%2011.3516%209.80469V9.82031C11.3516%2011.3203%209.89063%2012.3594%207.97656%2012.3594Z%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        ) : null}
        {isReverseShadow ? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "shadow_embed")}
            value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewbox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%221.26667%22%20y%3D%221.26667%22%20width%3D%2215.4667%22%20height%3D%2215.4667%22%20rx%3D%227.73333%22%20stroke%3D%22white%22%20stroke-width%3D%220.533333%22%2F%3E%0A%3Crect%20x%3D%220.714286%22%20y%3D%220.714286%22%20width%3D%2216.5714%22%20height%3D%2216.5714%22%20rx%3D%228.28571%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3Crect%20x%3D%220.714286%22%20y%3D%220.714286%22%20width%3D%2216.5714%22%20height%3D%2216.5714%22%20rx%3D%228.28571%22%20stroke%3D%22%23F5FCFC%22%20stroke-width%3D%220.571429%22%20stroke-miterlimit%3D%221.30541%22%2F%3E%0A%3Cpath%20d%3D%22M6.04688%2013.0503V4.95312H9.13874C10.6987%204.95312%2011.72%205.90706%2011.72%207.3604V7.37163C11.72%208.4939%2011.1083%209.36928%2010.0927%209.68912L11.9669%2013.0503H10.7829L9.04896%209.84624H7.05692V13.0503H6.04688ZM7.05692%208.94842H9.04896C10.0871%208.94842%2010.6763%208.3929%2010.6763%207.4053V7.39407C10.6763%206.42892%2010.0478%205.85094%209.00407%205.85094H7.05692V8.94842Z%22%20fill%3D%22%23F5FCFC%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        ) : null}
      </_Builtin.Block>
      <Text content={textMemberName} weight="" />
      {isCloseButton ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "close_btn")}
          tag="div"
          {...onClickRemove}
        >
          <GlobalIcon iconName="close" size="3" weight="medium" />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
