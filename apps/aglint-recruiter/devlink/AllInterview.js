"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./AllInterview.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AllInterview({ as: _Component = _Builtin.Block }) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "all-interview-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "all-interview-sub-head")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-828")}
          tag="div"
        >
          <_Builtin.Block tag="div" />
          <_Builtin.Block
            className={_utils.cx(_styles, "schedul-type")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3%202.375V2.77344L12.3984%206.00781C12.6172%206.10156%2012.7344%206.26562%2012.75%206.5C12.7344%206.73438%2012.6172%206.89844%2012.3984%206.99219L3%2010.2266V13.625C2.98438%2013.8594%202.85938%2013.9844%202.625%2014C2.39062%2013.9844%202.26562%2013.8594%202.25%2013.625V10.25V9.5V3.5V2.75V2.375C2.26562%202.14062%202.39062%202.01563%202.625%202C2.85938%202.01563%202.98438%202.14062%203%202.375ZM3%203.57031V9.42969L11.5312%206.5L3%203.57031Z%22%20fill%3D%22%230F3554%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"Schedule Type"}</_Builtin.Block>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.75781%2011.2578C7.58594%2011.4141%207.41406%2011.4141%207.24219%2011.2578L2.74219%206.75781C2.58594%206.58594%202.58594%206.41406%202.74219%206.24219C2.91406%206.08594%203.08594%206.08594%203.25781%206.24219L7.5%2010.4609L11.7422%206.24219C11.9141%206.08594%2012.0859%206.08594%2012.2578%206.24219C12.4141%206.41406%2012.4141%206.58594%2012.2578%206.75781L7.75781%2011.2578Z%22%20fill%3D%22%230F3554%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "schedul-type")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.15625%207.4375C1.98438%207.4375%201.84375%207.375%201.73438%207.25C1.625%207.14062%201.58594%207%201.61719%206.82812C1.77344%206.03125%202.07031%205.3125%202.50781%204.67188C2.60156%204.53125%202.72656%204.46094%202.88281%204.46094C3.03906%204.44531%203.1875%204.5%203.32812%204.625C3.51562%204.85938%203.53125%205.11719%203.375%205.39844C3.07812%205.86719%202.86719%206.38281%202.74219%206.94531C2.64844%207.24219%202.45312%207.40625%202.15625%207.4375ZM4.89844%203.875C4.61719%204.03125%204.35938%204.01562%204.125%203.82812C4%203.70313%203.94531%203.55469%203.96094%203.38281C3.96094%203.22656%204.03125%203.10156%204.17188%203.00781C4.8125%202.57031%205.53125%202.27344%206.32812%202.11719C6.5%202.08594%206.64062%202.125%206.75%202.23438C6.875%202.34375%206.9375%202.48438%206.9375%202.65625C6.90625%202.96875%206.74219%203.16406%206.44531%203.24219C5.88281%203.36719%205.36719%203.57812%204.89844%203.875ZM8.0625%2013.3438C8.09375%2013.0312%208.25781%2012.8359%208.55469%2012.7578C9.11719%2012.6328%209.64062%2012.4219%2010.125%2012.125C10.3906%2011.9688%2010.6406%2011.9844%2010.875%2012.1719C11%2012.3125%2011.0547%2012.4609%2011.0391%2012.6172C11.0391%2012.7734%2010.9688%2012.8984%2010.8281%2012.9922C10.1875%2013.4297%209.46875%2013.7266%208.67188%2013.8828C8.5%2013.9141%208.35938%2013.875%208.25%2013.7656C8.125%2013.6562%208.0625%2013.5156%208.0625%2013.3438ZM11.625%2010.625C11.9219%2010.1406%2012.1328%209.61719%2012.2578%209.05469C12.3359%208.75781%2012.5312%208.59375%2012.8438%208.5625C13.0156%208.5625%2013.1562%208.625%2013.2656%208.75C13.375%208.85938%2013.4141%209%2013.3828%209.17188C13.2266%209.96875%2012.9297%2010.6875%2012.4922%2011.3281C12.3984%2011.4688%2012.2734%2011.5391%2012.1172%2011.5391C11.9453%2011.5547%2011.7969%2011.5%2011.6719%2011.375C11.4688%2011.1406%2011.4531%2010.8906%2011.625%2010.625ZM4.125%2012.1719C4.35938%2011.9688%204.61719%2011.9531%204.89844%2012.125C5.36719%2012.4219%205.88281%2012.6328%206.44531%2012.7578C6.74219%2012.8359%206.90625%2013.0312%206.9375%2013.3438C6.9375%2013.5156%206.875%2013.6562%206.75%2013.7656C6.64062%2013.875%206.5%2013.9141%206.32812%2013.8828C5.53125%2013.7266%204.8125%2013.4297%204.17188%2012.9922C4.03125%2012.8984%203.96094%2012.7656%203.96094%2012.5938C3.94531%2012.4375%204%2012.2969%204.125%2012.1719ZM2.50781%2011.3281C2.07031%2010.6875%201.77344%209.96875%201.61719%209.17188C1.58594%209%201.625%208.85938%201.73438%208.75C1.84375%208.625%201.98438%208.5625%202.15625%208.5625C2.46875%208.59375%202.66406%208.75781%202.74219%209.05469C2.86719%209.61719%203.07812%2010.1406%203.375%2010.625C3.53125%2010.8906%203.51562%2011.1406%203.32812%2011.375C3.20312%2011.5%203.05469%2011.5547%202.88281%2011.5391C2.72656%2011.5391%202.60156%2011.4688%202.50781%2011.3281ZM10.875%203.82812C10.6406%204.03125%2010.3906%204.04688%2010.125%203.875C9.64062%203.57812%209.11719%203.36719%208.55469%203.24219C8.25781%203.16406%208.09375%202.96875%208.0625%202.65625C8.0625%202.48438%208.125%202.34375%208.25%202.23438C8.35938%202.125%208.5%202.08594%208.67188%202.11719C9.46875%202.27344%2010.1875%202.57031%2010.8281%203.00781C10.9688%203.10156%2011.0391%203.22656%2011.0391%203.38281C11.0547%203.55469%2011%203.70313%2010.875%203.82812ZM11.625%205.375C11.4688%205.10938%2011.4844%204.85156%2011.6719%204.60156C11.7969%204.49219%2011.9453%204.44531%2012.1172%204.46094C12.2734%204.46094%2012.3984%204.53125%2012.4922%204.67188C12.9297%205.3125%2013.2266%206.03125%2013.3828%206.82812C13.4141%206.98438%2013.375%207.125%2013.2656%207.25C13.1562%207.375%2013.0156%207.4375%2012.8438%207.4375C12.5312%207.40625%2012.3359%207.24219%2012.2578%206.94531C12.1328%206.38281%2011.9219%205.85938%2011.625%205.375Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"Status"}</_Builtin.Block>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.75781%2011.2578C7.58594%2011.4141%207.41406%2011.4141%207.24219%2011.2578L2.74219%206.75781C2.58594%206.58594%202.58594%206.41406%202.74219%206.24219C2.91406%206.08594%203.08594%206.08594%203.25781%206.24219L7.5%2010.4609L11.7422%206.24219C11.9141%206.08594%2012.0859%206.08594%2012.2578%206.24219C12.4141%206.41406%2012.4141%206.58594%2012.2578%206.75781L7.75781%2011.2578Z%22%20fill%3D%22%230F3554%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-829")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.0625%203.6875V7.4375H11.8125C12.1562%207.46875%2012.3438%207.65625%2012.375%208C12.3438%208.34375%2012.1562%208.53125%2011.8125%208.5625H8.0625V12.3125C8.03125%2012.6562%207.84375%2012.8438%207.5%2012.875C7.15625%2012.8438%206.96875%2012.6562%206.9375%2012.3125V8.5625H3.1875C2.84375%208.53125%202.65625%208.34375%202.625%208C2.65625%207.65625%202.84375%207.46875%203.1875%207.4375H6.9375V3.6875C6.96875%203.34375%207.15625%203.15625%207.5%203.125C7.84375%203.15625%208.03125%203.34375%208.0625%203.6875Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-blue-500")}
              tag="div"
            >
              {"Add filter"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-830")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Sort By"}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "schedul-type")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.875%202C5.10938%202.01563%205.23438%202.14062%205.25%202.375V3.5H9.75V2.375C9.76562%202.14062%209.89062%202.01563%2010.125%202C10.3594%202.01563%2010.4844%202.14062%2010.5%202.375V3.5H11.25C11.6719%203.51563%2012.0234%203.66406%2012.3047%203.94531C12.5859%204.22656%2012.7344%204.57812%2012.75%205V5.75V6.5V12.5C12.7344%2012.9219%2012.5859%2013.2734%2012.3047%2013.5547C12.0234%2013.8359%2011.6719%2013.9844%2011.25%2014H3.75C3.32812%2013.9844%202.97656%2013.8359%202.69531%2013.5547C2.41406%2013.2734%202.26562%2012.9219%202.25%2012.5V6.5V5.75V5C2.26562%204.57812%202.41406%204.22656%202.69531%203.94531C2.97656%203.66406%203.32812%203.51563%203.75%203.5H4.5V2.375C4.51562%202.14062%204.64062%202.01563%204.875%202ZM12%206.5H9.5625V8.1875H12V6.5ZM12%208.9375H9.5625V10.8125H12V8.9375ZM12%2011.5625H9.5625V13.25H11.25C11.4688%2013.25%2011.6484%2013.1797%2011.7891%2013.0391C11.9297%2012.8984%2012%2012.7188%2012%2012.5V11.5625ZM8.8125%2010.8125V8.9375H6.1875V10.8125H8.8125ZM6.1875%2011.5625V13.25H8.8125V11.5625H6.1875ZM5.4375%2010.8125V8.9375H3V10.8125H5.4375ZM3%2011.5625V12.5C3%2012.7188%203.07031%2012.8984%203.21094%2013.0391C3.35156%2013.1797%203.53125%2013.25%203.75%2013.25H5.4375V11.5625H3ZM3%208.1875H5.4375V6.5H3V8.1875ZM6.1875%208.1875H8.8125V6.5H6.1875V8.1875ZM11.25%204.25H3.75C3.53125%204.25%203.35156%204.32031%203.21094%204.46094C3.07031%204.60156%203%204.78125%203%205V5.75H12V5C12%204.78125%2011.9297%204.60156%2011.7891%204.46094C11.6484%204.32031%2011.4688%204.25%2011.25%204.25Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"Schedule Type"}</_Builtin.Block>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewbox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.00781%202.86719L6.25781%205.11719C6.41406%205.28906%206.41406%205.46094%206.25781%205.63281C6.08594%205.78906%205.91406%205.78906%205.74219%205.63281L4.125%204.03906V12.875C4.10938%2013.1094%203.98438%2013.2344%203.75%2013.25C3.51562%2013.2344%203.39062%2013.1094%203.375%2012.875V4.03906L1.75781%205.63281C1.58594%205.78906%201.41406%205.78906%201.24219%205.63281C1.08594%205.46094%201.08594%205.28906%201.24219%205.11719L3.49219%202.86719C3.66406%202.71094%203.83594%202.71094%204.00781%202.86719ZM7.875%203.125H9.375C9.60938%203.14063%209.73438%203.26562%209.75%203.5C9.73438%203.73438%209.60938%203.85937%209.375%203.875H7.875C7.64062%203.85937%207.51562%203.73438%207.5%203.5C7.51562%203.26562%207.64062%203.14063%207.875%203.125ZM7.875%206.125H10.875C11.1094%206.14062%2011.2344%206.26562%2011.25%206.5C11.2344%206.73438%2011.1094%206.85938%2010.875%206.875H7.875C7.64062%206.85938%207.51562%206.73438%207.5%206.5C7.51562%206.26562%207.64062%206.14062%207.875%206.125ZM7.875%209.125H12.375C12.6094%209.14062%2012.7344%209.26562%2012.75%209.5C12.7344%209.73438%2012.6094%209.85938%2012.375%209.875H7.875C7.64062%209.85938%207.51562%209.73438%207.5%209.5C7.51562%209.26562%207.64062%209.14062%207.875%209.125ZM7.875%2012.125H13.875C14.1094%2012.1406%2014.2344%2012.2656%2014.25%2012.5C14.2344%2012.7344%2014.1094%2012.8594%2013.875%2012.875H7.875C7.64062%2012.8594%207.51562%2012.7344%207.5%2012.5C7.51562%2012.2656%207.64062%2012.1406%207.875%2012.125Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "all-interview-table")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-832")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-831", "width-217")}
            tag="div"
          >
            <Text weight="medium" content="" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-831", "width-217")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Status"}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-831", "width-217")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Schedule Type"}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-831", "width-138")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Duration"}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-831", "width-300")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Interview Panel"}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-831", "width-300")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Related Job"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-836")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-835")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-833", "width-217")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-834")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "fw-semibold")}
                tag="div"
              >
                {"Westly Snedger"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-833", "width-217")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-837")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Pending"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-833", "width-217")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-839")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-838")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.375%204.5C9.34375%203.54687%209.01562%202.75%208.39062%202.10938C7.75%201.48437%206.95312%201.15625%206%201.125C5.04688%201.15625%204.25%201.48437%203.60938%202.10938C2.98438%202.75%202.65625%203.54687%202.625%204.5C2.625%204.79688%202.74219%205.24219%202.97656%205.83594C3.24219%206.42969%203.57812%207.05469%203.98438%207.71094C4.32812%208.25781%204.67188%208.78125%205.01562%209.28125C5.375%209.78125%205.70312%2010.2188%206%2010.5938C6.29688%2010.2188%206.625%209.78125%206.98438%209.28125C7.34375%208.78125%207.6875%208.25781%208.01562%207.71094C8.42188%207.05469%208.75781%206.42969%209.02344%205.83594C9.25781%205.24219%209.375%204.79688%209.375%204.5ZM10.5%204.5C10.4688%205.20312%2010.2188%206.01562%209.75%206.9375C9.26562%207.85938%208.71875%208.75%208.10938%209.60938C7.5%2010.4844%206.98438%2011.1797%206.5625%2011.6953C6.40625%2011.8828%206.21875%2011.9766%206%2011.9766C5.78125%2011.9766%205.59375%2011.8828%205.4375%2011.6953C5.01562%2011.1797%204.5%2010.4844%203.89062%209.60938C3.28125%208.75%202.73438%207.85938%202.25%206.9375C1.78125%206.01562%201.53125%205.20312%201.5%204.5C1.53125%203.21875%201.96875%202.15625%202.8125%201.3125C3.65625%200.46875%204.71875%200.03125%206%200C7.28125%200.03125%208.34375%200.46875%209.1875%201.3125C10.0312%202.15625%2010.4688%203.21875%2010.5%204.5ZM6.75%204.5C6.75%204.28125%206.67969%204.10156%206.53906%203.96094C6.39844%203.82031%206.21875%203.75%206%203.75C5.78125%203.75%205.60156%203.82031%205.46094%203.96094C5.32031%204.10156%205.25%204.28125%205.25%204.5C5.25%204.71875%205.32031%204.89844%205.46094%205.03906C5.60156%205.17969%205.78125%205.25%206%205.25C6.21875%205.25%206.39844%205.17969%206.53906%205.03906C6.67969%204.89844%206.75%204.71875%206.75%204.5ZM4.125%204.5C4.14062%203.79688%204.45312%203.25781%205.0625%202.88281C5.6875%202.53906%206.3125%202.53906%206.9375%202.88281C7.54688%203.25781%207.85938%203.79688%207.875%204.5C7.85938%205.20312%207.54688%205.74219%206.9375%206.11719C6.3125%206.46094%205.6875%206.46094%205.0625%206.11719C4.45312%205.74219%204.14062%205.20312%204.125%204.5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block tag="div">
                    {"In Person Meeting"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-sm", "text-grey-600")}
                  tag="div"
                >
                  {"2024 Feb 20 at 09:30 AM"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-833", "width-138")}
              tag="div"
            >
              <_Builtin.Block tag="div">{"1 hour"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-833", "width-300")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-840")}
                tag="div"
              >
                <_Builtin.Block tag="div" />
                <_Builtin.Block tag="div">
                  {"This is some text inside of a div block."}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-833", "width-300")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-840")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Product Designer"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A.all-interview-table%7B%0Aheight%3Acalc(100vh%20-%2060px)%3B%0A%7D%0A%3C%2Fstyle%3E" />
    </_Component>
  );
}
