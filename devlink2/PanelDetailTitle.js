import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./PanelDetailTitle.module.css";

export function PanelDetailTitle({
  as: _Component = _Builtin.Block,
  slotDurationInput,
  textYearMonth = "Januarry 2024",
  onClickPrev = {},
  onClickNext = {},
  isSlotSelected = false,
  onClickDeselect = {},
  slotNumber,
  slotSelectedAvatarGroup,
  onClickConfirm = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "team_detail_topbar")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "team_detail_header_wrapper")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Panel Members and Available slots in"}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotDurationInput}</_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"duration"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "calender_switch")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "calender_month")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.375%203C6.60938%203.01563%206.73438%203.14062%206.75%203.375V4.5H11.25V3.375C11.2656%203.14062%2011.3906%203.01563%2011.625%203C11.8594%203.01563%2011.9844%203.14062%2012%203.375V4.5H12.75C13.1719%204.51562%2013.5234%204.66406%2013.8047%204.94531C14.0859%205.22656%2014.2344%205.57812%2014.25%206V6.75V7.5V13.5C14.2344%2013.9219%2014.0859%2014.2734%2013.8047%2014.5547C13.5234%2014.8359%2013.1719%2014.9844%2012.75%2015H5.25C4.82812%2014.9844%204.47656%2014.8359%204.19531%2014.5547C3.91406%2014.2734%203.76562%2013.9219%203.75%2013.5V7.5V6.75V6C3.76562%205.57812%203.91406%205.22656%204.19531%204.94531C4.47656%204.66406%204.82812%204.51562%205.25%204.5H6V3.375C6.01562%203.14062%206.14062%203.01563%206.375%203ZM13.5%207.5H11.0625V9.1875H13.5V7.5ZM13.5%209.9375H11.0625V11.8125H13.5V9.9375ZM13.5%2012.5625H11.0625V14.25H12.75C12.9688%2014.25%2013.1484%2014.1797%2013.2891%2014.0391C13.4297%2013.8984%2013.5%2013.7188%2013.5%2013.5V12.5625ZM10.3125%2011.8125V9.9375H7.6875V11.8125H10.3125ZM7.6875%2012.5625V14.25H10.3125V12.5625H7.6875ZM6.9375%2011.8125V9.9375H4.5V11.8125H6.9375ZM4.5%2012.5625V13.5C4.5%2013.7188%204.57031%2013.8984%204.71094%2014.0391C4.85156%2014.1797%205.03125%2014.25%205.25%2014.25H6.9375V12.5625H4.5ZM4.5%209.1875H6.9375V7.5H4.5V9.1875ZM7.6875%209.1875H10.3125V7.5H7.6875V9.1875ZM12.75%205.25H5.25C5.03125%205.25%204.85156%205.32031%204.71094%205.46094C4.57031%205.60156%204.5%205.78125%204.5%206V6.75H13.5V6C13.5%205.78125%2013.4297%205.60156%2013.2891%205.46094C13.1484%205.32031%2012.9688%205.25%2012.75%205.25Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{textYearMonth}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "calender_arrows")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "calender_arrow")}
            tag="div"
            {...onClickPrev}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex", "with_bg")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.10156%207.60156L8.60156%203.10156C8.86719%202.88281%209.13281%202.88281%209.39844%203.10156C9.61719%203.36719%209.61719%203.63281%209.39844%203.89844L5.29688%208L9.39844%2012.1016C9.61719%2012.3672%209.61719%2012.6328%209.39844%2012.8984C9.13281%2013.1172%208.86719%2013.1172%208.60156%2012.8984L4.10156%208.39844C3.88281%208.13281%203.88281%207.86719%204.10156%207.60156Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            {isSlotSelected ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "white_banner")}
                tag="div"
              />
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "calender_arrow")}
            tag="div"
            {...onClickNext}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(
                _styles,
                "embed_flex",
                "with_bg",
                "rotate-180"
              )}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.10156%207.60156L8.60156%203.10156C8.86719%202.88281%209.13281%202.88281%209.39844%203.10156C9.61719%203.36719%209.61719%203.63281%209.39844%203.89844L5.29688%208L9.39844%2012.1016C9.61719%2012.3672%209.61719%2012.6328%209.39844%2012.8984C9.13281%2013.1172%208.86719%2013.1172%208.60156%2012.8984L4.10156%208.39844C3.88281%208.13281%203.88281%207.86719%204.10156%207.60156Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            {isSlotSelected ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "white_banner")}
                tag="div"
              />
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isSlotSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "selected_slotbanner")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "close_icon")}
            tag="div"
            {...onClickDeselect}
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
              {slotNumber ?? "--"}
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
            {slotSelectedAvatarGroup}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "button_primary")}
            tag="div"
            {...onClickConfirm}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2213%22%20height%3D%2212%22%20viewBox%3D%220%200%2013%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.30957%200C4.54395%200.015625%204.66895%200.140625%204.68457%200.375V1.5H9.18457V0.375C9.2002%200.140625%209.3252%200.015625%209.55957%200C9.79395%200.015625%209.91895%200.140625%209.93457%200.375V1.5H10.6846C11.1064%201.51563%2011.458%201.66406%2011.7393%201.94531C12.0205%202.22656%2012.1689%202.57812%2012.1846%203V3.75V4.5V10.5C12.1689%2010.9219%2012.0205%2011.2734%2011.7393%2011.5547C11.458%2011.8359%2011.1064%2011.9844%2010.6846%2012H3.18457C2.7627%2011.9844%202.41113%2011.8359%202.12988%2011.5547C1.84863%2011.2734%201.7002%2010.9219%201.68457%2010.5V4.5V3.75V3C1.7002%202.57812%201.84863%202.22656%202.12988%201.94531C2.41113%201.66406%202.7627%201.51563%203.18457%201.5H3.93457V0.375C3.9502%200.140625%204.0752%200.015625%204.30957%200ZM11.4346%204.5H8.99707V6.1875H11.4346V4.5ZM11.4346%206.9375H8.99707V8.8125H11.4346V6.9375ZM11.4346%209.5625H8.99707V11.25H10.6846C10.9033%2011.25%2011.083%2011.1797%2011.2236%2011.0391C11.3643%2010.8984%2011.4346%2010.7188%2011.4346%2010.5V9.5625ZM8.24707%208.8125V6.9375H5.62207V8.8125H8.24707ZM5.62207%209.5625V11.25H8.24707V9.5625H5.62207ZM4.87207%208.8125V6.9375H2.43457V8.8125H4.87207ZM2.43457%209.5625V10.5C2.43457%2010.7188%202.50488%2010.8984%202.64551%2011.0391C2.78613%2011.1797%202.96582%2011.25%203.18457%2011.25H4.87207V9.5625H2.43457ZM2.43457%206.1875H4.87207V4.5H2.43457V6.1875ZM5.62207%206.1875H8.24707V4.5H5.62207V6.1875ZM10.6846%202.25H3.18457C2.96582%202.25%202.78613%202.32031%202.64551%202.46094C2.50488%202.60156%202.43457%202.78125%202.43457%203V3.75H11.4346V3C11.4346%202.78125%2011.3643%202.60156%2011.2236%202.46094C11.083%202.32031%2010.9033%202.25%2010.6846%202.25Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"Request Confirmation"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isSlotSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "selected_slotbanner_bg")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
