"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonGhost } from "./ButtonGhost";
import { IconButtonGhost } from "./IconButtonGhost";
import * as _utils from "./utils";
import _styles from "./TeamSync.module.css";

export function TeamSync({
  as: _Component = _Builtin.Block,
  textSync = "Last synced on 05:30PM",
  onClickSync = {},
  onClickMore = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "sync-tul-wrap")} tag="div">
      <Text content={textSync} />
      <ButtonGhost
        onClickButton={onClickSync}
        size="2"
        isLeftIcon={true}
        iconName="sync"
        textButton="Sync"
      />
      <_Builtin.Block tag="div">
        <IconButtonGhost
          onClickButton={onClickMore}
          color="neutral"
          iconName="more_vert"
          iconSize="5"
          size="1"
        />
      </_Builtin.Block>
    </_Component>
  );
}
