import React from "react";
import * as _Builtin from "./_Builtin";
import { ScrQuestionListItem } from "./ScrQuestionListItem";
import * as _utils from "./utils";
import _styles from "./SidebarScreening.module.css";

export function SidebarScreening({
  as: _Component = _Builtin.Block,
  isPending = false,
  isSubmitted = false,
  onclickResend = {},
  slotQuestions,
  isNotInvited = false,
  onclickInvite = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "sb-screening-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "sc-scr-header-block")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Screening"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sb-scr-status-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {"Status:"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {isNotInvited ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "text-red-500")}
                tag="div"
              >
                {"Not Invited"}
              </_Builtin.Block>
            ) : null}
            {isPending ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "text-yellow-500")}
                tag="div"
              >
                {"Pending"}
              </_Builtin.Block>
            ) : null}
            {isSubmitted ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "text-green-500")}
                tag="div"
              >
                {"Submitted"}
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "sb-scr-body")} tag="div">
        {isNotInvited ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "sb-scr-pending")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {
                "The candidate has not been invited for screening yet. click below to invite"
              }
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-blue-500", "text-underline")}
              tag="div"
              {...onclickInvite}
            >
              {"Invite candidate"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isPending ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "sb-scr-pending")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {
                "The candidate havent submitted the form yet. click below to resend it"
              }
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-blue-500", "text-underline")}
              tag="div"
              {...onclickResend}
            >
              {"Resend Invite"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isSubmitted ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "sb-scr-submitted")}
            tag="div"
          >
            {slotQuestions ?? <ScrQuestionListItem isMultiselect={true} />}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
