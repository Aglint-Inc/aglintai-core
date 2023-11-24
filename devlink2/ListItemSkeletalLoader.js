import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ListItemSkeletalLoader.module.css";

export function ListItemSkeletalLoader({
  as: _Component = _Builtin.Block,
  isListTopBarVisible = true,
  onclickSelectAll = {},
  isInterviewVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "cv-list-row")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-list-column", "checkbox")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-skeletal-block")}
          tag="div"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-list-row-main")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "name", "skeletal")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-skeletal-block")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-skeletal-block", "overlay")}
            tag="div"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "title")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-skeletal-block")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-skeletal-block", "overlay")}
            tag="div"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "score")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-skeletal-block")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-skeletal-block", "overlay")}
            tag="div"
          />
        </_Builtin.Block>
        {isInterviewVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column", "score")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-skeletal-block")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-skeletal-block", "overlay")}
              tag="div"
            />
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "email")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-skeletal-block")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-skeletal-block", "overlay")}
            tag="div"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "phone")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-skeletal-block")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-skeletal-block", "overlay")}
            tag="div"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "date")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-skeletal-block")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-skeletal-block", "overlay")}
            tag="div"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
