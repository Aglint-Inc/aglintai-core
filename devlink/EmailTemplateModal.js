import React from "react";
import * as _Builtin from "./_Builtin";
import { TemplateButton } from "./TemplateButton";
import { ButtonPrimaryRegular } from "./ButtonPrimaryRegular";
import * as _utils from "./utils";
import _styles from "./EmailTemplateModal.module.css";

export function EmailTemplateModal({
  as: _Component = _Builtin.Block,
  textTemplateName = "Template 1",
  onClickEditName = {},
  onClickEdit = {},
  slotTemplateButton,
  slotSubjectInput,
  slotBodyInput,
  onClickCancel = {},
  onClickSaveTemplate = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "template-pop-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "template-header-email")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "template-header-left")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {textTemplateName}
          </_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons", "pointer")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.7555%201.18437C10.6096%201.05312%2010.4419%200.987499%2010.2523%200.987499C10.0628%200.987499%209.89505%201.05312%209.74922%201.18437L9.18047%201.775L10.4273%203.02187L11.018%202.45312C11.1492%202.30729%2011.2148%202.13958%2011.2148%201.95C11.2148%201.76042%2011.1492%201.59271%2011.018%201.44687L10.7555%201.18437ZM4.93672%206.01875C4.84922%206.10625%204.79089%206.21562%204.76172%206.34687L4.41172%207.79062L5.85547%207.4625C5.98672%207.41875%206.09609%207.35312%206.18359%207.26562L9.92422%203.525L8.67734%202.27812L4.93672%206.01875ZM9.26797%200.703124C9.55964%200.426041%209.88776%200.287499%2010.2523%200.287499C10.6315%200.287499%2010.9596%200.426041%2011.2367%200.703124L11.4992%200.965624C11.7763%201.25729%2011.9148%201.58542%2011.9148%201.95C11.9148%202.32917%2011.7763%202.65729%2011.4992%202.93437L6.68672%207.76875C6.49714%207.95833%206.27109%208.08229%206.00859%208.14062L4.03984%208.6C3.90859%208.61458%203.79922%208.57812%203.71172%208.49062C3.62422%208.40312%203.58776%208.30104%203.60234%208.18437L4.06172%206.19375C4.12005%205.93125%204.24401%205.70521%204.43359%205.51562L9.26797%200.703124ZM2.55234%201.6H5.35234C5.57109%201.61458%205.68776%201.73125%205.70234%201.95C5.68776%202.16875%205.57109%202.28542%205.35234%202.3H2.55234C2.26068%202.31458%202.01276%202.41667%201.80859%202.60625C1.61901%202.81042%201.51693%203.05833%201.50234%203.35V9.65C1.51693%209.94167%201.61901%2010.1896%201.80859%2010.3938C2.01276%2010.5833%202.26068%2010.6854%202.55234%2010.7H8.85234C9.14401%2010.6854%209.39193%2010.5833%209.59609%2010.3938C9.78568%2010.1896%209.88776%209.94167%209.90234%209.65V6.85C9.91693%206.63125%2010.0336%206.51458%2010.2523%206.5C10.4711%206.51458%2010.5878%206.63125%2010.6023%206.85V9.65C10.5878%2010.1458%2010.4201%2010.5615%2010.0992%2010.8969C9.7638%2011.2177%209.34818%2011.3854%208.85234%2011.4H2.55234C2.05651%2011.3854%201.64089%2011.2177%201.30547%2010.8969C0.984635%2010.5615%200.816927%2010.1458%200.802343%209.65V3.35C0.816927%202.85417%200.984635%202.43854%201.30547%202.10312C1.64089%201.78229%202.05651%201.61458%202.55234%201.6Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
            {...onClickEditName}
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "template-header-right")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "fw-semibold",
              "color-grey-600",
              "cursor-pointer"
            )}
            tag="div"
            {...onClickEdit}
          >
            {"Edit"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {slotTemplateButton ?? <TemplateButton />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "template-body-email")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Subject"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-template-subject-input")}
            tag="div"
          >
            {slotSubjectInput}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "template-body-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Email Body"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ai-display-pop")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.25%202.65625L12%202L12.6562%200.25C12.7188%200.0833333%2012.8333%200%2013%200C13.1667%200%2013.2812%200.0833333%2013.3438%200.25L14%202L15.7812%202.65625C15.9271%202.71875%2016%202.83333%2016%203C16%203.16667%2015.9271%203.28125%2015.7812%203.34375L14%204L13.3438%205.78125C13.2812%205.92708%2013.1667%206%2013%206C12.8333%206%2012.7188%205.92708%2012.6562%205.78125L12%204L10.25%203.34375C10.0833%203.28125%2010%203.16667%2010%203C10%202.83333%2010.0833%202.71875%2010.25%202.65625ZM6.40625%202.28125L8.0625%205.84375L11.625%207.5C11.8125%207.60417%2011.9062%207.75%2011.9062%207.9375C11.9062%208.14583%2011.8125%208.30208%2011.625%208.40625L8.0625%2010.0625L6.40625%2013.625C6.30208%2013.8125%206.15625%2013.9062%205.96875%2013.9062C5.76042%2013.9062%205.60417%2013.8125%205.5%2013.625L3.84375%2010.0625L0.28125%208.40625C0.09375%208.32292%200%208.17708%200%207.96875C0%207.76042%200.09375%207.60417%200.28125%207.5L3.84375%205.84375L5.5%202.28125C5.60417%202.09375%205.76042%202%205.96875%202C6.17708%202%206.32292%202.09375%206.40625%202.28125ZM12%2012L12.6562%2010.25C12.7188%2010.0833%2012.8333%2010%2013%2010C13.1667%2010%2013.2812%2010.0833%2013.3438%2010.25L14%2012L15.7812%2012.6562C15.9271%2012.7188%2016%2012.8333%2016%2013C16%2013.1667%2015.9271%2013.2812%2015.7812%2013.3438L14%2014L13.3438%2015.7812C13.2812%2015.9271%2013.1667%2016%2013%2016C12.8333%2016%2012.7188%2015.9271%2012.6562%2015.7812L12%2014L10.25%2013.3438C10.0833%2013.2812%2010%2013.1667%2010%2013C10%2012.8333%2010.0833%2012.7188%2010.25%2012.6562L12%2012Z%22%20fill%3D%22%2317494D%22%20style%3D%22fill%3A%2317494D%3Bfill%3Acolor(display-p3%200.0902%200.2863%200.3020)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-kale-600")}
              tag="div"
            >
              {
                "Press ‘ / ’ to add an AI command or dynamic field in the editor"
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "email-body-rich-text")}
            tag="div"
          >
            {slotBodyInput}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "save-template-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600", "cursor-pointer")}
            tag="div"
            {...onClickCancel}
          >
            {"Cancel"}
          </_Builtin.Block>
          <_Builtin.Block tag="div" {...onClickSaveTemplate}>
            <ButtonPrimaryRegular textLabel="Save Template" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
