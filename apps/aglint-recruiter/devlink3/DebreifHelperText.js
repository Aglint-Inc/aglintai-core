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
              <Text size="4" content="" />
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
