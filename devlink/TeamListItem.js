import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./TeamListItem.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1332":{"id":"e-1332","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-459","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1331"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a60860aa-9493-87fc-f445-b3f1087efc9c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a60860aa-9493-87fc-f445-b3f1087efc9c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696325225605},"e-1331":{"id":"e-1331","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-460","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1332"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a60860aa-9493-87fc-f445-b3f1087efc9c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a60860aa-9493-87fc-f445-b3f1087efc9c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696325225605}},"actionLists":{"a-459":{"id":"a-459","title":"actions-[fade-in]","actionItemGroups":[{"actionItems":[{"id":"a-459-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".il-archive-btn-2","selectorGuids":["fd187680-d2fc-2595-4e97-abd37b164aca"]},"value":"none"}},{"id":"a-459-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".il-archive-btn-2","selectorGuids":["fd187680-d2fc-2595-4e97-abd37b164aca"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-459-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".il-archive-btn-2","selectorGuids":["fd187680-d2fc-2595-4e97-abd37b164aca"]},"value":"flex"}}]},{"actionItems":[{"id":"a-459-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".il-archive-btn-2","selectorGuids":["fd187680-d2fc-2595-4e97-abd37b164aca"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1696241512726},"a-460":{"id":"a-460","title":"actions-[fade-out]","actionItemGroups":[{"actionItems":[{"id":"a-460-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".il-archive-btn-2","selectorGuids":["fd187680-d2fc-2595-4e97-abd37b164aca"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-460-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".il-archive-btn-2","selectorGuids":["fd187680-d2fc-2595-4e97-abd37b164aca"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1696241600450}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function TeamListItem({
  as: _Component = _Builtin.Block,
  slotUserRole,
  userStatusProps = {},
  userStatusText = "Active",
  dateText = "29 Aug 2023",
  onClickRemove = {},
  userName = "Roberto Carlos",
  userEmail = "roberto@sample.com",
  slotProfileImage,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "tu-list-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "tu-list-item", "user")}
        id={_utils.cx(
          _styles,
          "w-node-a60860aa-9493-87fc-f445-b3f1087efc8c-087efc8b"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "tu-list-item-user-image")}
          tag="div"
        >
          {slotProfileImage}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "tu-list-item-user-info")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {userName}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {userEmail}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "tu-list-item")}
        id={_utils.cx(
          _styles,
          "w-node-a60860aa-9493-87fc-f445-b3f1087efc93-087efc8b"
        )}
        tag="div"
      >
        <_Builtin.Block tag="div">{slotUserRole}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "tu-list-item")}
        id={_utils.cx(
          _styles,
          "w-node-a60860aa-9493-87fc-f445-b3f1087efc95-087efc8b"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "tu-list-item-status")}
          tag="div"
          {...userStatusProps}
        >
          {userStatusText}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "tu-list-item")}
        id={_utils.cx(
          _styles,
          "w-node-a60860aa-9493-87fc-f445-b3f1087efc98-087efc8b"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-color-black")}
          tag="div"
        >
          {dateText}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "tu-list-item", "actions")}
        id={_utils.cx(
          _styles,
          "w-node-a60860aa-9493-87fc-f445-b3f1087efc9b-087efc8b"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "il-actions-image-block-2")}
          data-w-id="a60860aa-9493-87fc-f445-b3f1087efc9c"
          tag="div"
        >
          <_Builtin.Image
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/651a94f8aa13f70fec023553_Frame%201282.svg"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "il-archive-btn-2")}
            tag="div"
            {...onClickRemove}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4%202V1C4%200.423858%204.42386%200%205%200H7C7.57614%200%208%200.423858%208%201V2H10C10.2761%202%2010.5%202.22386%2010.5%202.5C10.5%202.77614%2010.2761%203%2010%203H7.5H4.5H2C1.72386%203%201.5%202.77614%201.5%202.5C1.5%202.22386%201.72386%202%202%202H4ZM7%202V1H5V2H7ZM5%209.5C5%209.77614%204.77614%2010%204.5%2010C4.22386%2010%204%209.77614%204%209.5V5C4%204.72386%204.22386%204.5%204.5%204.5C4.77614%204.5%205%204.72386%205%205V9.5ZM8%209.5C8%209.77614%207.77614%2010%207.5%2010C7.22386%2010%207%209.77614%207%209.5V5C7%204.72386%207.22386%204.5%207.5%204.5C7.77614%204.5%208%204.72386%208%205V9.5ZM2%204.5C2%204.22386%202.22386%204%202.5%204C2.77614%204%203%204.22386%203%204.5V11H9V4.5C9%204.22386%209.22386%204%209.5%204C9.77614%204%2010%204.22386%2010%204.5V11C10%2011.5761%209.57614%2012%209%2012H3C2.42386%2012%202%2011.5761%202%2011V4.5Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-color-black-2")}
              tag="div"
            >
              {"Remove"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
