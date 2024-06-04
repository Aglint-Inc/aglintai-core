"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./MemberRow.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-81":{"id":"e-81","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-58","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-82"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1716979210746}},"actionLists":{"a-58":{"id":"a-58","title":"Req-recent-reschedule hover in","actionItemGroups":[{"actionItems":[{"id":"a-58-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":0,"unit":""}},{"id":"a-58-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae"},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-58-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":"none"}}]},{"actionItems":[{"id":"a-58-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":1,"unit":""}},{"id":"a-58-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":true,"id":"b9121ed1-beeb-6c7a-90d1-55885df7ceae"},"globalSwatchId":"","rValue":247,"bValue":251,"gValue":249,"aValue":1}},{"id":"a-58-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.text-underline.text-blue-500.view-req","selectorGuids":["8dc9ea7b-682a-9ca2-5212-49b405bc4978","3ee0110b-cb1a-ae21-d0cd-e1755ffe60cb","8f018daf-ab50-e59f-ddde-28a63babe37d","756eda23-1f35-5cde-d354-ecb6f9929139"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1716979214379}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function MemberRow({
  as: _Component = _Builtin.Block,
  isShadow = false,
  isReverseShadow = false,
  textName = "Maximillion Colbe",
  textRole = "Operations Manager",
  slotInterviewerImage,
  textTime = "11:30PM - 12:30PM PST",
  slotConflicts,
  isInterviewerTime = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "member_row")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "member_info")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "interviewer_image")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "intervoiewer_imgg")}
            tag="div"
          >
            {slotInterviewerImage ?? (
              <_Builtin.Image
                className={_utils.cx(_styles, "image_cover", "rounded")}
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d8b0e9a0e9f0451bc3536c_user2.png"
              />
            )}
          </_Builtin.Block>
          {isReverseShadow ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "isshadow")}
              value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewbox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_11163_51287)%22%3E%0A%3Crect%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%227%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.285714%22%20y%3D%220.285714%22%20width%3D%2213.4286%22%20height%3D%2213.4286%22%20rx%3D%226.71429%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.571429%22%20stroke-miterlimit%3D%221.30541%22%2F%3E%0A%3Cpath%20d%3D%22M4.63184%2010.5V3.4541H7.32227C8.67969%203.4541%209.56836%204.28418%209.56836%205.54883V5.55859C9.56836%206.53516%209.03613%207.29688%208.15234%207.5752L9.7832%2010.5H8.75293L7.24414%207.71191H5.51074V10.5H4.63184ZM5.51074%206.93066H7.24414C8.14746%206.93066%208.66016%206.44727%208.66016%205.58789V5.57812C8.66016%204.73828%208.11328%204.23535%207.20508%204.23535H5.51074V6.93066Z%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cclippath%20id%3D%22clip0_11163_51287%22%3E%0A%3Crect%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%227%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
          {isShadow ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "isshadow")}
              value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewbox%3D%220%200%2014%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_11163_51287)%22%3E%0A%3Crect%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%227%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.285714%22%20y%3D%220.285714%22%20width%3D%2213.4286%22%20height%3D%2213.4286%22%20rx%3D%226.71429%22%20stroke%3D%22%23467B7C%22%20stroke-width%3D%220.571429%22%20stroke-miterlimit%3D%221.30541%22%20stroke-dasharray%3D%221.29%201.29%22%2F%3E%0A%3Cpath%20d%3D%22M7.01953%2010.666C5.47656%2010.666%204.48047%209.85547%204.37793%208.70801L4.37305%208.6543H5.25195L5.25684%208.70801C5.32031%209.41113%206.05273%209.85547%207.06836%209.85547C8.02539%209.85547%208.72363%209.3623%208.72363%208.64453V8.63965C8.72363%208.05371%208.31836%207.65332%207.35156%207.43848L6.57031%207.26758C5.15918%206.95508%204.54883%206.30566%204.54883%205.28516V5.28027C4.55371%204.11328%205.57422%203.28809%207.0293%203.28809C8.43555%203.28809%209.41699%204.11816%209.49023%205.16797L9.49512%205.23633H8.61621L8.60645%205.17285C8.50879%204.55273%207.92285%204.09375%207.00488%204.09863C6.12598%204.10352%205.44727%204.51855%205.44727%205.25586V5.26074C5.44727%205.82227%205.83301%206.20312%206.79004%206.41309L7.57129%206.58887C9.04102%206.91602%209.62207%207.50684%209.62207%208.52246V8.52734C9.62207%209.8457%208.5918%2010.666%207.01953%2010.666Z%22%20fill%3D%22%23467B7C%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cclippath%20id%3D%22clip0_11163_51287%22%3E%0A%3Crect%20width%3D%2214%22%20height%3D%2214%22%20rx%3D%227%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "name-wrap")} tag="div">
          <_Builtin.Block tag="div">{textName}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "color-grey-600")}
            tag="div"
          >
            {textRole}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isInterviewerTime ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "timezone_block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey_600", "text-sm")}
            tag="div"
          >
            {textTime}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_conflicts_block")}
        tag="div"
      >
        {slotConflicts ?? <SlotComp componentNeme="Conflicts" />}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "text-gray-600")} tag="div">
        {"??"}
      </_Builtin.Block>
    </_Component>
  );
}
