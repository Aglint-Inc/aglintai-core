"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./PhoneScreeningQ.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function PhoneScreeningQ({
  as: _Component = _Builtin.Block,
  slotLogo,
  currentQuestionNo = "01",
  totalQuestionNo = "10",
  textQuestion = "Have you completed the following degree: Bachelors Degree? ",
  isQuestionImp = true,
  slotInputAndButton,
  onClickBack = {},
  textDescription = "Answer this by choosing an option",
  isDescriptionVisible = true,
  onClickOk = {},
  isOkButtonVisible = true,
  onClickSubmit = {},
  isSubmitButtonVisible = true,
  isOkDisable = true,
  isSubmitDisable = true,
  isBackVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "phone-screen-1")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-671")} tag="div">
        {slotLogo}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-669")} tag="div">
        <_Builtin.Block tag="div">{currentQuestionNo}</_Builtin.Block>
        <_Builtin.Block tag="div">{"of"}</_Builtin.Block>
        <_Builtin.Block tag="div">{totalQuestionNo}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "mt-23", "gap-4")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-670")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {textQuestion}
          </_Builtin.Block>
        </_Builtin.Block>
        {isDescriptionVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {textDescription}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-input-phone")}
        tag="div"
      >
        {slotInputAndButton}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-703")} tag="div">
        {isBackVisible ? (
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "back-button-outline",
              "cursor-pointer"
            )}
            tag="div"
            {...onClickBack}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M11.1381%202.19526C11.3695%202.42668%2011.3952%202.78592%2011.2153%203.04574L11.1381%203.13807L6.27604%208L11.1381%2012.8619C11.3695%2013.0934%2011.3952%2013.4526%2011.2153%2013.7124L11.1381%2013.8047C10.9067%2014.0362%2010.5475%2014.0619%2010.2876%2013.8819L10.1953%2013.8047L4.86197%208.4714C4.63055%208.23998%204.60483%207.88075%204.78483%207.62093L4.86197%207.5286L10.1953%202.19526C10.4557%201.93491%2010.8778%201.93491%2011.1381%202.19526Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {"Prev"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isOkButtonVisible ? (
          <_Builtin.Block className={_utils.cx(_styles, "relative")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "ok-button-ps", "cursor-pointer")}
              tag="div"
              {...onClickOk}
            >
              <_Builtin.Block tag="div">{"Next"}</_Builtin.Block>
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.86189%2013.8047C4.63047%2013.5733%204.60475%2013.2141%204.78475%2012.9543L4.86189%2012.8619L9.72396%208L4.86189%203.13807C4.63047%202.90665%204.60475%202.54742%204.78475%202.28759L4.86189%202.19526C5.09331%201.96384%205.45254%201.93813%205.71237%202.11812L5.8047%202.19526L11.138%207.5286C11.3695%207.76002%2011.3952%208.11925%2011.2152%208.37907L11.138%208.4714L5.8047%2013.8047C5.54435%2014.0651%205.12224%2014.0651%204.86189%2013.8047Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            {isOkDisable ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "ok-button-ps", "disable-ok")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Next"}</_Builtin.Block>
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.86189%2013.8047C4.63047%2013.5733%204.60475%2013.2141%204.78475%2012.9543L4.86189%2012.8619L9.72396%208L4.86189%203.13807C4.63047%202.90665%204.60475%202.54742%204.78475%202.28759L4.86189%202.19526C5.09331%201.96384%205.45254%201.93813%205.71237%202.11812L5.8047%202.19526L11.138%207.5286C11.3695%207.76002%2011.3952%208.11925%2011.2152%208.37907L11.138%208.4714L5.8047%2013.8047C5.54435%2014.0651%205.12224%2014.0651%204.86189%2013.8047Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        ) : null}
        {isSubmitButtonVisible ? (
          <_Builtin.Block className={_utils.cx(_styles, "relative")} tag="div">
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "submit-button-ps",
                "cursor-pointer"
              )}
              tag="div"
              {...onClickSubmit}
            >
              <_Builtin.Block tag="div">{"Submit"}</_Builtin.Block>
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.33329%2012.3907L14.1952%203.52876C14.4556%203.26841%2014.8777%203.26841%2015.138%203.52876C15.3984%203.78911%2015.3984%204.21122%2015.138%204.47157L5.8047%2013.8049C5.54435%2014.0653%205.12224%2014.0653%204.86189%2013.8049L0.861888%209.8049C0.601539%209.54455%200.601539%209.12244%200.861888%208.86209C1.12224%208.60174%201.54435%208.60174%201.8047%208.86209L5.33329%2012.3907Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            {isSubmitDisable ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "submit-button-ps", "disable")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Submit"}</_Builtin.Block>
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.33329%2012.3907L14.1952%203.52876C14.4556%203.26841%2014.8777%203.26841%2015.138%203.52876C15.3984%203.78911%2015.3984%204.21122%2015.138%204.47157L5.8047%2013.8049C5.54435%2014.0653%205.12224%2014.0653%204.86189%2013.8049L0.861888%209.8049C0.601539%209.54455%200.601539%209.12244%200.861888%208.86209C1.12224%208.60174%201.54435%208.60174%201.8047%208.86209L5.33329%2012.3907Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isSubmitButtonVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-704")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {
              "By clicking submit button you will be submitting the form to the recruiter"
            }
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
