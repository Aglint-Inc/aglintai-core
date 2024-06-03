"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ResetPassword.module.css";

export function ResetPassword({
  as: _Component = _Builtin.Block,
  slotResetPasswordForm,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "forgot-password-page")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-935")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "forgot-password-wrapper", "is-mobile")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "forgot-password-header-wrapper")}
            tag="div"
          >
            <Text
              content="Reset Password"
              size="6"
              weight="bold"
              align=""
              highContrast=""
            />
            <Text
              content="Enter new password to reset your password for your account."
              size="2"
              weight=""
              align=""
              highContrast=""
              color="neutral"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "forgot-password-slot")}
            tag="div"
          >
            {slotResetPasswordForm}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Link
          className={_utils.cx(_styles, "back-link")}
          button={false}
          block="inline"
          options={{
            href: "/login",
          }}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "back-arrow-icon")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2010%207%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.146447%203.85355C-0.0488155%203.65828%20-0.0488155%203.3417%200.146447%203.14644L3.14645%200.146446C3.34171%20-0.0488157%203.65829%20-0.0488151%203.85355%200.146447C4.04881%200.341709%204.04881%200.658292%203.85355%200.853554L1.70711%202.99999L9.5%203C9.77614%203%2010%203.22386%2010%203.5C10%203.77614%209.77614%204%209.5%204L1.70711%203.99999L3.85355%206.14644C4.04882%206.3417%204.04882%206.65828%203.85355%206.85354C3.65829%207.04881%203.34171%207.04881%203.14645%206.85354L0.146447%203.85355Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"Back to Login"}</_Builtin.Block>
        </_Builtin.Link>
      </_Builtin.Block>
    </_Component>
  );
}
