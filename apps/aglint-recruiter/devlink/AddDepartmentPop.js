"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { IconButtonGhost } from "./IconButtonGhost";
import { SlotComp } from "./SlotComp";
import { ButtonGhost } from "./ButtonGhost";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./AddDepartmentPop.module.css";

export function AddDepartmentPop({
  as: _Component = _Builtin.Block,
  slotDepartmentsPills,
  slotInput,
  onClickCancel = {},
  onClickDone = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "available-roles-pop-wrappers")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "add-department-popup-header")}
        tag="div"
      >
        <Text weight="medium" content="Add Departments" />
        <IconButtonGhost
          onClickButton={onClickCancel}
          iconName="close"
          iconColor="neutral"
          iconWeight="thin"
          color="neutral"
        />
      </_Builtin.Block>
      <Text
        content="Choose from the list or type your own and press enter"
        color="neutral"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-roles-wrappers")}
        tag="div"
      >
        {slotDepartmentsPills ?? <SlotComp componentName="slot for Pills" />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-input-fomrs-roles")}
        tag="div"
      >
        {slotInput ?? <SlotComp componentName="Slot for MUI Input" />}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "roles-btn-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div" {...onClickCancel}>
          <ButtonGhost
            isLeftIcon={false}
            isRightIcon={false}
            textButton="Cancel"
            size="2"
          />
        </_Builtin.Block>
        <_Builtin.Block tag="div" {...onClickDone}>
          <ButtonSolid
            isLeftIcon={false}
            isRightIcon={false}
            textButton="Add"
            size="2"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
