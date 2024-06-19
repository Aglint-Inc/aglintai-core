"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonSoft } from "./ButtonSoft";
import * as _utils from "./utils";
import _styles from "./TaskUpdateButton.module.css";

export function TaskUpdateButton({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  textTaskSelected = "3 tasks selected",
  onClickCloseTask = {},
  onClickChangeStatus = {},
  onClickChangeAssignee = {},
  onClickUpdatePriority = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "tub-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "tub-left-wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "tub-close-wrap", "cursor-pointer")}
          tag="div"
          {...onClickClose}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.11719%209.63281L6%206.53906L2.90625%209.63281C2.71875%209.77344%202.53906%209.77344%202.36719%209.63281C2.22656%209.46094%202.22656%209.28906%202.36719%209.11719L5.46094%206L2.36719%202.90625C2.22656%202.71875%202.22656%202.53906%202.36719%202.36719C2.53906%202.22656%202.71875%202.22656%202.90625%202.36719L6%205.46094L9.11719%202.36719C9.28906%202.22656%209.46094%202.22656%209.63281%202.36719C9.77344%202.53906%209.77344%202.71875%209.63281%202.90625L6.53906%206L9.63281%209.11719C9.77344%209.28906%209.77344%209.46094%209.63281%209.63281C9.46094%209.77344%209.28906%209.77344%209.11719%209.63281Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <Text content={textTaskSelected} weight="" />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "tub-btn-wrap")} tag="div">
        <ButtonSoft
          onClickButton={onClickCloseTask}
          color="error"
          highContrast="false"
          size="2"
          textButton="Close Tasks"
        />
        <ButtonSoft
          onClickButton={onClickChangeStatus}
          color="neutral"
          highContrast="false"
          size="2"
          textButton="Change Status"
        />
        <ButtonSoft
          onClickButton={onClickChangeAssignee}
          color="neutral"
          highContrast="false"
          size="2"
          textButton="Change Assignee"
        />
        <ButtonSoft
          onClickButton={onClickUpdatePriority}
          color="neutral"
          highContrast="false"
          size="2"
          textButton="Update Priority"
        />
      </_Builtin.Block>
    </_Component>
  );
}
