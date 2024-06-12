"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { ButtonSolid } from "./ButtonSolid";
import { GlobalIcon } from "./GlobalIcon";
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
              <GlobalIcon iconName="weekend" size="5" weight="thin" />
              <_Builtin.Block tag="div">{"Day Off"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1686")}
              tag="div"
            >
              <GlobalIcon iconName="calendar_today" size="5" weight="thin" />
              <_Builtin.Block tag="div">{"Date"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1686")}
              tag="div"
            >
              <GlobalIcon iconName="pin_drop" size="5" weight="thin" />
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
