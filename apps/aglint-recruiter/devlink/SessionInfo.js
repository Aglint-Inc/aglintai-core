"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./SessionInfo.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SessionInfo({
  as: _Component = _Builtin.Block,
  textSessionName = "Personality and culture",
  textSessionDuration = "45 Minutes",
  textMeetingType = "San Fransisco, California",
  slotMeetingTypeIcon,
  slotInterviewtypeIcon,
  iconName = "location_on",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "session_info")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "flex-horizontal", "center", "gap-1")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "_20-20_icon_block")}
          tag="div"
        >
          {slotInterviewtypeIcon ?? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2220%22%20height%3D%2216%22%20viewbox%3D%220%200%2020%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M17%201H3C2.70833%201%202.46875%201.09375%202.28125%201.28125C2.09375%201.46875%202%201.70833%202%202V7.1875C1.625%207.3125%201.29167%207.51042%201%207.78125V2C1.02083%201.4375%201.21875%200.96875%201.59375%200.59375C1.96875%200.21875%202.4375%200.0208333%203%200H17C17.5625%200.0208333%2018.0312%200.21875%2018.4062%200.59375C18.7812%200.96875%2018.9792%201.4375%2019%202V7.75C18.7083%207.5%2018.375%207.30208%2018%207.15625V2C18%201.70833%2017.9062%201.46875%2017.7188%201.28125C17.5312%201.09375%2017.2917%201%2017%201ZM3%2011C3.29167%2011%203.53125%2010.9062%203.71875%2010.7188C3.90625%2010.5312%204%2010.2917%204%2010C4%209.70833%203.90625%209.46875%203.71875%209.28125C3.53125%209.09375%203.29167%209%203%209C2.70833%209%202.46875%209.09375%202.28125%209.28125C2.09375%209.46875%202%209.70833%202%2010C2%2010.2917%202.09375%2010.5312%202.28125%2010.7188C2.46875%2010.9062%202.70833%2011%203%2011ZM3%208C3.75%208.02083%204.32292%208.35417%204.71875%209C5.09375%209.66667%205.09375%2010.3333%204.71875%2011C4.32292%2011.6458%203.75%2011.9792%203%2012C2.25%2011.9792%201.67708%2011.6458%201.28125%2011C0.90625%2010.3333%200.90625%209.66667%201.28125%209C1.67708%208.35417%202.25%208.02083%203%208ZM10%2011C10.2917%2011%2010.5312%2010.9062%2010.7188%2010.7188C10.9062%2010.5312%2011%2010.2917%2011%2010C11%209.70833%2010.9062%209.46875%2010.7188%209.28125C10.5312%209.09375%2010.2917%209%2010%209C9.70833%209%209.46875%209.09375%209.28125%209.28125C9.09375%209.46875%209%209.70833%209%2010C9%2010.2917%209.09375%2010.5312%209.28125%2010.7188C9.46875%2010.9062%209.70833%2011%2010%2011ZM10%208C10.75%208.02083%2011.3229%208.35417%2011.7188%209C12.0938%209.66667%2012.0938%2010.3333%2011.7188%2011C11.3229%2011.6458%2010.75%2011.9792%2010%2012C9.25%2011.9792%208.67708%2011.6458%208.28125%2011C7.90625%2010.3333%207.90625%209.66667%208.28125%209C8.67708%208.35417%209.25%208.02083%2010%208ZM18%2010C18%209.70833%2017.9062%209.46875%2017.7188%209.28125C17.5312%209.09375%2017.2917%209%2017%209C16.7083%209%2016.4688%209.09375%2016.2812%209.28125C16.0938%209.46875%2016%209.70833%2016%2010C16%2010.2917%2016.0938%2010.5312%2016.2812%2010.7188C16.4688%2010.9062%2016.7083%2011%2017%2011C17.2917%2011%2017.5312%2010.9062%2017.7188%2010.7188C17.9062%2010.5312%2018%2010.2917%2018%2010ZM15%2010C15.0208%209.25%2015.3542%208.67708%2016%208.28125C16.6667%207.90625%2017.3333%207.90625%2018%208.28125C18.6458%208.67708%2018.9792%209.25%2019%2010C18.9792%2010.75%2018.6458%2011.3229%2018%2011.7188C17.3333%2012.0938%2016.6667%2012.0938%2016%2011.7188C15.3542%2011.3229%2015.0208%2010.75%2015%2010ZM1%2015V15.5C0.979167%2015.8125%200.8125%2015.9792%200.5%2016C0.1875%2015.9792%200.0208333%2015.8125%200%2015.5V15C0.0208333%2014.4375%200.21875%2013.9688%200.59375%2013.5938C0.96875%2013.2188%201.4375%2013.0208%202%2013H4C4.5625%2013.0208%205.03125%2013.2188%205.40625%2013.5938C5.78125%2013.9688%205.97917%2014.4375%206%2015V15.5C5.97917%2015.8125%205.8125%2015.9792%205.5%2016C5.1875%2015.9792%205.02083%2015.8125%205%2015.5V15C5%2014.7083%204.90625%2014.4688%204.71875%2014.2812C4.53125%2014.0938%204.29167%2014%204%2014H2C1.70833%2014%201.46875%2014.0938%201.28125%2014.2812C1.09375%2014.4688%201%2014.7083%201%2015ZM9%2014C8.70833%2014%208.46875%2014.0938%208.28125%2014.2812C8.09375%2014.4688%208%2014.7083%208%2015V15.5C7.97917%2015.8125%207.8125%2015.9792%207.5%2016C7.1875%2015.9792%207.02083%2015.8125%207%2015.5V15C7.02083%2014.4375%207.21875%2013.9688%207.59375%2013.5938C7.96875%2013.2188%208.4375%2013.0208%209%2013H11C11.5625%2013.0208%2012.0312%2013.2188%2012.4062%2013.5938C12.7812%2013.9688%2012.9792%2014.4375%2013%2015V15.5C12.9792%2015.8125%2012.8125%2015.9792%2012.5%2016C12.1875%2015.9792%2012.0208%2015.8125%2012%2015.5V15C12%2014.7083%2011.9062%2014.4688%2011.7188%2014.2812C11.5312%2014.0938%2011.2917%2014%2011%2014H9ZM15%2015V15.5C14.9792%2015.8125%2014.8125%2015.9792%2014.5%2016C14.1875%2015.9792%2014.0208%2015.8125%2014%2015.5V15C14.0208%2014.4375%2014.2188%2013.9688%2014.5938%2013.5938C14.9688%2013.2188%2015.4375%2013.0208%2016%2013H18C18.5625%2013.0208%2019.0312%2013.2188%2019.4062%2013.5938C19.7812%2013.9688%2019.9792%2014.4375%2020%2015V15.5C19.9792%2015.8125%2019.8125%2015.9792%2019.5%2016C19.1875%2015.9792%2019.0208%2015.8125%2019%2015.5V15C19%2014.7083%2018.9062%2014.4688%2018.7188%2014.2812C18.5312%2014.0938%2018.2917%2014%2018%2014H16C15.7083%2014%2015.4688%2014.0938%2015.2812%2014.2812C15.0938%2014.4688%2015%2014.7083%2015%2015Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          )}
        </_Builtin.Block>
        <Text content={textSessionName} />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "flex-horizontal", "center", "gap-1")}
        tag="div"
      >
        <GlobalIcon iconName="timer" size="4" weight="light" />
        <Text content={textSessionDuration} />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "flex-horizontal", "center", "gap-1")}
        tag="div"
      >
        <GlobalIcon iconName={iconName} size="4" weight="light" />
        <Text content={textMeetingType} />
      </_Builtin.Block>
    </_Component>
  );
}
