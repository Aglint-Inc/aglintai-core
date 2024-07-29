"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { SavedList } from "./SavedList";
import * as _utils from "./utils";
import _styles from "./SavedListMenu.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SavedListMenu({
  as: _Component = _Builtin.Block,
  slotSavedList,
  isInputVisible = true,
  isCreateListVisible = false,
  onClickSubmit = {},
  onClickClose = {},
  slotInput,
  onClickCreateList = {},
  slotAddButton,
  isBottomWrapVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "saved-list-menu")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "slm-item-wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "save-list-slot-item")}
          tag="div"
        >
          {slotSavedList ?? <SavedList />}
        </_Builtin.Block>
      </_Builtin.Block>
      {isInputVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "save-list-input-wrap", "plr-16")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotInput}</_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons", "cursor-pointer")}
            value="%3Csvg%20width%3D%2225%22%20height%3D%2226%22%20viewbox%3D%220%200%2025%2026%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M21.0547%206.94531C21.3151%207.23177%2021.3151%207.51823%2021.0547%207.80469L10.4297%2018.4297C10.1432%2018.6901%209.85677%2018.6901%209.57031%2018.4297L3.94531%2012.8047C3.6849%2012.5182%203.6849%2012.2318%203.94531%2011.9453C4.23177%2011.6849%204.51823%2011.6849%204.80469%2011.9453L10%2017.1016L20.1953%206.94531C20.4818%206.6849%2020.7682%206.6849%2021.0547%206.94531Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
            {...onClickSubmit}
          />
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons", "cursor-pointer")}
            value="%3Csvg%20width%3D%2225%22%20height%3D%2226%22%20viewbox%3D%220%200%2025%2026%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M17.6953%2019.0547L12.5%2013.8984L7.34375%2019.0547C7.03125%2019.2891%206.73177%2019.2891%206.44531%2019.0547C6.21094%2018.7682%206.21094%2018.4818%206.44531%2018.1953L11.6016%2013L6.44531%207.84375C6.21094%207.53125%206.21094%207.23177%206.44531%206.94531C6.73177%206.71094%207.03125%206.71094%207.34375%206.94531L12.5%2012.1016L17.6953%206.94531C17.9818%206.71094%2018.2682%206.71094%2018.5547%206.94531C18.7891%207.23177%2018.7891%207.53125%2018.5547%207.84375L13.3984%2013L18.5547%2018.1953C18.7891%2018.4818%2018.7891%2018.7682%2018.5547%2019.0547C18.2682%2019.2891%2017.9818%2019.2891%2017.6953%2019.0547Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
            {...onClickClose}
          />
        </_Builtin.Block>
      ) : null}
      {isBottomWrapVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-736")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "relative")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-729", "cursor-pointer")}
              tag="div"
              {...onClickCreateList}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.5625%201.6875V5.4375H10.3125C10.6562%205.46875%2010.8438%205.65625%2010.875%206C10.8438%206.34375%2010.6562%206.53125%2010.3125%206.5625H6.5625V10.3125C6.53125%2010.6562%206.34375%2010.8438%206%2010.875C5.65625%2010.8438%205.46875%2010.6562%205.4375%2010.3125V6.5625H1.6875C1.34375%206.53125%201.15625%206.34375%201.125%206C1.15625%205.65625%201.34375%205.46875%201.6875%205.4375H5.4375V1.6875C5.46875%201.34375%205.65625%201.15625%206%201.125C6.34375%201.15625%206.53125%201.34375%206.5625%201.6875Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "text-blue-500")}
                tag="div"
              >
                {"Create new list"}
              </_Builtin.Block>
            </_Builtin.Block>
            {isCreateListVisible ? (
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "div-block-729",
                  "cursor-pointer",
                  "disable"
                )}
                tag="div"
                {...onClickCreateList}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2010%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.5625%200.6875V4.4375H9.3125C9.65625%204.46875%209.84375%204.65625%209.875%205C9.84375%205.34375%209.65625%205.53125%209.3125%205.5625H5.5625V9.3125C5.53125%209.65625%205.34375%209.84375%205%209.875C4.65625%209.84375%204.46875%209.65625%204.4375%209.3125V5.5625H0.6875C0.34375%205.53125%200.15625%205.34375%200.125%205C0.15625%204.65625%200.34375%204.46875%200.6875%204.4375H4.4375V0.6875C4.46875%200.34375%204.65625%200.15625%205%200.125C5.34375%200.15625%205.53125%200.34375%205.5625%200.6875Z%22%20fill%3D%22%23C2C8CC%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-grey-400")}
                  tag="div"
                >
                  {"Create new list"}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotAddButton}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
