import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./WelcomeSlider3.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-824":{"id":"e-824","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-344","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-825"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ju-cta-btn","originalId":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"CLASS"},"targets":[{"selector":".ju-cta-btn","originalId":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694684198873},"e-826":{"id":"e-826","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-345","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-827"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ju-redirect-link.sign-in","originalId":"650c129b14ba3ec43088ffe0|0eceb87e-fa39-97e0-b799-497146b03323","appliesTo":"CLASS"},"targets":[{"selector":".ju-redirect-link.sign-in","originalId":"650c129b14ba3ec43088ffe0|0eceb87e-fa39-97e0-b799-497146b03323","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694684648206}},"actionLists":{"a-344":{"id":"a-344","title":"sign-up-[open]","actionItemGroups":[{"actionItems":[{"id":"a-344-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-344-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":"none"}},{"id":"a-344-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".auth-right-block.sign-up","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","178d5435-5b0e-e3a4-d9f8-9d8275b14d31"]},"value":"flex"}}]},{"actionItems":[{"id":"a-344-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".auth-right-block.sign-up","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","178d5435-5b0e-e3a4-d9f8-9d8275b14d31"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694684223794},"a-345":{"id":"a-345","title":"login-[open]","actionItemGroups":[{"actionItems":[{"id":"a-345-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-345-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":"none"}},{"id":"a-345-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".auth-right-block.login","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","9b76f671-e79b-6a67-4574-de8fce2fd55a"]},"value":"flex"}}]},{"actionItems":[{"id":"a-345-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".auth-right-block.login","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","9b76f671-e79b-6a67-4574-de8fce2fd55a"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694684755830}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function WelcomeSlider3({
  as: _Component = _Builtin.Block,
  onClickRegisterWithGoogle = {},
  onClickRegisterLinkedIn = {},
  slotSignUpForm,
  onClickBack = {},
  onClickSignIn = {},
  isTermsChecked = true,
  onClickSignUp = {},
  onClickCheck = {},
  isSignUpButtonVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "auth-right-block", "sign-up-sign")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "ju-right-top")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "back-btn-wrapper")}
          tag="div"
          {...onClickBack}
        >
          <_Builtin.Block className={_utils.cx(_styles, "back-icon")} tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed-icon")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20d%3D%22M14.8625%203.225L13.3792%201.75L5.13751%2010L13.3875%2018.25L14.8625%2016.775L8.08751%2010L14.8625%203.225Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block tag="div">{"Back"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "auth-cta-block", "sign-up", "tab-edit")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "auth-header-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-xxl", "fw-semibold")}
            tag="div"
          >
            {"Start your journey with us by signing up below."}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ju-header-description")}
            tag="div"
          >
            {
              "Sign Up with Google or LinkedIn, or simply register using your email below."
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "auth-cta-form-block")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "hr")} tag="div" />
          <_Builtin.Block
            className={_utils.cx(_styles, "auth-form-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "auth-form-block-connect")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "su-cta-btn")}
                tag="div"
                {...onClickRegisterWithGoogle}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "su-cta-btn-block")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "embed-icon")}
                    value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M21.8055%2010.0415H21V10H12V14H17.6515C16.827%2016.3285%2014.6115%2018%2012%2018C8.6865%2018%206%2015.3135%206%2012C6%208.6865%208.6865%206%2012%206C13.5295%206%2014.921%206.577%2015.9805%207.5195L18.809%204.691C17.023%203.0265%2014.634%202%2012%202C6.4775%202%202%206.4775%202%2012C2%2017.5225%206.4775%2022%2012%2022C17.5225%2022%2022%2017.5225%2022%2012C22%2011.3295%2021.931%2010.675%2021.8055%2010.0415Z%22%20fill%3D%22%23FFC107%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M3.15298%207.3455L6.43848%209.755C7.32748%207.554%209.48048%206%2012%206C13.5295%206%2014.921%206.577%2015.9805%207.5195L18.809%204.691C17.023%203.0265%2014.634%202%2012%202C8.15898%202%204.82798%204.1685%203.15298%207.3455Z%22%20fill%3D%22%23FF3D00%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M12%2022.0003C14.583%2022.0003%2016.93%2021.0118%2018.7045%2019.4043L15.6095%2016.7853C14.5718%2017.5745%2013.3037%2018.0014%2012%2018.0003C9.399%2018.0003%207.1905%2016.3418%206.3585%2014.0273L3.0975%2016.5398C4.7525%2019.7783%208.1135%2022.0003%2012%2022.0003Z%22%20fill%3D%22%234CAF50%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M21.8055%2010.0415H21V10H12V14H17.6515C17.2571%2015.1082%2016.5467%2016.0766%2015.608%2016.7855L15.6095%2016.7845L18.7045%2019.4035C18.4855%2019.6025%2022%2017%2022%2012C22%2011.3295%2021.931%2010.675%2021.8055%2010.0415Z%22%20fill%3D%22%231976D2%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "ju-cta-content")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "ju-cta-company-name")}
                      tag="div"
                    >
                      {"Sign up with Google"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "su-cta-btn")}
                tag="div"
                {...onClickRegisterLinkedIn}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "su-cta-btn-block")}
                  tag="div"
                >
                  <_Builtin.Image
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890206_LinkedIn%20-%20png%20-%2012px.png"
                  />
                  <_Builtin.Block
                    className={_utils.cx(_styles, "ju-cta-content")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "ju-cta-company-name")}
                      tag="div"
                    >
                      {"Sign up with LinkedIn"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "su-or")} tag="div">
              {"Or"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-260")}
              tag="div"
            >
              {slotSignUpForm}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "terms-sign-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "terms-sub-wrappers")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "terms-check-wrapper")}
                  tag="div"
                  {...onClickCheck}
                >
                  {isTermsChecked ? (
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "html-embed-69")}
                      value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0.666626%203.16797C0.666626%201.78726%201.78591%200.667969%203.16663%200.667969H14.8333C16.214%200.667969%2017.3333%201.78726%2017.3333%203.16797V14.8346C17.3333%2016.2153%2016.214%2017.3346%2014.8333%2017.3346H3.16663C1.78591%2017.3346%200.666626%2016.2153%200.666626%2014.8346V3.16797Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M13.0952%205.91211C13.4206%206.23755%2013.4206%206.76518%2013.0952%207.09062L7.92259%2012.5073C7.59715%2012.8327%207.06951%2012.8327%206.74408%2012.5073L4.24408%2010.0073C3.91864%209.68185%203.91864%209.15421%204.24408%208.82878C4.56951%208.50334%205.09715%208.50334%205.42259%208.82878L7.33333%2010.7395L11.9167%205.91211C12.2421%205.58667%2012.7697%205.58667%2013.0952%205.91211Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  ) : null}
                </_Builtin.Block>
                <_Builtin.Block tag="div">
                  {"I agree to terms & conditions"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "login-form-btn-wrapper",
                  "relative"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "su-btn")}
                  tag="div"
                  {...onClickSignUp}
                >
                  <_Builtin.Block tag="div">{"Sign Up"}</_Builtin.Block>
                </_Builtin.Block>
                {isSignUpButtonVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "su-btn", "disable")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">{"Sign Up"}</_Builtin.Block>
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "ju-redirect-text")}
              tag="div"
            >
              {"Already have an account? "}
              <_Builtin.Span
                className={_utils.cx(_styles, "sign-in-text")}
                {...onClickSignIn}
              >
                {"Sign In"}
              </_Builtin.Span>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
