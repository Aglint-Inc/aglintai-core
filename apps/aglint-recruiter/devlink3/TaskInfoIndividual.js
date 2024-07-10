"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { TextWithIcon } from "./TextWithIcon";
import { GlobalBadge } from "./GlobalBadge";
import * as _utils from "./utils";
import _styles from "./TaskInfoIndividual.module.css";

export function TaskInfoIndividual({
  as: _Component = _Builtin.Block,
  slotInfoData,
  onClickInfo = {},
  isClickable = false,
  iconName = "shapes",
  textInfoName = "Type",
  slotIconButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "task_info")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "slot_category")} tag="div">
        <TextWithIcon
          textContent={textInfoName}
          iconName={iconName}
          fontWeight="regular"
          color="inherit"
          iconWeight="medium"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "task_data")}
        id={_utils.cx(
          _styles,
          "w-node-_4bf063da-324b-9023-b4b0-80d5db8f9198-db8f9194"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_category_value")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "normal_block")}
            tag="div"
          >
            {slotInfoData ?? (
              <>
                <GlobalBadge size="2" color="info" />
                <GlobalBadge size="2" />
              </>
            )}
          </_Builtin.Block>
          {isClickable ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "hover_block")}
              tag="div"
              {...onClickInfo}
            >
              {slotInfoData ?? (
                <>
                  <GlobalBadge size="2" color="info" />
                  <GlobalBadge size="2" />
                </>
              )}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_external_link")}
          tag="div"
        >
          {slotIconButton}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
