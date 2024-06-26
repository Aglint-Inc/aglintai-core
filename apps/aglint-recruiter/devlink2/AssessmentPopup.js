"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SelectionPill } from "./SelectionPill";
import { ButtonWide } from "./ButtonWide";
import * as _utils from "./utils";
import _styles from "./AssessmentPopup.module.css";

export function AssessmentPopup({
  as: _Component = _Builtin.Block,
  textPopupTitle = "Create Assesment",
  slotDescriptionTextarea = "",
  slotSelectionDropdown = "",
  slotInputName = "",
  slotButton,
  slotAssesmentLevel,
  onClickClose = {},
  slotAssessmentMode,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "assesment_create_popup")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "sidebar_contents")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "sidebar_top")} tag="div">
          <Text content={textPopupTitle} />
          <_Builtin.Block
            className={_utils.cx(_styles, "sidebar_close")}
            tag="div"
            {...onClickClose}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.7812%206.28125L11.0625%2010L14.7812%2013.7188C15.0729%2014.0729%2015.0729%2014.4271%2014.7812%2014.7812C14.4271%2015.0729%2014.0729%2015.0729%2013.7188%2014.7812L10%2011.0625L6.28125%2014.7812C5.92708%2015.0729%205.57292%2015.0729%205.21875%2014.7812C4.92708%2014.4271%204.92708%2014.0729%205.21875%2013.7188L8.9375%2010L5.21875%206.28125C4.92708%205.92708%204.92708%205.57292%205.21875%205.21875C5.57292%204.92708%205.92708%204.92708%206.28125%205.21875L10%208.9375L13.7188%205.21875C14.0729%204.92708%2014.4271%204.92708%2014.7812%205.21875C15.0729%205.57292%2015.0729%205.92708%2014.7812%206.28125Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sidebar_body")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "ps_row")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "ps_input_slot")}
              tag="div"
            >
              {slotInputName}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "ps_row")} tag="div">
            <Text content="" weight="" />
            <_Builtin.Block
              className={_utils.cx(_styles, "ps_input_slot")}
              tag="div"
            >
              {slotAssessmentMode}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "ps_row")} tag="div">
            <Text content="Assessment Category" weight="" />
            <_Builtin.Block
              className={_utils.cx(_styles, "ps_input_slot")}
              tag="div"
            >
              {slotSelectionDropdown}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "ps_row")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "ps_input_slot")}
              tag="div"
            >
              {slotDescriptionTextarea}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "ps_row")} tag="div">
            <Text content="Choose the level of the questions" weight="" />
            <_Builtin.Block
              className={_utils.cx(_styles, "ps_input_slot", "_3-1grid")}
              tag="div"
            >
              {slotAssesmentLevel ?? (
                <>
                  <SelectionPill />
                  <SelectionPill />
                  <SelectionPill />
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sidebar_button_wrap")}
        tag="div"
      >
        {slotButton ?? <ButtonWide />}
      </_Builtin.Block>
    </_Component>
  );
}
