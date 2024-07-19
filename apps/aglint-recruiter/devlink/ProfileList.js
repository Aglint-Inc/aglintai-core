"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { SlotComp } from "./SlotComp";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./ProfileList.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482},"e-1584":{"id":"e-1584","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-619","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1585"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"1f7bd557-bd85-a840-c8cf-c75741d550eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"1f7bd557-bd85-a840-c8cf-c75741d550eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1721027039387},"e-1585":{"id":"e-1585","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-620","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1584"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"1f7bd557-bd85-a840-c8cf-c75741d550eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"1f7bd557-bd85-a840-c8cf-c75741d550eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1721027039390},"e-1586":{"id":"e-1586","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-619","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1587"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65df2d716fade22e344c2ae6|0718da14-a9e2-2ef5-312e-a7dd0ed523d4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65df2d716fade22e344c2ae6|0718da14-a9e2-2ef5-312e-a7dd0ed523d4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1721031091876},"e-1587":{"id":"e-1587","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-620","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1586"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65df2d716fade22e344c2ae6|0718da14-a9e2-2ef5-312e-a7dd0ed523d4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65df2d716fade22e344c2ae6|0718da14-a9e2-2ef5-312e-a7dd0ed523d4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1721031091876}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402},"a-619":{"id":"a-619","title":"profile detail hover in","actionItemGroups":[{"actionItems":[{"id":"a-619-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".role-link","selectorGuids":["0171fca9-6f04-26ae-bccf-f304a6aef9cd"]},"value":0,"unit":""}},{"id":"a-619-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".role-link","selectorGuids":["0171fca9-6f04-26ae-bccf-f304a6aef9cd"]},"value":"none"}}]},{"actionItems":[{"id":"a-619-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".role-link","selectorGuids":["0171fca9-6f04-26ae-bccf-f304a6aef9cd"]},"value":1,"unit":""}},{"id":"a-619-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".role-link","selectorGuids":["0171fca9-6f04-26ae-bccf-f304a6aef9cd"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1721027043448},"a-620":{"id":"a-620","title":"profile detail hover out","actionItemGroups":[{"actionItems":[{"id":"a-620-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".role-link","selectorGuids":["0171fca9-6f04-26ae-bccf-f304a6aef9cd"]},"value":0,"unit":""}},{"id":"a-620-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".role-link","selectorGuids":["0171fca9-6f04-26ae-bccf-f304a6aef9cd"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1721027043448}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ProfileList({
  as: _Component = _Builtin.Block,
  slotUserImage,
  textName = "Kane Williamson",
  textNumber = "+91 8078081250",
  onClickEdit = {},
  textJobTitle = "Product Designer",
  textDepartment = "Arts and Design",
  textRole = "Interviewer",
  textLocation = "Bengaluru, South India",
  textEmail = "raimonrts@aglinthq.com",
  isLinkedInVisible = false,
  onClickLinkedIn = {},
  onClickRole = {},
  isRoleLinkVisible = true,
  textManager = "Interviewer",
  isManagerVisible = true,
  onClickManagerLink = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "profile-list-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-list-header")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "flex-horizontal", "center", "gap-3")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            {slotUserImage ?? <SlotComp componentName="slotImage" />}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "flex-horizontal",
                "center",
                "gap-2"
              )}
              tag="div"
            >
              <Text content={textName} />
              {isLinkedInVisible ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons", "pointer")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.1429%200H0.854464C0.383036%200%200%200.388393%200%200.865179V11.1348C0%2011.6116%200.383036%2012%200.854464%2012H11.1429C11.6143%2012%2012%2011.6116%2012%2011.1348V0.865179C12%200.388393%2011.6143%200%2011.1429%200ZM3.62679%2010.2857H1.84821V4.55893H3.62946V10.2857H3.62679ZM2.7375%203.77679C2.16696%203.77679%201.70625%203.31339%201.70625%202.74554C1.70625%202.17768%202.16696%201.71429%202.7375%201.71429C3.30536%201.71429%203.76875%202.17768%203.76875%202.74554C3.76875%203.31607%203.30804%203.77679%202.7375%203.77679ZM10.2937%2010.2857H8.51518V7.5C8.51518%206.83571%208.50179%205.98125%207.59107%205.98125C6.66429%205.98125%206.52232%206.70446%206.52232%207.45179V10.2857H4.74375V4.55893H6.45V5.34107H6.47411C6.7125%204.89107%207.29375%204.41696%208.15893%204.41696C9.95893%204.41696%2010.2937%205.60357%2010.2937%207.14643V10.2857Z%22%20fill%3D%22%232D64BC%22%2F%3E%0A%3C%2Fsvg%3E"
                  {...onClickLinkedIn}
                />
              ) : null}
            </_Builtin.Block>
            <Text content={textNumber} color="neutral" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "edit-icon")}
          tag="div"
          {...onClickEdit}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.6641%201.05469C10.5078%200.914062%2010.3281%200.84375%2010.125%200.84375C9.92188%200.84375%209.74219%200.914062%209.58594%201.05469L8.97656%201.6875L10.3125%203.02344L10.9453%202.41406C11.0859%202.25781%2011.1562%202.07813%2011.1562%201.875C11.1562%201.67187%2011.0859%201.49219%2010.9453%201.33594L10.6641%201.05469ZM4.42969%206.23438C4.33594%206.32812%204.27344%206.44531%204.24219%206.58594L3.86719%208.13281L5.41406%207.78125C5.55469%207.73438%205.67188%207.66406%205.76562%207.57031L9.77344%203.5625L8.4375%202.22656L4.42969%206.23438ZM9.07031%200.539062C9.38281%200.242187%209.73438%200.09375%2010.125%200.09375C10.5312%200.09375%2010.8828%200.242187%2011.1797%200.539062L11.4609%200.820312C11.7578%201.13281%2011.9062%201.48437%2011.9062%201.875C11.9062%202.28125%2011.7578%202.63281%2011.4609%202.92969L6.30469%208.10938C6.10156%208.3125%205.85938%208.44531%205.57812%208.50781L3.46875%209C3.32812%209.01562%203.21094%208.97656%203.11719%208.88281C3.02344%208.78906%202.98438%208.67969%203%208.55469L3.49219%206.42188C3.55469%206.14062%203.6875%205.89844%203.89062%205.69531L9.07031%200.539062ZM1.875%201.5H4.875C5.10938%201.51563%205.23438%201.64062%205.25%201.875C5.23438%202.10938%205.10938%202.23437%204.875%202.25H1.875C1.5625%202.26563%201.29688%202.375%201.07812%202.57812C0.875%202.79687%200.765625%203.0625%200.75%203.375V10.125C0.765625%2010.4375%200.875%2010.7031%201.07812%2010.9219C1.29688%2011.125%201.5625%2011.2344%201.875%2011.25H8.625C8.9375%2011.2344%209.20312%2011.125%209.42188%2010.9219C9.625%2010.7031%209.73438%2010.4375%209.75%2010.125V7.125C9.76562%206.89062%209.89062%206.76562%2010.125%206.75C10.3594%206.76562%2010.4844%206.89062%2010.5%207.125V10.125C10.4844%2010.6562%2010.3047%2011.1016%209.96094%2011.4609C9.60156%2011.8047%209.15625%2011.9844%208.625%2012H1.875C1.34375%2011.9844%200.898438%2011.8047%200.539062%2011.4609C0.195312%2011.1016%200.015625%2010.6562%200%2010.125V3.375C0.015625%202.84375%200.195312%202.39844%200.539062%202.03906C0.898438%201.69531%201.34375%201.51563%201.875%201.5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-list-body")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "profile-list-left")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "flex-horizontal", "top", "gap-2")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons", "mt-2")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.25%203.125V4.25H9.75V3.125C9.73438%202.89062%209.60938%202.76563%209.375%202.75H5.625C5.39062%202.76563%205.26562%202.89062%205.25%203.125ZM4.5%204.25V3.125C4.51562%202.8125%204.625%202.54687%204.82812%202.32812C5.04688%202.125%205.3125%202.01563%205.625%202H9.375C9.6875%202.01563%209.95312%202.125%2010.1719%202.32812C10.375%202.54687%2010.4844%202.8125%2010.5%203.125V4.25H12C12.4219%204.26562%2012.7734%204.41406%2013.0547%204.69531C13.3359%204.97656%2013.4844%205.32812%2013.5%205.75V11.75C13.4844%2012.1719%2013.3359%2012.5234%2013.0547%2012.8047C12.7734%2013.0859%2012.4219%2013.2344%2012%2013.25H3C2.57812%2013.2344%202.22656%2013.0859%201.94531%2012.8047C1.66406%2012.5234%201.51562%2012.1719%201.5%2011.75V5.75C1.51562%205.32812%201.66406%204.97656%201.94531%204.69531C2.22656%204.41406%202.57812%204.26562%203%204.25H4.5ZM10.125%205H4.875H3C2.78125%205%202.60156%205.07031%202.46094%205.21094C2.32031%205.35156%202.25%205.53125%202.25%205.75V8H5.625H6.375H8.625H9.375H12.75V5.75C12.75%205.53125%2012.6797%205.35156%2012.5391%205.21094C12.3984%205.07031%2012.2188%205%2012%205H10.125ZM12.75%208.75H9.375V9.875C9.375%2010.0938%209.30469%2010.2734%209.16406%2010.4141C9.02344%2010.5547%208.84375%2010.625%208.625%2010.625H6.375C6.15625%2010.625%205.97656%2010.5547%205.83594%2010.4141C5.69531%2010.2734%205.625%2010.0938%205.625%209.875V8.75H2.25V11.75C2.25%2011.9688%202.32031%2012.1484%202.46094%2012.2891C2.60156%2012.4297%202.78125%2012.5%203%2012.5H12C12.2188%2012.5%2012.3984%2012.4297%2012.5391%2012.2891C12.6797%2012.1484%2012.75%2011.9688%2012.75%2011.75V8.75ZM6.375%208.75V9.875H8.625V8.75H6.375Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-963")}
              tag="div"
            >
              <Text content="Title" color="neutral" />
              <Text content={textJobTitle} />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-951")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons", "mt-2")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.25%206.5C11.2188%205.4375%2010.8516%204.55469%2010.1484%203.85156C9.44531%203.14844%208.5625%202.78125%207.5%202.75C6.4375%202.78125%205.55469%203.14844%204.85156%203.85156C4.14844%204.55469%203.78125%205.4375%203.75%206.5C3.75%206.875%203.88281%207.36719%204.14844%207.97656C4.41406%208.60156%204.75%209.25%205.15625%209.92188C5.5625%2010.5781%205.97656%2011.1875%206.39844%2011.75C6.82031%2012.3281%207.1875%2012.8125%207.5%2013.2031C7.8125%2012.8125%208.17969%2012.3281%208.60156%2011.75C9.02344%2011.1875%209.4375%2010.5781%209.84375%209.92188C10.2656%209.25%2010.6094%208.60156%2010.875%207.97656C11.125%207.36719%2011.25%206.875%2011.25%206.5ZM12%206.5C11.9688%207.20312%2011.7188%208.01562%2011.25%208.9375C10.7656%209.85938%2010.2188%2010.75%209.60938%2011.6094C9%2012.4844%208.48438%2013.1797%208.0625%2013.6953C7.90625%2013.8828%207.71875%2013.9766%207.5%2013.9766C7.28125%2013.9766%207.09375%2013.8828%206.9375%2013.6953C6.51562%2013.1797%206%2012.4844%205.39062%2011.6094C4.78125%2010.75%204.23438%209.85938%203.75%208.9375C3.28125%208.01562%203.03125%207.20312%203%206.5C3.03125%205.21875%203.46875%204.15625%204.3125%203.3125C5.15625%202.46875%206.21875%202.03125%207.5%202C8.78125%202.03125%209.84375%202.46875%2010.6875%203.3125C11.5312%204.15625%2011.9688%205.21875%2012%206.5ZM6.375%206.5C6.39062%206.92188%206.57812%207.25%206.9375%207.48438C7.3125%207.67188%207.6875%207.67188%208.0625%207.48438C8.42188%207.25%208.60938%206.92188%208.625%206.5C8.60938%206.07812%208.42188%205.75%208.0625%205.51562C7.6875%205.32812%207.3125%205.32812%206.9375%205.51562C6.57812%205.75%206.39062%206.07812%206.375%206.5ZM7.5%208.375C6.79688%208.35938%206.25781%208.04688%205.88281%207.4375C5.53906%206.8125%205.53906%206.1875%205.88281%205.5625C6.25781%204.95312%206.79688%204.64062%207.5%204.625C8.20312%204.64062%208.74219%204.95312%209.11719%205.5625C9.46094%206.1875%209.46094%206.8125%209.11719%207.4375C8.74219%208.04688%208.20312%208.35938%207.5%208.375Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-963")}
              tag="div"
            >
              <Text content="Location" color="neutral" />
              <Text content={textLocation} />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-951")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons", "mt-4")}
              value="%3Csvg%20width%3D%2213%22%20height%3D%2210%22%20viewbox%3D%220%200%2013%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2%201.25C1.78125%201.25%201.60156%201.32031%201.46094%201.46094C1.32031%201.60156%201.25%201.78125%201.25%202V2.9375L5.84375%206.28906C6.28125%206.58594%206.71875%206.58594%207.15625%206.28906L11.75%202.9375V2C11.75%201.78125%2011.6797%201.60156%2011.5391%201.46094C11.3984%201.32031%2011.2188%201.25%2011%201.25H2ZM1.25%203.875V8C1.25%208.21875%201.32031%208.39844%201.46094%208.53906C1.60156%208.67969%201.78125%208.75%202%208.75H11C11.2188%208.75%2011.3984%208.67969%2011.5391%208.53906C11.6797%208.39844%2011.75%208.21875%2011.75%208V3.875L7.60156%206.89844C7.27344%207.14844%206.90625%207.27344%206.5%207.27344C6.09375%207.27344%205.72656%207.14844%205.39844%206.89844L1.25%203.875ZM0.5%202C0.515625%201.57812%200.664062%201.22656%200.945312%200.945312C1.22656%200.664062%201.57812%200.515625%202%200.5H11C11.4219%200.515625%2011.7734%200.664062%2012.0547%200.945312C12.3359%201.22656%2012.4844%201.57812%2012.5%202V8C12.4844%208.42188%2012.3359%208.77344%2012.0547%209.05469C11.7734%209.33594%2011.4219%209.48438%2011%209.5H2C1.57812%209.48438%201.22656%209.33594%200.945312%209.05469C0.664062%208.77344%200.515625%208.42188%200.5%208V2Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-963")}
              tag="div"
            >
              <Text content="Email ID" color="neutral" />
              <Text content={textEmail} />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "profile-list-left")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-952")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-951")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons", "mt-2")}
                value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12%202.75H8.25C8.03125%202.75%207.85156%202.82031%207.71094%202.96094C7.57031%203.10156%207.5%203.28125%207.5%203.5V12.5C7.5%2012.7188%207.57031%2012.8984%207.71094%2013.0391C7.85156%2013.1797%208.03125%2013.25%208.25%2013.25H12C12.2188%2013.25%2012.3984%2013.1797%2012.5391%2013.0391C12.6797%2012.8984%2012.75%2012.7188%2012.75%2012.5V3.5C12.75%203.28125%2012.6797%203.10156%2012.5391%202.96094C12.3984%202.82031%2012.2188%202.75%2012%202.75ZM8.25%202H12C12.4219%202.01563%2012.7734%202.16406%2013.0547%202.44531C13.3359%202.72656%2013.4844%203.07812%2013.5%203.5V12.5C13.4844%2012.9219%2013.3359%2013.2734%2013.0547%2013.5547C12.7734%2013.8359%2012.4219%2013.9844%2012%2014H8.25C7.82812%2013.9844%207.47656%2013.8359%207.19531%2013.5547C6.91406%2013.2734%206.76562%2012.9219%206.75%2012.5V3.5C6.76562%203.07812%206.91406%202.72656%207.19531%202.44531C7.47656%202.16406%207.82812%202.01563%208.25%202ZM6%205V5.75H3C2.78125%205.75%202.60156%205.82031%202.46094%205.96094C2.32031%206.10156%202.25%206.28125%202.25%206.5V12.5C2.25%2012.7188%202.32031%2012.8984%202.46094%2013.0391C2.60156%2013.1797%202.78125%2013.25%203%2013.25H6.11719C6.22656%2013.5312%206.375%2013.7812%206.5625%2014H3C2.57812%2013.9844%202.22656%2013.8359%201.94531%2013.5547C1.66406%2013.2734%201.51562%2012.9219%201.5%2012.5V6.5C1.51562%206.07812%201.66406%205.72656%201.94531%205.44531C2.22656%205.16406%202.57812%205.01562%203%205H6ZM3.5625%209.5H4.6875C5.03125%209.53125%205.21875%209.71875%205.25%2010.0625V11.1875C5.21875%2011.5312%205.03125%2011.7188%204.6875%2011.75H3.5625C3.21875%2011.7188%203.03125%2011.5312%203%2011.1875V10.0625C3.03125%209.71875%203.21875%209.53125%203.5625%209.5ZM3.75%2011H4.5V10.25H3.75V11ZM9%2011.1875V10.0625C9.03125%209.71875%209.21875%209.53125%209.5625%209.5H10.6875C11.0312%209.53125%2011.2188%209.71875%2011.25%2010.0625V11.1875C11.2188%2011.5312%2011.0312%2011.7188%2010.6875%2011.75H9.5625C9.21875%2011.7188%209.03125%2011.5312%209%2011.1875ZM9.75%2011H10.5V10.25H9.75V11ZM3.5625%206.5H4.6875C5.03125%206.53125%205.21875%206.71875%205.25%207.0625V8.1875C5.21875%208.53125%205.03125%208.71875%204.6875%208.75H3.5625C3.21875%208.71875%203.03125%208.53125%203%208.1875V7.0625C3.03125%206.71875%203.21875%206.53125%203.5625%206.5ZM3.75%208H4.5V7.25H3.75V8ZM9%204.0625C9.03125%203.71875%209.21875%203.53125%209.5625%203.5H10.6875C11.0312%203.53125%2011.2188%203.71875%2011.25%204.0625V5.1875C11.2188%205.53125%2011.0312%205.71875%2010.6875%205.75H9.5625C9.21875%205.71875%209.03125%205.53125%209%205.1875V4.0625ZM9.75%204.25V5H10.5V4.25H9.75ZM9.5625%208.75C9.21875%208.71875%209.03125%208.53125%209%208.1875V7.0625C9.03125%206.71875%209.21875%206.53125%209.5625%206.5H10.6875C11.0312%206.53125%2011.2188%206.71875%2011.25%207.0625V8.1875C11.2188%208.53125%2011.0312%208.71875%2010.6875%208.75H9.5625ZM9.75%207.25V8H10.5V7.25H9.75Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-963")}
                tag="div"
              >
                <Text content="Department" color="neutral" />
                <Text content={textDepartment} />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-952")}
            data-w-id="1f7bd557-bd85-a840-c8cf-c75741d550eb"
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-951")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons", "mt-2")}
                value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.5%202.75C7.09375%202.75%206.71875%202.85156%206.375%203.05469C6.03125%203.25781%205.75781%203.53125%205.55469%203.875C5.35156%204.23438%205.25%204.60938%205.25%205C5.25%205.39062%205.35156%205.76562%205.55469%206.125C5.75781%206.46875%206.03125%206.74219%206.375%206.94531C6.71875%207.14844%207.09375%207.25%207.5%207.25C7.90625%207.25%208.28125%207.14844%208.625%206.94531C8.96875%206.74219%209.24219%206.46875%209.44531%206.125C9.64844%205.76562%209.75%205.39062%209.75%205C9.75%204.60938%209.64844%204.23438%209.44531%203.875C9.24219%203.53125%208.96875%203.25781%208.625%203.05469C8.28125%202.85156%207.90625%202.75%207.5%202.75ZM4.5%205C4.5%204.45312%204.63281%203.95312%204.89844%203.5C5.16406%203.04688%205.53125%202.67969%206%202.39844C6.46875%202.13281%206.96875%202%207.5%202C8.03125%202%208.53125%202.13281%209%202.39844C9.46875%202.67969%209.83594%203.04688%2010.1016%203.5C10.3672%203.95312%2010.5%204.45312%2010.5%205C10.5%205.54688%2010.3672%206.04688%2010.1016%206.5C9.83594%206.95312%209.46875%207.32031%209%207.60156C8.53125%207.86719%208.03125%208%207.5%208C6.96875%208%206.46875%207.86719%206%207.60156C5.53125%207.32031%205.16406%206.95312%204.89844%206.5C4.63281%206.04688%204.5%205.54688%204.5%205ZM6.75%209.125H7.5H8.25C8.48438%209.14062%208.60938%209.26562%208.625%209.5C8.60938%209.73438%208.48438%209.85938%208.25%209.875H8.01562L8.53125%2011.3984L9.28125%209.75781C9.35938%209.60156%209.48438%209.53906%209.65625%209.57031C10.5625%209.74219%2011.2969%2010.1719%2011.8594%2010.8594C12.4375%2011.5312%2012.7344%2012.3359%2012.75%2013.2734C12.75%2013.4766%2012.6797%2013.6484%2012.5391%2013.7891C12.3984%2013.9297%2012.2266%2014%2012.0234%2014H2.97656C2.77344%2014%202.60156%2013.9297%202.46094%2013.7891C2.32031%2013.6484%202.25%2013.4766%202.25%2013.2734C2.26562%2012.3359%202.5625%2011.5312%203.14062%2010.8594C3.70312%2010.1719%204.4375%209.74219%205.34375%209.57031C5.51562%209.53906%205.64062%209.60938%205.71875%209.78125L6.46875%2011.3984L6.98438%209.875H6.75C6.51562%209.85938%206.39062%209.73438%206.375%209.5C6.39062%209.26562%206.51562%209.14062%206.75%209.125ZM7.17188%2012.8984C7.25%2013.0391%207.35938%2013.1094%207.5%2013.1094C7.65625%2013.1094%207.77344%2013.0391%207.85156%2012.8984L8.0625%2012.3828L7.5%2010.6953L6.9375%2012.3828L7.17188%2012.8984ZM6.46875%2013.2031L5.17969%2010.3672C4.53906%2010.5703%204.02344%2010.9297%203.63281%2011.4453C3.22656%2011.9609%203.01562%2012.5625%203%2013.25H6.49219C6.49219%2013.2344%206.49219%2013.2266%206.49219%2013.2266C6.49219%2013.2109%206.48438%2013.2031%206.46875%2013.2031ZM12%2013.25C11.9844%2012.5625%2011.7734%2011.9609%2011.3672%2011.4453C10.9766%2010.9297%2010.4609%2010.5703%209.82031%2010.3672L8.53125%2013.2031C8.51562%2013.2031%208.50781%2013.2109%208.50781%2013.2266C8.50781%2013.2266%208.50781%2013.2344%208.50781%2013.25H12Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-963")}
                tag="div"
              >
                <Text content="Role" color="neutral" />
                <Text content={textRole} />
              </_Builtin.Block>
            </_Builtin.Block>
            {isRoleLinkVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "role-link")}
                tag="div"
                {...onClickRole}
              >
                <GlobalIcon iconName="open_in_new" />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          {isManagerVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-952")}
              data-w-id="0718da14-a9e2-2ef5-312e-a7dd0ed523d4"
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-951")}
                tag="div"
              >
                <GlobalIcon iconName="shield_person" size="3" color="neutral" />
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-963")}
                  tag="div"
                >
                  <Text content="Manager" color="neutral" />
                  <Text content={textManager} />
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "role-link")}
                tag="div"
                {...onClickManagerLink}
              >
                <GlobalIcon iconName="open_in_new" />
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
