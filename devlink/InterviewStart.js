import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./InterviewStart.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-948":{"id":"e-948","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-386","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-949"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"},"targets":[{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694910129600}},"actionLists":{"a-386":{"id":"a-386","title":"email-temp-editor-[close]","actionItemGroups":[{"actionItems":[{"id":"a-386-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":0,"unit":""}},{"id":"a-386-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":800,"target":{"selector":".rd-email-edit-wrapper","selectorGuids":["2295ead5-85e1-b9a6-3337-5728082f803c"]},"xValue":500,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-386-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":600,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694910134507}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InterviewStart({
  as: _Component = _Builtin.Block,
  slotAiProfile,
  nameText = "Marc Spencer",
  onClickStart = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "interview-all-screen-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "text-xl",
          "fw-semibold",
          "text-grey-700"
        )}
        tag="div"
      >
        {"Mock Interview for Senior Software Engineer at Google"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "interview-card-screen")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "profile-image-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "image-screen-profile")}
            tag="div"
          >
            {slotAiProfile}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-lg",
              "color-grey-600",
              "fw-semibold"
            )}
            tag="div"
          >
            {nameText}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "interview-tag-wrapper")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Interviewer"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "inter-terms-and-disclaimer-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "disclaimer-interview")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.5%205C6.05228%205%206.5%204.55228%206.5%204C6.5%203.44772%206.05228%203%205.5%203C4.94772%203%204.5%203.44772%204.5%204C4.5%204.55228%204.94772%205%205.5%205ZM5.5%2010C5.77614%2010%206%209.77614%206%209.5V6.5C6%206.22386%205.77614%206%205.5%206C5.22386%206%205%206.22386%205%206.5V9.5C5%209.77614%205.22386%2010%205.5%2010ZM5.5%2012C2.46243%2012%200%209.53757%200%206.5C0%203.46243%202.46243%201%205.5%201C8.53757%201%2011%203.46243%2011%206.5C11%209.53757%208.53757%2012%205.5%2012ZM5.5%2011C7.98528%2011%2010%208.98528%2010%206.5C10%204.01472%207.98528%202%205.5%202C3.01472%202%201%204.01472%201%206.5C1%208.98528%203.01472%2011%205.5%2011Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-xsm", "color-grey-600")}
            tag="div"
          >
            {
              "AI-generated content may contain inaccuracies and does not reflect any official stance"
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "terms-interview-wrapper")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            {"By clicking start you are agreeing aglint’s"}
          </_Builtin.Block>
          <_Builtin.Link
            className={_utils.cx(_styles, "terms-link-wrapper")}
            button={false}
            options={{
              href: "https://www.aglinthq.com/terms",
            }}
          >
            <_Builtin.Block tag="div">{"terms and conditions"}</_Builtin.Block>
          </_Builtin.Link>
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "aui-button-wrap")}
            tag="div"
            tabIndex="0"
            {...onClickStart}
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "aui-button",
                "is-button-bg-green-600"
              )}
              tag="div"
              tabIndex="0"
            >
              <_Builtin.Block tag="div">{"Start Interview"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
