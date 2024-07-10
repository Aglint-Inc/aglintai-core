"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./RolesRowSkeleton.module.css";

export function RolesRowSkeleton({
  as: _Component = _Builtin.Block,
  slotSkeleton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "", "user_role_table_row")}
      id={_utils.cx(
        _styles,
        "w-node-_59153980-784a-7170-9a8f-631f47e7743f-47e7743f"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "", "user_role_cell")}
        id={_utils.cx(
          _styles,
          "w-node-_59153980-784a-7170-9a8f-631f47e77440-47e7743f"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-skeleon", "skeleton-width-60")}
          tag="div"
        >
          {slotSkeleton ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "skeleton-loader")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_css")}
                value="%3Cstyle%3E%0A%5Bclass%20*%3D%22Skeleton_skeleton-loader__%22%5D%7B%0A%20%20position%3A%20absolute%20!important%3B%0A%20%20top%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20border-radius%3A%20inherit%3B%20%0A%20%20background%3A%20linear-gradient(to%20right%2C%20%23f6f7f8%2025%25%2C%20%23e0e0e0%2050%25%2C%20%23f6f7f8%2075%25)%3B%0A%20%20background-size%3A%20200%25%20100%25%3B%20%20%0A%20%20z-index%3A%201%3B%20%0A%20%20animation%3A%20skeleton%201s%20infinite%20linear%3B%0A%7D%0A.skeleton-loader%7B%0Aposition%3A%20absolute%20!important%3B%0A%20%20top%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20border-radius%3A%20inherit%3B%20%0A%20%20background%3A%20linear-gradient(to%20right%2C%20%23f6f7f8%2025%25%2C%20%23e0e0e0%2050%25%2C%20%23f6f7f8%2075%25)%3B%0A%20%20background-size%3A%20200%25%20100%25%3B%20%20%0A%20%20z-index%3A%201%3B%20%0A%20%20animation%3A%20skeleton%201s%20infinite%20linear%3B%0A%7D%0A%40keyframes%20skeleton%20%7B%0A%20%200%25%20%7B%20background-position%3A%20-100%25%200%3B%20%7D%0A%20%20100%25%20%7B%20background-position%3A%20100%25%200%3B%20%7D%0A%7D%0A%0A%3C%2Fstyle%3E%0A%0A%3C!--%0A%0A%5Bms-code-skeleton%5D%20%7B%0A%20%20background-clip%3A%20padding-box%3B%0A%7D%0A--%3E"
              />
            </_Builtin.Block>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "", "skeletion_block")}
        id={_utils.cx(
          _styles,
          "w-node-_59153980-784a-7170-9a8f-631f47e77444-47e7743f"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-skeleon", "skeleton-width-100")}
          tag="div"
        >
          {slotSkeleton ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "skeleton-loader")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_css")}
                value="%3Cstyle%3E%0A%5Bclass%20*%3D%22Skeleton_skeleton-loader__%22%5D%7B%0A%20%20position%3A%20absolute%20!important%3B%0A%20%20top%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20border-radius%3A%20inherit%3B%20%0A%20%20background%3A%20linear-gradient(to%20right%2C%20%23f6f7f8%2025%25%2C%20%23e0e0e0%2050%25%2C%20%23f6f7f8%2075%25)%3B%0A%20%20background-size%3A%20200%25%20100%25%3B%20%20%0A%20%20z-index%3A%201%3B%20%0A%20%20animation%3A%20skeleton%201s%20infinite%20linear%3B%0A%7D%0A.skeleton-loader%7B%0Aposition%3A%20absolute%20!important%3B%0A%20%20top%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20border-radius%3A%20inherit%3B%20%0A%20%20background%3A%20linear-gradient(to%20right%2C%20%23f6f7f8%2025%25%2C%20%23e0e0e0%2050%25%2C%20%23f6f7f8%2075%25)%3B%0A%20%20background-size%3A%20200%25%20100%25%3B%20%20%0A%20%20z-index%3A%201%3B%20%0A%20%20animation%3A%20skeleton%201s%20infinite%20linear%3B%0A%7D%0A%40keyframes%20skeleton%20%7B%0A%20%200%25%20%7B%20background-position%3A%20-100%25%200%3B%20%7D%0A%20%20100%25%20%7B%20background-position%3A%20100%25%200%3B%20%7D%0A%7D%0A%0A%3C%2Fstyle%3E%0A%0A%3C!--%0A%0A%5Bms-code-skeleton%5D%20%7B%0A%20%20background-clip%3A%20padding-box%3B%0A%7D%0A--%3E"
              />
            </_Builtin.Block>
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-skeleon", "skeleton-width-60")}
          tag="div"
        >
          {slotSkeleton ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "skeleton-loader")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_css")}
                value="%3Cstyle%3E%0A%5Bclass%20*%3D%22Skeleton_skeleton-loader__%22%5D%7B%0A%20%20position%3A%20absolute%20!important%3B%0A%20%20top%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20border-radius%3A%20inherit%3B%20%0A%20%20background%3A%20linear-gradient(to%20right%2C%20%23f6f7f8%2025%25%2C%20%23e0e0e0%2050%25%2C%20%23f6f7f8%2075%25)%3B%0A%20%20background-size%3A%20200%25%20100%25%3B%20%20%0A%20%20z-index%3A%201%3B%20%0A%20%20animation%3A%20skeleton%201s%20infinite%20linear%3B%0A%7D%0A.skeleton-loader%7B%0Aposition%3A%20absolute%20!important%3B%0A%20%20top%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20border-radius%3A%20inherit%3B%20%0A%20%20background%3A%20linear-gradient(to%20right%2C%20%23f6f7f8%2025%25%2C%20%23e0e0e0%2050%25%2C%20%23f6f7f8%2075%25)%3B%0A%20%20background-size%3A%20200%25%20100%25%3B%20%20%0A%20%20z-index%3A%201%3B%20%0A%20%20animation%3A%20skeleton%201s%20infinite%20linear%3B%0A%7D%0A%40keyframes%20skeleton%20%7B%0A%20%200%25%20%7B%20background-position%3A%20-100%25%200%3B%20%7D%0A%20%20100%25%20%7B%20background-position%3A%20100%25%200%3B%20%7D%0A%7D%0A%0A%3C%2Fstyle%3E%0A%0A%3C!--%0A%0A%5Bms-code-skeleton%5D%20%7B%0A%20%20background-clip%3A%20padding-box%3B%0A%7D%0A--%3E"
              />
            </_Builtin.Block>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "", "user_role_cell")}
        id={_utils.cx(
          _styles,
          "w-node-_59153980-784a-7170-9a8f-631f47e7744b-47e7743f"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "sample_avatar_24")}
          tag="div"
        >
          {slotSkeleton ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "skeleton-loader")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_css")}
                value="%3Cstyle%3E%0A%5Bclass%20*%3D%22Skeleton_skeleton-loader__%22%5D%7B%0A%20%20position%3A%20absolute%20!important%3B%0A%20%20top%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20border-radius%3A%20inherit%3B%20%0A%20%20background%3A%20linear-gradient(to%20right%2C%20%23f6f7f8%2025%25%2C%20%23e0e0e0%2050%25%2C%20%23f6f7f8%2075%25)%3B%0A%20%20background-size%3A%20200%25%20100%25%3B%20%20%0A%20%20z-index%3A%201%3B%20%0A%20%20animation%3A%20skeleton%201s%20infinite%20linear%3B%0A%7D%0A.skeleton-loader%7B%0Aposition%3A%20absolute%20!important%3B%0A%20%20top%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20border-radius%3A%20inherit%3B%20%0A%20%20background%3A%20linear-gradient(to%20right%2C%20%23f6f7f8%2025%25%2C%20%23e0e0e0%2050%25%2C%20%23f6f7f8%2075%25)%3B%0A%20%20background-size%3A%20200%25%20100%25%3B%20%20%0A%20%20z-index%3A%201%3B%20%0A%20%20animation%3A%20skeleton%201s%20infinite%20linear%3B%0A%7D%0A%40keyframes%20skeleton%20%7B%0A%20%200%25%20%7B%20background-position%3A%20-100%25%200%3B%20%7D%0A%20%20100%25%20%7B%20background-position%3A%20100%25%200%3B%20%7D%0A%7D%0A%0A%3C%2Fstyle%3E%0A%0A%3C!--%0A%0A%5Bms-code-skeleton%5D%20%7B%0A%20%20background-clip%3A%20padding-box%3B%0A%7D%0A--%3E"
              />
            </_Builtin.Block>
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sample_avatar_24")}
          tag="div"
        >
          {slotSkeleton ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "skeleton-loader")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_css")}
                value="%3Cstyle%3E%0A%5Bclass%20*%3D%22Skeleton_skeleton-loader__%22%5D%7B%0A%20%20position%3A%20absolute%20!important%3B%0A%20%20top%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20border-radius%3A%20inherit%3B%20%0A%20%20background%3A%20linear-gradient(to%20right%2C%20%23f6f7f8%2025%25%2C%20%23e0e0e0%2050%25%2C%20%23f6f7f8%2075%25)%3B%0A%20%20background-size%3A%20200%25%20100%25%3B%20%20%0A%20%20z-index%3A%201%3B%20%0A%20%20animation%3A%20skeleton%201s%20infinite%20linear%3B%0A%7D%0A.skeleton-loader%7B%0Aposition%3A%20absolute%20!important%3B%0A%20%20top%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20border-radius%3A%20inherit%3B%20%0A%20%20background%3A%20linear-gradient(to%20right%2C%20%23f6f7f8%2025%25%2C%20%23e0e0e0%2050%25%2C%20%23f6f7f8%2075%25)%3B%0A%20%20background-size%3A%20200%25%20100%25%3B%20%20%0A%20%20z-index%3A%201%3B%20%0A%20%20animation%3A%20skeleton%201s%20infinite%20linear%3B%0A%7D%0A%40keyframes%20skeleton%20%7B%0A%20%200%25%20%7B%20background-position%3A%20-100%25%200%3B%20%7D%0A%20%20100%25%20%7B%20background-position%3A%20100%25%200%3B%20%7D%0A%7D%0A%0A%3C%2Fstyle%3E%0A%0A%3C!--%0A%0A%5Bms-code-skeleton%5D%20%7B%0A%20%20background-clip%3A%20padding-box%3B%0A%7D%0A--%3E"
              />
            </_Builtin.Block>
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sample_avatar_24")}
          tag="div"
        >
          {slotSkeleton ?? (
            <_Builtin.Block
              className={_utils.cx(_styles, "skeleton-loader")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_css")}
                value="%3Cstyle%3E%0A%5Bclass%20*%3D%22Skeleton_skeleton-loader__%22%5D%7B%0A%20%20position%3A%20absolute%20!important%3B%0A%20%20top%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20border-radius%3A%20inherit%3B%20%0A%20%20background%3A%20linear-gradient(to%20right%2C%20%23f6f7f8%2025%25%2C%20%23e0e0e0%2050%25%2C%20%23f6f7f8%2075%25)%3B%0A%20%20background-size%3A%20200%25%20100%25%3B%20%20%0A%20%20z-index%3A%201%3B%20%0A%20%20animation%3A%20skeleton%201s%20infinite%20linear%3B%0A%7D%0A.skeleton-loader%7B%0Aposition%3A%20absolute%20!important%3B%0A%20%20top%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20border-radius%3A%20inherit%3B%20%0A%20%20background%3A%20linear-gradient(to%20right%2C%20%23f6f7f8%2025%25%2C%20%23e0e0e0%2050%25%2C%20%23f6f7f8%2075%25)%3B%0A%20%20background-size%3A%20200%25%20100%25%3B%20%20%0A%20%20z-index%3A%201%3B%20%0A%20%20animation%3A%20skeleton%201s%20infinite%20linear%3B%0A%7D%0A%40keyframes%20skeleton%20%7B%0A%20%200%25%20%7B%20background-position%3A%20-100%25%200%3B%20%7D%0A%20%20100%25%20%7B%20background-position%3A%20100%25%200%3B%20%7D%0A%7D%0A%0A%3C%2Fstyle%3E%0A%0A%3C!--%0A%0A%5Bms-code-skeleton%5D%20%7B%0A%20%20background-clip%3A%20padding-box%3B%0A%7D%0A--%3E"
              />
            </_Builtin.Block>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
