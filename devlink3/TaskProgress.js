"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TaskProgress.module.css";

export function TaskProgress({
  as: _Component = _Builtin.Block,
  slotImage,
  textTask = "Task createdand assigned to @phoneagent by Marc(you)",
  textTime = "5 Hours ago",
  isTaskProgressVisible = true,
  isTaskCompletedVisible = false,
  onClickViewTranscript = {},
  textTimeCompleted = "5 Hours ago",
  slotMailContent,
  isMailContentVisible = true,
  onClickViewEmail = {},
  textResponseTime = "19 Minutes ago",
  textResponseTitle = "Email Send to candidate : Interview Invitation",
  isResponseVisible = true,
}) {
  return (
    <_Component tag="div">
      <_Builtin.Block tag="div">
        {isTaskProgressVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1346")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1349")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1347")}
                tag="div"
              >
                {slotImage}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1348")}
                tag="div"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1350")}
              tag="div"
            >
              <_Builtin.Block tag="div">{textTask}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm", "text-grey_600")}
                tag="div"
              >
                {textTime}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isResponseVisible ? (
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1346")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1349")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-1347", "stroke")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%207C5.70833%207%205.46875%207.09375%205.28125%207.28125C5.09375%207.46875%205%207.70833%205%208V9.25L11.125%2013.7188C11.7083%2014.1146%2012.2917%2014.1146%2012.875%2013.7188L19%209.25V8C19%207.70833%2018.9062%207.46875%2018.7188%207.28125C18.5312%207.09375%2018.2917%207%2018%207H6ZM5%2010.5V16C5%2016.2917%205.09375%2016.5312%205.28125%2016.7188C5.46875%2016.9062%205.70833%2017%206%2017H18C18.2917%2017%2018.5312%2016.9062%2018.7188%2016.7188C18.9062%2016.5312%2019%2016.2917%2019%2016V10.5L13.4688%2014.5312C13.0312%2014.8646%2012.5417%2015.0312%2012%2015.0312C11.4583%2015.0312%2010.9688%2014.8646%2010.5312%2014.5312L5%2010.5ZM4%208C4.02083%207.4375%204.21875%206.96875%204.59375%206.59375C4.96875%206.21875%205.4375%206.02083%206%206H18C18.5625%206.02083%2019.0312%206.21875%2019.4062%206.59375C19.7812%206.96875%2019.9792%207.4375%2020%208V16C19.9792%2016.5625%2019.7812%2017.0312%2019.4062%2017.4062C19.0312%2017.7812%2018.5625%2017.9792%2018%2018H6C5.4375%2017.9792%204.96875%2017.7812%204.59375%2017.4062C4.21875%2017.0312%204.02083%2016.5625%204%2016V8Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3Cpath%20d%3D%22M19.1069%207.30213L19.107%207.30214L19.8972%207.5L19.107%207.69786L19.1069%207.69787L19.0703%207.70705C18.5254%207.84357%2018.0989%207.95044%2017.7607%208.07186C17.41%208.19779%2017.1365%208.34521%2016.9072%208.5729L16.9067%208.57344C16.6785%208.80164%2016.531%209.07559%2016.4051%209.42652C16.2842%209.76359%2016.1777%2010.1886%2016.042%2010.7302L16.0311%2010.7737L16.0311%2010.7737L15.8333%2011.5639L15.6354%2010.7737L15.6354%2010.7737L15.6262%2010.7371C15.4897%2010.1922%2015.3828%209.76563%2015.2614%209.42744C15.1355%209.07673%2014.988%208.8032%2014.7604%208.57398L14.7598%208.57344C14.5316%208.34523%2014.2577%208.19772%2013.9067%208.07184C13.5697%207.95093%2013.1446%207.84445%2012.603%207.70875L12.5596%207.69787L12.5595%207.69786L11.7693%207.5L12.5595%207.30214L12.5596%207.30213L12.5962%207.29296C13.1411%207.15643%2013.5676%207.04956%2013.9058%206.92814C14.2565%206.80222%2014.5301%206.6548%2014.7593%206.4271L14.7598%206.42656C14.988%206.19836%2015.1355%205.92441%2015.2614%205.57348C15.3823%205.23641%2015.4888%204.81137%2015.6245%204.26976L15.6354%204.22632L15.6354%204.22628L15.8333%203.43608L16.0311%204.22628L16.0311%204.22632L16.0403%204.26292C16.1768%204.80784%2016.2837%205.23437%2016.4051%205.57256C16.531%205.92327%2016.6785%206.1968%2016.9062%206.42603L16.9067%206.42656C17.1349%206.65477%2017.4088%206.80228%2017.7598%206.92816C18.0968%207.04907%2018.5219%207.15555%2019.0635%207.29125L19.1069%207.30213Z%22%20fill%3D%22%23FF6224%22%20stroke%3D%22white%22%20stroke-width%3D%220.454737%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-1348")}
                  tag="div"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1350")}
                tag="div"
              >
                <_Builtin.Block tag="div">{textResponseTitle}</_Builtin.Block>
                {isMailContentVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-1366")}
                    tag="div"
                  >
                    {slotMailContent}
                  </_Builtin.Block>
                ) : null}
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-1367")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-sm", "text-grey_600")}
                    tag="div"
                  >
                    {textResponseTime}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "text-sm",
                      "text-grey_600",
                      "text-underline",
                      "cursor-pointer"
                    )}
                    tag="div"
                    {...onClickViewEmail}
                  >
                    {"View in email"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isTaskCompletedVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1346", "mt-10")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1349")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1347")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2223.5%22%20height%3D%2223.5%22%20rx%3D%2211.75%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2223.5%22%20height%3D%2223.5%22%20rx%3D%2211.75%22%20stroke%3D%22%23D8DCDE%22%20stroke-width%3D%220.5%22%2F%3E%0A%3Cpath%20d%3D%22M9.375%206C9.60938%206.01562%209.73438%206.14062%209.75%206.375V7.5H14.25V6.375C14.2656%206.14062%2014.3906%206.01562%2014.625%206C14.8594%206.01562%2014.9844%206.14062%2015%206.375V7.5H15.75C16.1719%207.51562%2016.5234%207.66406%2016.8047%207.94531C17.0859%208.22656%2017.2344%208.57812%2017.25%209V9.75V10.5V16.5C17.2344%2016.9219%2017.0859%2017.2734%2016.8047%2017.5547C16.5234%2017.8359%2016.1719%2017.9844%2015.75%2018H8.25C7.82812%2017.9844%207.47656%2017.8359%207.19531%2017.5547C6.91406%2017.2734%206.76562%2016.9219%206.75%2016.5V10.5V9.75V9C6.76562%208.57812%206.91406%208.22656%207.19531%207.94531C7.47656%207.66406%207.82812%207.51562%208.25%207.5H9V6.375C9.01562%206.14062%209.14062%206.01562%209.375%206ZM16.5%2010.5H7.5V16.5C7.5%2016.7188%207.57031%2016.8984%207.71094%2017.0391C7.85156%2017.1797%208.03125%2017.25%208.25%2017.25H15.75C15.9688%2017.25%2016.1484%2017.1797%2016.2891%2017.0391C16.4297%2016.8984%2016.5%2016.7188%2016.5%2016.5V10.5ZM15.75%208.25H8.25C8.03125%208.25%207.85156%208.32031%207.71094%208.46094C7.57031%208.60156%207.5%208.78125%207.5%209V9.75H16.5V9C16.5%208.78125%2016.4297%208.60156%2016.2891%208.46094C16.1484%208.32031%2015.9688%208.25%2015.75%208.25Z%22%20fill%3D%22%23FF6224%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1350")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              {"Call complted. Scheduled meeting on 5th April After Noon."}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-sm",
                "text-blue-500",
                "text-underline",
                "cursor-pointer"
              )}
              tag="div"
              {...onClickViewTranscript}
            >
              {"View transcript"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "text-grey_600")}
              tag="div"
            >
              {textTimeCompleted}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
