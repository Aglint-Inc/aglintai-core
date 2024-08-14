"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./CandidateProgress.module.css";

export function CandidateProgress({
  as: _Component = _Builtin.Block,
  isLeftArrowVisible = true,
  isRightArrowVisible = true,
  status,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "candidate-progress-stat")}
      tag="div"
    >
      {isLeftArrowVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cp-tail-wrap")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "code-embed-3")}
            value="%3Csvg%20width%3D%2238%22%20height%3D%2266%22%20viewBox%3D%220%200%2034%2066%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%200L34%2032.4469L0%2066V0Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "code-embed")}
            value="%3Csvg%20width%3D%2238%22%20height%3D%2266%22%20viewBox%3D%220%200%2035%2066%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M34.6666%200V66H0.666626C0.666626%2066%2034.6666%2034.8539%2034.6666%2033C34.6666%2031.1461%200.666626%200%200.666626%200H34.6666Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "cp-main-wrap")}
        tag="div"
        progress={status}
      >
        <Text />
        <_Builtin.Block tag="div" />
      </_Builtin.Block>
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A%5Bprogress1%3D%22active%22%5D%7B%0Abackground-color%3A%20var(--success-3)%3B%0A%0A%7D%0A%5Bprogress1%3D%22active%22%5D%7B%0Acolor%3Avar(--success-3)%3B%0A%7D%0A%0A%5Bprogress2%3D%22active%22%5D%7B%0Abackground-color%3A%20var(--success-3)%3B%0A%7D%0A%5Bprogress2%3D%22active%22%5D%7B%0Acolor%3Avar(--success-3)%3B%0A%7D%0A%0A%5Bprogress3%3D%22active%22%5D%7B%0Abackground-color%3A%20var(--success-3)%3B%0A%7D%0A%5Bprogress3%3D%22active%22%5D%7B%0Acolor%3Avar(--success-3)%3B%0A%7D%0A%0A%0A%3C%2Fstyle%3E" />
    </_Component>
  );
}
