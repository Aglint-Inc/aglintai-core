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
        className={_utils.cx(_styles, "arrow_expand")}
        tag="div"
        {...onClickArrow}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2219%22%20height%3D%2219%22%20rx%3D%229.5%22%20fill%3D%22currentColor%22%2F%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2219%22%20height%3D%2219%22%20rx%3D%229.5%22%20stroke%3D%22%23DAD9D6%22%2F%3E%0A%3Cmask%20id%3D%22mask0_4553_51648%22%20style%3D%22mask-type%3Aalpha%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%224%22%20y%3D%224%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%3Crect%20x%3D%224%22%20y%3D%224%22%20width%3D%2212%22%20height%3D%2212%22%20fill%3D%22%23D9D9D9%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask0_4553_51648)%22%3E%0A%3Cpath%20d%3D%22M11.4154%2010L7.64901%206.23363C7.54967%206.13429%207.5013%206.01604%207.50388%205.87887C7.50647%205.74171%207.55742%205.62342%207.65676%205.524C7.75609%205.42467%207.87434%205.375%208.01151%205.375C8.14867%205.375%208.26697%205.42467%208.36638%205.524L12.1943%209.35963C12.2846%209.45004%2012.3515%209.55133%2012.3951%209.6635C12.4388%209.77567%2012.4606%209.88783%2012.4606%2010C12.4606%2010.1122%2012.4388%2010.2243%2012.3951%2010.3365C12.3515%2010.4487%2012.2846%2010.55%2012.1943%2010.6404L8.35863%2014.476C8.2593%2014.5753%208.14234%2014.6237%208.00776%2014.6211C7.87309%2014.6185%207.75609%2014.5676%207.65676%2014.4683C7.55742%2014.3689%207.50776%2014.2507%207.50776%2014.1135C7.50776%2013.9763%207.55742%2013.858%207.65676%2013.7586L11.4154%2010Z%22%20fill%3D%22%2363635E%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
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
