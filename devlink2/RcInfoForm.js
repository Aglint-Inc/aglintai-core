import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./RcInfoForm.module.css";

export function RcInfoForm({
  as: _Component = _Builtin.Block,
  slotLogo,
  onclickChange = {},
  slotForm,
  slotChangeLogoBtn,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "sl-company-details-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "sl-company-details-block",
          "sl-company-padding"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "sl-company-logo-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Company Logo"}
          </_Builtin.Block>
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
                className={_utils.cx(_styles, "div-block-411")}
                tag="div"
              >
                {slotChangeLogoBtn}
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
        </_Builtin.Block>
        <_Builtin.Block tag="div">{slotForm}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
