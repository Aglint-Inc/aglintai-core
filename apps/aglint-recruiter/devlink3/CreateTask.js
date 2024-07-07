"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import { ViewTaskCard } from "./ViewTaskCard";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./CreateTask.module.css";

export function CreateTask({
  as: _Component = _Builtin.Block,
  slotViewTaskCard,
  onClickCancel = {},
  onClickPrimaryButton = {},
  slotButtonIcon,
  textPrimaryButton = "Call Now",
  onClickClose = {},
  textTaskDetail = "The TAR (Talent Acquisition Representative) admin currently lacks the ability to edit basic candidate details. It's necessary to grant TAR admins the permission",
}) {
  return (
    <_Component className={_utils.cx(_styles, "create-task")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "task_drawer_title")}
        tag="div"
      >
        <Text content="Create Task" weight="medium" />
        <_Builtin.Block
          className={_utils.cx(_styles, "create-task-close-wrap")}
          tag="div"
          {...onClickClose}
        >
          <GlobalIcon iconName="close" size="5" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "title_wrapper")} tag="div">
        <Text
          content={textTaskDetail}
          size="3"
          weight="medium"
          color="neutral"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "task_detail")} tag="div">
        {slotViewTaskCard ?? <ViewTaskCard />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1511")}
        tag="div"
      >
        <ButtonSoft
          onClickButton={onClickCancel}
          textButton="Cancel"
          size="2"
          color="neutral"
          highContrast="false"
        />
        <ButtonSolid
          textButton={textPrimaryButton}
          onClickButton={onClickPrimaryButton}
          slotIcon={slotButtonIcon}
          isLeftIcon={false}
          size="2"
        />
      </_Builtin.Block>
    </_Component>
  );
}
