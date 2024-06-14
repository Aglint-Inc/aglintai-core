"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./EmailOutReach.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function EmailOutReach({
  as: _Component = _Builtin.Block,
  onClickEmailOutreach = {},
  isEmailOutreachVisible = true,
  isFetchingVisible = false,
  isUnableFetch = false,
  slotLoaderIcon,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "relative")} tag="div">
      {isEmailOutreachVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "email-outreach-button")}
          tag="div"
          {...onClickEmailOutreach}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-email-out")}
            tag="div"
          >
            {"Email outreach"}
          </_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%226%22%20height%3D%226%22%20viewbox%3D%220%200%206%206%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.66328%200.225C5.82734%200.235937%205.91484%200.323437%205.92578%200.4875V4.1625C5.91484%204.32656%205.82734%204.41406%205.66328%204.425C5.49922%204.41406%205.41172%204.32656%205.40078%204.1625V1.12734L1.11875%205.39297C0.998437%205.50234%200.878125%205.50234%200.757812%205.39297C0.648437%205.27266%200.648437%205.15234%200.757812%205.03203L5.02344%200.75H1.98828C1.82422%200.739062%201.73672%200.651562%201.72578%200.4875C1.73672%200.323437%201.82422%200.235937%201.98828%200.225H5.66328Z%22%20fill%3D%22%23A81897%22%20style%3D%22fill%3A%23A81897%3Bfill%3Acolor(display-p3%200.6588%200.0941%200.5922)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      ) : null}
      {isFetchingVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "email-outreach-fetching")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-email-out", "fetching")}
            tag="div"
          >
            {"Fetching Email"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-731")}
            tag="div"
          >
            {slotLoaderIcon}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isUnableFetch ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "email-outreach-fetching")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-email-out", "fetching")}
            tag="div"
          >
            {"Unable to fetch email"}
          </_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.40015%2013.4C7.37931%2013.3854%206.44598%2013.1375%205.60015%2012.6563C4.75431%2012.1604%204.0689%2011.475%203.5439%2010.6C3.04806%209.71042%202.80015%208.77708%202.80015%207.8C2.80015%206.82292%203.04806%205.88958%203.5439%205C4.0689%204.125%204.75431%203.43958%205.60015%202.94375C6.44598%202.4625%207.37931%202.21458%208.40015%202.2C9.42098%202.21458%2010.3543%202.4625%2011.2001%202.94375C12.046%203.43958%2012.7314%204.125%2013.2564%205C13.7522%205.88958%2014.0001%206.82292%2014.0001%207.8C14.0001%208.77708%2013.7522%209.71042%2013.2564%2010.6C12.7314%2011.475%2012.046%2012.1604%2011.2001%2012.6563C10.3543%2013.1375%209.42098%2013.3854%208.40015%2013.4ZM7.52515%209.55C7.20431%209.57917%207.02931%209.75417%207.00015%2010.075C7.02931%2010.3958%207.20431%2010.5708%207.52515%2010.6H9.27515C9.59598%2010.5708%209.77098%2010.3958%209.80015%2010.075C9.77098%209.75417%209.59598%209.57917%209.27515%209.55H9.10015V7.625C9.07098%207.30417%208.89598%207.12917%208.57515%207.1H7.52515C7.20431%207.12917%207.02931%207.30417%207.00015%207.625C7.02931%207.94583%207.20431%208.12083%207.52515%208.15H8.05015V9.55H7.52515ZM8.40015%205C8.19598%205%208.02827%205.06562%207.89702%205.19687C7.76577%205.32812%207.70015%205.49583%207.70015%205.7C7.70015%205.90417%207.76577%206.07187%207.89702%206.20312C8.02827%206.33437%208.19598%206.4%208.40015%206.4C8.60431%206.4%208.77202%206.33437%208.90327%206.20312C9.03452%206.07187%209.10015%205.90417%209.10015%205.7C9.10015%205.49583%209.03452%205.32812%208.90327%205.19687C8.77202%205.06562%208.60431%205%208.40015%205Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
