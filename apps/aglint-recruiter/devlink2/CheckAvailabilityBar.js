import React from "react";
import * as _Builtin from "./_Builtin";
import { AvailableSlots } from "./AvailableSlots";
import * as _utils from "./utils";
import _styles from "./CheckAvailabilityBar.module.css";

export function CheckAvailabilityBar({
  as: _Component = _Builtin.Block,
  slotTimezoneInput,
  slotDurationInput,
  slotDateRangeInput,
  onClickCheckAvailabilty = {},
  isSelected = false,
  onClickClose = {},
  textSlotNumber = "--",
  slotAvatarGroup,
  slotAvailableSlots,
  isCommonAvailableSlotVisible = true,
  slotStartDateInput,
  slotEndDateInput,
  slotLoader,
  textButtonLabel = "Check Availability",
  isButtonLoaderActive = false,
  isCheckAvailabilityDisable = false,
  onClickReqConfirmation = {},
  slotButtonLoaders,
  isButtonLoaderVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "panel_top_input_bar")} tag="div">
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "team_detail_topbar",
          "panel_availability_info"
        )}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "input_block")} tag="div">
          <_Builtin.Block tag="div">{"Time Zone"}</_Builtin.Block>
          <_Builtin.Block tag="div">{slotTimezoneInput}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "input_block")} tag="div">
          <_Builtin.Block tag="div">{"Start Date"}</_Builtin.Block>
          <_Builtin.Block tag="div">{slotStartDateInput}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "input_block")} tag="div">
          <_Builtin.Block tag="div">{"End Date"}</_Builtin.Block>
          <_Builtin.Block tag="div">{slotEndDateInput}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "input_block")} tag="div">
          <_Builtin.Block tag="div">{"Duration"}</_Builtin.Block>
          <_Builtin.Block tag="div">{slotDurationInput}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-994")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "button_primary")}
            tag="div"
            {...onClickCheckAvailabilty}
          >
            {isButtonLoaderActive ? (
              <_Builtin.Block tag="div">{slotLoader}</_Builtin.Block>
            ) : null}
            <_Builtin.Block tag="div">{textButtonLabel}</_Builtin.Block>
          </_Builtin.Block>
          {isCheckAvailabilityDisable ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "disable-button-primary-reg")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Check Availability"}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        {isSelected ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "selected_slotbanner")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "close_icon")}
              tag="div"
              {...onClickClose}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5%209C4.44772%209%204%208.55228%204%208C4%207.44772%204.44772%207%205%207H11C11.5523%207%2012%207.44772%2012%208C12%208.55228%2011.5523%209%2011%209H5Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "no_of_slots")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {textSlotNumber}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"slots selected"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "team_avatar")}
              tag="div"
            >
              {slotAvatarGroup}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "button_primary")}
              tag="div"
              {...onClickReqConfirmation}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2213%22%20height%3D%2212%22%20viewBox%3D%220%200%2013%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.30957%200C4.54395%200.015625%204.66895%200.140625%204.68457%200.375V1.5H9.18457V0.375C9.2002%200.140625%209.3252%200.015625%209.55957%200C9.79395%200.015625%209.91895%200.140625%209.93457%200.375V1.5H10.6846C11.1064%201.51563%2011.458%201.66406%2011.7393%201.94531C12.0205%202.22656%2012.1689%202.57812%2012.1846%203V3.75V4.5V10.5C12.1689%2010.9219%2012.0205%2011.2734%2011.7393%2011.5547C11.458%2011.8359%2011.1064%2011.9844%2010.6846%2012H3.18457C2.7627%2011.9844%202.41113%2011.8359%202.12988%2011.5547C1.84863%2011.2734%201.7002%2010.9219%201.68457%2010.5V4.5V3.75V3C1.7002%202.57812%201.84863%202.22656%202.12988%201.94531C2.41113%201.66406%202.7627%201.51563%203.18457%201.5H3.93457V0.375C3.9502%200.140625%204.0752%200.015625%204.30957%200ZM11.4346%204.5H8.99707V6.1875H11.4346V4.5ZM11.4346%206.9375H8.99707V8.8125H11.4346V6.9375ZM11.4346%209.5625H8.99707V11.25H10.6846C10.9033%2011.25%2011.083%2011.1797%2011.2236%2011.0391C11.3643%2010.8984%2011.4346%2010.7188%2011.4346%2010.5V9.5625ZM8.24707%208.8125V6.9375H5.62207V8.8125H8.24707ZM5.62207%209.5625V11.25H8.24707V9.5625H5.62207ZM4.87207%208.8125V6.9375H2.43457V8.8125H4.87207ZM2.43457%209.5625V10.5C2.43457%2010.7188%202.50488%2010.8984%202.64551%2011.0391C2.78613%2011.1797%202.96582%2011.25%203.18457%2011.25H4.87207V9.5625H2.43457ZM2.43457%206.1875H4.87207V4.5H2.43457V6.1875ZM5.62207%206.1875H8.24707V4.5H5.62207V6.1875ZM10.6846%202.25H3.18457C2.96582%202.25%202.78613%202.32031%202.64551%202.46094C2.50488%202.60156%202.43457%202.78125%202.43457%203V3.75H11.4346V3C11.4346%202.78125%2011.3643%202.60156%2011.2236%202.46094C11.083%202.32031%2010.9033%202.25%2010.6846%202.25Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">
                {"Request Confirmation"}
              </_Builtin.Block>
              {isButtonLoaderVisible ? (
                <_Builtin.Block tag="div">{slotButtonLoaders}</_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isSelected ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "selected_slotbanner_bg")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
      {isCommonAvailableSlotVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "availability_slots")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Common Available Slots"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "commonslots_panel")}
            tag="div"
          >
            {slotAvailableSlots ?? <AvailableSlots />}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
