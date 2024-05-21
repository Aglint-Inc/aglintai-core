"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SelectedMemberPill } from "./SelectedMemberPill";
import { RcCheckbox } from "./RcCheckbox";
import * as _utils from "./utils";
import _styles from "./Attendee.module.css";

export function Attendee({
  as: _Component = _Builtin.Block,
  slotToggle,
  isCheckBox = true,
  slotSelectedMemberPill,
  slotRCheckbox,
  textRole = "Recruiter",
  slotSearchInput,
  isSearchInput = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "attendee")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "attendee_block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "toggle_flexx")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_toggle")}
            tag="div"
          >
            {slotToggle ?? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2230%22%20height%3D%2216%22%20viewBox%3D%220%200%2030%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20y%3D%220.5%22%20width%3D%2230%22%20height%3D%2215%22%20rx%3D%227.5%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Ccircle%20cx%3D%2221.75%22%20cy%3D%228%22%20r%3D%224.5%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            )}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{textRole}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotSelectedMemberPill ?? (
            <SelectedMemberPill isCloseButton={false} />
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "attendee_block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "toggle_flexx-copy")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_toggle", "is_fixed_wisth")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "attendee_right")}
            tag="div"
          >
            {isCheckBox ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "check_box_wrap")}
                tag="div"
              >
                {slotRCheckbox ?? <RcCheckbox />}
              </_Builtin.Block>
            ) : null}
            {isSearchInput ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "slot_input_field-copy")}
                tag="div"
              >
                {slotSearchInput ?? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dummy_inputfield")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">
                      {"Search in previous interviewers"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                )}
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
