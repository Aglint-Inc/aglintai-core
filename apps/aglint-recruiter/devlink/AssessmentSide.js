"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./AssessmentSide.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AssessmentSide({
  as: _Component = _Builtin.Block,
  onClickAssessmentPreview = {},
  onClickDisableAssessment = {},
  isDisableAssessmentVisible = true,
  textPreview = "See How Candidates Will Experience the Screening Questions",
  textPreviewButton = "Preview Phone Screening",
  isPreviewFormVisible = true,
  textDescDisable = "Disable Phone Screening for this job.",
  textDisableButton = "Disable Assessment",
  isAssessmentImageVisible = false,
  isPhoneScreeningImageVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "div-block-719")} tag="div">
      {isPreviewFormVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-711")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            {isAssessmentImageVisible ? (
              <_Builtin.Image
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/65bb902790cc33c57cd639a2_Assesment_preview.png"
              />
            ) : null}
            {isPhoneScreeningImageVisible ? (
              <_Builtin.Image
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/65bb9002947bcf7c76b8deee_Screening_Preview.png"
              />
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{textPreview}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-712", "cursor-pointer")}
            tag="div"
            {...onClickAssessmentPreview}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2212%22%20viewbox%3D%220%200%2015%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.49219%203.1875C2.99219%203.67188%202.57031%204.16406%202.22656%204.66406C1.89844%205.16406%201.65625%205.60938%201.5%206C1.65625%206.39062%201.89844%206.83594%202.22656%207.33594C2.57031%207.83594%202.99219%208.32812%203.49219%208.8125C4.00781%209.29688%204.59375%209.69531%205.25%2010.0078C5.92188%2010.3203%206.67188%2010.4844%207.5%2010.5C8.32812%2010.4844%209.07812%2010.3203%209.75%2010.0078C10.4062%209.69531%2010.9922%209.29688%2011.5078%208.8125C12.0078%208.32812%2012.4297%207.83594%2012.7734%207.33594C13.1016%206.83594%2013.3438%206.39062%2013.5%206C13.3438%205.60938%2013.1016%205.16406%2012.7734%204.66406C12.4297%204.16406%2012.0078%203.67188%2011.5078%203.1875C10.9922%202.70312%2010.4062%202.30469%209.75%201.99219C9.07812%201.67969%208.32812%201.51563%207.5%201.5C6.67188%201.51563%205.92188%201.67969%205.25%201.99219C4.59375%202.30469%204.00781%202.70312%203.49219%203.1875ZM7.5%200.75C8.45312%200.765625%209.30469%200.953125%2010.0547%201.3125C10.8047%201.67187%2011.4609%202.11719%2012.0234%202.64844C12.5703%203.16406%2013.0234%203.69531%2013.3828%204.24219C13.7422%204.78906%2014.0156%205.28125%2014.2031%205.71875C14.2812%205.90625%2014.2812%206.09375%2014.2031%206.28125C14.0156%206.71875%2013.7422%207.21094%2013.3828%207.75781C13.0234%208.30469%2012.5703%208.83594%2012.0234%209.35156C11.4609%209.88281%2010.8047%2010.3281%2010.0547%2010.6875C9.30469%2011.0469%208.45312%2011.2344%207.5%2011.25C6.54688%2011.2344%205.69531%2011.0469%204.94531%2010.6875C4.19531%2010.3281%203.53906%209.88281%202.97656%209.35156C2.42969%208.83594%201.97656%208.30469%201.61719%207.75781C1.25781%207.21094%200.992188%206.71875%200.820312%206.28125C0.742188%206.09375%200.742188%205.90625%200.820312%205.71875C0.992188%205.28125%201.25781%204.78906%201.61719%204.24219C1.97656%203.69531%202.42969%203.16406%202.97656%202.64844C3.53906%202.11719%204.19531%201.67187%204.94531%201.3125C5.69531%200.953125%206.54688%200.765625%207.5%200.75ZM5.25%206C5.25%206.40625%205.35156%206.78125%205.55469%207.125C5.75781%207.46875%206.03125%207.74219%206.375%207.94531C6.73438%208.14844%207.10938%208.25%207.5%208.25C7.89062%208.25%208.26562%208.14844%208.625%207.94531C8.96875%207.74219%209.24219%207.46875%209.44531%207.125C9.64844%206.78125%209.75%206.40625%209.75%206C9.75%205.59375%209.64844%205.21875%209.44531%204.875C9.24219%204.53125%208.96875%204.25781%208.625%204.05469C8.26562%203.85156%207.89062%203.75%207.5%203.75C7.10938%203.75%206.73438%203.85156%206.375%204.05469C6.03125%204.25781%205.75781%204.53125%205.55469%204.875C5.35156%205.21875%205.25%205.59375%205.25%206ZM10.5%206C10.5%206.54688%2010.3672%207.04688%2010.1016%207.5C9.83594%207.95312%209.46875%208.32031%209%208.60156C8.53125%208.86719%208.03125%209%207.5%209C6.96875%209%206.46875%208.86719%206%208.60156C5.53125%208.32031%205.16406%207.95312%204.89844%207.5C4.63281%207.04688%204.5%206.54688%204.5%206C4.5%205.45312%204.63281%204.95312%204.89844%204.5C5.16406%204.04688%205.53125%203.67969%206%203.39844C6.46875%203.13281%206.96875%203%207.5%203C8.03125%203%208.53125%203.13281%209%203.39844C9.46875%203.67969%209.83594%204.04688%2010.1016%204.5C10.3672%204.95312%2010.5%205.45312%2010.5%206Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{textPreviewButton}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isDisableAssessmentVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-711")}
          tag="div"
        >
          <_Builtin.Block tag="div">{textDescDisable}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-red-500", "cursor-pointer")}
            tag="div"
          >
            <_Builtin.Block tag="div" {...onClickDisableAssessment}>
              {textDisableButton}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
