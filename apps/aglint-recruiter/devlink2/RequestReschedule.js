"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { IconButtonSoft } from "./IconButtonSoft";
import { SlotComp } from "./SlotComp";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonSolid } from "./ButtonSolid";
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
        <Text content={textHeader} weight="medium" />
        <_Builtin.Block tag="div" {...onClickClose}>
          <IconButtonSoft iconWeight="thin" iconName="close" color="neutral" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        {isRangeVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1493")}
            tag="div"
          >
            <Text
              color="neutral"
              content="Please select new dates for your interview and provide a reason for the reschedule."
            />
            <_Builtin.Block tag="div">
              {slotDateRangeInput ?? (
                <SlotComp componentName="Date Range Input" />
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isCancelWarningVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1495")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2226%22%20height%3D%2224%22%20viewbox%3D%220%200%2026%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M13%201.5C13.7188%201.53125%2014.2656%201.84375%2014.6406%202.4375L24.7656%2019.6875C25.0781%2020.3125%2025.0781%2020.9375%2024.7656%2021.5625C24.3906%2022.1562%2023.8438%2022.4688%2023.125%2022.5H2.875C2.15625%2022.4688%201.60938%2022.1562%201.23438%2021.5625C0.921875%2020.9375%200.921875%2020.3125%201.23438%2019.6875L11.4062%202.4375C11.7812%201.84375%2012.3125%201.53125%2013%201.5ZM13%207.5C12.3125%207.5625%2011.9375%207.9375%2011.875%208.625V13.875C11.9375%2014.5625%2012.3125%2014.9375%2013%2015C13.6875%2014.9375%2014.0625%2014.5625%2014.125%2013.875V8.625C14.0625%207.9375%2013.6875%207.5625%2013%207.5ZM14.5%2018C14.5%2017.5625%2014.3594%2017.2031%2014.0781%2016.9219C13.7969%2016.6406%2013.4375%2016.5%2013%2016.5C12.5625%2016.5%2012.2031%2016.6406%2011.9219%2016.9219C11.6406%2017.2031%2011.5%2017.5625%2011.5%2018C11.5%2018.4375%2011.6406%2018.7969%2011.9219%2019.0781C12.2031%2019.3594%2012.5625%2019.5%2013%2019.5C13.4375%2019.5%2013.7969%2019.3594%2014.0781%2019.0781C14.3594%2018.7969%2014.5%2018.4375%2014.5%2018Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
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
        <Text
          color="neutral"
          content="Please provide a reason for reschedule."
        />
        <_Builtin.Block tag="div">
          {slotRadioText ?? <SlotComp componentName="Options" />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1493")}
        tag="div"
      >
        <Text color="neutral" content="Additional Notes" />
        <_Builtin.Block tag="div">
          {slotInputAdditionalNotes ?? <SlotComp componentName="Notes" />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1681")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1680")}
          tag="div"
        >
          {slotCancelButton ?? (
            <ButtonSoft
              onClickButton={onClickClose}
              color="neutral"
              size="2"
              isRightIcon={false}
              isLeftIcon={false}
              textButton="Cancel"
            />
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1680")}
          tag="div"
        >
          {slotPrimaryButton ?? (
            <ButtonSolid
              onClickButton={onClickTryReschedulingNow}
              isLeftIcon={false}
              isRightIcon={false}
              textButton="Request"
              size="2"
            />
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
