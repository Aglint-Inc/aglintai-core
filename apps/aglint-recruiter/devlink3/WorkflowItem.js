"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { GlobalIcon } from "./GlobalIcon";
import { Text } from "./Text";
import { IconButtonGhost } from "./IconButtonGhost";
import { InputWithLabel } from "./InputWithLabel";
import { WorkflowInfo } from "./WorkflowInfo";
import * as _utils from "./utils";
import _styles from "./WorkflowItem.module.css";

export function WorkflowItem({
  as: _Component = _Builtin.Block,
  slotInputFields,
  textWorkflowType = "Action",
  textTypeDescription = "An action will be performed",
  slotWorkflowIcon,
  isDeleteVisible,
  onClickDelete,
  iconName = "bolt",
}) {
  return (
    <_Component className={_utils.cx(_styles, "workflow_item")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "workflow_item_top")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "wi_top_left")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "flex_hr_10")}
            tag="div"
          >
            <_Builtin.Block className={_utils.cx(_styles, "wi_icon")} tag="div">
              {slotWorkflowIcon ?? (
                <GlobalIcon iconName={iconName} size="3" weight="regular" />
              )}
            </_Builtin.Block>
            <Text content={textWorkflowType} weight="medium" />
          </_Builtin.Block>
          <Text content={textTypeDescription} color="neutral" weight="" />
        </_Builtin.Block>
        <IconButtonGhost
          onClickButton={onClickDelete}
          color="error"
          iconName=""
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "workflow_item_body")}
        tag="div"
      >
        {slotInputFields ?? (
          <>
            <InputWithLabel isDescription={false} isAddDynamic={true} />
            <InputWithLabel />
            <InputWithLabel />
            <_Builtin.Block
              className={_utils.cx(_styles, "email_template_edit")}
              tag="div"
            >
              <InputWithLabel
                textFieldName="Sender Name"
                isDescription={true}
                isAddDynamic={true}
              />
              <InputWithLabel isAddDynamic={true} />
            </_Builtin.Block>
            <WorkflowInfo />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
