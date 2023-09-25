import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./ModalDefault.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e":{"id":"e","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-2","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-360"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"683a0c0d-7d09-fad5-6b91-5fc34abdb04b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"683a0c0d-7d09-fad5-6b91-5fc34abdb04b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1664819622739},"e-5":{"id":"e-5","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-185"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".fs_modal-1_button","originalId":"65f7b7d0-ce13-f63a-1a30-4df7265835e3","appliesTo":"CLASS"},"targets":[{"selector":".fs_modal-1_button","originalId":"65f7b7d0-ce13-f63a-1a30-4df7265835e3","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1667592839516},"e-9":{"id":"e-9","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-2","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-114"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"683a0c0d-7d09-fad5-6b91-5fc34abdb051","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"683a0c0d-7d09-fad5-6b91-5fc34abdb051","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1685516107554}},"actionLists":{"a-2":{"id":"a-2","title":"Modal 1 - Popup close","actionItemGroups":[{"actionItems":[{"id":"a-2-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":250,"target":{"selector":".fs_modal-1_popup","selectorGuids":["4532f9af-e4e1-a18b-2886-82d3e46bb157"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-2-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".fs_modal-1_popup","selectorGuids":["4532f9af-e4e1-a18b-2886-82d3e46bb157"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1663936524957},"a":{"id":"a","title":"Modal 1 - Popup open","actionItemGroups":[{"actionItems":[{"id":"a-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".fs_modal-1_popup","selectorGuids":["4532f9af-e4e1-a18b-2886-82d3e46bb157"]},"value":"none"}},{"id":"a-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".fs_modal-1_popup","selectorGuids":["4532f9af-e4e1-a18b-2886-82d3e46bb157"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".fs_modal-1_popup","selectorGuids":["4532f9af-e4e1-a18b-2886-82d3e46bb157"]},"value":"flex"}},{"id":"a-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":250,"target":{"useEventTarget":"SIBLINGS","selector":".fs_modal-1_popup","selectorGuids":["4532f9af-e4e1-a18b-2886-82d3e46bb157"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1663936524957}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ModalDefault({
  as: _Component = _Builtin.Block,
  modalButtonText = "Open Modal",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "default-modal")} tag="div">
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "fs_modal-1_embed")}
        value="%3C!--%20%5BFinsweet%20Attributes%5D%20A11Y%20--%3E%0A%3Cscript%3E(()%3D%3E%7Bvar%20t%3D%22https%3A%2F%2Fcdn.jsdelivr.net%2Fnpm%2F%40finsweet%2Fattributes-a11y%401%2Fa11y.js%22%2Ce%3Ddocument.querySelector(%60script%5Bsrc%3D%22%24%7Bt%7D%22%5D%60)%3Be%7C%7C(e%3Ddocument.createElement(%22script%22)%2Ce.async%3D!0%2Ce.src%3Dt%2Cdocument.head.append(e))%3B%7D)()%3B%3C%2Fscript%3E"
      />
      <_Builtin.Heading
        className={_utils.cx(_styles, "subtitle-lead")}
        id={_utils.cx(
          _styles,
          "w-node-_683a0c0d-7d09-fad5-6b91-5fc34abdb045-4abdb043"
        )}
        tag="h3"
      >
        {"Default Modal"}
      </_Builtin.Heading>
      <_Builtin.Block
        className={_utils.cx(_styles, "fs_modal-1_button")}
        tag="div"
        role="button"
        aria-roledescription="open-modal-trigger"
        aria-controls="fs-modal-1-popup"
        aria-haspopup="dialog"
        aria-expanded="false"
        tabIndex="0"
      >
        <_Builtin.Block tag="div">{modalButtonText}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "fs_modal-1_popup")}
        tag="div"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fs-modal-1-heading"
        id="fs-modal-1-popup"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "fs_modal-1_cover")}
          data-w-id="683a0c0d-7d09-fad5-6b91-5fc34abdb04b"
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
                "w-node-_683a0c0d-7d09-fad5-6b91-5fc34abdb04e-4abdb043"
              )}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "fs_modal-1_heading")}
                tag="div"
                id="fs-modal-1-heading"
              >
                {"Accessible popup"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "fs_modal-1_close")}
                data-w-id="683a0c0d-7d09-fad5-6b91-5fc34abdb051"
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
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%208%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0.646447%207.35355C0.841709%207.54882%201.15829%207.54882%201.35355%207.35355L4%204.70711L6.64645%207.35355C6.84171%207.54882%207.15829%207.54882%207.35355%207.35355C7.54882%207.15829%207.54882%206.84171%207.35355%206.64645L4.70711%204L7.35355%201.35355C7.54882%201.15829%207.54882%200.841709%207.35355%200.646447C7.15829%200.451184%206.84171%200.451184%206.64645%200.646447L4%203.29289L1.35355%200.646447C1.15829%200.451184%200.841709%200.451184%200.646447%200.646447C0.451184%200.841709%200.451184%201.15829%200.646447%201.35355L3.29289%204L0.646447%206.64645C0.451184%206.84171%200.451184%207.15829%200.646447%207.35355Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "modal-line")}
              id={_utils.cx(
                _styles,
                "w-node-_683a0c0d-7d09-fad5-6b91-5fc34abdb053-4abdb043"
              )}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "modal-para-wrapper")}
              id={_utils.cx(
                _styles,
                "w-node-_683a0c0d-7d09-fad5-6b91-5fc34abdb054-4abdb043"
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
                  "w-node-_683a0c0d-7d09-fad5-6b91-5fc34abdb057-4abdb043"
                )}
                tag="div"
              >
                <_Builtin.Link
                  className={_utils.cx(_styles, "button-transparent")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_683a0c0d-7d09-fad5-6b91-5fc34abdb058-4abdb043"
                  )}
                  button={true}
                  options={{
                    href: "https://www.finsweet.com/attributes/modal",
                    target: "_blank",
                  }}
                >
                  {"Cancel"}
                </_Builtin.Link>
                <_Builtin.Link
                  className={_utils.cx(_styles, "button-blue")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_683a0c0d-7d09-fad5-6b91-5fc34abdb05a-4abdb043"
                  )}
                  button={true}
                  options={{
                    href: "https://www.finsweet.com/attributes/modal",
                    target: "_blank",
                  }}
                >
                  {"Add plant food"}
                </_Builtin.Link>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
