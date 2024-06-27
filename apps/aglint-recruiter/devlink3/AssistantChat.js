"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./AssistantChat.module.css";

export function AssistantChat({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "chat_text")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "chat_name_and_time")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%204C0%201.79086%201.79086%200%204%200H14C16.2091%200%2018%201.79086%2018%204V14C18%2016.2091%2016.2091%2018%2014%2018H4C1.79086%2018%200%2016.2091%200%2014V4Z%22%20fill%3D%22%238D8D86%22%2F%3E%0A%3Crect%20width%3D%2212%22%20height%3D%2212%22%20transform%3D%22translate(3%203)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M9.00001%203.70001C7.39839%203.70001%206.10001%204.99839%206.10001%206.60001C6.10001%207.92232%206.985%209.03792%208.19499%209.38682C7.23977%209.50322%206.42047%209.84108%205.80327%2010.4493C5.01774%2011.2235%204.62003%2012.376%204.62003%2013.8799C4.62003%2014.0899%204.79016%2014.2599%205.00003%2014.2599C5.2099%2014.2599%205.38003%2014.0899%205.38003%2013.8799C5.38003%2012.5039%205.7423%2011.5765%206.33674%2010.9907C6.9323%2010.4037%207.8214%2010.1%208.99997%2010.1C10.1785%2010.1%2011.0677%2010.4037%2011.6633%2010.9907C12.2577%2011.5765%2012.62%2012.5039%2012.62%2013.8799C12.62%2014.0899%2012.7901%2014.2599%2013%2014.2599C13.2099%2014.26%2013.38%2014.0899%2013.38%2013.88C13.38%2012.376%2012.9823%2011.2235%2012.1967%2010.4493C11.5795%209.84109%2010.7602%209.50324%209.80501%209.38683C11.015%209.03793%2011.9%207.92232%2011.9%206.60001C11.9%204.99839%2010.6016%203.70001%209.00001%203.70001ZM6.86001%206.60001C6.86001%205.41812%207.81812%204.46001%209.00001%204.46001C10.1819%204.46001%2011.14%205.41812%2011.14%206.60001C11.14%207.7819%2010.1819%208.74001%209.00001%208.74001C7.81812%208.74001%206.86001%207.7819%206.86001%206.60001Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <Text weight="medium" content="You" />
        <Text size="1" weight="" color="neutral" content="Just Now" />
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        {"Hey, schedule an interview with "}
        <_Builtin.Span className={_utils.cx(_styles, "link")}>
          {"@John Abraham"}
        </_Builtin.Span>
        {" for the "}
        <_Builtin.Span className={_utils.cx(_styles, "link")}>
          {"Software Engineer"}
        </_Builtin.Span>
        {" role."}
      </_Builtin.Block>
    </_Component>
  );
}
