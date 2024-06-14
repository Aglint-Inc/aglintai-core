"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ActivitiesCard.module.css";

export function ActivitiesCard({
  as: _Component = _Builtin.Block,
  slotImage,
  textTitle = "Interview completed",
  textTime = "5 Hours ago",
  isLineVisible = true,
  onClickViewTask = {},
  textDesc = "This is some text inside of a div block.",
  isViewTaskVisible = true,
  slotContent,
  onClickAction = {},
  isActionVisible = true,
  isContentVisible = true,
  textAction = "Reschedule",
}) {
  return (
    <_Component className={_utils.cx(_styles, "ac-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "activity_card_image_divider")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "user_image")} tag="div">
          {slotImage}
        </_Builtin.Block>
        {isLineVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "card_connector")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "activity_card_contents")}
        tag="div"
      >
        <Text content={textTitle} weight="medium" />
        <Text content={textDesc} color="neutral" weight="" size="1" />
        {isContentVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "activity_card_widget")}
            tag="div"
          >
            {slotContent}
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "activity_card_footer")}
          tag="div"
        >
          <Text content={textTime} size="1" weight="" color="neutral" />
          {isActionVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "text-link")}
              tag="div"
              {...onClickAction}
            >
              <Text content={textAction} size="1" weight="" color="neutral" />
            </_Builtin.Block>
          ) : null}
          {isViewTaskVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "text-link")}
              tag="div"
              {...onClickViewTask}
            >
              <Text size="1" weight="" color="neutral" content="View Task" />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
