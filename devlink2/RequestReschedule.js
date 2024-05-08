"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonDanger } from "./ButtonDanger";
import { ButtonPrimary } from "./ButtonPrimary";
import * as _utils from "./utils";
import _styles from "./RequestReschedule.module.css";

export function RequestReschedule({
  as: _Component = _Builtin.Block,
  slotDateRangeInput,
  slotRadioText,
  slotInputAdditionalNotes,
  slotButton,
  onClickClose = {},
  textHeader = "Request Reschedule",
  isRangeVisible = true,
  onClickTryReschedulingNow = {},
  isCancelWarningVisible = false,
  slotCancelButton,
  slotPrimaryButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1491")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1492")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textHeader}
        </_Builtin.Block>
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons", "cursor-pointer")}
          value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.28125%201.21875L8%206.9375L13.7188%201.21875C14.0729%200.927083%2014.4271%200.927083%2014.7812%201.21875C15.0729%201.57292%2015.0729%201.92708%2014.7812%202.28125L9.0625%208L14.7812%2013.7188C15.0729%2014.0729%2015.0729%2014.4271%2014.7812%2014.7812C14.4271%2015.0729%2014.0729%2015.0729%2013.7188%2014.7812L8%209.0625L2.28125%2014.7812C1.92708%2015.0729%201.57292%2015.0729%201.21875%2014.7812C0.927083%2014.4271%200.927083%2014.0729%201.21875%2013.7188L6.9375%208L1.21875%202.28125C0.927083%201.92708%200.927083%201.57292%201.21875%201.21875C1.57292%200.927083%201.92708%200.927083%202.28125%201.21875Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          {...onClickClose}
        />
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        {isRangeVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1493")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {"Choose a date range that you want to reschedule with"}
            </_Builtin.Block>
            <_Builtin.Block tag="div">{slotDateRangeInput}</_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isCancelWarningVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1495")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2226%22%20height%3D%2224%22%20viewBox%3D%220%200%2026%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M13%201.5C13.7188%201.53125%2014.2656%201.84375%2014.6406%202.4375L24.7656%2019.6875C25.0781%2020.3125%2025.0781%2020.9375%2024.7656%2021.5625C24.3906%2022.1562%2023.8438%2022.4688%2023.125%2022.5H2.875C2.15625%2022.4688%201.60938%2022.1562%201.23438%2021.5625C0.921875%2020.9375%200.921875%2020.3125%201.23438%2019.6875L11.4062%202.4375C11.7812%201.84375%2012.3125%201.53125%2013%201.5ZM13%207.5C12.3125%207.5625%2011.9375%207.9375%2011.875%208.625V13.875C11.9375%2014.5625%2012.3125%2014.9375%2013%2015C13.6875%2014.9375%2014.0625%2014.5625%2014.125%2013.875V8.625C14.0625%207.9375%2013.6875%207.5625%2013%207.5ZM14.5%2018C14.5%2017.5625%2014.3594%2017.2031%2014.0781%2016.9219C13.7969%2016.6406%2013.4375%2016.5%2013%2016.5C12.5625%2016.5%2012.2031%2016.6406%2011.9219%2016.9219C11.6406%2017.2031%2011.5%2017.5625%2011.5%2018C11.5%2018.4375%2011.6406%2018.7969%2011.9219%2019.0781C12.2031%2019.3594%2012.5625%2019.5%2013%2019.5C13.4375%2019.5%2013.7969%2019.3594%2014.0781%2019.0781C14.3594%2018.7969%2014.5%2018.4375%2014.5%2018Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">
              {
                "Cancelling the interview will result in its cancellation, and it cannot be undone."
              }
              <_Builtin.Span
                className={_utils.cx(
                  _styles,
                  "text-blue-500",
                  "text-underline",
                  "cursor-pointer"
                )}
                {...onClickTryReschedulingNow}
              >
                {" Try rescheduling now"}
              </_Builtin.Span>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1494")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {"Please provide a reason for reschedule."}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotRadioText}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1493")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {"Additional Notes"}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotInputAdditionalNotes}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1681")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1680")}
          tag="div"
        >
          {slotCancelButton ?? <ButtonDanger />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1680")}
          tag="div"
        >
          {slotPrimaryButton ?? <ButtonPrimary />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
