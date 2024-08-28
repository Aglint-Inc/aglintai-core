"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Breadcrum } from "./Breadcrum";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./PageLayout.module.css";

export function PageLayout({
  as: _Component = _Builtin.Block,
  slotTopbarLeft,
  slotTopbarRight,
  slotBody,
  isBackButton = false,
  onClickBack = {},
  slotSaving,
  isHeaderDividerVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "page_layout")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "pagelayout_topbar")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "top_left")} tag="div">
          {isBackButton ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "back_button", "cursor-pointer")}
              tag="div"
              {...onClickBack}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8.35355%201.64645C8.52712%201.82001%208.5464%202.08944%208.41141%202.28431L8.35355%202.35355L4.707%206L8.35355%209.64645C8.52712%209.82001%208.5464%2010.0894%208.41141%2010.2843L8.35355%2010.3536C8.17999%2010.5271%207.91056%2010.5464%207.71569%2010.4114L7.64645%2010.3536L3.64645%206.35355C3.47288%206.17999%203.4536%205.91056%203.58859%205.71569L3.64645%205.64645L7.64645%201.64645C7.84171%201.45118%208.15829%201.45118%208.35355%201.64645Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "text-gray-600")}
                tag="div"
              >
                {"Back"}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "topbar_left")}
            tag="div"
          >
            {slotTopbarLeft ?? <Breadcrum textName="page header" />}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "topbar_right")}
          tag="div"
        >
          {slotTopbarRight}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "autosave_widget")}
          tag="div"
        >
          {slotSaving}
        </_Builtin.Block>
        {isHeaderDividerVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "divider-x")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-body-global")}
        tag="div"
      >
        {slotBody ?? <SlotComp componentName="slot for any body element" />}
      </_Builtin.Block>
    </_Component>
  );
}
