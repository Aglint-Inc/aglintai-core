import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SublinksInterview.module.css";

export function SublinksInterview({
  as: _Component = _Builtin.Block,
  isTakeInterview = true,
  isInterviewHistory = true,
  isCommonlyAskedQuestions = true,
  onClickCommonlyAskedQuestions = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "nav_sublinks")} tag="div">
      <_Builtin.Link
        className={_utils.cx(_styles, "nav_sublink")}
        button={false}
        id="mock-interview"
        options={{
          href: "/interview",
        }}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%200C7.10457%200%208%200.89543%208%202V6C8%207.10457%207.10457%208%206%208C4.89543%208%204%207.10457%204%206V2C4%200.89543%204.89543%200%206%200ZM6%201C5.44772%201%205%201.44772%205%202V6C5%206.55228%205.44772%207%206%207C6.55228%207%207%206.55228%207%206V2C7%201.44772%206.55228%201%206%201ZM7%209.87398V12H5V9.87398C3.27477%209.42994%202%207.86384%202%206V5.5C2%205.22386%202.22386%205%202.5%205C2.77614%205%203%205.22386%203%205.5V6C3%207.65685%204.34315%209%206%209C7.65685%209%209%207.65685%209%206V5.5C9%205.22386%209.22386%205%209.5%205C9.77614%205%2010%205.22386%2010%205.5V6C10%207.86384%208.72523%209.42994%207%209.87398Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block tag="div">{"Mock Interview"}</_Builtin.Block>
        {isTakeInterview ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%200C7.10457%200%208%200.89543%208%202V6C8%207.10457%207.10457%208%206%208C4.89543%208%204%207.10457%204%206V2C4%200.89543%204.89543%200%206%200ZM6%201C5.44772%201%205%201.44772%205%202V6C5%206.55228%205.44772%207%206%207C6.55228%207%207%206.55228%207%206V2C7%201.44772%206.55228%201%206%201ZM7%209.87398V12H5V9.87398C3.27477%209.42994%202%207.86384%202%206V5.5C2%205.22386%202.22386%205%202.5%205C2.77614%205%203%205.22386%203%205.5V6C3%207.65685%204.34315%209%206%209C7.65685%209%209%207.65685%209%206V5.5C9%205.22386%209.22386%205%209.5%205C9.77614%205%2010%205.22386%2010%205.5V6C10%207.86384%208.72523%209.42994%207%209.87398Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"Mock Interview"}</_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Link>
      <_Builtin.Link
        className={_utils.cx(_styles, "nav_sublink", "hide")}
        button={false}
        options={{
          href: "/interview/history",
        }}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%206H8C8.27614%206%208.5%206.22386%208.5%206.5C8.5%206.77614%208.27614%207%208%207H5.5C5.22386%207%205%206.77614%205%206.5V3C5%202.72386%205.22386%202.5%205.5%202.5C5.77614%202.5%206%202.72386%206%203V6ZM6%2012C2.68629%2012%200%209.31371%200%206C0%202.68629%202.68629%200%206%200C9.31371%200%2012%202.68629%2012%206C12%209.31371%209.31371%2012%206%2012ZM6%2011C8.76142%2011%2011%208.76142%2011%206C11%203.23858%208.76142%201%206%201C3.23858%201%201%203.23858%201%206C1%208.76142%203.23858%2011%206%2011Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3Cmask%20id%3D%22mask0_6432_59047%22%20style%3D%22mask-type%3Aluminance%22%20maskunits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%206H8C8.27614%206%208.5%206.22386%208.5%206.5C8.5%206.77614%208.27614%207%208%207H5.5C5.22386%207%205%206.77614%205%206.5V3C5%202.72386%205.22386%202.5%205.5%202.5C5.77614%202.5%206%202.72386%206%203V6ZM6%2012C2.68629%2012%200%209.31371%200%206C0%202.68629%202.68629%200%206%200C9.31371%200%2012%202.68629%2012%206C12%209.31371%209.31371%2012%206%2012ZM6%2011C8.76142%2011%2011%208.76142%2011%206C11%203.23858%208.76142%201%206%201C3.23858%201%201%203.23858%201%206C1%208.76142%203.23858%2011%206%2011Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask0_6432_59047)%22%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block tag="div">{"Interview History"}</_Builtin.Block>
        {isInterviewHistory ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%206H8C8.27614%206%208.5%206.22386%208.5%206.5C8.5%206.77614%208.27614%207%208%207H5.5C5.22386%207%205%206.77614%205%206.5V3C5%202.72386%205.22386%202.5%205.5%202.5C5.77614%202.5%206%202.72386%206%203V6ZM6%2012C2.68629%2012%200%209.31371%200%206C0%202.68629%202.68629%200%206%200C9.31371%200%2012%202.68629%2012%206C12%209.31371%209.31371%2012%206%2012ZM6%2011C8.76142%2011%2011%208.76142%2011%206C11%203.23858%208.76142%201%206%201C3.23858%201%201%203.23858%201%206C1%208.76142%203.23858%2011%206%2011Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3Cmask%20id%3D%22mask0_6432_59047%22%20style%3D%22mask-type%3Aluminance%22%20maskunits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%220%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%206H8C8.27614%206%208.5%206.22386%208.5%206.5C8.5%206.77614%208.27614%207%208%207H5.5C5.22386%207%205%206.77614%205%206.5V3C5%202.72386%205.22386%202.5%205.5%202.5C5.77614%202.5%206%202.72386%206%203V6ZM6%2012C2.68629%2012%200%209.31371%200%206C0%202.68629%202.68629%200%206%200C9.31371%200%2012%202.68629%2012%206C12%209.31371%209.31371%2012%206%2012ZM6%2011C8.76142%2011%2011%208.76142%2011%206C11%203.23858%208.76142%201%206%201C3.23858%201%201%203.23858%201%206C1%208.76142%203.23858%2011%206%2011Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask0_6432_59047)%22%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"Interview History"}</_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Link>
      <_Builtin.Block
        className={_utils.cx(_styles, "nav_sublink")}
        tag="div"
        id="caq"
        {...onClickCommonlyAskedQuestions}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1%204.5C1%202.01472%203.01472%200%205.5%200C7.98528%200%2010%202.01472%2010%204.5C10%206.02983%209.2293%207.42083%208%208.2424V10H3V8.2424C1.7707%207.42083%201%206.02983%201%204.5ZM4%207.66318V9H7V7.66318C8.18247%207.10145%209%205.8962%209%204.5C9%202.567%207.433%201%205.5%201C3.567%201%202%202.567%202%204.5C2%205.8962%202.81753%207.10145%204%207.66318ZM3%2011H8C8%2011.5523%207.55228%2012%207%2012H4C3.44772%2012%203%2011.5523%203%2011ZM6%206V7.5C6%208.16667%205%208.16667%205%207.5V6H4.5C3.83333%206%203.83333%205%204.5%205H6.5C7.16667%205%207.16667%206%206.5%206H6Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block tag="div">{"Commonly Asked Questions"}</_Builtin.Block>
        {isCommonlyAskedQuestions ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1%204.5C1%202.01472%203.01472%200%205.5%200C7.98528%200%2010%202.01472%2010%204.5C10%206.02983%209.2293%207.42083%208%208.2424V10H3V8.2424C1.7707%207.42083%201%206.02983%201%204.5ZM4%207.66318V9H7V7.66318C8.18247%207.10145%209%205.8962%209%204.5C9%202.567%207.433%201%205.5%201C3.567%201%202%202.567%202%204.5C2%205.8962%202.81753%207.10145%204%207.66318ZM3%2011H8C8%2011.5523%207.55228%2012%207%2012H4C3.44772%2012%203%2011.5523%203%2011ZM6%206V7.5C6%208.16667%205%208.16667%205%207.5V6H4.5C3.83333%206%203.83333%205%204.5%205H6.5C7.16667%205%207.16667%206%206.5%206H6Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">
              {"Commonly Asked Questions"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
