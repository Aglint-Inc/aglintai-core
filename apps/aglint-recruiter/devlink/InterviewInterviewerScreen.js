"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./InterviewInterviewerScreen.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1376":{"id":"e-1376","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-485","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1377"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"b2651b1f-256f-5850-0b09-f22d89798079","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b2651b1f-256f-5850-0b09-f22d89798079","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697541498319},"e-1377":{"id":"e-1377","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-486","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1376"}},"mediaQueries":["medium","small","tiny"],"target":{"id":"b2651b1f-256f-5850-0b09-f22d89798079","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b2651b1f-256f-5850-0b09-f22d89798079","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697541498321},"e-1402":{"id":"e-1402","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-477","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1403"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5e8f8624-5731-c3bb-467e-a7f216985627","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5e8f8624-5731-c3bb-467e-a7f216985627","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698402366776},"e-1403":{"id":"e-1403","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-478","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1402"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5e8f8624-5731-c3bb-467e-a7f216985627","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5e8f8624-5731-c3bb-467e-a7f216985627","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698402366778},"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-485":{"id":"a-485","title":"Interview Mobile Play Pause","actionItemGroups":[{"actionItems":[{"id":"a-485-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".play-wappers.play-mobile","selectorGuids":["640f3200-7cfc-75b8-b025-e4469864aea1","2348a865-55bc-2f0f-30b2-a09a0c67286c"]},"value":"none"}},{"id":"a-485-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".play-wappers.pause-mobile","selectorGuids":["640f3200-7cfc-75b8-b025-e4469864aea1","078acf64-8661-f4f2-9c3d-6af3a4633bfc"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697534775881},"a-486":{"id":"a-486","title":"Interview MObile Play Pause 2","actionItemGroups":[{"actionItems":[{"id":"a-486-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".play-wappers.play-mobile","selectorGuids":["640f3200-7cfc-75b8-b025-e4469864aea1","2348a865-55bc-2f0f-30b2-a09a0c67286c"]},"value":"flex"}},{"id":"a-486-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".play-wappers.pause-mobile","selectorGuids":["640f3200-7cfc-75b8-b025-e4469864aea1","078acf64-8661-f4f2-9c3d-6af3a4633bfc"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697534775881},"a-477":{"id":"a-477","title":"Interview Interviewer Hover In","actionItemGroups":[{"actionItems":[{"id":"a-477-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".overlay-interviewer","selectorGuids":["79ce4da3-3b74-6639-9bc6-39d4c88ec8cc"]},"value":0,"unit":""}},{"id":"a-477-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".new-interview-right-wrappers","selectorGuids":["cb842f99-4d2e-6aa7-3e76-b7bdcf003137"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-477-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".overlay-interviewer","selectorGuids":["79ce4da3-3b74-6639-9bc6-39d4c88ec8cc"]},"value":"none"}}]},{"actionItems":[{"id":"a-477-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".overlay-interviewer","selectorGuids":["79ce4da3-3b74-6639-9bc6-39d4c88ec8cc"]},"value":1,"unit":""}},{"id":"a-477-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"selector":".new-interview-right-wrappers","selectorGuids":["cb842f99-4d2e-6aa7-3e76-b7bdcf003137"]},"globalSwatchId":"","rValue":233,"bValue":237,"gValue":235,"aValue":1}},{"id":"a-477-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".overlay-interviewer","selectorGuids":["79ce4da3-3b74-6639-9bc6-39d4c88ec8cc"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697534300984},"a-478":{"id":"a-478","title":"Interview Interviewer Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-478-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".overlay-interviewer","selectorGuids":["79ce4da3-3b74-6639-9bc6-39d4c88ec8cc"]},"value":0,"unit":""}},{"id":"a-478-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"selector":".new-interview-right-wrappers","selectorGuids":["cb842f99-4d2e-6aa7-3e76-b7bdcf003137"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-478-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".overlay-interviewer","selectorGuids":["79ce4da3-3b74-6639-9bc6-39d4c88ec8cc"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697534300984},"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InterviewInterviewerScreen({
  as: _Component = _Builtin.Block,
  onClickPlay = {},
  textQuestion = "Question 1/12",
  slotAiVideo,
  slotText,
  isQuestionPillVisible = true,
  textAi = "Hi, Im your interviewer today. I would like to ask some questions about the your skills and other stuff. Can u please indroduce yourself?",
  propsScroll = {},
  onClickPause = {},
  isPlayPauseVisible = false,
  isPlayButtonVisible = false,
  isPauseButtonVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "new-interview-right-wrappers")}
      data-w-id="5e8f8624-5731-c3bb-467e-a7f216985627"
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-497")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-interviewee-video")}
          tag="div"
        >
          {slotAiVideo}
        </_Builtin.Block>
        {isPlayPauseVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "overlay-interviewer")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-496")}
              tag="div"
            >
              {isPlayButtonVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "play-wappers", "play")}
                  tag="div"
                  {...onClickPlay}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons", "play")}
                    value="%3Csvg%20width%3D%2211%22%20height%3D%2214%22%20viewbox%3D%220%200%2011%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.02734%201.19922C1.73568%201.03516%201.4349%201.02604%201.125%201.17188C0.851562%201.35417%200.705729%201.60938%200.6875%201.9375V11.5625C0.705729%2011.8906%200.851562%2012.1458%201.125%2012.3281C1.4349%2012.474%201.73568%2012.4648%202.02734%2012.3008L9.90234%207.48828C10.1576%207.32422%2010.2943%207.07812%2010.3125%206.75C10.2943%206.42188%2010.1576%206.17578%209.90234%206.01172L2.02734%201.19922ZM0.933594%200.789062C1.37109%200.552083%201.80859%200.561198%202.24609%200.816406L10.1211%205.62891C10.5221%205.88411%2010.7318%206.25781%2010.75%206.75C10.7318%207.24219%2010.5221%207.61589%2010.1211%207.87109L2.24609%2012.6836C1.80859%2012.9388%201.37109%2012.9479%200.933594%2012.7109C0.496094%2012.4557%200.268229%2012.0729%200.25%2011.5625V1.9375C0.268229%201.42708%200.496094%201.04427%200.933594%200.789062Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              ) : null}
              {isPauseButtonVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "play-wappers", "pause")}
                  tag="div"
                  {...onClickPause}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%229%22%20height%3D%2211%22%20viewbox%3D%220%200%209%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.4375%200.9375C1.18229%200.9375%200.972656%201.01953%200.808594%201.18359C0.644531%201.34766%200.5625%201.55729%200.5625%201.8125V9.6875C0.5625%209.94271%200.644531%2010.1523%200.808594%2010.3164C0.972656%2010.4805%201.18229%2010.5625%201.4375%2010.5625H2.3125C2.56771%2010.5625%202.77734%2010.4805%202.94141%2010.3164C3.10547%2010.1523%203.1875%209.94271%203.1875%209.6875V1.8125C3.1875%201.55729%203.10547%201.34766%202.94141%201.18359C2.77734%201.01953%202.56771%200.9375%202.3125%200.9375H1.4375ZM0.125%201.8125C0.143229%201.44792%200.270833%201.13802%200.507812%200.882812C0.763021%200.645833%201.07292%200.518229%201.4375%200.5H2.3125C2.67708%200.518229%202.98698%200.645833%203.24219%200.882812C3.47917%201.13802%203.60677%201.44792%203.625%201.8125V9.6875C3.60677%2010.0521%203.47917%2010.362%203.24219%2010.6172C2.98698%2010.8542%202.67708%2010.9818%202.3125%2011H1.4375C1.07292%2010.9818%200.763021%2010.8542%200.507812%2010.6172C0.270833%2010.362%200.143229%2010.0521%200.125%209.6875V1.8125ZM6.6875%200.9375C6.43229%200.9375%206.22266%201.01953%206.05859%201.18359C5.89453%201.34766%205.8125%201.55729%205.8125%201.8125V9.6875C5.8125%209.94271%205.89453%2010.1523%206.05859%2010.3164C6.22266%2010.4805%206.43229%2010.5625%206.6875%2010.5625H7.5625C7.81771%2010.5625%208.02734%2010.4805%208.19141%2010.3164C8.35547%2010.1523%208.4375%209.94271%208.4375%209.6875V1.8125C8.4375%201.55729%208.35547%201.34766%208.19141%201.18359C8.02734%201.01953%207.81771%200.9375%207.5625%200.9375H6.6875ZM5.375%201.8125C5.39323%201.44792%205.52083%201.13802%205.75781%200.882812C6.01302%200.645833%206.32292%200.518229%206.6875%200.5H7.5625C7.92708%200.518229%208.23698%200.645833%208.49219%200.882812C8.72917%201.13802%208.85677%201.44792%208.875%201.8125V9.6875C8.85677%2010.0521%208.72917%2010.362%208.49219%2010.6172C8.23698%2010.8542%207.92708%2010.9818%207.5625%2011H6.6875C6.32292%2010.9818%206.01302%2010.8542%205.75781%2010.6172C5.52083%2010.362%205.39323%2010.0521%205.375%209.6875V1.8125Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "text-interviewer-wrappers",
          "mobile-landscape-hide"
        )}
        tag="div"
        {...propsScroll}
      >
        <_Builtin.Block className={_utils.cx(_styles, "width-text")} tag="div">
          {textAi}
        </_Builtin.Block>
      </_Builtin.Block>
      {isQuestionPillVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "question-pill-wrapper")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2214%22%20height%3D%2213%22%20viewbox%3D%220%200%2014%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.8125%200.84375C11.9401%200.861979%2012.013%200.934896%2012.0312%201.0625V2.59375H13.5625C13.6901%202.61198%2013.763%202.6849%2013.7812%202.8125C13.763%202.9401%2013.6901%203.01302%2013.5625%203.03125H12.0312V4.5625C12.013%204.6901%2011.9401%204.76302%2011.8125%204.78125C11.6849%204.76302%2011.612%204.6901%2011.5938%204.5625V3.03125H10.0625C9.9349%203.01302%209.86198%202.9401%209.84375%202.8125C9.86198%202.6849%209.9349%202.61198%2010.0625%202.59375H11.5938V1.0625C11.612%200.934896%2011.6849%200.861979%2011.8125%200.84375ZM11.8125%208.71875C11.9401%208.73698%2012.013%208.8099%2012.0312%208.9375V10.4688H13.5625C13.6901%2010.487%2013.763%2010.5599%2013.7812%2010.6875C13.763%2010.8151%2013.6901%2010.888%2013.5625%2010.9062H12.0312V12.4375C12.013%2012.5651%2011.9401%2012.638%2011.8125%2012.6562C11.6849%2012.638%2011.612%2012.5651%2011.5938%2012.4375V10.9062H10.0625C9.9349%2010.888%209.86198%2010.8151%209.84375%2010.6875C9.86198%2010.5599%209.9349%2010.487%2010.0625%2010.4688H11.5938V8.9375C11.612%208.8099%2011.6849%208.73698%2011.8125%208.71875ZM3.55469%205.27344L0.4375%206.72266L3.55469%208.14453C3.64583%208.19922%203.71875%208.27214%203.77344%208.36328L5.22266%2011.4805L6.64453%208.36328C6.69922%208.27214%206.77214%208.19922%206.86328%208.14453L9.98047%206.72266L6.86328%205.27344C6.77214%205.21875%206.69922%205.14583%206.64453%205.05469L5.22266%201.9375L3.77344%205.05469C3.71875%205.14583%203.64583%205.21875%203.55469%205.27344ZM5.60547%201.74609L7.05469%204.86328L10.1719%206.3125C10.3359%206.40365%2010.418%206.53125%2010.418%206.69531C10.418%206.8776%2010.3359%207.01432%2010.1719%207.10547L7.05469%208.55469L5.60547%2011.6719C5.51432%2011.8359%205.38672%2011.918%205.22266%2011.918C5.04036%2011.918%204.90365%2011.8359%204.8125%2011.6719L3.36328%208.55469L0.246094%207.10547C0.0820312%207.03255%200%206.90495%200%206.72266C0%206.54036%200.0820312%206.40365%200.246094%206.3125L3.36328%204.86328L4.8125%201.74609C4.90365%201.58203%205.04036%201.5%205.22266%201.5C5.40495%201.5%205.53255%201.58203%205.60547%201.74609Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "color-black")}
            tag="div"
          >
            {textQuestion}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "mobile-play-pause-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-496")}
          data-w-id="b2651b1f-256f-5850-0b09-f22d89798079"
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "play-wappers", "play-mobile")}
            tag="div"
            {...onClickPlay}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons", "play")}
              value="%3Csvg%20width%3D%227%22%20height%3D%2211%22%20viewbox%3D%220%200%2011%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.02734%201.19922C1.73568%201.03516%201.4349%201.02604%201.125%201.17188C0.851562%201.35417%200.705729%201.60938%200.6875%201.9375V11.5625C0.705729%2011.8906%200.851562%2012.1458%201.125%2012.3281C1.4349%2012.474%201.73568%2012.4648%202.02734%2012.3008L9.90234%207.48828C10.1576%207.32422%2010.2943%207.07812%2010.3125%206.75C10.2943%206.42188%2010.1576%206.17578%209.90234%206.01172L2.02734%201.19922ZM0.933594%200.789062C1.37109%200.552083%201.80859%200.561198%202.24609%200.816406L10.1211%205.62891C10.5221%205.88411%2010.7318%206.25781%2010.75%206.75C10.7318%207.24219%2010.5221%207.61589%2010.1211%207.87109L2.24609%2012.6836C1.80859%2012.9388%201.37109%2012.9479%200.933594%2012.7109C0.496094%2012.4557%200.268229%2012.0729%200.25%2011.5625V1.9375C0.268229%201.42708%200.496094%201.04427%200.933594%200.789062Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "play-wappers", "pause-mobile")}
            tag="div"
            {...onClickPause}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%227%22%20height%3D%228%22%20viewbox%3D%220%200%207%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.40148%200.510471C1.21716%200.510471%201.06576%200.569716%200.947266%200.688206C0.828776%200.806695%200.769531%200.958099%200.769531%201.14242V6.82992C0.769531%207.01423%200.828776%207.16564%200.947266%207.28413C1.06576%207.40262%201.21716%207.46186%201.40148%207.46186H2.03342C2.21774%207.46186%202.36914%207.40262%202.48763%207.28413C2.60612%207.16564%202.66536%207.01423%202.66536%206.82992V1.14242C2.66536%200.958099%202.60612%200.806695%202.48763%200.688206C2.36914%200.569716%202.21774%200.510471%202.03342%200.510471H1.40148ZM0.453559%201.14242C0.466725%200.879105%200.558883%200.655292%200.730035%200.470975C0.914352%200.299823%201.13817%200.207665%201.40148%200.194499H2.03342C2.29673%200.207665%202.52054%200.299823%202.70486%200.470975C2.87601%200.655292%202.96817%200.879105%202.98134%201.14242V6.82992C2.96817%207.09323%202.87601%207.31704%202.70486%207.50136C2.52054%207.67251%202.29673%207.76467%202.03342%207.77783H1.40148C1.13817%207.76467%200.914352%207.67251%200.730035%207.50136C0.558883%207.31704%200.466725%207.09323%200.453559%206.82992V1.14242ZM5.19314%200.510471C5.00883%200.510471%204.85742%200.569716%204.73893%200.688206C4.62044%200.806695%204.5612%200.958099%204.5612%201.14242V6.82992C4.5612%207.01423%204.62044%207.16564%204.73893%207.28413C4.85742%207.40262%205.00883%207.46186%205.19314%207.46186H5.82509C6.0094%207.46186%206.16081%207.40262%206.2793%207.28413C6.39779%207.16564%206.45703%207.01423%206.45703%206.82992V1.14242C6.45703%200.958099%206.39779%200.806695%206.2793%200.688206C6.16081%200.569716%206.0094%200.510471%205.82509%200.510471H5.19314ZM4.24523%201.14242C4.25839%200.879105%204.35055%200.655292%204.5217%200.470975C4.70602%200.299823%204.92983%200.207665%205.19314%200.194499H5.82509C6.0884%200.207665%206.31221%200.299823%206.49653%200.470975C6.66768%200.655292%206.75984%200.879105%206.773%201.14242V6.82992C6.75984%207.09323%206.66768%207.31704%206.49653%207.50136C6.31221%207.67251%206.0884%207.76467%205.82509%207.77783H5.19314C4.92983%207.76467%204.70602%207.67251%204.5217%207.50136C4.35055%207.31704%204.25839%207.09323%204.24523%206.82992V1.14242Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
