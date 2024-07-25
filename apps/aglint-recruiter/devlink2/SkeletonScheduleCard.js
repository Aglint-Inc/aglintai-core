"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Skeleton } from "./Skeleton";
import * as _utils from "./utils";
import _styles from "./SkeletonScheduleCard.module.css";

export function SkeletonScheduleCard({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "new-gsc-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "global_schedule_card")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "skgsc_sub_card")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "schedule_card_collapsed")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "column_left")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "gsc-checkbox-wrap")}
                tag="div"
              >
                <_Builtin.Block tag="div">
                  <_Builtin.Block
                    className={_utils.cx(_styles, "sk_badge")}
                    tag="div"
                    badge-size="2"
                    badge-color="info"
                    badge-variant="soft"
                  >
                    <Skeleton />
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.Block
                  className={_utils.cx(_styles, "sk_text_w_icon")}
                  tag="div"
                  data-color="neutral-12"
                >
                  <Skeleton />
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.Block
                  className={_utils.cx(_styles, "sk_text_w_icon", "more_width")}
                  tag="div"
                  data-color="warning"
                >
                  <Skeleton />
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block tag="div" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "column_middle")}
              id={_utils.cx(
                _styles,
                "w-node-e79d8df9-be02-36ea-0e09-ba50858aff5c-858aff4a"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "sk_text_w_icon", "with_200")}
                tag="div"
                data-color="neutral-12"
              >
                <Skeleton />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "flex_hr_6")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "sk_text_w_icon", "width_100")}
                  tag="div"
                  data-color="neutral-12"
                >
                  <Skeleton />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "sk_text_w_icon", "width_100")}
                  tag="div"
                  data-color="neutral-12"
                >
                  <Skeleton />
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "flex_hr_6")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "sk_text_w_icon", "with_200")}
                  tag="div"
                  data-color="neutral-12"
                >
                  <Skeleton />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "sk_text_w_icon", "wisdth_160")}
                  tag="div"
                  data-color="neutral-12"
                >
                  <Skeleton />
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "column_right")}
              id={_utils.cx(
                _styles,
                "w-node-e79d8df9-be02-36ea-0e09-ba50858aff69-858aff4a"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "flex-h2")}
                tag="div"
              >
                <_Builtin.Block tag="div" />
                <_Builtin.Block
                  className={_utils.cx(_styles, "gsc-btn-wrap")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "sk_small_button")}
                    tag="div"
                    button-size-solid="1"
                    button-color-solid="neutral"
                    button-high-contrast-solid="false"
                  >
                    <Skeleton />
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "gsc-btn-wrap")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "sk_icon_button")}
                    tag="div"
                    icon-button-size-soft="1"
                    button-color-soft="neutral"
                    button-high-contrast-soft="false"
                  >
                    <Skeleton />
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "sk_text_w_icon", "wisdth_160")}
                tag="div"
                data-color="neutral-12"
              >
                <Skeleton />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div" />
      </_Builtin.Block>
    </_Component>
  );
}
