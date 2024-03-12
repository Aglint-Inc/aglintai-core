import React from "react";
import * as _Builtin from "./_Builtin";
import { TextWithBg } from "./TextWithBg";
import * as _utils from "./utils";
import _styles from "./AllInterviewersCard.module.css";

export function AllInterviewersCard({
  as: _Component = _Builtin.Block,
  slotProfileImage,
  textName = "Westly Snedger",
  textUpcomingInterviews = "3",
  textCompletedInterviews = "3",
  slotInterviewModules,
  textRole = "Software",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1143", "", "dec-width")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1144")}
        id={_utils.cx(
          _styles,
          "w-node-_23fa5a49-b85f-659d-e893-4735fbc243b5-fbc243b4"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1145", "width-24")}
          id={_utils.cx(
            _styles,
            "w-node-_23fa5a49-b85f-659d-e893-4735fbc243b6-fbc243b4"
          )}
          tag="div"
        >
          {slotProfileImage}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1223")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {textName}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600")}
            tag="div"
          >
            {textRole}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1144")}
        id={_utils.cx(
          _styles,
          "w-node-_23fa5a49-b85f-659d-e893-4735fbc243b9-fbc243b4"
        )}
        tag="div"
      >
        <_Builtin.Block tag="div">{textUpcomingInterviews}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1144")}
        id={_utils.cx(
          _styles,
          "w-node-_23fa5a49-b85f-659d-e893-4735fbc243bc-fbc243b4"
        )}
        tag="div"
      >
        <_Builtin.Block tag="div">{textCompletedInterviews}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-interview-module")}
        id={_utils.cx(
          _styles,
          "w-node-_23fa5a49-b85f-659d-e893-4735fbc243bf-fbc243b4"
        )}
        tag="div"
      >
        {slotInterviewModules ?? <TextWithBg />}
      </_Builtin.Block>
    </_Component>
  );
}
