import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SublinksCoach.module.css";

export function SublinksCoach({
  as: _Component = _Builtin.Block,
  isAskCoach = true,
  isMyCoach = true,
  isSuggestedByCoach = true,
  isPlanDetails = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "nav_sublinks")} tag="div">
      <_Builtin.Link
        className={_utils.cx(_styles, "nav_sublink")}
        button={false}
        id="ask-coach"
        block="inline"
        options={{
          href: "/career-coach",
        }}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_6495_60135)%22%3E%0A%3Cpath%20d%3D%22M14%2010C14%2010.3536%2013.8595%2010.6928%2013.6095%2010.9428C13.3594%2011.1929%2013.0203%2011.3333%2012.6667%2011.3333H4.66667L2%2014V3.33333C2%202.97971%202.14048%202.64057%202.39052%202.39052C2.64057%202.14048%202.97971%202%203.33333%202H12.6667C13.0203%202%2013.3594%202.14048%2013.6095%202.39052C13.8595%202.64057%2014%202.97971%2014%203.33333V10Z%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.33333%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cclippath%20id%3D%22clip0_6495_60135%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block tag="div">{"Ask To Coach"}</_Builtin.Block>
        {isAskCoach ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20clip-path%3D%22url(%23clip0_6495_60135)%22%3E%0A%3Cpath%20d%3D%22M14%2010C14%2010.3536%2013.8595%2010.6928%2013.6095%2010.9428C13.3594%2011.1929%2013.0203%2011.3333%2012.6667%2011.3333H4.66667L2%2014V3.33333C2%202.97971%202.14048%202.64057%202.39052%202.39052C2.64057%202.14048%202.97971%202%203.33333%202H12.6667C13.0203%202%2013.3594%202.14048%2013.6095%202.39052C13.8595%202.64057%2014%202.97971%2014%203.33333V10Z%22%20stroke%3D%22currentColor%22%20stroke-width%3D%221.33333%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%3C%2Fg%3E%0A%3Cdefs%3E%0A%3Cclippath%20id%3D%22clip0_6495_60135%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fclippath%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"Ask To Coach"}</_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Link>
      <_Builtin.Link
        className={_utils.cx(_styles, "nav_sublink")}
        button={false}
        id="my-coach"
        block="inline"
        options={{
          href: "/career-coach/my-coach",
        }}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.99815%2011.5433C1.97423%2011.8184%201.73182%2012.022%201.45672%2011.9981C1.18161%2011.9742%200.977987%2011.7318%201.00191%2011.4567C1.22227%208.92255%203.41465%207%206.00003%207C8.58541%207%2010.7778%208.92255%2010.9981%2011.4567C11.0221%2011.7318%2010.8184%2011.9742%2010.5433%2011.9981C10.2682%2012.022%2010.0258%2011.8184%2010.0019%2011.5433C9.82734%209.53574%208.07605%208%206.00003%208C3.92401%208%202.17272%209.53574%201.99815%2011.5433ZM6.00003%206C4.34318%206%203.00003%204.65685%203.00003%203C3.00003%201.34315%204.34318%200%206.00003%200C7.65688%200%209.00003%201.34315%209.00003%203C9.00003%204.65685%207.65688%206%206.00003%206ZM6.00003%205C7.1046%205%208.00003%204.10457%208.00003%203C8.00003%201.89543%207.1046%201%206.00003%201C4.89546%201%204.00003%201.89543%204.00003%203C4.00003%204.10457%204.89546%205%206.00003%205Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block tag="div">{"My Coach"}</_Builtin.Block>
        {isMyCoach ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.99815%2011.5433C1.97423%2011.8184%201.73182%2012.022%201.45672%2011.9981C1.18161%2011.9742%200.977987%2011.7318%201.00191%2011.4567C1.22227%208.92255%203.41465%207%206.00003%207C8.58541%207%2010.7778%208.92255%2010.9981%2011.4567C11.0221%2011.7318%2010.8184%2011.9742%2010.5433%2011.9981C10.2682%2012.022%2010.0258%2011.8184%2010.0019%2011.5433C9.82734%209.53574%208.07605%208%206.00003%208C3.92401%208%202.17272%209.53574%201.99815%2011.5433ZM6.00003%206C4.34318%206%203.00003%204.65685%203.00003%203C3.00003%201.34315%204.34318%200%206.00003%200C7.65688%200%209.00003%201.34315%209.00003%203C9.00003%204.65685%207.65688%206%206.00003%206ZM6.00003%205C7.1046%205%208.00003%204.10457%208.00003%203C8.00003%201.89543%207.1046%201%206.00003%201C4.89546%201%204.00003%201.89543%204.00003%203C4.00003%204.10457%204.89546%205%206.00003%205Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"My Coach"}</_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Link>
      <_Builtin.Link
        className={_utils.cx(_styles, "nav_sublink")}
        button={false}
        id="suggesteed-coach"
        block="inline"
        options={{
          href: "/career-coach/suggetions",
        }}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1%204.5C1%202.01472%203.01472%200%205.5%200C7.98528%200%2010%202.01472%2010%204.5C10%206.02983%209.2293%207.42083%208%208.2424V10H3V8.2424C1.7707%207.42083%201%206.02983%201%204.5ZM4%207.66318V9H7V7.66318C8.18247%207.10145%209%205.8962%209%204.5C9%202.567%207.433%201%205.5%201C3.567%201%202%202.567%202%204.5C2%205.8962%202.81753%207.10145%204%207.66318ZM3%2011H8C8%2011.5523%207.55228%2012%207%2012H4C3.44772%2012%203%2011.5523%203%2011ZM6%206V7.5C6%208.16667%205%208.16667%205%207.5V6H4.5C3.83333%206%203.83333%205%204.5%205H6.5C7.16667%205%207.16667%206%206.5%206H6Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block tag="div">{"Suggested By Coach"}</_Builtin.Block>
        {isSuggestedByCoach ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1%204.5C1%202.01472%203.01472%200%205.5%200C7.98528%200%2010%202.01472%2010%204.5C10%206.02983%209.2293%207.42083%208%208.2424V10H3V8.2424C1.7707%207.42083%201%206.02983%201%204.5ZM4%207.66318V9H7V7.66318C8.18247%207.10145%209%205.8962%209%204.5C9%202.567%207.433%201%205.5%201C3.567%201%202%202.567%202%204.5C2%205.8962%202.81753%207.10145%204%207.66318ZM3%2011H8C8%2011.5523%207.55228%2012%207%2012H4C3.44772%2012%203%2011.5523%203%2011ZM6%206V7.5C6%208.16667%205%208.16667%205%207.5V6H4.5C3.83333%206%203.83333%205%204.5%205H6.5C7.16667%205%207.16667%206%206.5%206H6Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"Suggested By Coach"}</_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Link>
      <_Builtin.Link
        className={_utils.cx(_styles, "nav_sublink")}
        button={false}
        id="plan-details"
        block="inline"
        options={{
          href: "/career-coach/plan",
        }}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.5%2011C1.22386%2011%201%2010.7761%201%2010.5C1%2010.2239%201.22386%2010%201.5%2010H10.5C10.7761%2010%2011%2010.2239%2011%2010.5C11%2010.7761%2010.7761%2011%2010.5%2011H1.5ZM1.5%208C1.22386%208%201%207.77614%201%207.5C1%207.22386%201.22386%207%201.5%207H10.5C10.7761%207%2011%207.22386%2011%207.5C11%207.77614%2010.7761%208%2010.5%208H1.5ZM1.5%205C1.22386%205%201%204.77614%201%204.5C1%204.22386%201.22386%204%201.5%204H10.5C10.7761%204%2011%204.22386%2011%204.5C11%204.77614%2010.7761%205%2010.5%205H1.5ZM1.5%202C1.22386%202%201%201.77614%201%201.5C1%201.22386%201.22386%201%201.5%201H10.5C10.7761%201%2011%201.22386%2011%201.5C11%201.77614%2010.7761%202%2010.5%202H1.5Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block tag="div">{"Plan Details"}</_Builtin.Block>
        {isPlanDetails ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1.5%2011C1.22386%2011%201%2010.7761%201%2010.5C1%2010.2239%201.22386%2010%201.5%2010H10.5C10.7761%2010%2011%2010.2239%2011%2010.5C11%2010.7761%2010.7761%2011%2010.5%2011H1.5ZM1.5%208C1.22386%208%201%207.77614%201%207.5C1%207.22386%201.22386%207%201.5%207H10.5C10.7761%207%2011%207.22386%2011%207.5C11%207.77614%2010.7761%208%2010.5%208H1.5ZM1.5%205C1.22386%205%201%204.77614%201%204.5C1%204.22386%201.22386%204%201.5%204H10.5C10.7761%204%2011%204.22386%2011%204.5C11%204.77614%2010.7761%205%2010.5%205H1.5ZM1.5%202C1.22386%202%201%201.77614%201%201.5C1%201.22386%201.22386%201%201.5%201H10.5C10.7761%201%2011%201.22386%2011%201.5C11%201.77614%2010.7761%202%2010.5%202H1.5Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"Plan Details"}</_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Link>
    </_Component>
  );
}
