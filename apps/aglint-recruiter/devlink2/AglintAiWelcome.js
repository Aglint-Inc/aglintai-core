"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./AglintAiWelcome.module.css";

export function AglintAiWelcome({
  as: _Component = _Builtin.Block,
  textAiHeader = "Hey Sara, I am Aglint AI your Scheduling co-pilot.",
  slotOption,
}) {
  return (
    <_Component className={_utils.cx(_styles, "req-right-initial")} tag="div">
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "illustration")}
        value="%3Csvg%20width%3D%22244%22%20height%3D%22108%22%20viewBox%3D%220%200%20244%20108%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M193.185%207.21883V33.6247C193.185%2036.9922%20190.451%2039.7263%20187.084%2039.7263H56.9142C53.5467%2039.7263%2050.8125%2036.9922%2050.8125%2033.6247V7.21883C50.8125%203.85133%2053.5467%201.11719%2056.9142%201.11719H187.084C190.451%201.11719%20193.185%203.85133%20193.185%207.21883Z%22%20fill%3D%22%23F1F0EF%22%20stroke%3D%22%23FDFDFC%22%20stroke-width%3D%222.03389%22%2F%3E%0A%3Cpath%20d%3D%22M219.625%2029.5906V66.2696C219.625%2070.7596%20215.98%2074.4051%20211.49%2074.4051H32.5067C28.0167%2074.4051%2024.3711%2070.7596%2024.3711%2066.2696V29.5906C24.3711%2025.1006%2028.0167%2021.4551%2032.5067%2021.4551H211.49C215.98%2021.4551%20219.625%2025.1006%20219.625%2029.5906Z%22%20fill%3D%22%23F1F0EF%22%20stroke%3D%22%23FDFDFC%22%20stroke-width%3D%222.03389%22%2F%3E%0A%3Cpath%20d%3D%22M242%2051.9643V96.7097C242%20102.322%20237.443%20106.879%20231.831%20106.879H12.1695C6.55695%20106.879%202%20102.322%202%2096.7097V51.9643C2%2046.3518%206.55695%2041.7949%2012.1695%2041.7949H231.831C237.443%2041.7949%20242%2046.3518%20242%2051.9643Z%22%20fill%3D%22%23E9E8E6%22%20stroke%3D%22%23FDFDFC%22%20stroke-width%3D%222.03389%22%2F%3E%0A%3C%2Fsvg%3E"
      />
      <Text content={textAiHeader} size="3" weight="regular" color="neutral" />
      <_Builtin.Block
        className={_utils.cx(_styles, "req-header-gradient")}
        tag="div"
      >
        <Text
          size="2"
          color="inherit"
          content="Aglint AI makes scheduling and rescheduling interviews easy."
          weight="regular"
          align="center"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "actions-padding")}
          tag="div"
        >
          <_Builtin.Image
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/66ae6a4a990f41aa1fa5c5af_Action%20cards.png"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "req-right-initail-grid")}
        tag="div"
      >
        {slotOption}
      </_Builtin.Block>
    </_Component>
  );
}
