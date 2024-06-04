"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./ChangeInterviewer.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-81":{"id":"e-81","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-58","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-82"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1716979210746}},"actionLists":{"a-58":{"id":"a-58","title":"Req-recent-reschedule hover in","actionItemGroups":[{"actionItems":[{"id":"a-58-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":0,"unit":""}},{"id":"a-58-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae"},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-58-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":"none"}}]},{"actionItems":[{"id":"a-58-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":1,"unit":""}},{"id":"a-58-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":true,"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae"},"globalSwatchId":"","rValue":247,"bValue":251,"gValue":249,"aValue":1}},{"id":"a-58-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1716979214379}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ChangeInterviewer({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  textAvailableDesc = "Please choose a different interviewer available from 11:30 AM to 12:30 PM on February 24th, replacing Brooklyn Simmons.",
  slotProfileImage,
  textName = "Brooklyn Simmons",
  textDesignation = "Project Manager",
  slotInterviewerList,
  onClickChange = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "assessment_duplicate_popup", "width-550")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "popup_header")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "popup_title")} tag="div">
          <Text content="??" />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "popup_close")} tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex-2", "cursor")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.28125%201.21875L8%206.9375L13.7188%201.21875C14.0729%200.927083%2014.4271%200.927083%2014.7812%201.21875C15.0729%201.57292%2015.0729%201.92708%2014.7812%202.28125L9.0625%208L14.7812%2013.7188C15.0729%2014.0729%2015.0729%2014.4271%2014.7812%2014.7812C14.4271%2015.0729%2014.0729%2015.0729%2013.7188%2014.7812L8%209.0625L2.28125%2014.7812C1.92708%2015.0729%201.57292%2015.0729%201.21875%2014.7812C0.927083%2014.4271%200.927083%2014.0729%201.21875%2013.7188L6.9375%208L1.21875%202.28125C0.927083%201.92708%200.927083%201.57292%201.21875%201.21875C1.57292%200.927083%201.92708%200.927083%202.28125%201.21875Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            {...onClickClose}
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "popup_body")} tag="div">
        <Text content={textAvailableDesc} weight="" color="neutral" />
        <_Builtin.Block className={_utils.cx(_styles, "slot_widget")} tag="div">
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1685")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1686")}
                tag="div"
              >
                {slotProfileImage}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1687")}
                tag="div"
              >
                <_Builtin.Block tag="div">{textName}</_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-sm", "text-grey-600")}
                  tag="div"
                >
                  {textDesignation}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1688")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.34375%203.15625L9.34375%206.15625C9.55208%206.38542%209.55208%206.61458%209.34375%206.84375C9.11458%207.05208%208.88542%207.05208%208.65625%206.84375L6.5%204.71875V16.5C6.47917%2016.8125%206.3125%2016.9792%206%2017C5.6875%2016.9792%205.52083%2016.8125%205.5%2016.5V4.71875L3.34375%206.84375C3.11458%207.05208%202.88542%207.05208%202.65625%206.84375C2.44792%206.61458%202.44792%206.38542%202.65625%206.15625L5.65625%203.15625C5.88542%202.94792%206.11458%202.94792%206.34375%203.15625ZM17.3438%2013.8438L14.3438%2016.8438C14.1146%2017.0521%2013.8854%2017.0521%2013.6562%2016.8438L10.6562%2013.8438C10.4479%2013.6146%2010.4479%2013.3854%2010.6562%2013.1562C10.8854%2012.9479%2011.1146%2012.9479%2011.3438%2013.1562L13.5%2015.2812V3.5C13.5208%203.1875%2013.6875%203.02083%2014%203C14.3125%203.02083%2014.4792%203.1875%2014.5%203.5V15.2812L16.6562%2013.1562C16.8854%2012.9479%2017.1146%2012.9479%2017.3438%2013.1562C17.5521%2013.3854%2017.5521%2013.6146%2017.3438%2013.8438Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1689")}
              tag="div"
            >
              {slotInterviewerList ?? (
                <>
                  <SlotComp componentNeme="InterviewerList" />
                  <SlotComp componentNeme="InterviewerList" />
                  <SlotComp componentNeme="InterviewerList" />
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "button-pop-wrap", "stretch-vertical")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "wide_button", "width-100")}
          tag="div"
        >
          <ButtonSoft
            onClickButton={onClickClose}
            color="neutral"
            size="2"
            isRightIcon={false}
            isLeftIcon={false}
            textButton={
              <>
                {"Cancel"}
                <br />
              </>
            }
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "wide_button", "width-100")}
          tag="div"
          {...onClickChange}
        >
          <ButtonSolid
            onClickButton={onClickChange}
            textButton="Change"
            size="2"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
