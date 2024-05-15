"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SelectButton } from "./SelectButton";
import { ChangeButton } from "./ChangeButton";
import { SelectedDateAndTime } from "./SelectedDateAndTime";
import { SessionInfo } from "./SessionInfo";
import * as _utils from "./utils";
import _styles from "./CandidateScheduleCard.module.css";

export function CandidateScheduleCard({
  as: _Component = _Builtin.Block,
  textPopupTitle = "Phase 1 Interview for software engineer",
  onClickClose = {},
  isPopup = false,
  textDay = "Day 2",
  slotSessionInfo,
  isSelected = true,
  onClickCard = {},
  isTitle = true,
  textDuration = "2 hour 45 Minutes",
  slotButton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "candidateschedulecard")}
      tag="div"
    >
      {isTitle ? (
        <_Builtin.Block className={_utils.cx(_styles, "day_row")} tag="div">
          {isPopup ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "popup_row")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {textPopupTitle}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "popup_close")}
                tag="div"
                {...onClickClose}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed-flex")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2216%22%20viewBox%3D%220%200%2012%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.7812%204.28125L7.0625%208L10.7812%2011.7188C11.0729%2012.0729%2011.0729%2012.4271%2010.7812%2012.7812C10.4271%2013.0729%2010.0729%2013.0729%209.71875%2012.7812L6%209.0625L2.28125%2012.7812C1.92708%2013.0729%201.57292%2013.0729%201.21875%2012.7812C0.927083%2012.4271%200.927083%2012.0729%201.21875%2011.7188L4.9375%208L1.21875%204.28125C0.927083%203.92708%200.927083%203.57292%201.21875%203.21875C1.57292%202.92708%201.92708%202.92708%202.28125%203.21875L6%206.9375L9.71875%203.21875C10.0729%202.92708%2010.4271%202.92708%2010.7812%203.21875C11.0729%203.57292%2011.0729%203.92708%2010.7812%204.28125Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "color-blue-600")}
            tag="div"
          >
            {textDay}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "duration_row")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600")}
          tag="div"
        >
          {"Total Duration"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "duration_flex")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%200C7.125%200.015625%208.13281%200.289062%209.02344%200.820312C9.92969%201.35156%2010.6484%202.07031%2011.1797%202.97656C11.7109%203.86719%2011.9844%204.875%2012%206C11.9844%207.125%2011.7109%208.13281%2011.1797%209.02344C10.6484%209.92969%209.92969%2010.6484%209.02344%2011.1797C8.13281%2011.7109%207.125%2011.9844%206%2012C4.875%2011.9844%203.86719%2011.7109%202.97656%2011.1797C2.07031%2010.6484%201.35156%209.92969%200.820312%209.02344C0.289062%208.13281%200.015625%207.125%200%206C0%205.15625%200.164062%204.36719%200.492188%203.63281C0.804688%202.89844%201.24219%202.25781%201.80469%201.71094C1.96094%201.57031%202.14062%201.5%202.34375%201.5C2.53125%201.5%202.70312%201.57812%202.85938%201.73438C3%201.89063%203.07031%202.0625%203.07031%202.25C3.07031%202.45313%203%202.63281%202.85938%202.78906C1.98438%203.63281%201.53125%204.70312%201.5%206C1.53125%207.28125%201.96875%208.34375%202.8125%209.1875C3.65625%2010.0312%204.71875%2010.4688%206%2010.5C7.28125%2010.4688%208.34375%2010.0312%209.1875%209.1875C10.0312%208.34375%2010.4688%207.28125%2010.5%206C10.4844%204.85938%2010.125%203.88281%209.42188%203.07031C8.73438%202.27344%207.84375%201.77344%206.75%201.57031V2.25C6.75%202.46875%206.67969%202.64844%206.53906%202.78906C6.39844%202.92969%206.21875%203%206%203C5.78125%203%205.60156%202.92969%205.46094%202.78906C5.32031%202.64844%205.25%202.46875%205.25%202.25V0.75C5.25%200.53125%205.32031%200.351562%205.46094%200.210938C5.60156%200.0703125%205.78125%200%206%200ZM4.52344%203.72656L6.39844%205.60156C6.61719%205.86719%206.61719%206.13281%206.39844%206.39844C6.13281%206.61719%205.86719%206.61719%205.60156%206.39844L3.72656%204.52344C3.50781%204.25781%203.50781%203.99219%203.72656%203.72656C3.99219%203.50781%204.25781%203.50781%204.52344%203.72656Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{textDuration}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "default_stage")} tag="div">
        {slotButton ?? <SelectButton />}
      </_Builtin.Block>
      {isSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "selected_stage")}
          tag="div"
        >
          {slotButton ?? <ChangeButton />}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "clickable_area_card")}
        tag="div"
        {...onClickCard}
      />
      {isPopup ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "clickable_area_popup")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "clicking_area_close")}
            tag="div"
            {...onClickClose}
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "slot_selected")} tag="div">
        {slotSessionInfo ?? (
          <>
            <SelectedDateAndTime />
            <SessionInfo
              textSessionName="C++ Coding"
              textSessionDuration="30 Minutes"
              textMeetingType="Google Meet"
            />
            <SessionInfo />
            <SessionInfo
              textSessionName="Company Indroduction"
              textSessionDuration="1 Hour"
            />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
