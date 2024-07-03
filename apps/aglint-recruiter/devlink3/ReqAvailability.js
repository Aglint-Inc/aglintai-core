"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { CloseButton } from "./CloseButton";
import { SlotComp } from "./SlotComp";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./ReqAvailability.module.css";

export function ReqAvailability({
  as: _Component = _Builtin.Block,
  textDateAvailability = "April 10 - April 23",
  onClickEditDate = {},
  onClickClose = {},
  textScheduleSelected = "2 Schedule selected",
  textDuration = "2 Schedule selected",
  slotIcons,
  slotCheckingIcon,
  slotScheduleSelectPill,
  slotReqToggle,
  slotCheckboxAvailability,
  isFoundSlots = true,
  textFoundSlots = "Found 126 slots for the sugeestion",
  slotAvailabilityCriteria,
  onClickCancel = {},
  onClickReqAvailability = {},
  isCheckingSlotsVisible = true,
  isCheckbox = true,
  isLoading = false,
  textFoundSlotsCount = "This is a global text component",
  slotBadge,
}) {
  return (
    <_Component className={_utils.cx(_styles, "req_vailibility")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "req_body")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "req_availability_body")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "selected_schedule_wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "selected_schedule_duration")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "flex-horizontal", "gap-2")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10%203C8.72917%203.02083%207.5625%203.33333%206.5%203.9375C5.4375%204.5625%204.58333%205.41667%203.9375%206.5C3.3125%207.60417%203%208.77083%203%2010C3%2011.2292%203.3125%2012.3958%203.9375%2013.5C4.58333%2014.5833%205.4375%2015.4375%206.5%2016.0625C7.5625%2016.6667%208.72917%2016.9792%2010%2017C11.2708%2016.9792%2012.4375%2016.6667%2013.5%2016.0625C14.5625%2015.4375%2015.4167%2014.5833%2016.0625%2013.5C16.6875%2012.3958%2017%2011.2292%2017%2010C17%208.77083%2016.6875%207.60417%2016.0625%206.5C15.4167%205.41667%2014.5625%204.5625%2013.5%203.9375C12.4375%203.33333%2011.2708%203.02083%2010%203ZM10%2018C8.54167%2017.9792%207.20833%2017.625%206%2016.9375C4.79167%2016.2292%203.8125%2015.25%203.0625%2014C2.35417%2012.7292%202%2011.3958%202%2010C2%208.60417%202.35417%207.27083%203.0625%206C3.8125%204.75%204.79167%203.77083%206%203.0625C7.20833%202.375%208.54167%202.02083%2010%202C11.4583%202.02083%2012.7917%202.375%2014%203.0625C15.2083%203.77083%2016.1875%204.75%2016.9375%206C17.6458%207.27083%2018%208.60417%2018%2010C18%2011.3958%2017.6458%2012.7292%2016.9375%2014C16.1875%2015.25%2015.2083%2016.2292%2014%2016.9375C12.7917%2017.625%2011.4583%2017.9792%2010%2018ZM13.3438%208.34375L9.34375%2012.3438C9.11458%2012.5521%208.88542%2012.5521%208.65625%2012.3438L6.65625%2010.3438C6.44792%2010.1146%206.44792%209.88542%206.65625%209.65625C6.88542%209.44792%207.11458%209.44792%207.34375%209.65625L9%2011.2812L12.6562%207.65625C12.8854%207.44792%2013.1146%207.44792%2013.3438%207.65625C13.5521%207.88542%2013.5521%208.11458%2013.3438%208.34375Z%22%20fill%3D%22%23038153%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <Text content={textScheduleSelected} weight="medium" />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "flex-horizontal", "gap-2")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10%202C11.5%202.02083%2012.8438%202.38542%2014.0312%203.09375C15.2396%203.80208%2016.1979%204.76042%2016.9062%205.96875C17.6146%207.15625%2017.9792%208.5%2018%2010C17.9792%2011.5%2017.6146%2012.8438%2016.9062%2014.0312C16.1979%2015.2396%2015.2396%2016.1979%2014.0312%2016.9062C12.8438%2017.6146%2011.5%2017.9792%2010%2018C8.5%2017.9792%207.15625%2017.6146%205.96875%2016.9062C4.76042%2016.1979%203.80208%2015.2396%203.09375%2014.0312C2.38542%2012.8438%202.02083%2011.5%202%2010C2.02083%208.3125%202.47917%206.8125%203.375%205.5C3.58333%205.27083%203.8125%205.22917%204.0625%205.375C4.3125%205.5625%204.36458%205.79167%204.21875%206.0625C3.42708%207.20833%203.02083%208.52083%203%2010C3.02083%2011.3125%203.34375%2012.4896%203.96875%2013.5312C4.57292%2014.5938%205.40625%2015.4271%206.46875%2016.0312C7.51042%2016.6562%208.6875%2016.9792%2010%2017C11.3125%2016.9792%2012.4896%2016.6562%2013.5312%2016.0312C14.5938%2015.4271%2015.4271%2014.5938%2016.0312%2013.5312C16.6562%2012.4896%2016.9792%2011.3125%2017%2010C16.9583%208.10417%2016.3333%206.51042%2015.125%205.21875C13.8958%203.92708%2012.3542%203.19792%2010.5%203.03125V5.5C10.4792%205.8125%2010.3125%205.97917%2010%206C9.6875%205.97917%209.52083%205.8125%209.5%205.5V2.5C9.52083%202.1875%209.6875%202.02083%2010%202ZM7.34375%206.65625L10.3438%209.65625C10.5521%209.88542%2010.5521%2010.1146%2010.3438%2010.3438C10.1146%2010.5521%209.88542%2010.5521%209.65625%2010.3438L6.65625%207.34375C6.44792%207.11458%206.44792%206.88542%206.65625%206.65625C6.88542%206.44792%207.11458%206.44792%207.34375%206.65625Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <Text content={textDuration} weight="medium" />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot_selected_schedule")}
              tag="div"
            >
              {slotScheduleSelectPill ?? <SlotComp componentNeme="Prefernce" />}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "req-availaibilty-toggle-wrap")}
            tag="div"
          >
            <Text content="Request Availability" weight="medium" />
            <Text
              content={
                <>
                  {
                    "Customize time suggestions by enabling or disabling the following options:"
                  }
                  <br />
                </>
              }
              weight=""
              color="neutral"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-toggle-button")}
              tag="div"
            >
              {slotReqToggle ?? <SlotComp componentNeme="Prefernce" />}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {isCheckingSlotsVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "ra-slot-prefernce")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "check-slots-wrap")}
                  tag="div"
                >
                  <_Builtin.Image
                    className={_utils.cx(_styles, "loader_gif")}
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/665d6d6ac63854bb312ed8b2_kOnzy.gif"
                  />
                  <Text weight="" content="Checking available slots" />
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
            {isFoundSlots ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "found_slots")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text_with_icon")}
                  tag="div"
                  data-color="neutral-12"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "embed_flex")}
                    value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10%2018C8.54167%2017.9792%207.20833%2017.625%206%2016.9375C4.79167%2016.2292%203.8125%2015.25%203.0625%2014C2.35417%2012.7292%202%2011.3958%202%2010C2%208.60417%202.35417%207.27083%203.0625%206C3.8125%204.75%204.79167%203.77083%206%203.0625C7.20833%202.375%208.54167%202.02083%2010%202C11.4583%202.02083%2012.7917%202.375%2014%203.0625C15.2083%203.77083%2016.1875%204.75%2016.9375%206C17.6458%207.27083%2018%208.60417%2018%2010C18%2011.3958%2017.6458%2012.7292%2016.9375%2014C16.1875%2015.25%2015.2083%2016.2292%2014%2016.9375C12.7917%2017.625%2011.4583%2017.9792%2010%2018ZM13.5312%208.53125C13.8229%208.17708%2013.8229%207.82292%2013.5312%207.46875C13.1771%207.17708%2012.8229%207.17708%2012.4688%207.46875L9%2010.9375L7.53125%209.46875C7.17708%209.17708%206.82292%209.17708%206.46875%209.46875C6.17708%209.82292%206.17708%2010.1771%206.46875%2010.5312L8.46875%2012.5312C8.82292%2012.8229%209.17708%2012.8229%209.53125%2012.5312L13.5312%208.53125Z%22%20fill%3D%22%23F76B15%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "one-line-clamp")}
                    tag="div"
                  >
                    <Text
                      content={textFoundSlotsCount}
                      weight="medium"
                      color=""
                      size="2"
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "slot_badges")}
                  tag="div"
                >
                  {slotBadge}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "req-availaibilty-toggle-wrap")}
            tag="div"
          >
            <Text
              content={
                <>
                  {"Set Minimum Requirements:"}
                  <br />
                </>
              }
              weight="medium"
            />
            <Text
              content={
                <>
                  {
                    "Specify the minimum number of days and slots per day to be selected for the candidate's availability."
                  }
                  <br />
                </>
              }
              weight=""
              color="neutral"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "ra-slot-availability")}
              tag="div"
            >
              {slotAvailabilityCriteria ?? (
                <SlotComp componentNeme="Prefernce" />
              )}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "flex_v4")}
              tag="div"
            />
          </_Builtin.Block>
          {isCheckbox ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "flex-h2", "depricate")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                {slotCheckboxAvailability ?? (
                  <SlotComp componentNeme="Ceckbox" />
                )}
              </_Builtin.Block>
              <Text weight="" content="Create task for availability request." />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "button_grid")} tag="div">
        <ButtonSoft
          onClickButton={onClickCancel}
          textButton="Back"
          size="2"
          color="neutral"
        />
        <ButtonSolid
          onClickButton={onClickReqAvailability}
          isLoading={isLoading}
          textButton="Request Availability"
          size="2"
        />
      </_Builtin.Block>
    </_Component>
  );
}
