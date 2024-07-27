"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { UserNameRoleCard } from "./UserNameRoleCard";
import * as _utils from "./utils";
import _styles from "./RolesPopover.module.css";

export function RolesPopover({
  as: _Component = _Builtin.Block,
  slotSearch,
  slotCard,
  isHeaderVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "roles-dc-body")} tag="div">
      {isHeaderVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "roles-dc-body-header")}
          tag="div"
        >
          <Text
            content="Pick a user and click on next you want to add to recruiter role "
            weight="medium"
          />
          <_Builtin.Block tag="div">{slotSearch}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-card-name-role")}
        tag="div"
      >
        {slotCard ?? <UserNameRoleCard />}
      </_Builtin.Block>
    </_Component>
  );
}
