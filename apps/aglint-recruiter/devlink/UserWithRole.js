"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalBadge } from "./GlobalBadge";
import * as _utils from "./utils";
import _styles from "./UserWithRole.module.css";

export function UserWithRole({
  as: _Component = _Builtin.Block,
  textName = "Ogyen Thoga",
  textRole = "Software developer",
  slotAvatar,
  slotBadge,
}) {
  return (
    <_Component className={_utils.cx(_styles, "userwithrole")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "user_avatar")}
        id={_utils.cx(
          _styles,
          "w-node-_54b6da50-d8c3-1372-93b0-6aa2dcc3bff9-dcc3bff8"
        )}
        tag="div"
      >
        {slotAvatar ?? (
          <_Builtin.Image
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6544ea9f1bd974b59b176aea_sarah-johanson.jpeg"
          />
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "user_infoblock")}
        id={_utils.cx(
          _styles,
          "w-node-_54b6da50-d8c3-1372-93b0-6aa2dcc3bffb-dcc3bff8"
        )}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "flex-h2")} tag="div">
          <Text content={textName} />
          <_Builtin.Block tag="div">
            {slotBadge ?? <GlobalBadge textBadge="Active" color="success" />}
          </_Builtin.Block>
        </_Builtin.Block>
        <Text content={textRole} color="neutral" />
      </_Builtin.Block>
    </_Component>
  );
}
