"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./InterviewLoadHelper.module.css";

export function InterviewLoadHelper({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "debrief-helper-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "dh-width-wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "debrief-helper-sub-wrap", "debrief")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "debrief-info-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "title_info")}
              tag="div"
            >
              <Text content="How It Works" />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "debrief-info-block", "is_grey")}
            tag="div"
          >
            <_Builtin.List
              className={_utils.cx(_styles, "debrief-list")}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Daily Limit:"}
                </_Builtin.Span>
                {
                  " Specify the maximum number of interviews or hours an interviewer can handle each day."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Weekly Limit:"}
                </_Builtin.Span>
                {
                  " Set the total number of interviews or hours per week to ensure balanced workloads."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Customization:"}
                </_Builtin.Span>{" "}
                <_Builtin.Strong> </_Builtin.Strong>
                {
                  "Adjust settings for each interviewer based on their capacity and role requirements."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Overrides:"}
                </_Builtin.Span>
                {
                  " You can override these settings in the interviewer settings for personalized scheduling needs."
                }
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
