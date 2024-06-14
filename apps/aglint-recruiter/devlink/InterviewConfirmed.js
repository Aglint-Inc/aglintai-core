"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./InterviewConfirmed.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InterviewConfirmed({
  as: _Component = _Builtin.Block,
  slotCompanyLogo,
  onClickAddToCalender = {},
  textMonth = "AUG",
  textDate = "27",
  textDay = "FRIDAY",
  textTitle = "Phase -1 Interview for Senior Software Engineer",
  textTime = "09:30 - 10:00 PM",
  slotPlatformLogo,
  textPlatformName = "Google Meet",
  textSentMail = "Information has sent to raimonrts@gmail.com",
  onClickContactSupport = {},
  slotBanner,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "interview-confirmed")} tag="div">
      <_Builtin.Block tag="div">{slotCompanyLogo}</_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-xxl", "fw-semibold")}
        tag="div"
      >
        {"Interview Confirmed !"}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-989")} tag="div">
        {slotBanner}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "text-lg", "text-grey-600")}
        tag="div"
      >
        {
          "Your interview has been scheduled and we look forwarding to talking with you. A copy of your itinerary and calendar invites should be in your email."
        }
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-897")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-898", "green-bg")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-899", "text-color-white")}
            tag="div"
          >
            <_Builtin.Block className={_utils.cx(_styles, "text-lg")} tag="div">
              {textMonth}
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "text-40")} tag="div">
              {textDate}
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "text-lg")} tag="div">
              {textDay}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-900", "green-bg-100")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "text-lg")} tag="div">
            {textTitle}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-xl", "fw-semibold")}
            tag="div"
          >
            {textTime}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-905")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-901")}
              tag="div"
            >
              <_Builtin.Block tag="div">{slotPlatformLogo}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-lg")}
                tag="div"
              >
                {textPlatformName}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-lg",
                "text-blue-500",
                "cursor-pointer"
              )}
              tag="div"
              {...onClickAddToCalender}
            >
              {"Add to calender"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-904")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-903")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2226%22%20height%3D%2217%22%20viewbox%3D%220%200%2026%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.21969%200.125H17.1237C17.6014%200.148885%2018.0074%200.316077%2018.3418%200.626576C18.6523%200.960961%2018.8195%201.367%2018.8434%201.84469C18.8195%202.41792%2018.5926%202.87173%2018.1627%203.20611L17.6611%203.60021C16.443%203.71963%2015.3801%204.13761%2014.4725%204.85415C13.541%205.5468%2012.8603%206.44247%2012.4304%207.54117L10.3524%209.08172C9.89859%209.36834%209.44478%209.36834%208.99097%209.08172L1.18071%203.20611C0.750788%202.87173%200.523885%202.41792%200.5%201.84469C0.523885%201.367%200.691077%200.960961%201.00158%200.626576C1.33596%200.316077%201.742%200.148885%202.21969%200.125ZM11.0331%209.97739L12.0004%209.26086C11.9765%209.47582%2011.9646%209.67884%2011.9646%209.86991C11.9885%2011.4224%2012.4662%2012.7599%2013.3977%2013.8825H2.79292C2.14804%2013.8586%201.61063%2013.6317%201.18071%2013.2018C0.750788%2012.7719%200.523885%2012.2345%200.5%2011.5896V4.13761L8.31026%209.97739C8.7163%2010.2879%209.17011%2010.4431%209.67168%2010.4431C10.1733%2010.4431%2010.6271%2010.2879%2011.0331%209.97739ZM23.4292%209.86991C23.4292%2010.8014%2023.2023%2011.6613%2022.7485%2012.4494C22.2947%2013.2376%2021.6617%2013.8706%2020.8497%2014.3483C20.0376%2014.8021%2019.1777%2015.029%2018.2701%2015.029C17.3625%2015.029%2016.5027%2014.8021%2015.6906%2014.3483C14.8785%2013.8706%2014.2456%2013.2376%2013.7918%2012.4494C13.338%2011.6613%2013.1111%2010.8014%2013.1111%209.86991C13.1111%208.93841%2013.338%208.07857%2013.7918%207.29038C14.2456%206.50219%2014.8785%205.86924%2015.6906%205.39155C16.5027%204.93775%2017.3625%204.71084%2018.2701%204.71084C19.1777%204.71084%2020.0376%204.93775%2020.8497%205.39155C21.6617%205.86924%2022.2947%206.50219%2022.7485%207.29038C23.2023%208.07857%2023.4292%208.93841%2023.4292%209.86991ZM21.8313%207.92093C21.5686%207.68208%2020.9333%206.91272%2020.6705%207.15157C20.6705%207.15157%2019.2733%203.9943%2018.8075%206.14392C18.3418%208.29353%2016.0919%206.54518%2016.0919%206.54518C15.5545%209.88424%2015.2153%208.59925%2014.9526%208.8381C14.7137%209.10083%2014.7137%2010.4097%2014.9526%2010.6724L16.3283%2012.5068C16.591%2012.7456%2018.5448%2013.4407%2018.8075%2013.2018L22.2899%2010.6724C22.5288%2010.4097%2022.0702%208.18366%2021.8313%207.92093Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3Cpath%20d%3D%22M18.6217%2015.0867C17.6185%2015.0724%2016.7013%2014.8287%2015.8702%2014.3558C15.039%2013.8686%2014.3654%2013.195%2013.8495%2012.3352C13.3623%2011.461%2013.1187%2010.5438%2013.1187%209.58368C13.1187%208.62352%2013.3623%207.70635%2013.8495%206.83218C14.3654%205.97233%2015.039%205.29878%2015.8702%204.81154C16.7013%204.33862%2017.6185%204.095%2018.6217%204.08067C19.6248%204.095%2020.542%204.33862%2021.3732%204.81154C22.2044%205.29878%2022.8779%205.97233%2023.3938%206.83218C23.881%207.70635%2024.1247%208.62352%2024.1247%209.58368C24.1247%2010.5438%2023.881%2011.461%2023.3938%2012.3352C22.8779%2013.195%2022.2044%2013.8686%2021.3732%2014.3558C20.542%2014.8287%2019.6248%2015.0724%2018.6217%2015.0867ZM21.0507%208.57336C21.2514%208.32974%2021.2514%208.08612%2021.0507%207.84249C20.8071%207.64186%2020.5635%207.64186%2020.3199%207.84249L17.9338%2010.2286L16.9235%209.21825C16.6798%209.01762%2016.4362%209.01762%2016.1926%209.21825C15.992%209.46187%2015.992%209.70549%2016.1926%209.94911L17.5684%2011.3249C17.812%2011.5255%2018.0556%2011.5255%2018.2992%2011.3249L21.0507%208.57336Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "text-grey-600")}
            tag="div"
          >
            {textSentMail}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {"If you have any queries regarding this please don’t hesitate to "}
          <_Builtin.Span
            className={_utils.cx(
              _styles,
              "text-blue-500",
              "text-underline",
              "cursor-pointer"
            )}
            {...onClickContactSupport}
          >
            {"contact support"}
          </_Builtin.Span>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
