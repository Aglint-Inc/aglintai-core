import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ChatWelcome.module.css";

export function ChatWelcome({
  as: _Component = _Builtin.Block,
  onClickYesPlease = {},
  textCompanyName = (
    <>
      {"Logoipsum. "}
      <br />
    </>
  ),
}) {
  return (
    <_Component tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "chatbody-main-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "text-xxxl",
            "fw-semibold",
            "text-grey-500"
          )}
          tag="div"
        >
          {"Hi there!"}
          <br />
          {"I'm the AI assistant for "}
          <br />
          {""}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "text-xxxl",
            "fw-semibold",
            "text-grey-500"
          )}
          tag="div"
        >
          {textCompanyName}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-xxxl", "fw-semibold")}
          tag="div"
        >
          {"Can I assist you in finding a suitable job opportunity today?"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "chat-main-button-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "chat-main-button")}
          tag="div"
          {...onClickYesPlease}
        >
          <_Builtin.Block tag="div">{"Yes, Please"}</_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2214%22%20viewBox%3D%220%200%2016%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.33984%200.515625L14.4258%205.76562C15.3008%206.14844%2015.3008%207.37891%2014.4258%207.76172L2.33984%2013.0117C1.41016%2013.4219%200.453125%2012.3828%200.945312%2011.4805L2.85938%207.95312C2.96875%207.73438%203.1875%207.57031%203.46094%207.54297L8.27344%206.94141C8.35547%206.94141%208.4375%206.85938%208.4375%206.75C8.4375%206.66797%208.35547%206.58594%208.27344%206.58594L3.46094%205.98438C3.1875%205.92969%202.96875%205.79297%202.85938%205.57422L0.945312%202.04688C0.453125%201.14453%201.41016%200.105469%202.33984%200.515625Z%22%20fill%3D%22white%22%20style%3D%22fill%3Awhite%3Bfill%3Awhite%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
