import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./RcInfoForm.module.css";

export function RcInfoForm({
  as: _Component = _Builtin.Block,
  slotLogo,
  onclickChange = {},
  slotForm,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "sl-company-info-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "sl-company-title-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "sl-company-image-block")}
          tag="div"
        >
          {slotLogo}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sl-com-title-info-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "sl-button", "basic", "ml--14")}
            tag="div"
            {...onclickChange}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-blue-600")}
              tag="div"
            >
              {"Change Logo"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {
              "Please upload your logo in PNG/jpeg format with dimensions of 512px x 512px and ensure it's under 5 MB."
            }
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">{slotForm}</_Builtin.Block>
    </_Component>
  );
}
