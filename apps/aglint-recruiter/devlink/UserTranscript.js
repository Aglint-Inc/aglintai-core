"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { IconChevronDown } from "./IconChevronDown";
import * as _utils from "./utils";
import _styles from "./UserTranscript.module.css";

export function UserTranscript({
  as: _Component = _Builtin.Block,
  slotUserImage,
  userTextName = "You",
  slotUserPlayButton,
  textAnswer = "Interviewer : Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
}) {
  return (
    <_Component className={_utils.cx(_styles, "transcript-toggle")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "interviewer-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "interviewer-sub-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-305")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "interviewer-pics-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "slot-image-transcript")}
                tag="div"
              >
                {slotUserImage}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "color-grey-700")}
                tag="div"
              >
                {userTextName}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-button", "cdd")}
              tag="div"
            >
              {slotUserPlayButton}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cdd-transcript-text", "grey-100")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-md", "color-grey-700")}
              tag="div"
            >
              {textAnswer}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "transcript-chevron")}
        tag="div"
      >
        <IconChevronDown />
      </_Builtin.Block>
    </_Component>
  );
}