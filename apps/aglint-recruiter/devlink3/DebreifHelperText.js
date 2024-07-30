"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./DebreifHelperText.module.css";

export function DebreifHelperText({
  as: _Component = _Builtin.Block,
  onClickArrow = {},
  styleWidth = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "debrief-helper-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "dh-width-wrap")}
        tag="div"
        {...styleWidth}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "debrief-helper-sub-wrap")}
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
              <Text
                size="2"
                content="Guide to Using Debrief Defaults in Aglint Ai "
              />
            </_Builtin.Block>
            <Text
              weight="medium"
              content="Debrief Defaults: Setting Up Company-Wide Scheduling Preferences"
            />
            <Text
              weight="regular"
              color="neutral"
              content="Aglint AI allows you to set up default company-wide settings for scheduling debrief sessions, saving time and ensuring consistency. Here’s how to use and customize the Debrief Defaults feature:"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "debrief-info-block", "is_grey")}
            tag="div"
          >
            <Text
              weight="medium"
              content="Accessing Debrief Defaults Settings"
            />
            <_Builtin.List
              className={_utils.cx(_styles, "debrief-list")}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem>
                {
                  "Navigate to the company settings in your Aglint AI dashboard."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                {"Locate the Debrief Defaults section."}
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "debrief-info-block", "is_grey")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "debrief-info-text-wrap")}
              tag="div"
            >
              <Text weight="medium" content="Configuring Default Roles" />
              <Text
                weight=""
                content="In the Debrief Defaults section, you can set the default participants for debrief sessions. Toggle the switch to turn on or off the inclusion of each role:"
                color="neutral"
              />
            </_Builtin.Block>
            <_Builtin.List
              className={_utils.cx(_styles, "debrief-list")}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Hiring Manager:"}
                </_Builtin.Span>
                {
                  " Turn on/off to include/exclude the hiring manager in debrief sessions."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Recruiter:"}
                </_Builtin.Span>
                {
                  " Turn on/off to include/exclude the recruiter in debrief sessions."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Recruiting Coordinator:"}
                </_Builtin.Span>
                {
                  " Turn on/off to include/exclude the recruiting coordinator in debrief sessions."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Sourcer:"}
                </_Builtin.Span>
                {
                  " Turn on/off to include/exclude the sourcer in debrief sessions."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Previous Interviewers: "}
                </_Builtin.Span>
                {
                  "Turn on/off to include/exclude previous interviewers in debrief sessions."
                }
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "debrief-info-block", "is_grey")}
            tag="div"
          >
            <Text weight="medium" content="How It Works" />
            <Text
              weight=""
              content="When any of these options are turned on, users assigned these roles in the job settings will be automatically added to the debrief session when scheduling from the scheduling module."
              color="neutral"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "debrief-info-block", "is_grey")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "debrief-info-text-wrap")}
              tag="div"
            >
              <Text weight="medium" content="Configuring Default Roles" />
            </_Builtin.Block>
            <_Builtin.List
              className={_utils.cx(_styles, "debrief-list")}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Automatic Inclusion:"}
                </_Builtin.Span>
                {
                  " When you schedule a debrief session, the default roles you’ve turned on will automatically be included."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Override Defaults:"}
                </_Builtin.Span>
                {
                  " Before confirming the debrief schedule, you can manually adjust the participants. This feature allows you to add or remove users as needed, providing flexibility beyond the default settings."
                }
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "debrief-info-block", "is_grey")}
            tag="div"
          >
            <Text weight="medium" content="Job-Level Adjustments" />
            <_Builtin.List
              className={_utils.cx(_styles, "debrief-list")}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem>
                {
                  "You can also adjust these default settings when setting up the interview plan at the job level."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                {
                  "This ensures that specific job requirements are met while maintaining overall consistency with the company-wide settings."
                }
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "debrief-info-block", "is_grey")}
            tag="div"
          >
            <Text
              weight="medium"
              content="Saving Time and Ensuring Consistency"
            />
            <Text
              weight=""
              content="Using the Debrief Defaults feature, you streamline the process of configuring and scheduling debrief sessions. By setting these preferences at the company level, you save time and reduce the need for manual adjustments, while still retaining the flexibility to tailor each debrief session to specific needs."
              color="neutral"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "debrief-info-block")}
            tag="div"
          >
            <Text
              weight=""
              color="neutral"
              content="By following these steps, you can effectively utilize the Debrief Defaults feature in Aglint AI to enhance your scheduling process."
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
