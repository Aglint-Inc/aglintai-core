import React from "react";
import * as _Builtin from "./_Builtin";
import { IconLeftArrowOutlined } from "./IconLeftArrowOutlined";
import * as _utils from "./utils";
import _styles from "./ForgotPassword.module.css";

export function ForgotPassword({
  as: _Component = _Builtin.Block,
  slotForgotPasswordForm,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "forgot-password-page")}
      tag="div"
    >
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "forgot-password-wrapper", "is-mobile")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "forgot-password-header-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xl", "fw-semibold")}
              tag="div"
            >
              {"Forgot Password"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-md", "color-grey-600")}
              tag="div"
            >
              {
                "Enter the email you used to create your account so we can send you instructions on how to reset your password."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "forgot-password-slot")}
            tag="div"
          >
            {slotForgotPasswordForm}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Link
          className={_utils.cx(_styles, "back-link")}
          button={false}
          options={{
            href: "/login",
          }}
        >
          <IconLeftArrowOutlined />
          <_Builtin.Block tag="div">{"Back to Login"}</_Builtin.Block>
        </_Builtin.Link>
      </_Builtin.Block>
    </_Component>
  );
}
