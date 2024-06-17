"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SkeletionTextSmall.module.css";

export function SkeletionTextSmall({
  as: _Component = _Builtin.Block,
  styleWidth = {},
  isPurple = true,
  isGrey = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "ske_text_small")}
      tag="div"
      {...styleWidth}
    >
      {isPurple ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "skeleton-loader_purple")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_css")}
            value="%3Cstyle%3E%0A%5Bclass%20*%3D%22Skeleton_skeleton-loader-purple__%22%5D%7B%0A%20%20position%3A%20absolute%20!important%3B%0A%20%20top%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20border-radius%3A%20inherit%3B%20%0A%20%20background%3A%20linear-gradient(to%20right%2C%20%23ead5f9%2025%25%2C%20%23d1b3e6%2050%25%2C%20%23ead5f9%2075%25)%3B%0A%20%20background-size%3A%20200%25%20100%25%3B%20%20%0A%20%20z-index%3A%201%3B%20%0A%20%20animation%3A%20skeleton%201s%20infinite%20linear%3B%0A%7D%0A.skeleton-loader_purple%7B%0Aposition%3A%20absolute%20!important%3B%0A%20%20top%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20border-radius%3A%20inherit%3B%20%0A%20%20background%3A%20linear-gradient(to%20right%2C%20%23ead5f9%2025%25%2C%20%23d1b3e6%2050%25%2C%20%23ead5f9%2075%25)%3B%0A%20%20background-size%3A%20200%25%20100%25%3B%20%20%0A%20%20z-index%3A%201%3B%20%0A%20%20animation%3A%20skeleton%201s%20infinite%20linear%3B%0A%7D%0A%40keyframes%20skeleton%20%7B%0A%20%200%25%20%7B%20background-position%3A%20-100%25%200%3B%20%7D%0A%20%20100%25%20%7B%20background-position%3A%20100%25%200%3B%20%7D%0A%7D%0A%3C%2Fstyle%3E"
          />
        </_Builtin.Block>
      ) : null}
      {isGrey ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "skeleton-loader")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_css")}
            value="%3Cstyle%3E%0A%5Bclass%20*%3D%22Skeleton_skeleton-loader-purple__%22%5D%7B%0A%20%20position%3A%20absolute%20!important%3B%0A%20%20top%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20border-radius%3A%20inherit%3B%20%0A%20%20background%3A%20linear-gradient(to%20right%2C%20%23ead5f9%2025%25%2C%20%23d1b3e6%2050%25%2C%20%23ead5f9%2075%25)%3B%0A%20%20background-size%3A%20200%25%20100%25%3B%20%20%0A%20%20z-index%3A%201%3B%20%0A%20%20animation%3A%20skeleton%201s%20infinite%20linear%3B%0A%7D%0A.skeleton-loader_purple%7B%0Aposition%3A%20absolute%20!important%3B%0A%20%20top%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20border-radius%3A%20inherit%3B%20%0A%20%20background%3A%20linear-gradient(to%20right%2C%20%23ead5f9%2025%25%2C%20%23d1b3e6%2050%25%2C%20%23ead5f9%2075%25)%3B%0A%20%20background-size%3A%20200%25%20100%25%3B%20%20%0A%20%20z-index%3A%201%3B%20%0A%20%20animation%3A%20skeleton%201s%20infinite%20linear%3B%0A%7D%0A%40keyframes%20skeleton%20%7B%0A%20%200%25%20%7B%20background-position%3A%20-100%25%200%3B%20%7D%0A%20%20100%25%20%7B%20background-position%3A%20100%25%200%3B%20%7D%0A%7D%0A%3C%2Fstyle%3E"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
