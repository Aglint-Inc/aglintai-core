import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./SignUpPage.module.css";

export function SignUpPage({
  as: _Component = _Builtin.Block,
  slotSignUpForm,
  onClickGoogleButton = {},
  onClickLinkedInButton = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "signin-wrapper", "signup")}
      tag="div"
    >
      <_Builtin.Image
        className={_utils.cx(_styles, "signin-bg-image")}
        loading="eager"
        width="auto"
        height="auto"
        alt="__wf_reserved_inherit"
        src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec4308901e8_mitchell-luo-Aw8gYKOMuS4-unsplash%201%20(1).png"
      />
      <_Builtin.Block className={_utils.cx(_styles, "signin-block")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "signin-form-wrapper")}
          tag="div"
        >
          <_Builtin.Image
            className={_utils.cx(_styles, "app-logo-icon")}
            loading="lazy"
            width="auto"
            height="auto"
            alt="__wf_reserved_inherit"
            src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec4308901b9_64dcade0b3dfcf5fa5627009_App%20Logo.svg"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "signin-main-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "signin-top-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "signin-welcome-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "signin-welcome-text")}
                  tag="div"
                >
                  {"Create Your Account"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "third-party-signins")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-sm", "text-yellow-700")}
                  tag="div"
                >
                  {"Continue with Google or Linkedin"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "signin-icons-wrapper")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "signin-icon-block")}
                    tag="div"
                    {...onClickGoogleButton}
                  >
                    <_Builtin.Image
                      className={_utils.cx(_styles, "signin-icon")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt="__wf_reserved_inherit"
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec4308901c0_64dcae8d0156e8d54cb108e9_google%20logo.svg"
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "signin-icon-block")}
                    tag="div"
                    {...onClickLinkedInButton}
                  >
                    <_Builtin.Image
                      className={_utils.cx(_styles, "signin-icon")}
                      loading="lazy"
                      width="auto"
                      height="auto"
                      alt="__wf_reserved_inherit"
                      src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec4308901bf_64dcae8db3dfcf5fa563280a__linkedin.svg"
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "signin-divider-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "signin-hr")}
                tag="div"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm", "color-emial")}
                tag="div"
              >
                {"Or Continue With Email"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "signin-hr")}
                tag="div"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-form-sign-in")}
              tag="div"
            >
              {slotSignUpForm}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sign-up-now-wrappers")}
            tag="div"
          >
            <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
              {"Already have an account?"}
            </_Builtin.Block>
            <_Builtin.Link
              className={_utils.cx(_styles, "sign-up-now-link")}
              button={false}
              options={{
                href: "/login",
              }}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm")}
                tag="div"
              >
                {"Sign In"}
              </_Builtin.Block>
            </_Builtin.Link>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "signin-image-block-2")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "signin-cover-text")}
            tag="div"
          >
            {"AI Powered "}
            <br />
            {"Human Centered Career Growth Platform ✨"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
