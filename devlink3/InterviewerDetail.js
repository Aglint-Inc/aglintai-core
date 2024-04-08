"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InterviewerDetail.module.css";

export function InterviewerDetail({
  as: _Component = _Builtin.Block,
  textInterviewerName = "Dileep B C",
  textDepartment = "Sales and operations",
  textEmail = "dileep@aglinthq.com",
  textTimeZone = "Asia, Kolkata, Chennai (GMT+5:30)",
  textInterviewPerDay = "1/4",
  textInterviewPerWeek = "2/8",
  slotTrainingModules,
  slotQualifiedModules,
  slotScheduleTabs,
  slotInterviewerAvatar,
  slotTrainingModulesMoreMenu,
  slotQualifiedModulesMoreMenu,
  onClickAddModulesTraining = {},
  onClickAddInterviewModules = {},
  isModuleTrainingVisible = true,
  onClickInterviewSchedule = {},
  textInterviewToday = "Interviews today",
  textInterviewWeek = "Interviews this week",
}) {
  return (
    <_Component className={_utils.cx(_styles, "interviewerdetail")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "interviewerdetail-left")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "interviewer_card")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "interviewer_info")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "interviewr_avatar")}
              tag="div"
            >
              {slotInterviewerAvatar ?? (
                <_Builtin.Image
                  className={_utils.cx(_styles, "image_cover")}
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt=""
                  src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d6e2cb5b27ca42119ddbb3_you.jpg"
                />
              )}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "interviewer_detail")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {textInterviewerName}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-gray-600")}
                tag="div"
              >
                {textDepartment}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-gray-600")}
                tag="div"
              >
                {textEmail}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "interviewer_setting_display")}
            tag="div"
            {...onClickInterviewSchedule}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "timezone_flex")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8%2015C8.27083%2015%208.57292%2014.8646%208.90625%2014.5938C9.23958%2014.3229%209.58333%2013.8646%209.9375%2013.2188C10.25%2012.5938%2010.5%2011.8542%2010.6875%2011H5.3125C5.5%2011.8542%205.75%2012.5938%206.0625%2013.2188C6.41667%2013.8646%206.76042%2014.3229%207.09375%2014.5938C7.42708%2014.8646%207.72917%2015%208%2015ZM5.125%2010H10.875C10.9583%209.375%2011%208.70833%2011%208C11%207.29167%2010.9583%206.625%2010.875%206H5.125C5.04167%206.625%205%207.29167%205%208C5%208.70833%205.04167%209.375%205.125%2010ZM5.3125%205H10.6875C10.5%204.14583%2010.25%203.40625%209.9375%202.78125C9.58333%202.13542%209.23958%201.67708%208.90625%201.40625C8.57292%201.13542%208.27083%201%208%201C7.72917%201%207.42708%201.13542%207.09375%201.40625C6.76042%201.67708%206.41667%202.13542%206.0625%202.78125C5.75%203.40625%205.5%204.14583%205.3125%205ZM11.875%206C11.9583%206.64583%2012%207.3125%2012%208C12%208.6875%2011.9583%209.35417%2011.875%2010H14.7188C14.9062%209.35417%2015%208.6875%2015%208C15%207.3125%2014.9062%206.64583%2014.7188%206H11.875ZM14.3438%205C13.9271%204.14583%2013.3646%203.40625%2012.6562%202.78125C11.9479%202.15625%2011.1458%201.6875%2010.25%201.375C10.9167%202.27083%2011.4062%203.47917%2011.7188%205H14.3438ZM4.28125%205C4.59375%203.47917%205.09375%202.27083%205.78125%201.375C4.86458%201.6875%204.05208%202.15625%203.34375%202.78125C2.63542%203.40625%202.08333%204.14583%201.6875%205H4.28125ZM1.28125%206C1.09375%206.64583%201%207.3125%201%208C1%208.6875%201.09375%209.35417%201.28125%2010H4.125C4.04167%209.35417%204%208.6875%204%208C4%207.3125%204.04167%206.64583%204.125%206H1.28125ZM10.25%2014.625C11.1458%2014.3125%2011.9479%2013.8438%2012.6562%2013.2188C13.3646%2012.5938%2013.9167%2011.8542%2014.3125%2011H11.7188C11.4062%2012.5208%2010.9167%2013.7292%2010.25%2014.625ZM5.78125%2014.625C5.09375%2013.7292%204.59375%2012.5208%204.28125%2011H1.6875C2.08333%2011.8542%202.63542%2012.5938%203.34375%2013.2188C4.05208%2013.8438%204.86458%2014.3125%205.78125%2014.625ZM8%2016C6.54167%2015.9792%205.20833%2015.625%204%2014.9375C2.79167%2014.2292%201.8125%2013.25%201.0625%2012C0.354167%2010.7292%200%209.39583%200%208C0%206.60417%200.354167%205.27083%201.0625%204C1.8125%202.75%202.79167%201.77083%204%201.0625C5.20833%200.375%206.54167%200.0208333%208%200C9.45833%200.0208333%2010.7917%200.375%2012%201.0625C13.2083%201.77083%2014.1875%202.75%2014.9375%204C15.6458%205.27083%2016%206.60417%2016%208C16%209.39583%2015.6458%2010.7292%2014.9375%2012C14.1875%2013.25%2013.2083%2014.2292%2012%2014.9375C10.7917%2015.625%209.45833%2015.9792%208%2016Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{textTimeZone}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "loadbalalnce_flex")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "loadbalance_display")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {textInterviewPerDay}
                </_Builtin.Block>
                <_Builtin.Block tag="div">{textInterviewToday}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "loadbalance_display")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {textInterviewPerWeek}
                </_Builtin.Block>
                <_Builtin.Block tag="div">{textInterviewWeek}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "modules_block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "module_title_button")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Interview Modules"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-760")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "div-block-761",
                  "cursor-pointer"
                )}
                tag="div"
                {...onClickAddInterviewModules}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.75%201.875V5.25H10.125C10.3438%205.25%2010.5234%205.32031%2010.6641%205.46094C10.8047%205.60156%2010.875%205.78125%2010.875%206C10.875%206.21875%2010.8047%206.39844%2010.6641%206.53906C10.5234%206.67969%2010.3438%206.75%2010.125%206.75H6.75V10.125C6.75%2010.3438%206.67969%2010.5234%206.53906%2010.6641C6.39844%2010.8047%206.21875%2010.875%206%2010.875C5.78125%2010.875%205.60156%2010.8047%205.46094%2010.6641C5.32031%2010.5234%205.25%2010.3438%205.25%2010.125V6.75H1.875C1.65625%206.75%201.47656%206.67969%201.33594%206.53906C1.19531%206.39844%201.125%206.21875%201.125%206C1.125%205.78125%201.19531%205.60156%201.33594%205.46094C1.47656%205.32031%201.65625%205.25%201.875%205.25H5.25V1.875C5.25%201.65625%205.32031%201.47656%205.46094%201.33594C5.60156%201.19531%205.78125%201.125%206%201.125C6.21875%201.125%206.39844%201.19531%206.53906%201.33594C6.67969%201.47656%206.75%201.65625%206.75%201.875Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-blue-500")}
                  tag="div"
                >
                  {"Add"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "slot-models-morement")}
                tag="div"
              >
                {slotQualifiedModulesMoreMenu}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "module_flex")}
            tag="div"
          >
            {slotQualifiedModules ?? (
              <_Builtin.Block
                className={_utils.cx(_styles, "genealempty")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex")}
                  value="%3Csvg%20width%3D%2280%22%20height%3D%2260%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20opacity%3D%220.8%22%3E%0A%3Cpath%20d%3D%22M25.9984%2016.7C25.9984%2016.35%2025.8859%2016.0625%2025.6609%2015.8375C25.4359%2015.6125%2025.1484%2015.5%2024.7984%2015.5H20.4109C19.4109%2015.475%2018.5609%2015.125%2017.8609%2014.45L16.8484%2013.4375L17.7109%2012.6125L16.8484%2013.4375C16.6234%2013.2125%2016.3484%2013.1%2016.0234%2013.1H11.5984C11.2484%2013.1%2010.9609%2013.2125%2010.7359%2013.4375C10.5109%2013.6625%2010.3984%2013.95%2010.3984%2014.3V25.0625L12.3109%2020.225C12.6359%2019.5%2013.1984%2019.125%2013.9984%2019.1H28.9984C29.6234%2019.125%2030.1234%2019.3875%2030.4984%2019.8875C30.8234%2020.4125%2030.8859%2020.975%2030.6859%2021.575L28.2859%2027.575C27.9609%2028.3%2027.3984%2028.675%2026.5984%2028.7H23.5984H11.5984C10.9234%2028.675%2010.3609%2028.4375%209.91094%2027.9875C9.46094%2027.5375%209.22344%2026.975%209.19844%2026.3V14.3C9.22344%2013.625%209.46094%2013.0625%209.91094%2012.6125C10.3609%2012.1625%2010.9234%2011.925%2011.5984%2011.9H15.9859C16.6609%2011.9%2017.2359%2012.1375%2017.7109%2012.6125L18.6859%2013.5875C19.1609%2014.0625%2019.7359%2014.3%2020.4109%2014.3H24.7984C25.4734%2014.325%2026.0359%2014.5625%2026.4859%2015.0125C26.9359%2015.4625%2027.1734%2016.025%2027.1984%2016.7V17.9H25.9984V16.7ZM23.5984%2027.5H26.5984C26.8484%2027.5%2027.0359%2027.375%2027.1609%2027.125L29.5609%2021.125C29.6359%2020.925%2029.6109%2020.7375%2029.4859%2020.5625C29.3609%2020.3875%2029.1984%2020.3%2028.9984%2020.3H13.9984C13.7484%2020.3%2013.5609%2020.425%2013.4359%2020.675L11.0359%2026.675C10.9609%2026.875%2010.9859%2027.0625%2011.1109%2027.2375C11.2359%2027.4125%2011.3984%2027.5%2011.5984%2027.5H23.5984Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-gray-600")}
                  tag="div"
                >
                  {"No interview modules "}
                </_Builtin.Block>
              </_Builtin.Block>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
        {isModuleTrainingVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "modules_in_training")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "module_title_button")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"Modules in training"}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-760")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "div-block-761",
                    "cursor-pointer"
                  )}
                  tag="div"
                  {...onClickAddModulesTraining}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.75%201.875V5.25H10.125C10.3438%205.25%2010.5234%205.32031%2010.6641%205.46094C10.8047%205.60156%2010.875%205.78125%2010.875%206C10.875%206.21875%2010.8047%206.39844%2010.6641%206.53906C10.5234%206.67969%2010.3438%206.75%2010.125%206.75H6.75V10.125C6.75%2010.3438%206.67969%2010.5234%206.53906%2010.6641C6.39844%2010.8047%206.21875%2010.875%206%2010.875C5.78125%2010.875%205.60156%2010.8047%205.46094%2010.6641C5.32031%2010.5234%205.25%2010.3438%205.25%2010.125V6.75H1.875C1.65625%206.75%201.47656%206.67969%201.33594%206.53906C1.19531%206.39844%201.125%206.21875%201.125%206C1.125%205.78125%201.19531%205.60156%201.33594%205.46094C1.47656%205.32031%201.65625%205.25%201.875%205.25H5.25V1.875C5.25%201.65625%205.32031%201.47656%205.46094%201.33594C5.60156%201.19531%205.78125%201.125%206%201.125C6.21875%201.125%206.39844%201.19531%206.53906%201.33594C6.67969%201.47656%206.75%201.65625%206.75%201.875Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-blue-500")}
                    tag="div"
                  >
                    {"Add"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "slot-models-morement")}
                  tag="div"
                >
                  {slotTrainingModulesMoreMenu}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "module_flex")}
              tag="div"
            >
              {slotTrainingModules ?? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "genealempty")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "embed_flex")}
                    value="%3Csvg%20width%3D%2280%22%20height%3D%2260%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20opacity%3D%220.8%22%3E%0A%3Cpath%20d%3D%22M25.9984%2016.7C25.9984%2016.35%2025.8859%2016.0625%2025.6609%2015.8375C25.4359%2015.6125%2025.1484%2015.5%2024.7984%2015.5H20.4109C19.4109%2015.475%2018.5609%2015.125%2017.8609%2014.45L16.8484%2013.4375L17.7109%2012.6125L16.8484%2013.4375C16.6234%2013.2125%2016.3484%2013.1%2016.0234%2013.1H11.5984C11.2484%2013.1%2010.9609%2013.2125%2010.7359%2013.4375C10.5109%2013.6625%2010.3984%2013.95%2010.3984%2014.3V25.0625L12.3109%2020.225C12.6359%2019.5%2013.1984%2019.125%2013.9984%2019.1H28.9984C29.6234%2019.125%2030.1234%2019.3875%2030.4984%2019.8875C30.8234%2020.4125%2030.8859%2020.975%2030.6859%2021.575L28.2859%2027.575C27.9609%2028.3%2027.3984%2028.675%2026.5984%2028.7H23.5984H11.5984C10.9234%2028.675%2010.3609%2028.4375%209.91094%2027.9875C9.46094%2027.5375%209.22344%2026.975%209.19844%2026.3V14.3C9.22344%2013.625%209.46094%2013.0625%209.91094%2012.6125C10.3609%2012.1625%2010.9234%2011.925%2011.5984%2011.9H15.9859C16.6609%2011.9%2017.2359%2012.1375%2017.7109%2012.6125L18.6859%2013.5875C19.1609%2014.0625%2019.7359%2014.3%2020.4109%2014.3H24.7984C25.4734%2014.325%2026.0359%2014.5625%2026.4859%2015.0125C26.9359%2015.4625%2027.1734%2016.025%2027.1984%2016.7V17.9H25.9984V16.7ZM23.5984%2027.5H26.5984C26.8484%2027.5%2027.0359%2027.375%2027.1609%2027.125L29.5609%2021.125C29.6359%2020.925%2029.6109%2020.7375%2029.4859%2020.5625C29.3609%2020.3875%2029.1984%2020.3%2028.9984%2020.3H13.9984C13.7484%2020.3%2013.5609%2020.425%2013.4359%2020.675L11.0359%2026.675C10.9609%2026.875%2010.9859%2027.0625%2011.1109%2027.2375C11.2359%2027.4125%2011.3984%2027.5%2011.5984%2027.5H23.5984Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-gray-600")}
                    tag="div"
                  >
                    {"No modules in training"}
                  </_Builtin.Block>
                </_Builtin.Block>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "interviewerdetaill-right")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "titile")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600")}
            tag="div"
          >
            {"Schedules of "}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {textInterviewerName}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "height_100")} tag="div">
          {slotScheduleTabs}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
