"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./WorkingHoursHelper.module.css";

export function WorkingHoursHelper({
  as: _Component = _Builtin.Block,
  onClickArrow = {},
  styleWidth = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "debrief-helper-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "dh-width-wrap", "working")}
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
              <Text content="How It Works: Default Time Zone, Working Hours, and Break Times" />
            </_Builtin.Block>
            <Text weight="medium" content="Overview:" />
            <Text
              weight="regular"
              color="neutral"
              content="Aglint AI allows you to set default time zone, working hours, and break times at the organization level. These settings are inherited by all interviewers across different office locations globally, automatically adjusted to the local time of each location. However, you can override these settings at the interviewer level to accommodate individual preferences and needs."
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "debrief-info-block", "is_neutral")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "debrief-info-text-wrap")}
              tag="div"
            >
              <Text weight="medium" content="Working Hours" />
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
                  {"Default Time Zone:"}
                </_Builtin.Span>
                {" Set up your company's default time zone."}
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Default Working Hours:"}
                </_Builtin.Span>
                {
                  " Establish the standard working hours for the entire company."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Default Break Times: "}
                </_Builtin.Span>
                {"Define the standard break times for the company."}
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "debrief-info-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "title_info")}
              tag="div"
            >
              <Text size="2" content="How It Works:" />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "debrief-info-block", "is_neutral")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "debrief-info-text-wrap")}
              tag="div"
            >
              <Text weight="medium" content="Organization Level Settings:" />
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
                  {"Time Zone:"}
                </_Builtin.Span>
                {
                  " The company's default time zone is set here and applied to all interviewers."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Working Hours: "}
                </_Builtin.Span>
                {"The standard working hours for the company are defined here."}
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Break Times:"}
                </_Builtin.Span>
                {" Standard break times for the company are set."}
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "debrief-info-block", "is_neutral")}
            tag="div"
          >
            <Text weight="medium" content="Inheritance:" />
            <_Builtin.List
              className={_utils.cx(_styles, "debrief-list")}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem>
                {
                  "These settings are inherited by each interviewer and automatically adjusted to their local time zone based on their office location."
                }
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "debrief-info-block", "is_neutral")}
            tag="div"
          >
            <Text weight="medium" content="Overrides:" />
            <_Builtin.List
              className={_utils.cx(_styles, "debrief-list")}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem>
                {
                  "You can override the default settings at the interviewer level. This allows for customization of working hours and break times for individual interviewers."
                }
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "debrief-info-block", "is_neutral")}
            tag="div"
          >
            <Text weight="medium" content="Interview Availability:" />
            <_Builtin.List
              className={_utils.cx(_styles, "debrief-list")}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem>
                {
                  'Interview availability outside the set working hours will be marked as "Outside Working Hours" when finding available slots for a given interview.'
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                {
                  "Break times will be avoided, ensuring interviews are not scheduled during these periods."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                {
                  "Available slots are indicated accordingly, considering both working hours and break times."
                }
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "debrief-info-block")}
            tag="div"
          >
            <Text
              weight=""
              color="neutral"
              content="By configuring these settings, Aglint AI ensures a consistent scheduling process that respects working hours and break times, while also offering flexibility for individual interviewers."
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
