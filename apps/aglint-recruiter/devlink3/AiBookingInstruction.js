"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./AiBookingInstruction.module.css";

export function AiBookingInstruction({
  as: _Component = _Builtin.Block,
  slotTextArea,
}) {
  return (
    <_Component className={_utils.cx(_styles, "ai-booking-inst")} tag="div">
      <Text
        content="These instructions will guide the selection of interviewers or specify any preferences for the selection within this module."
        weight="regular"
      />
      <_Builtin.Block tag="div">{slotTextArea}</_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "ai-booking-sample")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ats-sync-item-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "global_text")}
              tag="div"
              text-align="left"
              fontSize="2"
              fontWeight="regular"
              font-color="accent"
              high-contrast="false"
            >
              {"How to Use:"}
            </_Builtin.Block>
            <_Builtin.List
              className={_utils.cx(_styles, "ats-sync-list-item")}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem>
                {
                  "Mention ‘@’ interviewer name if you want to set a preference to the interviewer."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                {"Add preference in a simple sentence"}
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ats-sync-item-smaple")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "global_text")}
              tag="div"
              text-align="left"
              fontSize="2"
              fontWeight="regular"
              font-color="neutral"
              high-contrast="false"
            >
              {"Example:"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "global_text")}
              tag="div"
              text-align="left"
              fontSize="2"
              fontWeight="regular"
              font-color="neutral-12"
              high-contrast="false"
            >
              {
                "Always consider @Sara Conor as the interviewer. consider @Marc West only if @Sara is not available."
              }
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./AiBookingInstruction.module.css";

export function AiBookingInstruction({
  as: _Component = _Builtin.Block,
  slotTextArea,
}) {
  return (
    <_Component className={_utils.cx(_styles, "ai-booking-inst")} tag="div">
      <Text
        content="These instructions will guide the selection of interviewers or specify any preferences for the selection within this module."
        weight="regular"
      />
      <_Builtin.Block tag="div">{slotTextArea}</_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "ai-booking-sample")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ats-sync-item-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "global_text")}
              tag="div"
              text-align="left"
              fontSize="2"
              fontWeight="regular"
              font-color="accent"
              high-contrast="false"
            >
              {"How to Use:"}
            </_Builtin.Block>
            <_Builtin.List
              className={_utils.cx(_styles, "ats-sync-list-item")}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem>
                {
                  "Use these instructions to balance interview load, ensure diverse evaluations, and avoid conflicts."
                }
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ats-sync-item-smaple")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "global_text")}
              tag="div"
              text-align="left"
              fontSize="2"
              fontWeight="regular"
              font-color="neutral"
              high-contrast="false"
            >
              {"Example:"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "global_text")}
              tag="div"
              text-align="left"
              fontSize="2"
              fontWeight="regular"
              font-color="neutral-12"
              high-contrast="false"
            >
              {
                "Rotate interviewers to ensure diverse perspectives and assign technical interviews to senior team members."
              }
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
