"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./Kbd.module.css";

export function Kbd({ as: _Component = _Builtin.Block, textShortcut = "Tab" }) {
  return (
    <_Component
      className={_utils.cx(_styles, "kbd")}
      tag="div"
      data-style="kbd"
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "gradient_css")}
        value="%3Cstyle%3E%0A%5Bdata-style%3D%22kbd%22%5D%7B%0Aborder-radius%3A%20var(--Radius-2-max%2C%204px)%3B%0Abackground%3A%20var(--Colors-Neutral-Neutral-1%2C%20%23FDFDFC)%3B%0Abox-shadow%3A%200px%200.76px%201.63px%200px%20rgba(1%2C%206%2C%2047%2C%200.17)%2C%200px%200px%200px%200.48px%20rgba(1%2C%201%2C%2046%2C%200.13)%2C%200px%20-0.48px%200px%200px%20rgba(1%2C%201%2C%2046%2C%200.13)%20inset%2C%200px%202.4px%204.8px%200px%20rgba(5%2C%205%2C%2088%2C%200.02)%20inset%2C%200px%200.48px%200px%200px%20rgba(255%2C%20255%2C%20255%2C%200.93)%20inset%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
      <Text
        content={textShortcut}
        size="1"
        weight="medium"
        color="neutral-12"
      />
    </_Component>
  );
}
