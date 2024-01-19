import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonDangerRegular } from "./ButtonDangerRegular";
import * as _utils from "./utils";
import _styles from "./JobDiscardChanges.module.css";

export function JobDiscardChanges({
  as: _Component = _Builtin.Block,
  onClickCancel = {},
  onClickDiscardChanges = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "clear-history-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "clear-history-head")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Discard Changes"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "clear-hisitory-text-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          {
            "By clicking discard changes, all the modifications you've made will be removed, and the content will revert to the last published state."
          }
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "clear-btn-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-600", "cursor-pointer")}
            tag="div"
            {...onClickCancel}
          >
            {"Cancel"}
          </_Builtin.Block>
          <_Builtin.Block tag="div" {...onClickDiscardChanges}>
            <ButtonDangerRegular textLabel="Discard Changes" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
