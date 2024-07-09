"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalBadge } from "./GlobalBadge";
import * as _utils from "./utils";
import _styles from "./RolesRow.module.css";

export function RolesRow({
  as: _Component = _Builtin.Block,
  onClickRow = {},
  textRole = "Recruiter",
  textDescription = "Manage job postings, candidate information, interview scheduling, and task management.",
  slotAvatars,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "", "user_role_table_row")}
      id={_utils.cx(
        _styles,
        "w-node-_9b38d753-6590-f38b-003b-cadfaf1c4cef-af1c4cef"
      )}
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
    </_Component>
  );
}
