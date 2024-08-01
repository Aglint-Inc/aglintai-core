"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./AglintAiWelcome.module.css";

export function AglintAiWelcome({
  as: _Component = _Builtin.Block,
  textAiHeader = "Hey Sara, I am Aglint AI your Scheduling co-pilot.",
  textBlock1 = "Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  textBlock2 = "Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  textBlock3 = "Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  textBlock4 = "Dorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
  onClickBlock1 = {},
  onClickBlock2 = {},
  onClickBlock3 = {},
  onClickBlock4 = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "req-right-initial")} tag="div">
      <Text content={textAiHeader} size="3" weight="regular" color="neutral" />
      <_Builtin.Block
        className={_utils.cx(_styles, "req-header-gradient")}
        tag="div"
      >
        <Text size="7" color="inherit" content="How can i help you today?" />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "req-right-initail-grid")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "req-right-grid-card")}
          tag="div"
          {...onClickBlock1}
        >
          <Text content={textBlock1} weight="regular" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "req-right-grid-card")}
          id={_utils.cx(
            _styles,
            "w-node-_9d331301-7b26-bc5d-4307-d14f8b0a536f-8b0a5366"
          )}
          tag="div"
          {...onClickBlock2}
        >
          <Text content={textBlock2} weight="regular" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "req-right-grid-card")}
          id={_utils.cx(
            _styles,
            "w-node-_9d331301-7b26-bc5d-4307-d14f8b0a5372-8b0a5366"
          )}
          tag="div"
          {...onClickBlock3}
        >
          <Text content={textBlock3} weight="regular" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "req-right-grid-card")}
          id={_utils.cx(
            _styles,
            "w-node-_9d331301-7b26-bc5d-4307-d14f8b0a5375-8b0a5366"
          )}
          tag="div"
          {...onClickBlock4}
        >
          <Text content={textBlock4} weight="regular" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
