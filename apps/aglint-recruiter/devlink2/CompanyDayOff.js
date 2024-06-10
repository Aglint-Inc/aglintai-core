"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { ButtonSolid } from "./ButtonSolid";
import { DayoffList } from "./DayoffList";
import * as _utils from "./utils";
import _styles from "./CompanyDayOff.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-157":{"id":"e-157","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-102","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-158"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282313},"e-158":{"id":"e-158","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-103","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-157"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c4667897-cb8f-9265-5bac-ed224495c8eb","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1715600282314}},"actionLists":{"a-102":{"id":"a-102","title":"DayoffList Hover in","actionItemGroups":[{"actionItems":[{"id":"a-102-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-102-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]},{"actionItems":[{"id":"a-102-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":1,"unit":""}},{"id":"a-102-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1715600286589},"a-103":{"id":"a-103","title":"DayoffList Hover out","actionItemGroups":[{"actionItems":[{"id":"a-103-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":0,"unit":""}},{"id":"a-103-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.cursor-pointer","selectorGuids":["5c1ff90f-c25e-3e90-5136-413a42443347","8e4a5d52-1f4a-3e53-b493-ac8867e2388c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1715600286589}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CompanyDayOff({
  as: _Component = _Builtin.Block,
  slotDayOff,
  onClickAddDate = {},
  slotDayoffList,
  onClickImport = {},
  onClickAddDayoff = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "cdo-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "setting_wrap", "p-b-40")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cdo-top-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "setting_title")}
            tag="div"
          >
            <Text content="Standard Days Off" color="neutral-12" />
            <Text
              content="List company holidays to exclude them from scheduling."
              weight=""
              color="neutral"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1683")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1679", "small", "hide")}
              tag="div"
              {...onClickImport}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.25%2010.5V4.5H8.625C8.3125%204.48438%208.04688%204.375%207.82812%204.17188C7.625%203.95313%207.51562%203.6875%207.5%203.375V0.75H4.5C4.28125%200.75%204.10156%200.820312%203.96094%200.960938C3.82031%201.10156%203.75%201.28125%203.75%201.5V6H3V1.5C3.01562%201.07812%203.16406%200.726562%203.44531%200.445312C3.72656%200.164062%204.07812%200.015625%204.5%200H8.15625C8.46875%200%208.73438%200.109375%208.95312%200.328125L11.6719%203.04688C11.8906%203.26562%2012%203.53125%2012%203.84375V10.5C11.9844%2010.9219%2011.8359%2011.2734%2011.5547%2011.5547C11.2734%2011.8359%2010.9219%2011.9844%2010.5%2012H4.5C4.07812%2011.9844%203.72656%2011.8359%203.44531%2011.5547C3.16406%2011.2734%203.01562%2010.9219%203%2010.5V8.625H3.75V10.5C3.75%2010.7188%203.82031%2010.8984%203.96094%2011.0391C4.10156%2011.1797%204.28125%2011.25%204.5%2011.25H10.5C10.7188%2011.25%2010.8984%2011.1797%2011.0391%2011.0391C11.1797%2010.8984%2011.25%2010.7188%2011.25%2010.5ZM11.25%203.75C11.2188%203.6875%2011.1797%203.63281%2011.1328%203.58594L8.41406%200.867188C8.36719%200.820312%208.3125%200.789063%208.25%200.773438V3.375C8.26562%203.60938%208.39062%203.73437%208.625%203.75H11.25ZM6.63281%204.99219L8.88281%207.24219C9.03906%207.41406%209.03906%207.58594%208.88281%207.75781L6.63281%2010.0078C6.46094%2010.1641%206.28906%2010.1641%206.11719%2010.0078C5.96094%209.83594%205.96094%209.66406%206.11719%209.49219L7.71094%207.875H0.375C0.140625%207.85938%200.015625%207.73438%200%207.5C0.015625%207.26562%200.140625%207.14062%200.375%207.125H7.71094L6.11719%205.50781C5.96094%205.33594%205.96094%205.16406%206.11719%204.99219C6.28906%204.83594%206.46094%204.83594%206.63281%204.99219Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"Import"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block tag="div" {...onClickAddDayoff}>
              <ButtonSolid
                size="2"
                textButton="Add day off"
                isLeftIcon={true}
                isRightIcon={false}
                iconName="add"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1684")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1685")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1686")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2222%22%20height%3D%2220%22%20viewbox%3D%220%200%2022%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.0625%207.8125C3.6875%208.58333%203.64583%209.34375%203.9375%2010.0938C4.22917%2010.8438%204.77083%2011.375%205.5625%2011.6875C6.375%2011.9583%207.13542%2011.9062%207.84375%2011.5312C8.53125%2011.1354%208.98958%2010.5208%209.21875%209.6875L9.53125%208.125L4.8125%206.40625L4.0625%207.8125ZM9.75%207.125L10.3438%204.375L6.59375%203L5.28125%205.5L9.75%207.125ZM3.1875%207.34375L5.71875%202.53125C6.01042%202.07292%206.41667%201.91667%206.9375%202.0625L10.6875%203.4375C10.8125%203.47917%2010.9167%203.53125%2011%203.59375C11.0833%203.53125%2011.1875%203.47917%2011.3125%203.4375L15.0625%202.0625C15.5833%201.91667%2015.9896%202.07292%2016.2812%202.53125L18.8125%207.34375C19.2917%208.32292%2019.3854%209.29167%2019.0938%2010.25C18.7812%2011.1875%2018.1667%2011.9167%2017.25%2012.4375L18.5625%2016.0312L20.3438%2015.4062C20.6354%2015.3229%2020.8438%2015.4167%2020.9688%2015.6875C21.0521%2015.9792%2020.9583%2016.1979%2020.6875%2016.3438L18.4375%2017.1562L16.1875%2017.9688C15.875%2018.0521%2015.6562%2017.9479%2015.5312%2017.6562C15.4479%2017.3646%2015.5521%2017.1562%2015.8438%2017.0312L17.625%2016.375L16.3125%2012.7812C15.2708%2012.9688%2014.3229%2012.8021%2013.4688%2012.2812C12.6354%2011.7396%2012.0833%2010.9479%2011.8125%209.90625L11%206.125L10.1875%209.90625C9.91667%2010.9479%209.36458%2011.7396%208.53125%2012.2812C7.67708%2012.8229%206.72917%2012.9896%205.6875%2012.7812L4.375%2016.375L6.15625%2017.0312C6.44792%2017.1562%206.55208%2017.375%206.46875%2017.6875C6.34375%2017.9583%206.13542%2018.0521%205.84375%2017.9688L3.59375%2017.1562L1.34375%2016.3438C1.05208%2016.1979%200.947917%2015.9792%201.03125%2015.6875C1.15625%2015.4167%201.36458%2015.3229%201.65625%2015.4062L3.4375%2016.0312L4.75%2012.4375C3.83333%2011.9167%203.21875%2011.1875%202.90625%2010.25C2.61458%209.29167%202.70833%208.32292%203.1875%207.34375ZM17.9375%207.8125L17.1875%206.40625L12.4688%208.125L12.8125%209.6875C13%2010.5208%2013.4479%2011.1354%2014.1562%2011.5312C14.8646%2011.9062%2015.625%2011.9583%2016.4375%2011.6875C17.2292%2011.375%2017.7708%2010.8438%2018.0625%2010.0938C18.3542%209.34375%2018.3125%208.58333%2017.9375%207.8125ZM12.25%207.125L16.7188%205.5L15.4062%203L11.6562%204.375L12.25%207.125Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"Day Off"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1686")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.5%202C6.8125%202.02083%206.97917%202.1875%207%202.5V4H13V2.5C13.0208%202.1875%2013.1875%202.02083%2013.5%202C13.8125%202.02083%2013.9792%202.1875%2014%202.5V4H15C15.5625%204.02083%2016.0312%204.21875%2016.4062%204.59375C16.7812%204.96875%2016.9792%205.4375%2017%206V7V8V16C16.9792%2016.5625%2016.7812%2017.0312%2016.4062%2017.4062C16.0312%2017.7812%2015.5625%2017.9792%2015%2018H5C4.4375%2017.9792%203.96875%2017.7812%203.59375%2017.4062C3.21875%2017.0312%203.02083%2016.5625%203%2016V8V7V6C3.02083%205.4375%203.21875%204.96875%203.59375%204.59375C3.96875%204.21875%204.4375%204.02083%205%204H6V2.5C6.02083%202.1875%206.1875%202.02083%206.5%202ZM16%208H4V16C4%2016.2917%204.09375%2016.5312%204.28125%2016.7188C4.46875%2016.9062%204.70833%2017%205%2017H15C15.2917%2017%2015.5312%2016.9062%2015.7188%2016.7188C15.9062%2016.5312%2016%2016.2917%2016%2016V8ZM15%205H5C4.70833%205%204.46875%205.09375%204.28125%205.28125C4.09375%205.46875%204%205.70833%204%206V7H16V6C16%205.70833%2015.9062%205.46875%2015.7188%205.28125C15.5312%205.09375%2015.2917%205%2015%205Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"Date"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1686")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M15%208C14.9583%206.58333%2014.4688%205.40625%2013.5312%204.46875C12.5938%203.53125%2011.4167%203.04167%2010%203C8.58333%203.04167%207.40625%203.53125%206.46875%204.46875C5.53125%205.40625%205.04167%206.58333%205%208C5%208.5%205.17708%209.15625%205.53125%209.96875C5.88542%2010.8021%206.33333%2011.6667%206.875%2012.5625C7.41667%2013.4375%207.96875%2014.25%208.53125%2015C9.09375%2015.7708%209.58333%2016.4167%2010%2016.9375C10.4167%2016.4167%2010.9062%2015.7708%2011.4688%2015C12.0312%2014.25%2012.5833%2013.4375%2013.125%2012.5625C13.6875%2011.6667%2014.1458%2010.8021%2014.5%209.96875C14.8333%209.15625%2015%208.5%2015%208ZM16%208C15.9583%208.9375%2015.625%2010.0208%2015%2011.25C14.3542%2012.4792%2013.625%2013.6667%2012.8125%2014.8125C12%2015.9792%2011.3125%2016.9062%2010.75%2017.5938C10.5417%2017.8438%2010.2917%2017.9688%2010%2017.9688C9.70833%2017.9688%209.45833%2017.8438%209.25%2017.5938C8.6875%2016.9062%208%2015.9792%207.1875%2014.8125C6.375%2013.6667%205.64583%2012.4792%205%2011.25C4.375%2010.0208%204.04167%208.9375%204%208C4.04167%206.29167%204.625%204.875%205.75%203.75C6.875%202.625%208.29167%202.04167%2010%202C11.7083%202.04167%2013.125%202.625%2014.25%203.75C15.375%204.875%2015.9583%206.29167%2016%208ZM8.5%208C8.52083%208.5625%208.77083%209%209.25%209.3125C9.75%209.5625%2010.25%209.5625%2010.75%209.3125C11.2292%209%2011.4792%208.5625%2011.5%208C11.4792%207.4375%2011.2292%207%2010.75%206.6875C10.25%206.4375%209.75%206.4375%209.25%206.6875C8.77083%207%208.52083%207.4375%208.5%208ZM10%2010.5C9.0625%2010.4792%208.34375%2010.0625%207.84375%209.25C7.38542%208.41667%207.38542%207.58333%207.84375%206.75C8.34375%205.9375%209.0625%205.52083%2010%205.5C10.9375%205.52083%2011.6562%205.9375%2012.1562%206.75C12.6146%207.58333%2012.6146%208.41667%2012.1562%209.25C11.6562%2010.0625%2010.9375%2010.4792%2010%2010.5Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"Locations"}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1688")}
            tag="div"
          >
            {slotDayoffList ?? <DayoffList />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
