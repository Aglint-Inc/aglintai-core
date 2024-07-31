"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./KeywordsHelper.module.css";

export function KeywordsHelper({
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
              <Text content="Help Article: Using Keywords for Scheduling in Aglint AI" />
            </_Builtin.Block>
            <Text
              weight="medium"
              content="Understanding and Setting Up Keywords"
            />
            <Text
              weight="regular"
              color="neutral"
              content="Aglint AI allows you to use specific keywords to manage scheduling preferences and avoid conflicts. Here's how to set and use these keywords effectively:"
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
              <Text weight="medium" content="Free" />
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
                  {"Purpose:"}
                </_Builtin.Span>
                {
                  " Keywords here indicate that overlapping interviews will not be considered scheduling conflicts."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Usage:"}
                </_Builtin.Span>
                {
                  " When these keywords appear in a calendar event title, the event is marked as free time."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {
                    'Example: "Enter free keyword" like "Available", "Open Slot".'
                  }
                </_Builtin.Span>
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
              <Text weight="medium" content="Soft Conflicts" />
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
                  {"Purpose:"}
                </_Builtin.Span>
                {
                  " Keywords in this category mark overlapping interviews as soft conflicts, requiring your confirmation to schedule."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Usage:"}
                </_Builtin.Span>
                {
                  " These keywords help identify events that are flexible but need your approval before scheduling an interview."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {
                    'Example: "Enter soft conflicts keyword" like "Tentative", "Flexible Meeting".'
                  }
                </_Builtin.Span>
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
              <Text weight="medium" content="Out of Office" />
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
                  {"Purpose:"}
                </_Builtin.Span>
                {
                  " Keywords here mark the day as an Out of Office day, and interviews will not be scheduled."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Usage:"}
                </_Builtin.Span>
                {
                  " When these keywords are in a calendar event title, the entire day is blocked from scheduling."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {
                    'Example: "Enter out of office keyword" like "Vacation", "Sick Day".'
                  }
                </_Builtin.Span>
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
              <Text weight="medium" content="Recruiting Blocks" />
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
                  {"Purpose:"}
                </_Builtin.Span>
                {
                  " Keywords indicate preferred times for scheduling interviews."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Usage:"}
                </_Builtin.Span>
                {
                  " These blocks are given first preference when scheduling interviews."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {
                    'Example: "Enter recruiting blocks keyword" like "Interview Block", "Recruiting Time".'
                  }
                </_Builtin.Span>
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
              <Text size="2" content="Setting Keywords" />
            </_Builtin.Block>
            <Text
              weight="regular"
              color="neutral"
              content="Keywords are set at the organization level to ensure consistency across the team. However, you can also add additional keywords at the interviewer level for personalized scheduling preferences."
            />
            <Text weight="medium" content="Steps to Add Keywords:" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "debrief-info-block", "is_grey")}
            tag="div"
          >
            <Text weight="medium" content="Organization Level:" />
            <_Builtin.List
              className={_utils.cx(_styles, "debrief-list")}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem>
                {"Go to the organization settings in Aglint AI."}
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                {"Find the Keywords section."}
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                {
                  "Enter your preferred keywords for each category (Free, Soft Conflicts, Out of Office, Recruiting Blocks)."
                }
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "debrief-info-block", "is_grey")}
            tag="div"
          >
            <Text weight="medium" content="Interviewer Level:" />
            <_Builtin.List
              className={_utils.cx(_styles, "debrief-list")}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem>
                {"Go to the individual interviewer settings."}
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                {
                  "Add any additional or personalized keywords for each category."
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
              content="By setting these keywords, you can efficiently manage scheduling, avoid conflicts, and ensure a smoother interview process."
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
