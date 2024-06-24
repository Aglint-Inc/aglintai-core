"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./AssistantCandidateDetails.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AssistantCandidateDetails({
  as: _Component = _Builtin.Block,
  slotProfile,
  textName = "Marvin McKinney",
  textMatchCount = "Top match - 92%",
  colorPropsMatch = {},
  textLocation = "San Francisco",
  isLocationVisible = true,
  textRelevantSkill = "Relevant Skills :Python, Ruby, R",
  isOverviewVisible = true,
  textOVerview = "Marvin McKinney is a software engineer with 6 years of experience. He is proficient in Python, Linux embedded/Ruby, Cloud VM, Docker.",
  isExperienceVisible = true,
  isRelevantSkillVisible = true,
  textExperience = "5 years",
  isTopMatchVisible = true,
  onClickCard = {},
  slotCheckBox,
  isOverviewTextVisible = true,
  onClickIconCollapse = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "res-profile-detailed-block", "pointer")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "res-profile-top-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-916")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "rp-candidate-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "chat-profile-list-image")}
              tag="div"
            >
              {slotProfile}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {textName}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotCheckBox}</_Builtin.Block>
        </_Builtin.Block>
        {isTopMatchVisible ? (
          <_Builtin.Block tag="div" {...colorPropsMatch}>
            {textMatchCount}
          </_Builtin.Block>
        ) : null}
        {isLocationVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cp-location-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "icon-block-5", "_12x12")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "svg-icon")}
                value="%3Csvg%20width%3D%2210%22%20height%3D%2212%22%20viewbox%3D%220%200%2010%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.75%204.5C8.71875%203.4375%208.35156%202.55469%207.64844%201.85156C6.94531%201.14844%206.0625%200.78125%205%200.75C3.9375%200.78125%203.05469%201.14844%202.35156%201.85156C1.64844%202.55469%201.28125%203.4375%201.25%204.5C1.25%204.875%201.38281%205.36719%201.64844%205.97656C1.91406%206.60156%202.25%207.25%202.65625%207.92188C3.0625%208.57812%203.47656%209.1875%203.89844%209.75C4.32031%2010.3281%204.6875%2010.8125%205%2011.2031C5.3125%2010.8125%205.67969%2010.3281%206.10156%209.75C6.52344%209.1875%206.9375%208.57812%207.34375%207.92188C7.76562%207.25%208.10938%206.60156%208.375%205.97656C8.625%205.36719%208.75%204.875%208.75%204.5ZM9.5%204.5C9.46875%205.20312%209.21875%206.01562%208.75%206.9375C8.26562%207.85938%207.71875%208.75%207.10938%209.60938C6.5%2010.4844%205.98438%2011.1797%205.5625%2011.6953C5.40625%2011.8828%205.21875%2011.9766%205%2011.9766C4.78125%2011.9766%204.59375%2011.8828%204.4375%2011.6953C4.01562%2011.1797%203.5%2010.4844%202.89062%209.60938C2.28125%208.75%201.73438%207.85938%201.25%206.9375C0.78125%206.01562%200.53125%205.20312%200.5%204.5C0.53125%203.21875%200.96875%202.15625%201.8125%201.3125C2.65625%200.46875%203.71875%200.03125%205%200C6.28125%200.03125%207.34375%200.46875%208.1875%201.3125C9.03125%202.15625%209.46875%203.21875%209.5%204.5ZM3.875%204.5C3.89062%204.92188%204.07812%205.25%204.4375%205.48438C4.8125%205.67188%205.1875%205.67188%205.5625%205.48438C5.92188%205.25%206.10938%204.92188%206.125%204.5C6.10938%204.07812%205.92188%203.75%205.5625%203.51562C5.1875%203.32812%204.8125%203.32812%204.4375%203.51562C4.07812%203.75%203.89062%204.07812%203.875%204.5ZM5%206.375C4.29688%206.35938%203.75781%206.04688%203.38281%205.4375C3.03906%204.8125%203.03906%204.1875%203.38281%203.5625C3.75781%202.95312%204.29688%202.64063%205%202.625C5.70312%202.64063%206.24219%202.95312%206.61719%203.5625C6.96094%204.1875%206.96094%204.8125%206.61719%205.4375C6.24219%206.04688%205.70312%206.35938%205%206.375Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-600")}
              tag="div"
            >
              {textLocation}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isRelevantSkillVisible ? (
          <_Builtin.Block tag="div">{textRelevantSkill}</_Builtin.Block>
        ) : null}
        {isExperienceVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-744")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Experience:"}</_Builtin.Block>
            <_Builtin.Block tag="div">{textExperience}</_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isOverviewVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "res-profile-bottom-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cp-overview-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-917")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cp-overview-header")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "icon-block-5", "_16x16")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "svg-icon")}
                    value="%3Csvg%20width%3D%2212%22%20height%3D%2211%22%20viewbox%3D%220%200%2012%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.2498%200.9C10.4685%200.914583%2010.5852%201.03125%2010.5998%201.25V2.3H11.6498C11.8685%202.31458%2011.9852%202.43125%2011.9998%202.65C11.9852%202.86875%2011.8685%202.98542%2011.6498%203H10.5998V4.05C10.5852%204.26875%2010.4685%204.38542%2010.2498%204.4C10.031%204.38542%209.91436%204.26875%209.89978%204.05V3H8.84978C8.63103%202.98542%208.51436%202.86875%208.49978%202.65C8.51436%202.43125%208.63103%202.31458%208.84978%202.3H9.89978V1.25C9.91436%201.03125%2010.031%200.914583%2010.2498%200.9ZM10.2498%207.2C10.4685%207.21458%2010.5852%207.33125%2010.5998%207.55V8.6H11.6498C11.8685%208.61458%2011.9852%208.73125%2011.9998%208.95C11.9852%209.16875%2011.8685%209.28542%2011.6498%209.3H10.5998V10.35C10.5852%2010.5687%2010.4685%2010.6854%2010.2498%2010.7C10.031%2010.6854%209.91436%2010.5687%209.89978%2010.35V9.3H8.84978C8.63103%209.28542%208.51436%209.16875%208.49978%208.95C8.51436%208.73125%208.63103%208.61458%208.84978%208.6H9.89978V7.55C9.91436%207.33125%2010.031%207.21458%2010.2498%207.2ZM3.79666%204.925L1.98103%205.77813L3.79666%206.60938C3.94249%206.68229%204.05186%206.79167%204.12478%206.9375L4.97791%208.75313L5.80916%206.9375C5.88207%206.79167%205.99145%206.68229%206.13728%206.60938L7.95291%205.77813L6.13728%204.94688C5.99145%204.85938%205.88207%204.74271%205.80916%204.59688L4.97791%202.78125L4.12478%204.59688C4.05186%204.74271%203.94249%204.85938%203.79666%204.94688V4.925ZM3.49041%207.24375L0.996655%206.08438C0.865405%206.02604%200.79978%205.92396%200.79978%205.77813C0.79978%205.63229%200.865405%205.52292%200.996655%205.45L3.49041%204.29063L4.64978%201.79688C4.7227%201.66563%204.83207%201.6%204.97791%201.6C5.10916%201.6%205.21124%201.66563%205.28416%201.79688L6.44353%204.29063L8.93728%205.45C9.06853%205.52292%209.13416%205.63229%209.13416%205.77813C9.13416%205.90938%209.06853%206.01146%208.93728%206.08438L6.44353%207.24375L5.28416%209.7375C5.22582%209.86875%205.12374%209.93438%204.97791%209.93438C4.83207%209.93438%204.7227%209.86875%204.64978%209.7375L3.49041%207.24375Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block tag="div">{"Overview"}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons", "pointer")}
                value="%3Csvg%20width%3D%2222%22%20height%3D%2222%22%20viewbox%3D%220%200%2022%2022%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2221.5%22%20height%3D%2221.5%22%20rx%3D%2210.75%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.25%22%20y%3D%220.25%22%20width%3D%2221.5%22%20height%3D%2221.5%22%20rx%3D%2210.75%22%20stroke%3D%22%23E9EBED%22%20stroke-width%3D%220.5%22%2F%3E%0A%3Cpath%20d%3D%22M10.6016%207.60156C10.8672%207.38281%2011.1328%207.38281%2011.3984%207.60156L15.8984%2012.1016C16.1172%2012.3672%2016.1172%2012.6328%2015.8984%2012.8984C15.6328%2013.1172%2015.3672%2013.1172%2015.1016%2012.8984L11%208.79688L6.89844%2012.8984C6.63281%2013.1172%206.36719%2013.1172%206.10156%2012.8984C5.88281%2012.6328%205.88281%2012.3672%206.10156%2012.1016L10.6016%207.60156Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                {...onClickIconCollapse}
              />
            </_Builtin.Block>
            {isOverviewTextVisible ? (
              <_Builtin.Block tag="div">{textOVerview}</_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
