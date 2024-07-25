"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
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
  textMembers = "Add Additional Members",
}) {
  return (
    <_Component className={_utils.cx(_styles, "sidedrawer_session")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "input_and_label")}
        tag="div"
      >
        <Text content="Debrief Session Name" weight="" />
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
        <Text content="Duration" weight="" />
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
        <Text content="Schedule Type" weight="" />
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
          <Text content="Attendees" weight="" />
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_attendee")}
            tag="div"
          >
            {slotAttendee ?? (
              <>
                <SlotComp componentName="Attendee" />
                <SlotComp componentName="Attendee" />
                <SlotComp componentName="Attendee" />
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
        <Text content={textMembers} weight="" />
        <_Builtin.Block
          className={_utils.cx(_styles, "slot_avatarselectionpill")}
          tag="div"
        >
          {slotMemberAvatarSelectionPill ?? (
            <>
              <SlotComp componentName="Selected AvatarPill" />
              <SlotComp componentName="Selected AvatarPill" />
              <SlotComp componentName="Selected AvatarPill" />
              <SlotComp componentName="Selected AvatarPill" />
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
