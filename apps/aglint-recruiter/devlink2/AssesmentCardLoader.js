import React from "react";
import * as _Builtin from "./_Builtin";
import { Skeleton } from "./Skeleton";
import * as _utils from "./utils";
import _styles from "./AssesmentCardLoader.module.css";

export function AssesmentCardLoader({
  as: _Component = _Builtin.Block,
  slotSkeleton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "template_card", "is_skeleton")}
      id={_utils.cx(
        _styles,
        "w-node-_9bce4c2e-8c8b-5a1f-656f-7948f1c2aee5-f1c2aee5"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "card_top_content")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "card_top_bar")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "assesment_type_icon")}
            tag="div"
          >
            {slotSkeleton ?? <Skeleton />}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "template_status_block")}
            tag="div"
          >
            {slotSkeleton ?? <Skeleton />}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "card_text_wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text_skeleton_wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text_md_bold_line")}
              tag="div"
            >
              {slotSkeleton ?? <Skeleton />}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text_md_bold_line", "_60")}
              tag="div"
            >
              {slotSkeleton ?? <Skeleton />}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text_skeleton_wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text_md_line", "_90")}
              tag="div"
            >
              {slotSkeleton ?? <Skeleton />}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text_md_line")}
              tag="div"
            >
              {slotSkeleton ?? <Skeleton />}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text_md_line")}
              tag="div"
            >
              {slotSkeleton ?? <Skeleton />}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text_md_line", "_80")}
              tag="div"
            >
              {slotSkeleton ?? <Skeleton />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "card_bottom_bar")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "assesment_level", "is_skeleton")}
          tag="div"
        >
          {slotSkeleton ?? <Skeleton />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "assesment_duration", "is_skeleton")}
          tag="div"
        >
          {slotSkeleton ?? <Skeleton />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
