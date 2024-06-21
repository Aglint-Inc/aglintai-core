"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ToggleButton } from "./ToggleButton";
import { ScrQuestionOptionEdit } from "./ScrQuestionOptionEdit";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./ScrQuestionEdit.module.css";

export function ScrQuestionEdit({
  as: _Component = _Builtin.Block,
  onclickRequiredCheckbox = {},
  isReqChecked = false,
  slotQuestionInput,
  isOptionsVisible = true,
  slotOptions,
  onclickAddOption = {},
  onclickDelete = {},
  isDeleteVisible = true,
  slotDescription,
  isDescriptionVisible = false,
  slotDescriptionToggle,
  onclickClose = {},
  slotDropdown,
  slotButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "scr-question-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "scr-question-top")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-question-top-dropdown")}
          tag="div"
        >
          {slotDropdown}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-close-btn", "clickable")}
          tag="div"
          {...onclickClose}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "icon-block", "_16x16")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "svg-icon")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.7812%202.28125L7.0625%206L10.7812%209.71875C11.0729%2010.0729%2011.0729%2010.4271%2010.7812%2010.7812C10.4271%2011.0729%2010.0729%2011.0729%209.71875%2010.7812L6%207.0625L2.28125%2010.7812C1.92708%2011.0729%201.57292%2011.0729%201.21875%2010.7812C0.927083%2010.4271%200.927083%2010.0729%201.21875%209.71875L4.9375%206L1.21875%202.28125C0.927083%201.92708%200.927083%201.57292%201.21875%201.21875C1.57292%200.927083%201.92708%200.927083%202.28125%201.21875L6%204.9375L9.71875%201.21875C10.0729%200.927083%2010.4271%200.927083%2010.7812%201.21875C11.0729%201.57292%2011.0729%201.92708%2010.7812%202.28125Z%22%20fill%3D%22%2349545C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "scr-question-input-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-question-input-block")}
          tag="div"
        >
          {slotQuestionInput}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-description-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "scr-toggle-top")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {slotDescriptionToggle ?? <ToggleButton />}
            </_Builtin.Block>
            <_Builtin.Block tag="div">{"Show Description"}</_Builtin.Block>
          </_Builtin.Block>
          {isDescriptionVisible ? (
            <_Builtin.Block tag="div">{slotDescription}</_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        {isOptionsVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "scr-quesion-options-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600")}
              tag="div"
            >
              {"Options"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "scr-question-options-wrapper")}
              tag="div"
            >
              {slotOptions ?? <ScrQuestionOptionEdit />}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "sqe-btn-wrap")}
              tag="div"
            >
              {slotButton ?? <SlotComp componentName="ButtonGhost" />}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-421")} tag="div">
        <_Builtin.Block tag="div">
          {isDeleteVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "scr-question-delete-btn")}
              tag="div"
              {...onclickDelete}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "icon-block")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "svg-icon")}
                  value="%3Csvg%20width%3D%2211%22%20height%3D%2213%22%20viewbox%3D%220%200%2011%2013%22%20fill%3D%22currentColor%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.42188%201.25C4.28125%201.25%204.17188%201.3125%204.09375%201.4375L3.74219%202H7.25781L6.90625%201.4375C6.82812%201.3125%206.71875%201.25%206.57812%201.25H4.42188ZM8.14844%202H9.25H10H10.375C10.6094%202.01563%2010.7344%202.14062%2010.75%202.375C10.7344%202.60938%2010.6094%202.73437%2010.375%202.75H9.95312L9.34375%2011.1172C9.3125%2011.5078%209.15625%2011.8359%208.875%2012.1016C8.59375%2012.3516%208.25%2012.4844%207.84375%2012.5H3.15625C2.75%2012.4844%202.40625%2012.3516%202.125%2012.1016C1.84375%2011.8359%201.6875%2011.5078%201.65625%2011.1172L1.04688%202.75H0.625C0.390625%202.73437%200.265625%202.60938%200.25%202.375C0.265625%202.14062%200.390625%202.01563%200.625%202H1H1.75H2.85156L3.46094%201.03906C3.69531%200.695312%204.01562%200.515625%204.42188%200.5H6.57812C6.98438%200.515625%207.30469%200.695312%207.53906%201.03906L8.14844%202ZM9.20312%202.75H1.79688L2.40625%2011.0469C2.42188%2011.25%202.5%2011.4141%202.64062%2011.5391C2.78125%2011.6797%202.95312%2011.75%203.15625%2011.75H7.84375C8.04688%2011.75%208.21875%2011.6797%208.35938%2011.5391C8.5%2011.4141%208.57812%2011.25%208.59375%2011.0469L9.20312%202.75Z%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block tag="div">{"Delete"}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-question-top-block", "clickable")}
          tag="div"
          {...onclickRequiredCheckbox}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "scr-req-checkbox")}
            tag="div"
          >
            {isReqChecked ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "scr-req-checkbox-icon")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "svg-icon")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%208.58579L10.2929%205.29289C10.6834%204.90237%2011.3166%204.90237%2011.7071%205.29289C12.0976%205.68342%2012.0976%206.31658%2011.7071%206.70711L7.70711%2010.7071C7.31658%2011.0976%206.68342%2011.0976%206.29289%2010.7071L4.29289%208.70711C3.90237%208.31658%203.90237%207.68342%204.29289%207.29289C4.68342%206.90237%205.31658%206.90237%205.70711%207.29289L7%208.58579Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-418")}
              tag="div"
            />
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {"Mark this question as required"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
