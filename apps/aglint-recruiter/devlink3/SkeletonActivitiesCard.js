"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SkeletonActivitiesCard.module.css";

export function SkeletonActivitiesCard({
  as: _Component = _Builtin.Block,
  slotSkeleton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "ac-wrapper-2")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "activity_card_image_divider")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "user_image-2")}
          tag="div"
        >
          {slotSkeleton ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_skeleton")}
              tag="div"
            />
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "card_connector")}
          tag="div"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "activity_card_contents")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ske_text_regular", "width_380")}
          tag="div"
        >
          {slotSkeleton ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_skeleton")}
              tag="div"
            />
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ske_text_small", "width_480px")}
          tag="div"
        >
          {slotSkeleton ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "dummy_skeleton")}
              tag="div"
            />
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "activity_card_widget")}
          tag="div"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "activity_card_footer")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ske_text_small", "width_50")}
            tag="div"
          >
            {slotSkeleton ?? (
              <_Builtin.Block
                className={_utils.cx(_styles, "dummy_skeleton")}
                tag="div"
              />
            )}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ske_text_small", "width_50")}
            tag="div"
          >
            {slotSkeleton ?? (
              <_Builtin.Block
                className={_utils.cx(_styles, "dummy_skeleton")}
                tag="div"
              />
            )}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ske_text_small", "width_50")}
            tag="div"
          >
            {slotSkeleton ?? (
              <_Builtin.Block
                className={_utils.cx(_styles, "dummy_skeleton")}
                tag="div"
              />
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
