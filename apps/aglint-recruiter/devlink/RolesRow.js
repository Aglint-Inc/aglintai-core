"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { GlobalBadge } from "./GlobalBadge";
import * as _utils from "./utils";
import _styles from "./RolesRow.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1590":{"id":"e-1590","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-623","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1591"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9b38d753-6590-f38b-003b-cadfaf1c4cef","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9b38d753-6590-f38b-003b-cadfaf1c4cef","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1722587952804},"e-1591":{"id":"e-1591","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-624","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1590"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9b38d753-6590-f38b-003b-cadfaf1c4cef","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9b38d753-6590-f38b-003b-cadfaf1c4cef","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1722587952805}},"actionLists":{"a-623":{"id":"a-623","title":"Roles Row  hover in","actionItemGroups":[{"actionItems":[{"id":"a-623-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slot-add-btn-rr","selectorGuids":["f38e7fe5-b4f8-32d7-0553-83b3678bd52a"]},"value":0,"unit":""}},{"id":"a-623-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot-add-btn-rr","selectorGuids":["f38e7fe5-b4f8-32d7-0553-83b3678bd52a"]},"value":"none"}}]},{"actionItems":[{"id":"a-623-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-add-btn-rr","selectorGuids":["f38e7fe5-b4f8-32d7-0553-83b3678bd52a"]},"value":1,"unit":""}},{"id":"a-623-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot-add-btn-rr","selectorGuids":["f38e7fe5-b4f8-32d7-0553-83b3678bd52a"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1722587956476},"a-624":{"id":"a-624","title":"Roles Row  hover out","actionItemGroups":[{"actionItems":[{"id":"a-624-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-add-btn-rr","selectorGuids":["f38e7fe5-b4f8-32d7-0553-83b3678bd52a"]},"value":0,"unit":""}},{"id":"a-624-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".slot-add-btn-rr","selectorGuids":["f38e7fe5-b4f8-32d7-0553-83b3678bd52a"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1722587956476}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function RolesRow({
  as: _Component = _Builtin.Block,
  onClickRow = {},
  textRole = "Recruiter",
  textDescription = "Manage job postings, candidate information, interview scheduling, and task management.",
  slotAvatars,
  slotButtonAdd,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "", "user_role_table_row")}
      id={_utils.cx(
        _styles,
        "w-node-_9b38d753-6590-f38b-003b-cadfaf1c4cef-af1c4cef"
      )}
      data-w-id="9b38d753-6590-f38b-003b-cadfaf1c4cef"
      tag="div"
      {...onClickRow}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "", "user_role_cell")}
        id={_utils.cx(
          _styles,
          "w-node-_9b38d753-6590-f38b-003b-cadfaf1c4cf0-af1c4cef"
        )}
        tag="div"
      >
        <Text content={textRole} weight="medium" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "", "user_role_cell")}
        id={_utils.cx(
          _styles,
          "w-node-_9b38d753-6590-f38b-003b-cadfaf1c4cf3-af1c4cef"
        )}
        tag="div"
      >
        <Text content={textDescription} weight="regular" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "", "user_role_cell")}
        id={_utils.cx(
          _styles,
          "w-node-_9b38d753-6590-f38b-003b-cadfaf1c4cf6-af1c4cef"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "roles-row-avatar")}
          tag="div"
        >
          {slotAvatars ?? (
            <>
              <_Builtin.Block
                className={_utils.cx(_styles, "sample_avatar_24")}
                tag="div"
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "cover_image")}
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt=""
                  src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6544eaa04e499de1d6d51aa1_amanda-martinez.jpeg"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "sample_avatar_24")}
                tag="div"
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "cover_image")}
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt=""
                  src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6544ea9f949aaadda8d5c97d_michael-turner.jpeg"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "sample_avatar_24")}
                tag="div"
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "cover_image")}
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt=""
                  src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6544ea9fb3b211dc1973f5b1_john-williams.jpeg"
                />
              </_Builtin.Block>
              <GlobalBadge textBadge="+2 more" color="neutral" size="2" />
            </>
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-add-btn-rr")}
          tag="div"
        >
          {slotButtonAdd}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
