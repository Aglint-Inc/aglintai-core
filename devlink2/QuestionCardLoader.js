import React from "react";
import * as _Builtin from "./_Builtin";
import { Skeleton } from "./Skeleton";
import * as _utils from "./utils";
import _styles from "./QuestionCardLoader.module.css";

export function QuestionCardLoader({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "question_card", "is_loader")}
      id={_utils.cx(
        _styles,
        "w-node-deaeea4a-6a5f-d294-b365-42414bcd3b21-4bcd3b21"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "question_card_top", "nax_width_70-copy")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "question_typeicon")}
          tag="div"
        >
          <Skeleton />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text_md_bold_line", "_60")}
          tag="div"
        >
          <Skeleton />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "question_card_bottom", "skeleton_flex")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text_md_line")}
          tag="div"
        >
          <Skeleton />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text_md_line")}
          tag="div"
        >
          <Skeleton />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text_md_line", "_80")}
          tag="div"
        >
          <Skeleton />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
