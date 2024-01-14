import React from "react";
import * as _Builtin from "./_Builtin";
import { ToggleButton } from "./ToggleButton";
import { ScrQuestionOptionEdit } from "./ScrQuestionOptionEdit";
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
  slotButtons,
  onclickDelete = {},
  isDeleteVisible = true,
  slotDescription,
  isDescriptionVisible = false,
  slotDescriptionToggle,
}) {
  return (
    <_Component className={_utils.cx(_styles, "scr-question-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "scr-question-top")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-question-top-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600")}
            tag="div"
          >
            {"Edit question"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-question-top-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "scr-req-checkbox")}
            tag="div"
            {...onclickRequiredCheckbox}
          >
            {isReqChecked ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "scr-req-checkbox-icon")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "svg-icon")}
                  value="%3Csvg%20width%3D%22100%25%22%20height%3D%22100%25%22%20viewBox%3D%220%200%2011%2012%22%20fill%3DcurrentColor%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.75%200.75H9.25C9.67188%200.765625%2010.0234%200.914062%2010.3047%201.19531C10.5859%201.47656%2010.7344%201.82812%2010.75%202.25V9.75C10.7344%2010.1719%2010.5859%2010.5234%2010.3047%2010.8047C10.0234%2011.0859%209.67188%2011.2344%209.25%2011.25H1.75C1.32812%2011.2344%200.976562%2011.0859%200.695312%2010.8047C0.414062%2010.5234%200.265625%2010.1719%200.25%209.75V2.25C0.265625%201.82812%200.414062%201.47656%200.695312%201.19531C0.976562%200.914062%201.32812%200.765625%201.75%200.75ZM8.14844%204.89844C8.36719%204.63281%208.36719%204.36719%208.14844%204.10156C7.88281%203.88281%207.61719%203.88281%207.35156%204.10156L4.75%206.70312L3.64844%205.60156C3.38281%205.38281%203.11719%205.38281%202.85156%205.60156C2.63281%205.86719%202.63281%206.13281%202.85156%206.39844L4.35156%207.89844C4.61719%208.11719%204.88281%208.11719%205.14844%207.89844L8.14844%204.89844Z%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-418")}
              tag="div"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600")}
            tag="div"
          >
            {"Required field"}
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
              className={_utils.cx(_styles, "div-block-419")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "scr-question-add-btn")}
                tag="div"
                {...onclickAddOption}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "icon-block")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "svg-icon")}
                    value="%3Csvg%20width%3D%2211%22%20height%3D%2210%22%20viewBox%3D%220%200%2011%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.0625%200.6875V4.4375H9.8125C10.1562%204.46875%2010.3438%204.65625%2010.375%205C10.3438%205.34375%2010.1562%205.53125%209.8125%205.5625H6.0625V9.3125C6.03125%209.65625%205.84375%209.84375%205.5%209.875C5.15625%209.84375%204.96875%209.65625%204.9375%209.3125V5.5625H1.1875C0.84375%205.53125%200.65625%205.34375%200.625%205C0.65625%204.65625%200.84375%204.46875%201.1875%204.4375H4.9375V0.6875C4.96875%200.34375%205.15625%200.15625%205.5%200.125C5.84375%200.15625%206.03125%200.34375%206.0625%200.6875Z%22%20fill%3D%22%23337FBD%22%20style%3D%22fill%3A%23337FBD%3Bfill%3Acolor(display-p3%200.2000%200.4980%200.7412)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-blue-500")}
                  tag="div"
                >
                  {"Add option"}
                </_Builtin.Block>
              </_Builtin.Block>
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
                  value="%3Csvg%20width%3D%2211%22%20height%3D%2213%22%20viewBox%3D%220%200%2011%2013%22%20fill%3DcurrentColor%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.42188%201.25C4.28125%201.25%204.17188%201.3125%204.09375%201.4375L3.74219%202H7.25781L6.90625%201.4375C6.82812%201.3125%206.71875%201.25%206.57812%201.25H4.42188ZM8.14844%202H9.25H10H10.375C10.6094%202.01563%2010.7344%202.14062%2010.75%202.375C10.7344%202.60938%2010.6094%202.73437%2010.375%202.75H9.95312L9.34375%2011.1172C9.3125%2011.5078%209.15625%2011.8359%208.875%2012.1016C8.59375%2012.3516%208.25%2012.4844%207.84375%2012.5H3.15625C2.75%2012.4844%202.40625%2012.3516%202.125%2012.1016C1.84375%2011.8359%201.6875%2011.5078%201.65625%2011.1172L1.04688%202.75H0.625C0.390625%202.73437%200.265625%202.60938%200.25%202.375C0.265625%202.14062%200.390625%202.01563%200.625%202H1H1.75H2.85156L3.46094%201.03906C3.69531%200.695312%204.01562%200.515625%204.42188%200.5H6.57812C6.98438%200.515625%207.30469%200.695312%207.53906%201.03906L8.14844%202ZM9.20312%202.75H1.79688L2.40625%2011.0469C2.42188%2011.25%202.5%2011.4141%202.64062%2011.5391C2.78125%2011.6797%202.95312%2011.75%203.15625%2011.75H7.84375C8.04688%2011.75%208.21875%2011.6797%208.35938%2011.5391C8.5%2011.4141%208.57812%2011.25%208.59375%2011.0469L9.20312%202.75Z%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block tag="div">{"Delete"}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-question-buttons-wrapper")}
          tag="div"
        >
          {slotButtons}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
