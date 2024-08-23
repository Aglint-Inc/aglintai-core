"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { IconButtonSoft } from "./IconButtonSoft";
import { AssignedNameCard } from "./AssignedNameCard";
import * as _utils from "./utils";
import _styles from "./RequestDetailRight.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-207":{"id":"e-207","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-129","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-208"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"07e93fb1-b7c3-f694-799f-a63f71a4ca7b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"07e93fb1-b7c3-f694-799f-a63f71a4ca7b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724404199670},"e-208":{"id":"e-208","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-130","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-207"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"07e93fb1-b7c3-f694-799f-a63f71a4ca7b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"07e93fb1-b7c3-f694-799f-a63f71a4ca7b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724404199672},"e-209":{"id":"e-209","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-129","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-210"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"da1d5046-9303-39c7-6f2f-687714d99622","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"da1d5046-9303-39c7-6f2f-687714d99622","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724404291416},"e-210":{"id":"e-210","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-130","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-209"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"da1d5046-9303-39c7-6f2f-687714d99622","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"da1d5046-9303-39c7-6f2f-687714d99622","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724404291417},"e-211":{"id":"e-211","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-129","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-212"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"da1d5046-9303-39c7-6f2f-687714d99627","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"da1d5046-9303-39c7-6f2f-687714d99627","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724404325297},"e-212":{"id":"e-212","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-130","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-211"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"da1d5046-9303-39c7-6f2f-687714d99627","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"da1d5046-9303-39c7-6f2f-687714d99627","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724404325347},"e-213":{"id":"e-213","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-129","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-214"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"da1d5046-9303-39c7-6f2f-687714d9962c"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724408250120},"e-214":{"id":"e-214","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-130","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-213"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"da1d5046-9303-39c7-6f2f-687714d9962c"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724408250121}},"actionLists":{"a-129":{"id":"a-129","title":"Show Edit","actionItemGroups":[{"actionItems":[{"id":"a-129-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".edit-button","selectorGuids":["870ef794-3df2-f049-e90f-ac6446409a53"]},"value":"none"}}]},{"actionItems":[{"id":"a-129-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".edit-button","selectorGuids":["870ef794-3df2-f049-e90f-ac6446409a53"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1724404238698},"a-130":{"id":"a-130","title":"Show Edit 2","actionItemGroups":[{"actionItems":[{"id":"a-130-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".edit-button","selectorGuids":["870ef794-3df2-f049-e90f-ac6446409a53"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1724404238698}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function RequestDetailRight({
  as: _Component = _Builtin.Block,
  slotPriority,
  slotRequestType,
  textDueDate = "This is a global text component",
  slotAssignedTo,
  slotCandidate,
  slotRelatedJob,
  slotStatus,
  slotRequestTypeEdit,
  slotPriorityEdit,
  slotStatusEdit,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "req-detail-right-sub-wrap")}
      tag="div"
    >
      <_Builtin.Block tag="div">
        <Text weight="medium" content="Request Details" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "req-detail-tight-list")}
        data-w-id="07e93fb1-b7c3-f694-799f-a63f71a4ca7b"
        tag="div"
      >
        <_Builtin.Block tag="div">
          <Text content="Status" />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "slot")} tag="div">
          {slotStatus}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "edit-button")} tag="div">
          {slotStatusEdit ?? <IconButtonSoft color="neutral" size="1" />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "req-detail-tight-list")}
        data-w-id="da1d5046-9303-39c7-6f2f-687714d99622"
        tag="div"
      >
        <_Builtin.Block tag="div">
          <Text content="Priority" />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "slot")} tag="div">
          {slotPriority}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "edit-button")} tag="div">
          {slotPriorityEdit ?? <IconButtonSoft color="neutral" size="1" />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "req-detail-tight-list")}
        data-w-id="da1d5046-9303-39c7-6f2f-687714d99627"
        tag="div"
      >
        <_Builtin.Block tag="div">
          <Text content="Request Type" />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "slot")} tag="div">
          {slotRequestType}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "edit-button")} tag="div">
          {slotRequestTypeEdit ?? <IconButtonSoft color="neutral" size="1" />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "req-detail-tight-list")}
        data-w-id="da1d5046-9303-39c7-6f2f-687714d9962c"
        tag="div"
      >
        <_Builtin.Block tag="div">
          <Text content="Interview Date" />
        </_Builtin.Block>
        <Text content={textDueDate} size="2" color="neutral" />
        <_Builtin.Block className={_utils.cx(_styles, "edit-button")} tag="div">
          {slotRequestTypeEdit ?? <IconButtonSoft color="neutral" size="1" />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "asigned-to-wraper")}
        tag="div"
      >
        <Text content="Assigned to" />
        <_Builtin.Block tag="div">
          {slotAssignedTo ?? <AssignedNameCard />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "asigned-to-wraper")}
        tag="div"
      >
        <Text
          content={
            <>
              {"Candidate Detail"}
              <br />
            </>
          }
        />
        <_Builtin.Block tag="div">{slotCandidate}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "asigned-to-wraper")}
        tag="div"
      >
        <Text content="Job" />
        <_Builtin.Block tag="div">{slotRelatedJob}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
