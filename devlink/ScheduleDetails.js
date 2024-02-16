import React from "react";
import * as _Builtin from "./_Builtin";
import { PanelList } from "./PanelList";
import * as _utils from "./utils";
import _styles from "./ScheduleDetails.module.css";

export function ScheduleDetails({
  as: _Component = _Builtin.Block,
  slotCandidateDetails,
  isCompletedVisible = true,
  isUpcomingVisible = true,
  textDuration = "30 minutes",
  textTime = "09:00 AM to 09:30 AM",
  textPlatformName = "Google Meet",
  slotPlatformLogo,
  textMonth = "Feb",
  textDate = "27",
  textDay = "FRIDAY",
  textNotificationTime = "10 minutes before .",
  onClickJoinGoogleMeet = {},
  textMeetingLink = "meet.google.com/efg-rgt-tte",
  onClickCopyMeetingLink = {},
  textPanelName = "Team Engineering",
  slotPanelList,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "schedule-candidate-details")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate-details-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-920")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Candidate Details"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-cd-details")}
          tag="div"
        >
          {slotCandidateDetails}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "interview-details-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-920")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Interview Details"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-922")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            {isCompletedVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-909")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-911", "smaller")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-grey-600")}
                    tag="div"
                  >
                    {textMonth}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-30", "fw-semibold")}
                    tag="div"
                  >
                    {textDate}
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">{textDay}</_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-910", "smaller")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">{"Completed"}</_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
            {isUpcomingVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-909")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-911", "smaller")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-grey-600")}
                    tag="div"
                  >
                    {textMonth}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-30", "fw-semibold")}
                    tag="div"
                  >
                    {textDate}
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">{textDay}</_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "div-block-910",
                    "upcoming",
                    "smaller"
                  )}
                  tag="div"
                >
                  <_Builtin.Block tag="div">{"Upcoming"}</_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-924")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-lg", "fw-semibold")}
              tag="div"
            >
              {textDuration}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-lg", "fw-semibold")}
              tag="div"
            >
              {textTime}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-923")}
              tag="div"
            >
              <_Builtin.Block tag="div">{slotPlatformLogo}</_Builtin.Block>
              <_Builtin.Block tag="div">{textPlatformName}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-925")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7%200C7.29167%200%207.53125%200.09375%207.71875%200.28125C7.90625%200.46875%208%200.708333%208%201V1.5625C9.16667%201.77083%2010.1146%202.30208%2010.8438%203.15625C11.5938%204.01042%2011.9792%205.04167%2012%206.25V7.28125C12.0208%208.73958%2012.4792%2010.0417%2013.375%2011.1875L13.8438%2011.7812C14.0104%2012.0312%2014.0417%2012.2917%2013.9375%2012.5625C13.7917%2012.8333%2013.5625%2012.9792%2013.25%2013H0.75C0.4375%2012.9792%200.208333%2012.8333%200.0625%2012.5625C-0.0625%2012.2917%20-0.03125%2012.0312%200.15625%2011.7812L0.625%2011.1875C1.52083%2010.0417%201.97917%208.73958%202%207.28125V6.25C2.02083%205.04167%202.40625%204.01042%203.15625%203.15625C3.88542%202.30208%204.83333%201.77083%206%201.5625V1C6%200.708333%206.09375%200.46875%206.28125%200.28125C6.46875%200.09375%206.70833%200%207%200ZM7%203H6.75C5.83333%203.02083%205.0625%203.33333%204.4375%203.9375C3.83333%204.5625%203.52083%205.33333%203.5%206.25V7.28125C3.47917%208.82292%203.0625%2010.2292%202.25%2011.5H11.75C10.9167%2010.2292%2010.5%208.82292%2010.5%207.28125V6.25C10.4792%205.33333%2010.1667%204.5625%209.5625%203.9375C8.9375%203.33333%208.16667%203.02083%207.25%203H7ZM9%2014C9%2014.5417%208.80208%2015.0104%208.40625%2015.4062C8.01042%2015.8021%207.54167%2016%207%2016C6.45833%2016%205.98958%2015.8021%205.59375%2015.4062C5.19792%2015.0104%205%2014.5417%205%2014H7H9Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block className={_utils.cx(_styles, "text-lg")} tag="div">
            {textNotificationTime}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "button-primary-schedule", "mt-20")}
            tag="div"
            {...onClickJoinGoogleMeet}
          >
            <_Builtin.Block tag="div">{"Join with Google Meet"}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-926")}
            tag="div"
            {...onClickCopyMeetingLink}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "text-grey-600")}
              tag="div"
            >
              {textMeetingLink}
            </_Builtin.Block>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.75%208.25C9.96875%208.25%2010.1484%208.17969%2010.2891%208.03906C10.4297%207.89844%2010.5%207.71875%2010.5%207.5V2.71875C10.5%202.60937%2010.4609%202.52344%2010.3828%202.46094L8.78906%200.867188C8.72656%200.789063%208.64062%200.75%208.53125%200.75H6C5.78125%200.75%205.60156%200.820312%205.46094%200.960938C5.32031%201.10156%205.25%201.28125%205.25%201.5V7.5C5.25%207.71875%205.32031%207.89844%205.46094%208.03906C5.60156%208.17969%205.78125%208.25%206%208.25H9.75ZM10.9219%201.92188C11.1406%202.14062%2011.25%202.40625%2011.25%202.71875V7.5C11.2344%207.92188%2011.0859%208.27344%2010.8047%208.55469C10.5234%208.83594%2010.1719%208.98438%209.75%209H6C5.57812%208.98438%205.22656%208.83594%204.94531%208.55469C4.66406%208.27344%204.51562%207.92188%204.5%207.5V1.5C4.51562%201.07812%204.66406%200.726562%204.94531%200.445312C5.22656%200.164062%205.57812%200.015625%206%200H8.53125C8.84375%200%209.10938%200.109375%209.32812%200.328125L10.9219%201.92188ZM2.25%203H3.75V3.75H2.25C2.03125%203.75%201.85156%203.82031%201.71094%203.96094C1.57031%204.10156%201.5%204.28125%201.5%204.5V10.5C1.5%2010.7188%201.57031%2010.8984%201.71094%2011.0391C1.85156%2011.1797%202.03125%2011.25%202.25%2011.25H6C6.21875%2011.25%206.39844%2011.1797%206.53906%2011.0391C6.67969%2010.8984%206.75%2010.7188%206.75%2010.5V9.75H7.5V10.5C7.48438%2010.9219%207.33594%2011.2734%207.05469%2011.5547C6.77344%2011.8359%206.42188%2011.9844%206%2012H2.25C1.82812%2011.9844%201.47656%2011.8359%201.19531%2011.5547C0.914062%2011.2734%200.765625%2010.9219%200.75%2010.5V4.5C0.765625%204.07812%200.914062%203.72656%201.19531%203.44531C1.47656%203.16406%201.82812%203.01563%202.25%203Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-927")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Interview Panel :"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {textPanelName}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-929")}
            tag="div"
          >
            {slotPanelList ?? <PanelList />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A%5Bclass*%3D%22ScheduleDetails_slot-cd-details__%22%5D%7B%0Aheight%3Acalc(100vh%20-%20112px)%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
