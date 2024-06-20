"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./Sort.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function Sort({
  as: _Component = _Builtin.Block,
  slotSortDrop,
  onClickAscending = {},
  onClickDescending = {},
  isDescendingActive = false,
  isAscendingActive = false,
  slotButton,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "sort-wrapp")} tag="div">
      <Text content="Choose sort option" />
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-sort-drop")}
        tag="div"
      >
        {slotSortDrop}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sort-asc-wrap")}
        tag="div"
        {...onClickAscending}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons", "relative-1")}
          value="%3Csvg%20width%3D%2210%22%20height%3D%2211%22%20viewbox%3D%220%200%2010%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.14297%201.00937L8.99297%204.85937C9.1388%205.01979%209.1388%205.18021%208.99297%205.34062C8.83255%205.48646%208.67214%205.48646%208.51172%205.34062L5.25234%202.10312V10.35C5.23776%2010.5688%205.12109%2010.6854%204.90234%2010.7C4.68359%2010.6854%204.56693%2010.5688%204.55234%2010.35V2.10312L1.29297%205.34062C1.13255%205.48646%200.972135%205.48646%200.811718%205.34062C0.665885%205.18021%200.665885%205.01979%200.811718%204.85937L4.66172%201.00937C4.82214%200.863541%204.98255%200.863541%205.14297%201.00937Z%22%20fill%3D%22black%22%20style%3D%22fill%3Ablack%3Bfill%3Ablack%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block className={_utils.cx(_styles, "relative-1")} tag="div">
          <Text
            content={
              <>
                {"Ascending"}
                <br />
              </>
            }
          />
        </_Builtin.Block>
        {isAscendingActive ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "blue-bg-sort")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sort-asc-wrap", "remove-mt", "mb-10")}
        tag="div"
        {...onClickDescending}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons", "relative-1")}
          value="%3Csvg%20width%3D%2210%22%20height%3D%2211%22%20viewbox%3D%220%200%2010%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.09217%2010.1125L1.17281%206.3331C1.02408%206.17536%201.02116%206.01497%201.16406%205.85193C1.3218%205.7032%201.48219%205.70028%201.64523%205.84318L4.96292%209.02089L4.81299%200.775373C4.8236%200.556394%204.93812%200.437625%205.15657%200.419068C5.37555%200.429672%205.49432%200.544198%205.51288%200.762647L5.66281%209.00816L8.86278%205.71194C9.02052%205.56321%209.18091%205.56029%209.34396%205.70319C9.49268%205.86093%209.4956%206.02132%209.3527%206.18436L5.57334%2010.1037C5.4156%2010.2524%205.25521%2010.2554%205.09217%2010.1125Z%22%20fill%3D%22black%22%20style%3D%22fill%3Ablack%3Bfill%3Ablack%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block className={_utils.cx(_styles, "relative-1")} tag="div">
          <Text
            content={
              <>
                {"Descending"}
                <br />
              </>
            }
          />
        </_Builtin.Block>
        {isDescendingActive ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "blue-bg-sort")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "relative")} tag="div">
        {slotButton ?? <SlotComp componentName="ButtonSolid" />}
      </_Builtin.Block>
    </_Component>
  );
}
