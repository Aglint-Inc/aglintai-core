"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { TokenItem } from "./TokenItem";
import { ButtonGhost } from "./ButtonGhost";
import * as _utils from "./utils";
import _styles from "./InterviewTypeToken.module.css";

export function InterviewTypeToken({
  as: _Component = _Builtin.Block,
  slotTokenItem,
  slotAddToken,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "token-interview-type")}
      tag="div"
    >
      <Text
        weight="regular"
        content="These tokens will be used in emails send to candidate or any communication messages to the candidate."
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "token-table-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "token-table-header-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "token-table-header-item")}
            id={_utils.cx(
              _styles,
              "w-node-_78745ec5-c86b-f1da-03af-d49d22dbce1b-22dbce16"
            )}
            tag="div"
          >
            <Text size="1" content="Token" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "token-table-header-item")}
            id={_utils.cx(
              _styles,
              "w-node-_78745ec5-c86b-f1da-03af-d49d22dbce1e-22dbce16"
            )}
            tag="div"
          >
            <Text size="1" content="Token Detail" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "token-table-body-wrap")}
          tag="div"
        >
          {slotTokenItem ?? (
            <>
              <TokenItem />
              <TokenItem />
            </>
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "token-table-footer-wrap")}
          tag="div"
        >
          {slotAddToken ?? (
            <ButtonGhost
              size="2"
              textButton="Add Token"
              isLeftIcon={true}
              iconName="add"
              highContrast="true"
            />
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
