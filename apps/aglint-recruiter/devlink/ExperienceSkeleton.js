"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ExperienceSkeleton.module.css";

export function ExperienceSkeleton({
  as: _Component = _Builtin.Block,
  slotLoader,
}) {
  return (
    <_Component className={_utils.cx(_styles, "experience_item")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_company_logo")}
        tag="div"
      >
        <_Builtin.HFlex
          className={_utils.cx(_styles, "ske_icon_block")}
          tag="div"
        >
          {slotLoader ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_skeleton")}
              tag="div"
            />
          )}
        </_Builtin.HFlex>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "exp_info")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "ske_text_regular", "width_200")}
          tag="div"
        >
          {slotLoader ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_skeleton")}
              tag="div"
            />
          )}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "exp_details")} tag="div">
          <_Builtin.Block className={_utils.cx(_styles, "flex-h4")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "ske_icon_15")}
              tag="div"
            >
              {slotLoader ?? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "dummy_skeleton")}
                  tag="div"
                />
              )}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ske_text_small", "width_100px")}
              tag="div"
            >
              {slotLoader ?? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "dummy_skeleton")}
                  tag="div"
                />
              )}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "flex-h4")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "ske_icon_15")}
              tag="div"
            >
              {slotLoader ?? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "dummy_skeleton")}
                  tag="div"
                />
              )}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ske_text_small", "width_100px")}
              tag="div"
            >
              {slotLoader ?? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "dummy_skeleton")}
                  tag="div"
                />
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
