"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./DayOffHelper.module.css";

export function DayOffHelper({ as: _Component = _Builtin.Block, slotButton }) {
  return (
    <_Component className={_utils.cx(_styles, "debrief-helper-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "dayoff-width-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "dayoff-sub-wrap-pop")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "dayoff-info-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "title_info")}
              tag="div"
            >
              <Text
                size="4"
                content="Help Article: How the Company Day Off Feature Works"
              />
            </_Builtin.Block>
            <Text
              weight="medium"
              content="Standard Days Off: Managing Company Holidays"
            />
            <Text
              weight="regular"
              color="neutral"
              content="Aglint AI provides a feature to list company holidays and exclude them from scheduling, ensuring no interviews are scheduled on these days. Here’s how it works:"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "dayoff-info-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "title_info")}
              tag="div"
            >
              <Text size="2" content="Setting Up Standard Days Off" />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "dayoff-info-block", "is_grey")}
            tag="div"
          >
            <Text
              weight="medium"
              content="Access Standard Days Off Settings:"
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
                {"Find the Standard Days Off section."}
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "dayoff-info-block", "is_grey")}
            tag="div"
          >
            <Text weight="medium" content="Add Company Holidays:" />
            <_Builtin.List
              className={_utils.cx(_styles, "debrief-list")}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem>
                {"Enter the holidays relevant to your organization."}
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                {
                  "You can specify holidays based on different office locations globally."
                }
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "dayoff-info-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "title_info")}
              tag="div"
            >
              <Text size="2" content="How It Works" />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "dayoff-info-block", "is_grey")}
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
                  {"Holiday Exclusion:"}
                </_Builtin.Span>
                {
                  " When holidays are added, they are excluded from the scheduling process. This means no interviews will be scheduled on these days, regardless of the interviewers' availability."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Location-Based Holidays: "}
                </_Builtin.Span>
                {
                  "Holidays can be set based on office locations. This ensures that local holidays are respected, and no interviews are scheduled on these specific days."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                <_Builtin.Span
                  className={_utils.cx(_styles, "debrief-list-hightlight")}
                >
                  {"Scheduler Assistance: "}
                </_Builtin.Span>
                {
                  "When finding available slots for interviews, the system will indicate the reason for unavailability based on these holidays. This makes it easier for the scheduler or coordinator to pick the right slot or time for interviews."
                }
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "dayoff-info-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "title_info")}
              tag="div"
            >
              <Text size="2" content="Example Usage" />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "dayoff-info-block", "is_grey")}
            tag="div"
          >
            <Text weight="medium" content="Adding a Holiday:" />
            <_Builtin.List
              className={_utils.cx(_styles, "debrief-list")}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem>
                {"For the New York office, add “Independence Day” on July 4th."}
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                {"For the London office, add “Christmas Day” on December 25th."}
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "dayoff-info-block", "is_grey")}
            tag="div"
          >
            <Text weight="medium" content="During Scheduling:" />
            <_Builtin.List
              className={_utils.cx(_styles, "debrief-list")}
              tag="ul"
              unstyled={false}
            >
              <_Builtin.ListItem>
                {
                  "When attempting to schedule an interview on July 4th for an interviewer based in New York, the system will show this day as unavailable due to Independence Day."
                }
              </_Builtin.ListItem>
              <_Builtin.ListItem>
                {
                  "Similarly, December 25th will be marked as unavailable for the London office."
                }
              </_Builtin.ListItem>
            </_Builtin.List>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "dayoff-info-block")}
            tag="div"
          >
            <Text
              weight=""
              color="neutral"
              content="By setting up Standard Days Off, you can ensure a smooth scheduling process that respects company holidays and avoids conflicts, making it easier to manage interview schedules effectively."
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "doh-close-btn-wrap")}
            tag="div"
          >
            {slotButton}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
