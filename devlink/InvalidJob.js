import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./InvalidJob.module.css";

export function InvalidJob({ as: _Component = _Builtin.Block, slotLottie }) {
  return (
    <_Component className={_utils.cx(_styles, "job-invalid-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-572")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-571")}
          tag="div"
        >
          {slotLottie}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-570")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {"Job not found."}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "color-grey-600")}
            tag="div"
          >
            {
              "The job you are searching for either does not exist or is no longer available, indicating that it may have been removed or closed."
            }
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "aglint-powered-footer-invalid")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-432")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-473")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "color-grey-600")}
              tag="div"
            >
              {"Powered By"}
            </_Builtin.Block>
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6515c71a265110c954626cb3_Frame%202%20(1).svg"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "text-grey-600")}
            tag="div"
          >
            {"© 2024 Aglint Inc. All Rights Reserved"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
