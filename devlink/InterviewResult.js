import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { InterviewFeedbackScore } from "./InterviewFeedbackScore";
import * as _utils from "./utils";
import _styles from "./InterviewResult.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-948":{"id":"e-948","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-386","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-949"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"},"targets":[{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694910129600}},"actionLists":{"a-386":{"id":"a-386","title":"email-temp-editor-[close]","actionItemGroups":[{"actionItems":[{"id":"a-386-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":0,"unit":""}},{"id":"a-386-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":800,"target":{"selector":".rd-email-edit-wrapper","selectorGuids":["2295ead5-85e1-b9a6-3337-5728082f803c"]},"xValue":500,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-386-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":600,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694910134507}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InterviewResult({
  as: _Component = _Builtin.Block,
  slotScore,
  textScore = "Dorem ipsum dolor sit",
  onClickShowTranscript = {},
  slotInterviewFeedback,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "interview-result-subwrappers")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "interview-result-left")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-interviewprofile-score")}
          tag="div"
        >
          {slotScore}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "fw-semibold",
            "text-yellow-700",
            "mt-8"
          )}
          tag="div"
        >
          {textScore}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "aui-button-wrap", "mt-16")}
          tag="div"
          tabIndex=""
          {...onClickShowTranscript}
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "aui-button",
              "is-small",
              "is-button-outlined"
            )}
            tag="div"
            tabIndex=""
          >
            <_Builtin.Block tag="div">{"Show Transcript"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "button-icon", "is-large")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M11.625%202.25C11.8091%202.25%2011.9622%202.38266%2011.994%202.55759L12%202.625V5.625C12%205.83211%2011.8321%206%2011.625%206C11.4409%206%2011.2878%205.86734%2011.256%205.69241L11.25%205.625V3.5295L7.39017%207.39016C7.25999%207.52034%207.05792%207.5348%206.91177%207.43356L6.85983%207.39016L4.875%205.40525L0.640165%209.64017C0.50999%209.77034%200.307922%209.7848%200.161771%209.68356L0.109835%209.64017C-0.0203398%209.50999%20-0.0348037%209.30792%200.0664434%209.16177L0.109835%209.10983L4.60984%204.60984C4.74001%204.47966%204.94208%204.4652%205.08823%204.56644L5.14016%204.60984L7.125%206.59475L10.719%203H8.625C8.4409%203%208.28779%202.86734%208.25604%202.69241L8.25%202.625C8.25%202.44091%208.38266%202.28779%208.55759%202.25604L8.625%202.25H11.625Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "interview-result-right")}
        tag="div"
      >
        {slotInterviewFeedback ?? <InterviewFeedbackScore />}
      </_Builtin.Block>
    </_Component>
  );
}
