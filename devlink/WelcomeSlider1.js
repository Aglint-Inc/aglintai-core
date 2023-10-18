import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./WelcomeSlider1.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-818":{"id":"e-818","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-342","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-819"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":true},"createdOn":1694670592510},"e-819":{"id":"e-819","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-343","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-818"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694670592510},"e-820":{"id":"e-820","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-342","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-821"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8188b07-34af-73cb-6ca4-13782c20dc10","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8188b07-34af-73cb-6ca4-13782c20dc10","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":true},"createdOn":1694670592510},"e-821":{"id":"e-821","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-343","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-820"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8188b07-34af-73cb-6ca4-13782c20dc10","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8188b07-34af-73cb-6ca4-13782c20dc10","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694670592510},"e-822":{"id":"e-822","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-342","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-823"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8188b07-34af-73cb-6ca4-13782c20dc1a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8188b07-34af-73cb-6ca4-13782c20dc1a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":0,"direction":null,"effectIn":true},"createdOn":1694670592510},"e-823":{"id":"e-823","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-343","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-822"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f8188b07-34af-73cb-6ca4-13782c20dc1a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f8188b07-34af-73cb-6ca4-13782c20dc1a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694670592510},"e-824":{"id":"e-824","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-344","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-825"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ju-cta-btn","originalId":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"CLASS"},"targets":[{"selector":".ju-cta-btn","originalId":"f8188b07-34af-73cb-6ca4-13782c20dc06","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694684198873},"e-826":{"id":"e-826","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-345","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-827"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".ju-redirect-link.sign-in","originalId":"650c129b14ba3ec43088ffe0|0eceb87e-fa39-97e0-b799-497146b03323","appliesTo":"CLASS"},"targets":[{"selector":".ju-redirect-link.sign-in","originalId":"650c129b14ba3ec43088ffe0|0eceb87e-fa39-97e0-b799-497146b03323","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694684648206}},"actionLists":{"a-342":{"id":"a-342","title":"animated-opacity-[in]","actionItemGroups":[{"actionItems":[{"id":"a-342-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".animated-opacity","selectorGuids":["2293934d-0f96-7a01-ab1c-f1b7b36b6240"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-342-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".animated-opacity","selectorGuids":["2293934d-0f96-7a01-ab1c-f1b7b36b6240"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694591797471},"a-343":{"id":"a-343","title":"animated-opacity-[out]","actionItemGroups":[{"actionItems":[{"id":"a-343-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".animated-opacity","selectorGuids":["2293934d-0f96-7a01-ab1c-f1b7b36b6240"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694591877080},"a-344":{"id":"a-344","title":"sign-up-[open]","actionItemGroups":[{"actionItems":[{"id":"a-344-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-344-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":"none"}},{"id":"a-344-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".auth-right-block.sign-up","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","178d5435-5b0e-e3a4-d9f8-9d8275b14d31"]},"value":"flex"}}]},{"actionItems":[{"id":"a-344-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".auth-right-block.sign-up","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","178d5435-5b0e-e3a4-d9f8-9d8275b14d31"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694684223794},"a-345":{"id":"a-345","title":"login-[open]","actionItemGroups":[{"actionItems":[{"id":"a-345-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-345-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".auth-right-block","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba"]},"value":"none"}},{"id":"a-345-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".auth-right-block.login","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","9b76f671-e79b-6a67-4574-de8fce2fd55a"]},"value":"flex"}}]},{"actionItems":[{"id":"a-345-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".auth-right-block.login","selectorGuids":["af16ed69-91dd-c067-20ac-a3d59c51ebba","9b76f671-e79b-6a67-4574-de8fce2fd55a"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694684755830}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function WelcomeSlider1({
  as: _Component = _Builtin.Block,
  onClickCompany = {},
  onClickAgency = {},
  onClickConsultant = {},
  onClickSignIn = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "auth-right-block", "join-us")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "ju-right-top", "right-align")}
        tag="div"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "auth-cta-block", "tab-edit")}
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
            {"Join the future of hiring today!"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ju-header-description")}
            tag="div"
          >
            {
              "Signup for Aglint's Screening Co-Pilot and find the perfect match."
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "auth-form-block-recruiters")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "ju-cta-btn")}
            data-w-id="f8188b07-34af-73cb-6ca4-13782c20dc06"
            tag="div"
            {...onClickCompany}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ju-cta-btn-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "ju-cta-image")}
                tag="div"
              >
                <_Builtin.Image
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt=""
                  src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890234_company%201.svg"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ju-cta-content")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "ju-cta-company-name")}
                  tag="div"
                >
                  {"I'm a Company"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "ju-cta-company-desc")}
                  tag="div"
                >
                  {"I want to find the best talent for my in-house positions."}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Image
              className={_utils.cx(_styles, "ju-cta-arrow", "animated-opacity")}
              loading="lazy"
              width="20"
              height="20"
              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6500758f12a101e249463e97_Vectors-Wrapper.svg"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ju-cta-btn")}
            data-w-id="f8188b07-34af-73cb-6ca4-13782c20dc10"
            tag="div"
            {...onClickAgency}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ju-cta-btn-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "ju-cta-image")}
                tag="div"
              >
                <_Builtin.Image
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt=""
                  src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890233_hiring%201.svg"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ju-cta-content")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "ju-cta-company-name")}
                  tag="div"
                >
                  {"I'm a Recruiting Agency"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "ju-cta-company-desc")}
                  tag="div"
                >
                  {
                    "We specialize in sourcing candidates for various industries and roles."
                  }
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Image
              className={_utils.cx(_styles, "ju-cta-arrow", "animated-opacity")}
              loading="lazy"
              width="20"
              height="20"
              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6500758f12a101e249463e97_Vectors-Wrapper.svg"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ju-cta-btn")}
            data-w-id="f8188b07-34af-73cb-6ca4-13782c20dc1a"
            tag="div"
            {...onClickConsultant}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ju-cta-btn-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "ju-cta-image")}
                tag="div"
              >
                <_Builtin.Image
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt=""
                  src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec43089023a_Role%20Model_Flat%20(1).svg"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ju-cta-content")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "ju-cta-company-name")}
                  tag="div"
                >
                  {"I'm a Recruiting Consultant"}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "ju-cta-company-desc")}
                  tag="div"
                >
                  {
                    "I offer expert HR advice and recruitment services on a contract basis."
                  }
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Image
              className={_utils.cx(_styles, "ju-cta-arrow", "animated-opacity")}
              loading="lazy"
              width="20"
              height="20"
              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6500758f12a101e249463e97_Vectors-Wrapper.svg"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "ju-right-top", "align-left")}
          tag="div"
        >
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
    </_Component>
  );
}
