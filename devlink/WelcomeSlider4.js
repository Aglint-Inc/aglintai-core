import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./WelcomeSlider4.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-824":{"id":"e-824","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-344","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-825"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ju-cta-btn","originalId":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"CLASS"},"targets":[{"selector":".ju-cta-btn","originalId":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694684198873},"e-826":{"id":"e-826","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-345","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-827"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ju-redirect-link.sign-in","originalId":"650c129b14ba3ec43088ffe0|0eceb87e-fa39-97e0-b799-497146b03323","appliesTo":"CLASS"},"targets":[{"selector":".ju-redirect-link.sign-in","originalId":"650c129b14ba3ec43088ffe0|0eceb87e-fa39-97e0-b799-497146b03323","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694684648206}},"actionLists":{"a-344":{"id":"a-344","title":"sign-up-[open]","actionItemGroups":[{"actionItems":[{"id":"a-344-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-344-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":"none"}},{"id":"a-344-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".auth-right-block.sign-up","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","178d5435-5b0e-e3a4-d9f8-9d8275b14d31"]},"value":"flex"}}]},{"actionItems":[{"id":"a-344-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".auth-right-block.sign-up","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","178d5435-5b0e-e3a4-d9f8-9d8275b14d31"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694684223794},"a-345":{"id":"a-345","title":"login-[open]","actionItemGroups":[{"actionItems":[{"id":"a-345-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-345-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":"none"}},{"id":"a-345-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".auth-right-block.login","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","9b76f671-e79b-6a67-4574-de8fce2fd55a"]},"value":"flex"}}]},{"actionItems":[{"id":"a-345-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".auth-right-block.login","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","9b76f671-e79b-6a67-4574-de8fce2fd55a"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694684755830}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function WelcomeSlider4({
  as: _Component = _Builtin.Block,
  userName = "Robert Fergson",
  slotProfileForm1,
  onClickSaveCompanySites = {},
  isSaveCompanySiteDisable = true,
  isloadingVisible = false,
  isActiveButtonVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "auth-right-block", "su-step-one")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "ju-right-top", "right-align")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "su-step-count-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "su-steps-count")}
            tag="div"
          >
            {"STEP 01/02"}
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
        className={_utils.cx(_styles, "auth-cta-block", "su-step-one")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "auth-header-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "welcome-name")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xxl", "fw-semibold")}
              tag="div"
            >
              {"Welcome to Aglint for Employers!"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xxl", "fw-semibold", "hide")}
              tag="div"
            >
              {userName}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xxl", "fw-semibold")}
              tag="div"
            >
              {"🚀"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ju-header-description")}
            tag="div"
          >
            {
              "Enter your company website URL, and our system will automatically fetch the necessary details to set up your company profile. Let's dive in!"
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "auth-cta-form-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "auth-form-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-profile-form-1")}
              tag="div"
            >
              {slotProfileForm1}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "saveand-btn-wrapper", "relative")}
              tag="div"
            >
              {isloadingVisible ? (
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "su-btn",
                    "large",
                    "btn-loading"
                  )}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "loader-icons")}
                    value="%3Cstyle%3E%0A.loadersvg%2C%0A.loaderpath%7B%0A%20%20fill%3A%20%23ffff%3B%0A%7D%0A%3C%2Fstyle%3E%20%0A%20%20%3Csvg%20class%3D'loadersvg'%20version%3D%221.1%22%20id%3D%22loader-1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0A%20%20%20%20%20width%3D%2216px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2050%2050%22%20style%3D%22enable-background%3Anew%200%200%2050%2050%3B%22%20xml%3Aspace%3D%22preserve%22%3E%0A%20%20%3Cpath%20class%3D'loaderpath'%20fill%3D%22%23000%22%20d%3D%22M43.935%2C25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318%2C0-18.683%2C8.365-18.683%2C18.683h4.068c0-8.071%2C6.543-14.615%2C14.615-14.615c8.072%2C0%2C14.615%2C6.543%2C14.615%2C14.615H43.935z%22%3E%0A%20%20%20%20%3CanimateTransform%20attributeType%3D%22xml%22%0A%20%20%20%20%20%20attributeName%3D%22transform%22%0A%20%20%20%20%20%20type%3D%22rotate%22%0A%20%20%20%20%20%20from%3D%220%2025%2025%22%0A%20%20%20%20%20%20to%3D%22360%2025%2025%22%0A%20%20%20%20%20%20dur%3D%220.6s%22%0A%20%20%20%20%20%20repeatCount%3D%22indefinite%22%2F%3E%0A%20%20%20%20%3C%2Fpath%3E%0A%20%20%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block tag="div">{"Save & Continue"}</_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              {isActiveButtonVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "su-btn", "large", "active")}
                  tag="div"
                  {...onClickSaveCompanySites}
                >
                  <_Builtin.Block tag="div">{"Save & Continue"}</_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              {isSaveCompanySiteDisable ? (
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
