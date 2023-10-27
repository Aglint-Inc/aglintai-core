import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./WelcomeSlider5.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-824":{"id":"e-824","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-344","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-825"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ju-cta-btn","originalId":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"CLASS"},"targets":[{"selector":".ju-cta-btn","originalId":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694684198873},"e-826":{"id":"e-826","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-345","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-827"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ju-redirect-link.sign-in","originalId":"650c129b14ba3ec43088ffe0|0eceb87e-fa39-97e0-b799-497146b03323","appliesTo":"CLASS"},"targets":[{"selector":".ju-redirect-link.sign-in","originalId":"650c129b14ba3ec43088ffe0|0eceb87e-fa39-97e0-b799-497146b03323","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694684648206}},"actionLists":{"a-344":{"id":"a-344","title":"sign-up-[open]","actionItemGroups":[{"actionItems":[{"id":"a-344-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-344-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":"none"}},{"id":"a-344-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".auth-right-block.sign-up","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","178d5435-5b0e-e3a4-d9f8-9d8275b14d31"]},"value":"flex"}}]},{"actionItems":[{"id":"a-344-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".auth-right-block.sign-up","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","178d5435-5b0e-e3a4-d9f8-9d8275b14d31"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694684223794},"a-345":{"id":"a-345","title":"login-[open]","actionItemGroups":[{"actionItems":[{"id":"a-345-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-345-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":"none"}},{"id":"a-345-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".auth-right-block.login","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","9b76f671-e79b-6a67-4574-de8fce2fd55a"]},"value":"flex"}}]},{"actionItems":[{"id":"a-345-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".auth-right-block.login","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","9b76f671-e79b-6a67-4574-de8fce2fd55a"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694684755830}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function WelcomeSlider5({
  as: _Component = _Builtin.Block,
  onClickBack = {},
  onClickAddCompanyLogo = {},
  slotCompanyLogo,
  slotPhoneInput,
  isSaveDisableAddCompanyLogo = true,
  onClickSave = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "auth-right-block", "su-step-two-profile")}
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
        <_Builtin.Block
          className={_utils.cx(_styles, "su-step-count-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "su-steps-count")}
            tag="div"
          >
            {"STEP 02/02"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "su-steps-description")}
            tag="div"
          >
            {"Set up Profile"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "auth-cta-block", "su-step-two")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "auth-header-block", "gap-0")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-xxl", "fw-semibold")}
            tag="div"
          >
            {"Customize Your Aglint Recruiter Profile"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ju-header-description")}
            tag="div"
          >
            {"Add some finishing touches to make your account truly yours."}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "auth-form-block", "max-width-600")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-263")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "su-two-company-logo")}
              tag="div"
              {...onClickAddCompanyLogo}
            >
              {slotCompanyLogo}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-262")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "text-lg",
                  "fw-semibold",
                  "color-black"
                )}
                tag="div"
              >
                {"Add company Logo"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "color-grey-600")}
                tag="div"
              >
                {
                  "Enhance your recruiter profile! Elevate your brand presence by adding your company logo – it's the first step towards making a memorable impression."
                }
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "input-wrapper")}
            tag="div"
          >
            {slotPhoneInput}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-264")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "su-two-button", "relative")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "su-btn", "large")}
                tag="div"
                {...onClickSave}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-no-wrap")}
                  tag="div"
                >
                  {"Save & Continue"}
                </_Builtin.Block>
              </_Builtin.Block>
              {isSaveDisableAddCompanyLogo ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "su-btn", "large", "disable")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">{"Save & Continue"}</_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
