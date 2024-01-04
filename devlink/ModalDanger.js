import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./ModalDanger.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-7":{"id":"e-7","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-3","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-78"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9b1d8b98-bdd6-5097-f16f-6720ac94f85d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9b1d8b98-bdd6-5097-f16f-6720ac94f85d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1685515815769},"e-11":{"id":"e-11","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-4","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-112"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9b1d8b98-bdd6-5097-f16f-6720ac94f861","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9b1d8b98-bdd6-5097-f16f-6720ac94f861","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1685516227236},"e-13":{"id":"e-13","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-4","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-118"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"9b1d8b98-bdd6-5097-f16f-6720ac94f86a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"9b1d8b98-bdd6-5097-f16f-6720ac94f86a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1685516559831}},"actionLists":{"a-3":{"id":"a-3","title":"Modal 1 - Popup open Danger","actionItemGroups":[{"actionItems":[{"id":"a-3-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".danger-modal-popup","selectorGuids":["6de71bc2-54cd-ffb3-97f3-5fa761f362ca"]},"value":"none"}},{"id":"a-3-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".danger-modal-popup","selectorGuids":["6de71bc2-54cd-ffb3-97f3-5fa761f362ca"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-3-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".danger-modal-popup","selectorGuids":["6de71bc2-54cd-ffb3-97f3-5fa761f362ca"]},"value":"flex"}},{"id":"a-3-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":250,"target":{"useEventTarget":"SIBLINGS","selector":".danger-modal-popup","selectorGuids":["6de71bc2-54cd-ffb3-97f3-5fa761f362ca"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1663936524957},"a-4":{"id":"a-4","title":"Modal 1 - Popup close Danger","actionItemGroups":[{"actionItems":[{"id":"a-4-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":250,"target":{"selector":".danger-modal-popup","selectorGuids":["6de71bc2-54cd-ffb3-97f3-5fa761f362ca"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-4-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".danger-modal-popup","selectorGuids":["6de71bc2-54cd-ffb3-97f3-5fa761f362ca"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1663936524957}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ModalDanger({
  as: _Component = _Builtin.Block,
  modalDangerButtontext = "Open Danger modal",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "danger-modal")} tag="div">
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "fs_modal-1_embed")}
        value="%3C!--%20%5BFinsweet%20Attributes%5D%20A11Y%20--%3E%0A%3Cscript%3E(()%3D%3E%7Bvar%20t%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2F%40finsweet%2Fattributes-a11y%401%2Fa11y.js%22%2Ce%3Ddocument.querySelector(%60script%5Bsrc%3D%22%24%7Bt%7D%22%5D%60)%3Be%7C%7C(e%3Ddocument.createElement(%22script%22)%2Ce.async%3D!0%2Ce.src%3Dt%2Cdocument.head.append(e))%3B%7D)()%3B%3C%2Fscript%3E"
      />
      <_Builtin.Heading
        className={_utils.cx(_styles, "subtitle-lead")}
        id={_utils.cx(
          _styles,
          "w-node-_9b1d8b98-bdd6-5097-f16f-6720ac94f85b-ac94f859"
        )}
        tag="h3"
      >
        {"Danger Modal"}
      </_Builtin.Heading>
      <_Builtin.Block
        className={_utils.cx(_styles, "modal-danger")}
        data-w-id="9b1d8b98-bdd6-5097-f16f-6720ac94f85d"
        tag="div"
        role="button"
        aria-roledescription="open-modal-trigger"
        aria-controls="fs-modal-1-popup"
        aria-haspopup="dialog"
        aria-expanded="false"
        tabIndex="0"
      >
        <_Builtin.Block tag="div">{modalDangerButtontext}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "danger-modal-popup")}
        tag="div"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fs-modal-1-heading"
        id="fs-modal-1-popup"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "fs_modal-1_cover")}
          data-w-id="9b1d8b98-bdd6-5097-f16f-6720ac94f861"
          tag="div"
          aria-hidden="true"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "fs_modal-1_wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fs_modal-1_content")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "modal-header-wrapper")}
              id={_utils.cx(
                _styles,
                "w-node-_9b1d8b98-bdd6-5097-f16f-6720ac94f864-ac94f859"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "modal-danger-header-wrapper")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "danger-icon")}
                  value="%3Csvg%20width%3D%2215%22%20height%3D%2215%22%20viewbox%3D%220%200%2015%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.5%205C8.05228%205%208.5%204.55228%208.5%204C8.5%203.44772%208.05228%203%207.5%203C6.94772%203%206.5%203.44772%206.5%204C6.5%204.55228%206.94772%205%207.5%205ZM7.5%2012C7.77614%2012%208%2011.7761%208%2011.5V7C8%206.72386%207.77614%206.5%207.5%206.5C7.22386%206.5%207%206.72386%207%207V11.5C7%2011.7761%207.22386%2012%207.5%2012ZM7.5%2015C3.35786%2015%200%2011.6421%200%207.5C0%203.35786%203.35786%200%207.5%200C11.6421%200%2015%203.35786%2015%207.5C15%2011.6421%2011.6421%2015%207.5%2015ZM7.5%2014C11.0899%2014%2014%2011.0899%2014%207.5C14%203.91015%2011.0899%201%207.5%201C3.91015%201%201%203.91015%201%207.5C1%2011.0899%203.91015%2014%207.5%2014Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "modal-heading-danger")}
                  tag="div"
                  id="fs-modal-1-heading"
                >
                  {"Remove Accessible popup"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "fs_modal-1_close")}
                tag="div"
                role="button"
                aria-roledescription="close-modal-trigger"
                aria-controls="fs-modal-1-popup"
                aria-label="Close modal"
                tabIndex="0"
                aria-expanded="false"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "fs_modal-1_close-icon")}
                  data-w-id="9b1d8b98-bdd6-5097-f16f-6720ac94f86a"
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%208%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0.646447%207.35355C0.841709%207.54882%201.15829%207.54882%201.35355%207.35355L4%204.70711L6.64645%207.35355C6.84171%207.54882%207.15829%207.54882%207.35355%207.35355C7.54882%207.15829%207.54882%206.84171%207.35355%206.64645L4.70711%204L7.35355%201.35355C7.54882%201.15829%207.54882%200.841709%207.35355%200.646447C7.15829%200.451184%206.84171%200.451184%206.64645%200.646447L4%203.29289L1.35355%200.646447C1.15829%200.451184%200.841709%200.451184%200.646447%200.646447C0.451184%200.841709%200.451184%201.15829%200.646447%201.35355L3.29289%204L0.646447%206.64645C0.451184%206.84171%200.451184%207.15829%200.646447%207.35355Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "modal-line")}
              id={_utils.cx(
                _styles,
                "w-node-_9b1d8b98-bdd6-5097-f16f-6720ac94f86b-ac94f859"
              )}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "modal-para-wrapper")}
              id={_utils.cx(
                _styles,
                "w-node-_9b1d8b98-bdd6-5097-f16f-6720ac94f86c-ac94f859"
              )}
              tag="div"
            >
              <_Builtin.Paragraph
                className={_utils.cx(_styles, "fs_modal-1_description")}
              >
                {
                  "Welcome to Finsweet's accessible modal component for Webflow Libraries. This modal uses Webflow Interactions to open and close. It is accessible through custom attributes and custom JavaScript added in the embed block of the component. If you're interested in how this is built"
                }
              </_Builtin.Paragraph>
              <_Builtin.Block
                className={_utils.cx(_styles, "modal-btn-wrapper")}
                id={_utils.cx(
                  _styles,
                  "w-node-_9b1d8b98-bdd6-5097-f16f-6720ac94f86f-ac94f859"
                )}
                tag="div"
              >
                <_Builtin.Link
                  className={_utils.cx(_styles, "button-transparent")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_9b1d8b98-bdd6-5097-f16f-6720ac94f870-ac94f859"
                  )}
                  button={true}
                  block=""
                  options={{
                    href: "https://www.finsweet.com/attributes/modal",
                    target: "_blank",
                  }}
                >
                  {"Cancel"}
                </_Builtin.Link>
                <_Builtin.Link
                  className={_utils.cx(_styles, "button-danger")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_9b1d8b98-bdd6-5097-f16f-6720ac94f872-ac94f859"
                  )}
                  button={true}
                  block=""
                  options={{
                    href: "https://www.finsweet.com/attributes/modal",
                    target: "_blank",
                  }}
                >
                  {"Remove plant food"}
                </_Builtin.Link>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
