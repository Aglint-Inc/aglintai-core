"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { ButtonOutlinedSmall } from "./ButtonOutlinedSmall";
import * as _utils from "./utils";
import _styles from "./AddCommandInput.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AddCommandInput({
  as: _Component = _Builtin.Block,
  onClickDelete = {},
  isDeleteVisible = true,
  onClickCancel = {},
  onClickDone = {},
  slotInputCommand,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "add-input-command")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "input-wrap-command")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.25%202.65625L12%202L12.6562%200.25C12.7188%200.0833333%2012.8333%200%2013%200C13.1667%200%2013.2812%200.0833333%2013.3438%200.25L14%202L15.7812%202.65625C15.9271%202.71875%2016%202.83333%2016%203C16%203.16667%2015.9271%203.28125%2015.7812%203.34375L14%204L13.3438%205.78125C13.2812%205.92708%2013.1667%206%2013%206C12.8333%206%2012.7188%205.92708%2012.6562%205.78125L12%204L10.25%203.34375C10.0833%203.28125%2010%203.16667%2010%203C10%202.83333%2010.0833%202.71875%2010.25%202.65625ZM6.40625%202.28125L8.0625%205.84375L11.625%207.5C11.8125%207.60417%2011.9062%207.75%2011.9062%207.9375C11.9062%208.14583%2011.8125%208.30208%2011.625%208.40625L8.0625%2010.0625L6.40625%2013.625C6.30208%2013.8125%206.15625%2013.9062%205.96875%2013.9062C5.76042%2013.9062%205.60417%2013.8125%205.5%2013.625L3.84375%2010.0625L0.28125%208.40625C0.09375%208.32292%200%208.17708%200%207.96875C0%207.76042%200.09375%207.60417%200.28125%207.5L3.84375%205.84375L5.5%202.28125C5.60417%202.09375%205.76042%202%205.96875%202C6.17708%202%206.32292%202.09375%206.40625%202.28125ZM12%2012L12.6562%2010.25C12.7188%2010.0833%2012.8333%2010%2013%2010C13.1667%2010%2013.2812%2010.0833%2013.3438%2010.25L14%2012L15.7812%2012.6562C15.9271%2012.7188%2016%2012.8333%2016%2013C16%2013.1667%2015.9271%2013.2812%2015.7812%2013.3438L14%2014L13.3438%2015.7812C13.2812%2015.9271%2013.1667%2016%2013%2016C12.8333%2016%2012.7188%2015.9271%2012.6562%2015.7812L12%2014L10.25%2013.3438C10.0833%2013.2812%2010%2013.1667%2010%2013C10%2012.8333%2010.0833%2012.7188%2010.25%2012.6562L12%2012Z%22%20fill%3D%22%2317494D%22%20style%3D%22fill%3A%2317494D%3Bfill%3Acolor(display-p3%200.0902%200.2863%200.3020)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-input-command")}
          tag="div"
        >
          {slotInputCommand}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "command-button-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-648")}
          tag="div"
        >
          {isDeleteVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "delete-icon-wrap")}
              tag="div"
              {...onClickDelete}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.92188%200.75C4.78125%200.75%204.67188%200.8125%204.59375%200.9375L4.24219%201.5H7.75781L7.40625%200.9375C7.32812%200.8125%207.21875%200.75%207.07812%200.75H4.92188ZM8.64844%201.5H9.75H10.5H10.875C11.1094%201.51563%2011.2344%201.64062%2011.25%201.875C11.2344%202.10938%2011.1094%202.23437%2010.875%202.25H10.4531L9.84375%2010.6172C9.8125%2011.0078%209.65625%2011.3359%209.375%2011.6016C9.09375%2011.8516%208.75%2011.9844%208.34375%2012H3.65625C3.25%2011.9844%202.90625%2011.8516%202.625%2011.6016C2.34375%2011.3359%202.1875%2011.0078%202.15625%2010.6172L1.54688%202.25H1.125C0.890625%202.23437%200.765625%202.10938%200.75%201.875C0.765625%201.64062%200.890625%201.51563%201.125%201.5H1.5H2.25H3.35156L3.96094%200.539062C4.19531%200.195312%204.51562%200.015625%204.92188%200H7.07812C7.48438%200.015625%207.80469%200.195312%208.03906%200.539062L8.64844%201.5ZM9.70312%202.25H2.29688L2.90625%2010.5469C2.92188%2010.75%203%2010.9141%203.14062%2011.0391C3.28125%2011.1797%203.45312%2011.25%203.65625%2011.25H8.34375C8.54688%2011.25%208.71875%2011.1797%208.85938%2011.0391C9%2010.9141%209.07812%2010.75%209.09375%2010.5469L9.70312%202.25Z%22%20fill%3D%22%23D93F4C%22%20style%3D%22fill%3A%23D93F4C%3Bfill%3Acolor(display-p3%200.8510%200.2471%200.2980)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "text-red-600")}
                tag="div"
              >
                {"Delete Command"}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-646")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "color-grey-600", "cursor-pointer")}
            tag="div"
            {...onClickCancel}
          >
            {"Cancel"}
          </_Builtin.Block>
          <_Builtin.Block tag="div" {...onClickDone}>
            <ButtonOutlinedSmall textLabel="Done" />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
