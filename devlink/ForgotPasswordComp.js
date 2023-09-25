import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ForgotPasswordComp.module.css";

export function ForgotPasswordComp({
  as: _Component = _Builtin.Block,
  isChecked = false,
  onClickCheckbox = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "signin-checkmark-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "sign-checkbox-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "checkbox-wrappers")}
          tag="div"
          {...onClickCheckbox}
        >
          {isChecked ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed-check-icon")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%23AD5918%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%208.58579L10.2929%205.29289C10.6834%204.90237%2011.3166%204.90237%2011.7071%205.29289C12.0976%205.68342%2012.0976%206.31658%2011.7071%206.70711L7.70711%2010.7071C7.31658%2011.0976%206.68342%2011.0976%206.29289%2010.7071L4.29289%208.70711C3.90237%208.31658%203.90237%207.68342%204.29289%207.29289C4.68342%206.90237%205.31658%206.90237%205.70711%207.29289L7%208.58579Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-sm", "color-grey-600")}
          tag="div"
        >
          {"Remember Me"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Link
        className={_utils.cx(_styles, "links-forgot")}
        button={false}
        options={{
          href: "/forgot-password",
        }}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "forgot-text-link")}
          tag="div"
        >
          {"Forgot Password"}
        </_Builtin.Block>
      </_Builtin.Link>
    </_Component>
  );
}
