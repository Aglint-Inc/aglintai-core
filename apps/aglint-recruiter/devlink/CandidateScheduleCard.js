"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { SelectButton } from "./SelectButton";
import { ChangeButton } from "./ChangeButton";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./CandidateScheduleCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateScheduleCard({
  as: _Component = _Builtin.Block,
  textPopupTitle = "Phase 1 Interview for software engineer",
  onClickClose = {},
  isPopup = false,
  textDay = "Day2",
  slotSessionInfo,
  isSelected = true,
  onClickCard = {},
  isTitle = true,
  textDuration = "2 hour 45 Minutes",
  slotButton,
  isSlotButtonVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "candidate-schedule-card-wrap")}
      tag="div"
    >
      {isTitle ? (
        <_Builtin.Block className={_utils.cx(_styles, "day_row")} tag="div">
          <Text content={textDay} weight="medium" color="accent" />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "duration_row")} tag="div">
        <Text content="Total Duration" color="neutral" />
        <_Builtin.Block
          className={_utils.cx(_styles, "flex-horizontal", "center", "gap-2")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%200C7.125%200.015625%208.13281%200.289062%209.02344%200.820312C9.92969%201.35156%2010.6484%202.07031%2011.1797%202.97656C11.7109%203.86719%2011.9844%204.875%2012%206C11.9844%207.125%2011.7109%208.13281%2011.1797%209.02344C10.6484%209.92969%209.92969%2010.6484%209.02344%2011.1797C8.13281%2011.7109%207.125%2011.9844%206%2012C4.875%2011.9844%203.86719%2011.7109%202.97656%2011.1797C2.07031%2010.6484%201.35156%209.92969%200.820312%209.02344C0.289062%208.13281%200.015625%207.125%200%206C0%205.15625%200.164062%204.36719%200.492188%203.63281C0.804688%202.89844%201.24219%202.25781%201.80469%201.71094C1.96094%201.57031%202.14062%201.5%202.34375%201.5C2.53125%201.5%202.70312%201.57812%202.85938%201.73438C3%201.89063%203.07031%202.0625%203.07031%202.25C3.07031%202.45313%203%202.63281%202.85938%202.78906C1.98438%203.63281%201.53125%204.70312%201.5%206C1.53125%207.28125%201.96875%208.34375%202.8125%209.1875C3.65625%2010.0312%204.71875%2010.4688%206%2010.5C7.28125%2010.4688%208.34375%2010.0312%209.1875%209.1875C10.0312%208.34375%2010.4688%207.28125%2010.5%206C10.4844%204.85938%2010.125%203.88281%209.42188%203.07031C8.73438%202.27344%207.84375%201.77344%206.75%201.57031V2.25C6.75%202.46875%206.67969%202.64844%206.53906%202.78906C6.39844%202.92969%206.21875%203%206%203C5.78125%203%205.60156%202.92969%205.46094%202.78906C5.32031%202.64844%205.25%202.46875%205.25%202.25V0.75C5.25%200.53125%205.32031%200.351562%205.46094%200.210938C5.60156%200.0703125%205.78125%200%206%200ZM4.52344%203.72656L6.39844%205.60156C6.61719%205.86719%206.61719%206.13281%206.39844%206.39844C6.13281%206.61719%205.86719%206.61719%205.60156%206.39844L3.72656%204.52344C3.50781%204.25781%203.50781%203.99219%203.72656%203.72656C3.99219%203.50781%204.25781%203.50781%204.52344%203.72656Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <Text content={textDuration} />
        </_Builtin.Block>
      </_Builtin.Block>
      {isSlotButtonVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "default_stage", "corner")}
          tag="div"
        >
          {slotButton ?? <SelectButton />}
        </_Builtin.Block>
      ) : null}
      {isSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "selected_stage")}
          tag="div"
        >
          {slotButton ?? <ChangeButton />}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "slot_selected")} tag="div">
        {slotSessionInfo ?? (
          <>
            <SlotComp componentName="SessionInfo" />
            <SlotComp componentName="SessionInfo" />
            <SlotComp componentName="SessionInfo" />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
