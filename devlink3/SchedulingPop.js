import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SchedulingPop.module.css";

export function SchedulingPop({
  as: _Component = _Builtin.Block,
  slotRadioEmail,
  slotRadiophone,
  isEmailActive = true,
  isPhoneActive = false,
  slotPrimaryButton,
  slotInput1,
  slotInput2,
  onClickClose = {},
  textEmail = "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  textPhone = "Torem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  slotInput3,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1282")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1283")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {"Scheddule with agent"}
        </_Builtin.Block>
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons", "cursor-pointer")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.7812%202.28125L7.0625%206L10.7812%209.71875C11.0729%2010.0729%2011.0729%2010.4271%2010.7812%2010.7812C10.4271%2011.0729%2010.0729%2011.0729%209.71875%2010.7812L6%207.0625L2.28125%2010.7812C1.92708%2011.0729%201.57292%2011.0729%201.21875%2010.7812C0.927083%2010.4271%200.927083%2010.0729%201.21875%209.71875L4.9375%206L1.21875%202.28125C0.927083%201.92708%200.927083%201.57292%201.21875%201.21875C1.57292%200.927083%201.92708%200.927083%202.28125%201.21875L6%204.9375L9.71875%201.21875C10.0729%200.927083%2010.4271%200.927083%2010.7812%201.21875C11.0729%201.57292%2011.0729%201.92708%2010.7812%202.28125Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          {...onClickClose}
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1284")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1285")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1287")}
            tag="div"
          >
            <_Builtin.Block tag="div">{slotRadioEmail}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Email"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey_600", "relative-1")}
            tag="div"
          >
            {textEmail}
          </_Builtin.Block>
          {isEmailActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1288")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1285")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1287")}
            tag="div"
          >
            <_Builtin.Block tag="div">{slotRadiophone}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Phone"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey_600", "relative-1")}
            tag="div"
          >
            {textPhone}
          </_Builtin.Block>
          {isPhoneActive ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1288")}
              tag="div"
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      {isPhoneActive ? (
        <_Builtin.Block tag="div">{slotInput1}</_Builtin.Block>
      ) : null}
      {isPhoneActive ? (
        <_Builtin.Block tag="div">{slotInput2}</_Builtin.Block>
      ) : null}
      {isEmailActive ? (
        <_Builtin.Block tag="div">{slotInput3}</_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1289")}
        tag="div"
      >
        {slotPrimaryButton}
      </_Builtin.Block>
    </_Component>
  );
}
