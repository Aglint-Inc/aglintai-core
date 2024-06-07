"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Attendee } from "./Attendee";
import { SelectedMemberPill } from "./SelectedMemberPill";
import * as _utils from "./utils";
import _styles from "./SidedrawerBodyDebrief.module.css";

export function SidedrawerBodyDebrief({
  as: _Component = _Builtin.Block,
  slotSessionNameInput,
  slotDurationDropdown,
  slotScheduleTypeDropdown,
  slotLocationDropdown,
  isLocation = false,
  slotMemberAvatarSelectionPill,
  slotMembersDropdown,
  slotAttendee,
  isAttendeeVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "sidedrawer_session")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "input_and_label")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Debrief Session Name"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_input_field")}
          tag="div"
        >
          {slotSessionNameInput ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_inputfield")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Sample session name"}</_Builtin.Block>
            </_Builtin.Block>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "input_and_label")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Duration"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_input_field")}
          tag="div"
        >
          {slotDurationDropdown ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_inputfield")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"45 Mintues"}</_Builtin.Block>
            </_Builtin.Block>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "input_and_label")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Schedule Type"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_input_field")}
          tag="div"
        >
          {slotScheduleTypeDropdown ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_inputfield")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Zoom, Meet"}</_Builtin.Block>
            </_Builtin.Block>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      {isAttendeeVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "input_and_label")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Attendees"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_attendee")}
            tag="div"
          >
            {slotAttendee ?? (
              <>
                <Attendee />
                <Attendee />
                <Attendee />
                <Attendee />
              </>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isLocation ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "input_and_label")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Location"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_input_field")}
            tag="div"
          >
            {slotLocationDropdown ?? (
              <_Builtin.Block
                className={_utils.cx(_styles, "dummy_inputfield")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Zoom, Meet"}</_Builtin.Block>
              </_Builtin.Block>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "input_and_label")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Add Additional Members"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_avatarselectionpill")}
          tag="div"
        >
          {slotMemberAvatarSelectionPill ?? (
            <>
              <SelectedMemberPill />
              <SelectedMemberPill textMemberName="Ogyen Thoga" />
              <SelectedMemberPill textMemberName="Punith G" />
              <SelectedMemberPill textMemberName="Dheeraj Kumar Sah" />
            </>
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_input_field")}
          tag="div"
        >
          {slotMembersDropdown ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_inputfield")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Search Members"}</_Builtin.Block>
            </_Builtin.Block>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "input_and_label")}
        tag="div"
      />
    </_Component>
  );
}
