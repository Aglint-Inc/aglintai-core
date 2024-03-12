import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ScheduleInfoUpcoming.module.css";

export function ScheduleInfoUpcoming({
  as: _Component = _Builtin.Block,
  textDate = "27",
  textDay = "FRIDAY",
  textStatus = "Upcoming",
  textMonth = "February",
  textTitle = "Personality and culture",
  textTime = "09:00 AM to 11:30 AM",
  slotMeetingIcon,
  textPlatformName = "",
  slotMemberProfile,
  slotButtonPrimary,
  onClickCopyLink = {},
}) {
  return (
    <_Component tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1114", "upcoming")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "full-date-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "date-wrappers")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm", "text-gray-600")}
                tag="div"
              >
                {textMonth}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-20", "fw-semibold")}
                tag="div"
              >
                {textDate}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-xsm")}
                tag="div"
              >
                {textDay}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-xsm", "text-first-cap")}
                tag="div"
              >
                {textStatus}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-912")}
          tag="div"
        >
          <_Builtin.Block tag="div">{textTitle}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1216")}
            tag="div"
          >
            <_Builtin.Block tag="div">{textTime}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-913")}
              tag="div"
            >
              <_Builtin.Block tag="div">{slotMeetingIcon}</_Builtin.Block>
              <_Builtin.Block tag="div">{textPlatformName}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-915")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-914")}
              tag="div"
            >
              <_Builtin.Block tag="div">{slotMemberProfile}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1218")}
        tag="div"
      >
        <_Builtin.Block tag="div">{slotButtonPrimary}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1217", "cursor-pointer")}
          tag="div"
          {...onClickCopyLink}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "text-gray-600")}
            tag="div"
          >
            {"meet.google.com/efg-rgt-tte"}
          </_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.75%208.25C9.96875%208.25%2010.1484%208.17969%2010.2891%208.03906C10.4297%207.89844%2010.5%207.71875%2010.5%207.5V2.71875C10.5%202.60937%2010.4609%202.52344%2010.3828%202.46094L8.78906%200.867188C8.72656%200.789063%208.64062%200.75%208.53125%200.75H6C5.78125%200.75%205.60156%200.820312%205.46094%200.960938C5.32031%201.10156%205.25%201.28125%205.25%201.5V7.5C5.25%207.71875%205.32031%207.89844%205.46094%208.03906C5.60156%208.17969%205.78125%208.25%206%208.25H9.75ZM10.9219%201.92188C11.1406%202.14062%2011.25%202.40625%2011.25%202.71875V7.5C11.2344%207.92188%2011.0859%208.27344%2010.8047%208.55469C10.5234%208.83594%2010.1719%208.98438%209.75%209H6C5.57812%208.98438%205.22656%208.83594%204.94531%208.55469C4.66406%208.27344%204.51562%207.92188%204.5%207.5V1.5C4.51562%201.07812%204.66406%200.726562%204.94531%200.445312C5.22656%200.164062%205.57812%200.015625%206%200H8.53125C8.84375%200%209.10938%200.109375%209.32812%200.328125L10.9219%201.92188ZM2.25%203H3.75V3.75H2.25C2.03125%203.75%201.85156%203.82031%201.71094%203.96094C1.57031%204.10156%201.5%204.28125%201.5%204.5V10.5C1.5%2010.7188%201.57031%2010.8984%201.71094%2011.0391C1.85156%2011.1797%202.03125%2011.25%202.25%2011.25H6C6.21875%2011.25%206.39844%2011.1797%206.53906%2011.0391C6.67969%2010.8984%206.75%2010.7188%206.75%2010.5V9.75H7.5V10.5C7.48438%2010.9219%207.33594%2011.2734%207.05469%2011.5547C6.77344%2011.8359%206.42188%2011.9844%206%2012H2.25C1.82812%2011.9844%201.47656%2011.8359%201.19531%2011.5547C0.914062%2011.2734%200.765625%2010.9219%200.75%2010.5V4.5C0.765625%204.07812%200.914062%203.72656%201.19531%203.44531C1.47656%203.16406%201.82812%203.01563%202.25%203Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
