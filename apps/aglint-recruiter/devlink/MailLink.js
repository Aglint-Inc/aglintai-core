import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./MailLink.module.css";

export function MailLink({
  as: _Component = _Builtin.Block,
  onClickLinkNow = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "link-mail-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-634")} tag="div">
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.33333%2015.9987C3.28%2015.9987%200%2012.7187%200%208.66536C0%204.61203%203.28%201.33203%207.33333%201.33203C11.3867%201.33203%2014.6667%204.61203%2014.6667%208.66536C14.6667%2012.7187%2011.3867%2015.9987%207.33333%2015.9987ZM6.66667%2012.6654C6.66667%2013.0387%206.96%2013.332%207.33333%2013.332C7.70667%2013.332%208%2013.0387%208%2012.6654V8.66536C8%208.29203%207.70667%207.9987%207.33333%207.9987C6.96%207.9987%206.66667%208.29203%206.66667%208.66536V12.6654ZM7.33333%203.9987C6.6%203.9987%206%204.5987%206%205.33203C6%206.06536%206.6%206.66536%207.33333%206.66536C8.06667%206.66536%208.66667%206.06536%208.66667%205.33203C8.66667%204.5987%208.06667%203.9987%207.33333%203.9987Z%22%20fill%3D%22%23F79A3E%22%20style%3D%22fill%3A%23F79A3E%3Bfill%3Acolor(display-p3%200.9686%200.6039%200.2431)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "text-yellow-800")}
          tag="div"
        >
          {"Link your email to send messages to candidates."}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div" {...onClickLinkNow}>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-blue-500", "text-underline")}
          tag="div"
        >
          {"Link now"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
