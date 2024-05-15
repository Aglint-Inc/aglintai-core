import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./MicPermissionModal.module.css";

export function MicPermissionModal({ as: _Component = _Builtin.Block }) {
  return (
    <_Component
      className={_utils.cx(_styles, "mic-card-block-wrapper-2")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "mic-grid-block-2")}
        tag="div"
      >
        <_Builtin.Block
          id={_utils.cx(
            _styles,
            "w-node-f94ff02a-6fc4-2aac-d979-e76ce8a0c605-e8a0c603"
          )}
          tag="div"
        >
          <_Builtin.Image
            className={_utils.cx(_styles, "mic-block-image-2")}
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/652ed38a492720dc6c59fa71_Frame%20934.svg"
          />
        </_Builtin.Block>
        <_Builtin.Block
          id={_utils.cx(
            _styles,
            "w-node-f94ff02a-6fc4-2aac-d979-e76ce8a0c607-e8a0c603"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "click-allow-wrapper-blocked-2")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-xxl-2")}
              tag="div"
            >
              {"Click "}
              <_Builtin.Span className={_utils.cx(_styles, "fw-semibold")}>
                {"‘Allow’"}
              </_Builtin.Span>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "color-grey-600")}
              tag="div"
            >
              {
                "Please click on 'Allow' to grant access to your microphone and video for the Assessment."
              }
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
