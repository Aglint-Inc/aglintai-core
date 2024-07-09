"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { RolesRow } from "./RolesRow";
import * as _utils from "./utils";
import _styles from "./RolesAndPermissions.module.css";

export function RolesAndPermissions({
  as: _Component = _Builtin.Block,
  slotRolesRow,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "user_role_permissions")}
      id={_utils.cx(
        _styles,
        "w-node-_1b9f6679-ac66-27ae-779c-c7649823ead9-9823ead9"
      )}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "flex-v1")} tag="div">
        <Text content="Roles & Permissions" weight="medium" />
        <Text
          content="Customize permissions for each role and control access by enabling or disabling the toggle next to each permission."
          color="neutral"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "", "user_role_table")}
        id={_utils.cx(
          _styles,
          "w-node-_1b9f6679-ac66-27ae-779c-c7649823eadf-9823ead9"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "",
            "",
            "user_role_table_row",
            "header"
          )}
          id={_utils.cx(
            _styles,
            "w-node-_1b9f6679-ac66-27ae-779c-c7649823eae0-9823ead9"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "", "", "user_role_cell")}
            id={_utils.cx(
              _styles,
              "w-node-_1b9f6679-ac66-27ae-779c-c7649823eae1-9823ead9"
            )}
            tag="div"
          >
            <Text content="Role" weight="medium" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "", "", "user_role_cell")}
            id={_utils.cx(
              _styles,
              "w-node-_1b9f6679-ac66-27ae-779c-c7649823eae4-9823ead9"
            )}
            tag="div"
          >
            <Text content="Description" weight="medium" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "", "", "user_role_cell")}
            id={_utils.cx(
              _styles,
              "w-node-_1b9f6679-ac66-27ae-779c-c7649823eae7-9823ead9"
            )}
            tag="div"
          >
            <Text content="Users" weight="medium" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "user_table_row_wrapper")}
          tag="div"
        >
          {slotRolesRow ?? (
            <>
              <RolesRow />
              <RolesRow />
              <RolesRow />
              <RolesRow />
              <RolesRow />
              <RolesRow />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
