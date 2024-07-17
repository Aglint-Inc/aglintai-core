"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { WorkflowEmpty } from "./WorkflowEmpty";
import { WorkflowCard } from "./WorkflowCard";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./WorkflowLanding.module.css";

export function WorkflowLanding({
  as: _Component = _Builtin.Block,
  slotWorkflowCard,
  slotSearchAndFilter,
  styleWidth = {},
  onClickClose = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "workflow_listing-copy")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_search_and-_filter")}
        tag="div"
      >
        {slotSearchAndFilter}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "workflow_body")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_workflow_card")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_workflow_card-copy")}
            tag="div"
          >
            {slotWorkflowCard ?? (
              <>
                <WorkflowEmpty />
                <WorkflowCard />
                <WorkflowCard />
                <WorkflowCard />
                <WorkflowCard />
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "workflo_helper_wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "arrow_expand")}
            tag="div"
            {...onClickClose}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2219%22%20height%3D%2219%22%20rx%3D%229.5%22%20fill%3D%22currentColor%22%2F%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%2219%22%20height%3D%2219%22%20rx%3D%229.5%22%20stroke%3D%22%23DAD9D6%22%2F%3E%0A%3Cmask%20id%3D%22mask0_4553_51648%22%20style%3D%22mask-type%3Aalpha%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%224%22%20y%3D%224%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%3Crect%20x%3D%224%22%20y%3D%224%22%20width%3D%2212%22%20height%3D%2212%22%20fill%3D%22%23D9D9D9%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask0_4553_51648)%22%3E%0A%3Cpath%20d%3D%22M11.4154%2010L7.64901%206.23363C7.54967%206.13429%207.5013%206.01604%207.50388%205.87887C7.50647%205.74171%207.55742%205.62342%207.65676%205.524C7.75609%205.42467%207.87434%205.375%208.01151%205.375C8.14867%205.375%208.26697%205.42467%208.36638%205.524L12.1943%209.35963C12.2846%209.45004%2012.3515%209.55133%2012.3951%209.6635C12.4388%209.77567%2012.4606%209.88783%2012.4606%2010C12.4606%2010.1122%2012.4388%2010.2243%2012.3951%2010.3365C12.3515%2010.4487%2012.2846%2010.55%2012.1943%2010.6404L8.35863%2014.476C8.2593%2014.5753%208.14234%2014.6237%208.00776%2014.6211C7.87309%2014.6185%207.75609%2014.5676%207.65676%2014.4683C7.55742%2014.3689%207.50776%2014.2507%207.50776%2014.1135C7.50776%2013.9763%207.55742%2013.858%207.65676%2013.7586L11.4154%2010Z%22%20fill%3D%22%2363635E%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "workflow_helper_animated_block")}
            tag="div"
            {...styleWidth}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "workflow_helper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "info_block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "title_info")}
                  tag="div"
                >
                  <GlobalIcon iconName="info" />
                  <Text weight="medium" content="How it works" />
                </_Builtin.Block>
                <Text
                  weight="regular"
                  color="neutral"
                  content="Workflows are designed to streamline your hiring process at the organizational level. You can enable or disable workflows for specific jobs based on your needs."
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "info_block", "is_grey")}
                tag="div"
              >
                <Text weight="medium" content="How it works" />
                <_Builtin.Block
                  className={_utils.cx(_styles, "helper_bullet")}
                  tag="div"
                  text-align="left"
                  fontSize="2"
                >
                  <_Builtin.Span className={_utils.cx(_styles, "fw_medium")}>
                    {"New Workflows : "}
                  </_Builtin.Span>
                  {
                    "Create tailored workflows that fit your unique hiring processes."
                  }
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "helper_bullet")}
                  tag="div"
                  text-align="left"
                  fontSize="2"
                >
                  <_Builtin.Span className={_utils.cx(_styles, "fw_medium")}>
                    {"Edit Existing Workflows : "}
                  </_Builtin.Span>
                  {"Customize current workflows to enhance efficiency."}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "helper_bullet")}
                  tag="div"
                  text-align="left"
                  fontSize="2"
                >
                  <_Builtin.Span className={_utils.cx(_styles, "fw_medium")}>
                    {"Organizational Control : "}
                  </_Builtin.Span>
                  {
                    "Create tailored workflows that fit your unique hiring processes."
                  }
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "info_block", "is_grey")}
                tag="div"
              >
                <Text weight="medium" content="Tips for Using Workflows" />
                <_Builtin.Block
                  className={_utils.cx(_styles, "helper_bullet")}
                  tag="div"
                  text-align="left"
                  fontSize="2"
                >
                  <_Builtin.Span className={_utils.cx(_styles, "fw_medium")}>
                    {"Organizational Control: "}
                  </_Builtin.Span>
                  {
                    "Manage workflows at the organizational level for consistent hiring practices."
                  }
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "helper_bullet")}
                  tag="div"
                  text-align="left"
                  fontSize="2"
                >
                  <_Builtin.Span className={_utils.cx(_styles, "fw_medium")}>
                    {"Job-Specific Flexibility : "}
                  </_Builtin.Span>
                  {
                    "Enable or disable workflows for individual jobs to match specific requirements."
                  }
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "helper_bullet")}
                  tag="div"
                  text-align="left"
                  fontSize="2"
                >
                  <_Builtin.Span className={_utils.cx(_styles, "fw_medium")}>
                    {"Customization : "}
                  </_Builtin.Span>
                  {"Modify workflows to better align with your hiring goals."}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "helper_bullet")}
                  tag="div"
                  text-align="left"
                  fontSize="2"
                >
                  <_Builtin.Span className={_utils.cx(_styles, "fw_medium")}>
                    {"Quick Start : "}
                  </_Builtin.Span>
                  {
                    "Implement predefined workflows to ensure a smooth and efficient hiring process from the get-go."
                  }
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "title_info", "is_neutral-copy")}
                tag="div"
              >
                <Text
                  weight="regular"
                  color="neutral"
                  content="Feel free to explore and adjust workflows to best suit your hiring needs. If you have any questions, our support team is here to help."
                />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
