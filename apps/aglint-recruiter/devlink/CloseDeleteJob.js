"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./CloseDeleteJob.module.css";

export function CloseDeleteJob({
  as: _Component = _Builtin.Block,
  isCloseJobVisible = true,
  isDeleteJobVisible = false,
  onClickClose = {},
  textDesc = "This is some text inside of a div block.",
  isDynamicDescVisible = false,
  textHeader = "This is some text inside of a div block.",
  slotIcon,
  textButtonLabel = "This is some text inside of a div block.",
  slotCloseJobButton,
  slotDeleteJobButton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "close-delete-wrap")}
      tag="div"
      box-shadow="6"
    >
      {isCloseJobVisible ? (
        <_Builtin.Block tag="div">
          <Text content="Close This Job" weight="medium" />
        </_Builtin.Block>
      ) : null}
      {isDynamicDescVisible ? (
        <_Builtin.Block tag="div">
          <Text content={textHeader} weight="medium" />
        </_Builtin.Block>
      ) : null}
      {isDeleteJobVisible ? (
        <_Builtin.Block tag="div">
          <Text content="Delete this job" weight="medium" />
        </_Builtin.Block>
      ) : null}
      {isCloseJobVisible ? (
        <_Builtin.List
          className={_utils.cx(_styles, "close-delete-list")}
          tag="ul"
          unstyled={false}
        >
          <_Builtin.ListItem>
            {
              "Closing this job will permanently end all associated activities, including tasks and scheduled interviews."
            }
          </_Builtin.ListItem>
          <_Builtin.ListItem>
            {
              "Once closed, this position will no longer accept applications and cannot be reactivated. "
            }
          </_Builtin.ListItem>
          <_Builtin.ListItem>
            {"The job will also be removed from the company page."}
          </_Builtin.ListItem>
        </_Builtin.List>
      ) : null}
      {isDeleteJobVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "delete-desc-wrap")}
          tag="div"
        >
          <Text
            content="By deleting this entire job data will be erased from the system."
            weight=""
            color="neutral"
          />
        </_Builtin.Block>
      ) : null}
      {isDynamicDescVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "delete-desc-wrap")}
          tag="div"
        >
          <Text content={textDesc} weight="" color="neutral" />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "close-job-btn-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div" {...onClickClose}>
          {isCloseJobVisible ? (
            <_Builtin.Block tag="div">
              {slotCloseJobButton ?? <SlotComp componentName="ButtonSolid" />}
            </_Builtin.Block>
          ) : null}
          {isDeleteJobVisible ? (
            <_Builtin.Block tag="div">
              {slotDeleteJobButton ?? <SlotComp componentName="ButtonSolid" />}
            </_Builtin.Block>
          ) : null}
          {isDynamicDescVisible ? (
            <_Builtin.Block tag="div">
              <ButtonSolid
                textButton={textButtonLabel}
                isRightIcon={false}
                isLeftIcon={false}
                size="2"
                color="error"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
