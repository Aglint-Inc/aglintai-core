import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InviteLinkConfirm.module.css";

export function InviteLinkConfirm({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  slotInviteLinkCard,
  slotConfirmButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "confirm-links")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1162")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-lg", "fw-semibold")}
          tag="div"
        >
          {"Confirm your option"}
        </_Builtin.Block>
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons", "cursor-pointer")}
          value="%3Csvg%20width%3D%2225%22%20height%3D%2224%22%20viewBox%3D%220%200%2025%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M16.6562%2016.8438L12.5%2012.7188L8.375%2016.8438C8.125%2017.0312%207.88542%2017.0312%207.65625%2016.8438C7.46875%2016.6146%207.46875%2016.3854%207.65625%2016.1562L11.7812%2012L7.65625%207.875C7.46875%207.625%207.46875%207.38542%207.65625%207.15625C7.88542%206.96875%208.125%206.96875%208.375%207.15625L12.5%2011.2812L16.6562%207.15625C16.8854%206.96875%2017.1146%206.96875%2017.3438%207.15625C17.5312%207.38542%2017.5312%207.625%2017.3438%207.875L13.2188%2012L17.3438%2016.1562C17.5312%2016.3854%2017.5312%2016.6146%2017.3438%2016.8438C17.1146%2017.0312%2016.8854%2017.0312%2016.6562%2016.8438Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
          {...onClickClose}
        />
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600", "text-lg")}
          tag="div"
        >
          {
            "Before we finalize your schedule, please take a moment to confirm the chosen option. Your interview is crucial, and we want to ensure it aligns perfectly with your availability."
          }
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">{slotInviteLinkCard}</_Builtin.Block>
      <_Builtin.Block tag="div">{slotConfirmButton}</_Builtin.Block>
    </_Component>
  );
}
