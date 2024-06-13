"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import { ButtonGhost } from "./ButtonGhost";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./DeleteJobPopup.module.css";

export function DeleteJobPopup({
  as: _Component = _Builtin.Block,
  slotForm,
  jobTitle = "QA Analysit",
  jobInfo = "On-site, San Fransisco, United States",
  closeProps = {},
  onClickDelete = {},
  isDeleteDisabled = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "close-job-popup")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "close-job-popup-block")}
        tag="div"
        box-shadow="5"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "clj-popup-close-btn", "clickable")}
          tag="div"
          {...closeProps}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "svg-icon")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_2430_11473%22%20style%3D%22mask-type%3Aluminance%22%20maskunits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_2430_11473)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <Text size="3" weight="bold" content="Close Job Confirmation" />
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-332")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-330")}
            tag="div"
          >
            <Text content={jobTitle} size="2" weight="bold" />
            <Text content={jobInfo} size="1" weight="" color="neutral" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-331")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "text-color-black",
                  "inline-block"
                )}
                tag="div"
              >
                {"Confirm by typing the job title"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "text-color-black",
                  "inline-block",
                  "text-red-500"
                )}
                tag="div"
              >
                {jobTitle}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "text-color-black",
                  "inline-block"
                )}
                tag="div"
              >
                {"below."}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              {slotForm ?? <SlotComp componentName="Slot for Input" />}
            </_Builtin.Block>
            <Text
              size="2"
              weight=""
              content="The job will be permanently closed for new applications and interviews, but you will still have access to view the list of candidates."
              color="neutral"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "link-block-3")}
          tag="div"
          href="#"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "button-wrapper")}
            tag="div"
            {...closeProps}
          >
            <ButtonGhost
              textButton="Cancel"
              isRightIcon={false}
              isLeftIcon={false}
              size="2"
              color="neutral"
              onClickButton={{}}
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "button-wrapper")}
            tag="div"
            {...onClickDelete}
          >
            <ButtonSolid
              onClickButton={onClickDelete}
              textButton="Close Job Permanently"
              size="2"
              color="error"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
