import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CandidateCard.module.css";

export function CandidateCard({
  as: _Component = _Builtin.Block,
  slotProfileImage,
  textName = "Tom Odel",
  textRole = "Senior software Engineer",
  textMail = "tomode3243@gmaIl.com",
  onClickViewProfile = {},
  isViewProfileVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1232")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
        {"Candidate"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1233")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1235")}
          tag="div"
        >
          {slotProfileImage}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1234")}
          tag="div"
        >
          <_Builtin.Block tag="div">{textName}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm-4", "text-grey-600")}
            tag="div"
          >
            {textRole}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm-4", "text-grey-600")}
            tag="div"
          >
            {textMail}
          </_Builtin.Block>
          {isViewProfileVisible ? (
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-sm-4",
                "text-blue-500",
                "text-underline",
                "cursor-pointer"
              )}
              tag="div"
              {...onClickViewProfile}
            >
              {"View Profile"}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
