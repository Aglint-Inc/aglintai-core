import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { UploadCsv } from "./UploadCsv";
import * as _utils from "./utils";
import _styles from "./ImportCandidate.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-918":{"id":"e-918","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-374","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-919"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".content-6.clickable","originalId":"b741affb-9d81-6ba8-073e-30d4df6ffecf","appliesTo":"CLASS"},"targets":[{"id":"b741affb-9d81-6ba8-073e-30d4df6ffecf","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694906232996},"e-952":{"id":"e-952","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-374","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-953"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b741affb-9d81-6ba8-073e-30d4df6ffea3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b741affb-9d81-6ba8-073e-30d4df6ffea3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694911577534},"e-954":{"id":"e-954","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-374","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-955"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b741affb-9d81-6ba8-073e-30d4df6ffdc4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b741affb-9d81-6ba8-073e-30d4df6ffdc4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694911607798},"e-956":{"id":"e-956","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-374","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-957"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b741affb-9d81-6ba8-073e-30d4df6ffd17","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b741affb-9d81-6ba8-073e-30d4df6ffd17","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694911647907}},"actionLists":{"a-374":{"id":"a-374","title":"import-popup-[open]","actionItemGroups":[{"actionItems":[{"id":"a-374-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".screening-popup","selectorGuids":["7b06a0ec-54a4-b3f7-7ae1-a981ef2ba47b"]},"value":"none"}},{"id":"a-374-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".screening-popup","selectorGuids":["7b06a0ec-54a4-b3f7-7ae1-a981ef2ba47b"]},"value":0,"unit":""}},{"id":"a-374-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".cdd-popup-block","selectorGuids":["a808532d-68df-f51f-2ac9-ecdc5cef5a94"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-374-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".screening-popup","selectorGuids":["7b06a0ec-54a4-b3f7-7ae1-a981ef2ba47b"]},"value":"flex"}}]},{"actionItems":[{"id":"a-374-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".screening-popup","selectorGuids":["7b06a0ec-54a4-b3f7-7ae1-a981ef2ba47b"]},"value":1,"unit":""}}]},{"actionItems":[{"id":"a-374-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"selector":".cdd-popup-block","selectorGuids":["a808532d-68df-f51f-2ac9-ecdc5cef5a94"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1694898826099}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ImportCandidate({
  as: _Component = _Builtin.Block,
  slotUpload,
  isImportDisable = true,
  onClickImport = {},
  onClickClose = {},
  slotDownload,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "cdd-popup-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cdd-popup-upload-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cdd-popup-close-btn", "clickable")}
          tag="div"
          {...onClickClose}
        >
          <_Builtin.Image
            className={_utils.cx(_styles, "vectors-wrapper-48")}
            loading="lazy"
            width={16}
            height={16}
            src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/650579a6f5ad07724ccef247_Vectors-Wrapper.svg"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cdd-popup-upload-header")}
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
            {"Import Candidates"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-332")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "medium-default-15")}
              tag="div"
            >
              {
                "Please use CSV format with key headers like 'Name,' 'Contact,' 'LinkedIn,' 'Experience,' and 'Skills.' Any extra details can go in the 'Notes' section."
              }
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-download")}
              tag="div"
            >
              {slotDownload}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cdd-file-upload-wrapper")}
          tag="div"
        >
          {slotUpload ?? <UploadCsv />}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-295")}
          tag="div"
        >
          {isImportDisable ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cdd-import-btn", "disabled")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "content-9")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "label-10")}
                  tag="div"
                >
                  {"Import"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "cdd-import-btn", "active")}
            tag="div"
            {...onClickImport}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "content-9")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "label-10")}
                tag="div"
              >
                {"Import"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
