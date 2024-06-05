"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./CompanyLocation.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1556":{"id":"e-1556","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-597","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1557"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"7f03ee71-98f6-b885-6c12-74504b4627a7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7f03ee71-98f6-b885-6c12-74504b4627a7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1716304090165},"e-1557":{"id":"e-1557","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-598","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1556"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"7f03ee71-98f6-b885-6c12-74504b4627a7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7f03ee71-98f6-b885-6c12-74504b4627a7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1716304090167}},"actionLists":{"a-597":{"id":"a-597","title":"comapny_lcation","actionItemGroups":[{"actionItems":[{"id":"a-597-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".location-delete-wrappers","selectorGuids":["9ec61334-e594-fee9-aacb-eaec52e40f69"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1716303907669},"a-598":{"id":"a-598","title":"comapny_lcation 2","actionItemGroups":[{"actionItems":[{"id":"a-598-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".location-delete-wrappers","selectorGuids":["9ec61334-e594-fee9-aacb-eaec52e40f69"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1716303907669}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CompanyLocation({
  as: _Component = _Builtin.Block,
  textLocationHeader = "San Fransisco, Californina, USA",
  onClickEdit = {},
  onClickDelete = {},
  textFullAddress = "2930 Pearl St Boulder, CO 80301, United States",
  textTimeZone = "Asia Calcutta (GMT +05:30)",
  isHeadQuaterVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "office-location-card-wrap")}
      data-w-id="7f03ee71-98f6-b885-6c12-74504b4627a7"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "flex-horizontal", "center", "gap-2")}
        tag="div"
      >
        <Text content={textLocationHeader} weight="medium" />
        {isHeadQuaterVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "success-badge")}
            tag="div"
          >
            <Text size="1" color="white" content="Headquaters" />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <Text content={textFullAddress} />
      <_Builtin.Block
        className={_utils.cx(_styles, "flex-horizontal", "center", "gap-2")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%2011.25C6.20312%2011.25%206.42969%2011.1484%206.67969%2010.9453C6.92969%2010.7422%207.1875%2010.3984%207.45312%209.91406C7.6875%209.44531%207.875%208.89062%208.01562%208.25H3.98438C4.125%208.89062%204.3125%209.44531%204.54688%209.91406C4.8125%2010.3984%205.07031%2010.7422%205.32031%2010.9453C5.57031%2011.1484%205.79688%2011.25%206%2011.25ZM3.84375%207.5H8.15625C8.21875%207.03125%208.25%206.53125%208.25%206C8.25%205.46875%208.21875%204.96875%208.15625%204.5H3.84375C3.78125%204.96875%203.75%205.46875%203.75%206C3.75%206.53125%203.78125%207.03125%203.84375%207.5ZM3.98438%203.75H8.01562C7.875%203.10938%207.6875%202.55469%207.45312%202.08594C7.1875%201.60156%206.92969%201.25781%206.67969%201.05469C6.42969%200.851562%206.20312%200.75%206%200.75C5.79688%200.75%205.57031%200.851562%205.32031%201.05469C5.07031%201.25781%204.8125%201.60156%204.54688%202.08594C4.3125%202.55469%204.125%203.10938%203.98438%203.75ZM8.90625%204.5C8.96875%204.98438%209%205.48438%209%206C9%206.51562%208.96875%207.01562%208.90625%207.5H11.0391C11.1797%207.01562%2011.25%206.51562%2011.25%206C11.25%205.48438%2011.1797%204.98438%2011.0391%204.5H8.90625ZM10.7578%203.75C10.4453%203.10938%2010.0234%202.55469%209.49219%202.08594C8.96094%201.61719%208.35938%201.26562%207.6875%201.03125C8.1875%201.70313%208.55469%202.60937%208.78906%203.75H10.7578ZM3.21094%203.75C3.44531%202.60937%203.82031%201.70313%204.33594%201.03125C3.64844%201.26562%203.03906%201.61719%202.50781%202.08594C1.97656%202.55469%201.5625%203.10938%201.26562%203.75H3.21094ZM0.960938%204.5C0.820312%204.98438%200.75%205.48438%200.75%206C0.75%206.51562%200.820312%207.01562%200.960938%207.5H3.09375C3.03125%207.01562%203%206.51562%203%206C3%205.48438%203.03125%204.98438%203.09375%204.5H0.960938ZM7.6875%2010.9688C8.35938%2010.7344%208.96094%2010.3828%209.49219%209.91406C10.0234%209.44531%2010.4375%208.89062%2010.7344%208.25H8.78906C8.55469%209.39062%208.1875%2010.2969%207.6875%2010.9688ZM4.33594%2010.9688C3.82031%2010.2969%203.44531%209.39062%203.21094%208.25H1.26562C1.5625%208.89062%201.97656%209.44531%202.50781%209.91406C3.03906%2010.3828%203.64844%2010.7344%204.33594%2010.9688ZM6%2012C4.90625%2011.9844%203.90625%2011.7188%203%2011.2031C2.09375%2010.6719%201.35938%209.9375%200.796875%209C0.265625%208.04688%200%207.04688%200%206C0%204.95312%200.265625%203.95313%200.796875%203C1.35938%202.0625%202.09375%201.32813%203%200.796875C3.90625%200.28125%204.90625%200.015625%206%200C7.09375%200.015625%208.09375%200.28125%209%200.796875C9.90625%201.32813%2010.6406%202.0625%2011.2031%203C11.7344%203.95313%2012%204.95312%2012%206C12%207.04688%2011.7344%208.04688%2011.2031%209C10.6406%209.9375%209.90625%2010.6719%209%2011.2031C8.09375%2011.7188%207.09375%2011.9844%206%2012Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <Text content={textTimeZone} />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "location-delete-wrappers")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons", "curser-hover-pointer")}
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0%209.44681V11.4894C0%2011.7714%200.228621%2012%200.510638%2012H2.55319C2.68862%2012%202.8185%2011.9462%202.91427%2011.8504L10.063%204.70172C10.0631%204.70157%2010.0633%204.70143%2010.0634%204.70128L11.6972%203.06746C12.1009%202.66379%2012.1009%202.03409%2011.6972%201.63041L10.3696%200.302754C9.96591%20-0.100918%209.33621%20-0.100918%208.93254%200.302754L0.149562%209.08573C0.0537992%209.1815%200%209.31138%200%209.44681ZM9.70213%203.61827L10.9715%202.34894L9.65106%201.02853L8.38173%202.29787L9.70213%203.61827ZM7.65957%203.02002L1.02128%209.65832V10.9787H2.34168L8.97998%204.34043L7.65957%203.02002Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          {...onClickEdit}
        />
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons", "curser-hover-pointer")}
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4%202V1C4%200.423858%204.42386%200%205%200H7C7.57614%200%208%200.423858%208%201V2H10C10.2761%202%2010.5%202.22386%2010.5%202.5C10.5%202.77614%2010.2761%203%2010%203H7.5H4.5H2C1.72386%203%201.5%202.77614%201.5%202.5C1.5%202.22386%201.72386%202%202%202H4ZM7%202V1H5V2H7ZM5%209.5C5%209.77614%204.77614%2010%204.5%2010C4.22386%2010%204%209.77614%204%209.5V5C4%204.72386%204.22386%204.5%204.5%204.5C4.77614%204.5%205%204.72386%205%205V9.5ZM8%209.5C8%209.77614%207.77614%2010%207.5%2010C7.22386%2010%207%209.77614%207%209.5V5C7%204.72386%207.22386%204.5%207.5%204.5C7.77614%204.5%208%204.72386%208%205V9.5ZM2%204.5C2%204.22386%202.22386%204%202.5%204C2.77614%204%203%204.22386%203%204.5V11H9V4.5C9%204.22386%209.22386%204%209.5%204C9.77614%204%2010%204.22386%2010%204.5V11C10%2011.5761%209.57614%2012%209%2012H3C2.42386%2012%202%2011.5761%202%2011V4.5Z%22%20fill%3D%22%23E35B66%22%2F%3E%0A%3C%2Fsvg%3E"
          {...onClickDelete}
        />
      </_Builtin.Block>
    </_Component>
  );
}
