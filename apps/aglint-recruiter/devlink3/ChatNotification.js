"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ChatNotification.module.css";

export function ChatNotification({
  as: _Component = _Builtin.Block,
  slotIcon,
  textMain = "Task Created",
  textSub = "Schedule interview with john between 12-19 Feb",
  isSubtextVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "notification_block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "notification_task_blokx")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "iconblock")} tag="div">
          {slotIcon ?? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%2012C4.90625%2011.9844%203.90625%2011.7188%203%2011.2031C2.09375%2010.6719%201.35938%209.9375%200.796875%209C0.265625%208.04688%200%207.04688%200%206C0%204.95312%200.265625%203.95313%200.796875%203C1.35938%202.0625%202.09375%201.32813%203%200.796875C3.90625%200.28125%204.90625%200.015625%206%200C7.09375%200.015625%208.09375%200.28125%209%200.796875C9.90625%201.32813%2010.6406%202.0625%2011.2031%203C11.7344%203.95313%2012%204.95312%2012%206C12%207.04688%2011.7344%208.04688%2011.2031%209C10.6406%209.9375%209.90625%2010.6719%209%2011.2031C8.09375%2011.7188%207.09375%2011.9844%206%2012ZM8.64844%204.89844C8.86719%204.63281%208.86719%204.36719%208.64844%204.10156C8.38281%203.88281%208.11719%203.88281%207.85156%204.10156L5.25%206.70312L4.14844%205.60156C3.88281%205.38281%203.61719%205.38281%203.35156%205.60156C3.13281%205.86719%203.13281%206.13281%203.35156%206.39844L4.85156%207.89844C5.11719%208.11719%205.38281%208.11719%205.64844%207.89844L8.64844%204.89844Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          )}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{textMain}</_Builtin.Block>
      </_Builtin.Block>
      {isSubtextVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey_600")}
          tag="div"
        >
          {textSub}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
