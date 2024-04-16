"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewRatio.module.css";

export function InterviewRatio({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "div-block-1464")}
      id={_utils.cx(
        _styles,
        "w-node-_48316e3f-68f1-8ccc-8fa3-ec4c80bf3fc0-80bf3fc0"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1465")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Interview to offer ratio"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey_600")}
          tag="div"
        >
          {
            "Ratio of candidates advancing after interviews to the number of schedules."
          }
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Image
          className={_utils.cx(_styles, "image-28")}
          loading="lazy"
          width="auto"
          height="auto"
          alt=""
          src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/661e1bf3d1a301e194bfb2cc_Chart%20(1).png"
        />
      </_Builtin.Block>
    </_Component>
  );
}
