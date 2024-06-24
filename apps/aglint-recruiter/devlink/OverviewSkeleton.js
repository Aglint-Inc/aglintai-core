"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./OverviewSkeleton.module.css";

export function OverviewSkeleton({
  as: _Component = _Builtin.Block,
  slotSkeleton,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "overview_loader_wrapper")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "badge_wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "ske_badge", "width_60px")}
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
          className={_utils.cx(_styles, "ske_badge", "width_60px")}
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
          className={_utils.cx(_styles, "ske_badge", "width_60px")}
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
      <_Builtin.Block
        className={_utils.cx(_styles, "skele_ton_overview")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "overview_title")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2213%22%20viewBox%3D%220%200%2012%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.6875%202.49219L9%202L9.49219%200.6875C9.53906%200.5625%209.625%200.5%209.75%200.5C9.875%200.5%209.96094%200.5625%2010.0078%200.6875L10.5%202L11.8359%202.49219C11.9453%202.53906%2012%202.625%2012%202.75C12%202.875%2011.9453%202.96094%2011.8359%203.00781L10.5%203.5L10.0078%204.83594C9.96094%204.94531%209.875%205%209.75%205C9.625%205%209.53906%204.94531%209.49219%204.83594L9%203.5L7.6875%203.00781C7.5625%202.96094%207.5%202.875%207.5%202.75C7.5%202.625%207.5625%202.53906%207.6875%202.49219ZM0.210938%206.125L0.609375%205.9375L0.820312%205.84375L2.88281%204.88281L3.84375%202.82031L3.86719%202.79688L3.9375%202.60938L4.125%202.21094C4.20312%202.07031%204.32031%202%204.47656%202C4.63281%202%204.74219%202.07031%204.80469%202.21094L4.99219%202.60938L5.08594%202.82031L6.04688%204.88281L8.10938%205.84375L8.13281%205.86719L8.32031%205.9375L8.71875%206.125C8.85938%206.20312%208.92969%206.32031%208.92969%206.47656C8.92969%206.63281%208.85938%206.74219%208.71875%206.80469L8.32031%206.99219L8.13281%207.08594H8.10938L6.04688%208.04688L5.08594%2010.1094V10.1328L4.99219%2010.3203L4.80469%2010.7188C4.72656%2010.8594%204.61719%2010.9297%204.47656%2010.9297C4.32031%2010.9297%204.20312%2010.8594%204.125%2010.7188L3.9375%2010.3203L3.84375%2010.1328V10.1094L2.88281%208.04688L0.820312%207.08594H0.796875L0.609375%206.99219L0.210938%206.80469C0.0703125%206.74219%200%206.63281%200%206.47656C0%206.32031%200.0703125%206.20312%200.210938%206.125ZM2.15625%206.47656L3.375%207.01562C3.60938%207.14062%203.78906%207.32812%203.91406%207.57812L4.47656%208.77344L5.01562%207.57812C5.14062%207.32812%205.32812%207.14062%205.57812%207.01562L6.77344%206.47656L5.57812%205.91406C5.32812%205.78906%205.14062%205.60156%205.01562%205.35156L4.47656%204.15625L3.91406%205.35156C3.78906%205.60156%203.60938%205.78906%203.375%205.91406L2.15625%206.47656ZM9%209.5L9.49219%208.1875C9.53906%208.0625%209.625%208%209.75%208C9.875%208%209.96094%208.0625%2010.0078%208.1875L10.5%209.5L11.8359%209.99219C11.9453%2010.0391%2012%2010.125%2012%2010.25C12%2010.375%2011.9453%2010.4609%2011.8359%2010.5078L10.5%2011L10.0078%2012.3359C9.96094%2012.4453%209.875%2012.5%209.75%2012.5C9.625%2012.5%209.53906%2012.4453%209.49219%2012.3359L9%2011L7.6875%2010.5078C7.5625%2010.4609%207.5%2010.375%207.5%2010.25C7.5%2010.125%207.5625%2010.0391%207.6875%209.99219L9%209.5Z%22%20fill%3D%22%2352009A%22%20fill-opacity%3D%220.729412%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <Text content="Overview" color="" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ske_text_small", "width_80")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "skeleton-loader_purple")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_css")}
              value="%3Cstyle%3E%0A%5Bclass%20*%3D%22Skeleton_skeleton-loader-purple__%22%5D%7B%0A%20%20position%3A%20absolute%20!important%3B%0A%20%20top%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20border-radius%3A%20inherit%3B%20%0A%20%20background%3A%20linear-gradient(to%20right%2C%20%23ead5f9%2025%25%2C%20%23d1b3e6%2050%25%2C%20%23ead5f9%2075%25)%3B%0A%20%20background-size%3A%20200%25%20100%25%3B%20%20%0A%20%20z-index%3A%201%3B%20%0A%20%20animation%3A%20skeleton%201s%20infinite%20linear%3B%0A%7D%0A.skeleton-loader_purple%7B%0Aposition%3A%20absolute%20!important%3B%0A%20%20top%3A%200%3B%0A%20%20bottom%3A%200%3B%0A%20%20left%3A%200%3B%0A%20%20right%3A%200%3B%0A%20%20border-radius%3A%20inherit%3B%20%0A%20%20background%3A%20linear-gradient(to%20right%2C%20%23ead5f9%2025%25%2C%20%23d1b3e6%2050%25%2C%20%23ead5f9%2075%25)%3B%0A%20%20background-size%3A%20200%25%20100%25%3B%20%20%0A%20%20z-index%3A%201%3B%20%0A%20%20animation%3A%20skeleton%201s%20infinite%20linear%3B%0A%7D%0A%40keyframes%20skeleton%20%7B%0A%20%200%25%20%7B%20background-position%3A%20-100%25%200%3B%20%7D%0A%20%20100%25%20%7B%20background-position%3A%20100%25%200%3B%20%7D%0A%7D%0A%3C%2Fstyle%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ske_text_small", "width_90")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "skeleton-loader_purple")}
            tag="div"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ske_text_small", "width_20")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "skeleton-loader_purple")}
            tag="div"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
