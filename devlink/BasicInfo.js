import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./BasicInfo.module.css";

export function BasicInfo({
  as: _Component = _Builtin.Block,
  slotCompanyLogo,
  onClickChangeLogo = {},
  textLogoUpdate = "Change Logo",
  slotBasicForm,
  slotWarning,
  isWarningVisible = false,
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "rd-company-primary-info-2",
        "width-420",
        "pl-20"
      )}
      tag="div"
    >
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "profile-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cs-info-header", "mb-9")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Basic Info"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-348")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "company-details-profile")}
              tag="div"
            >
              {slotCompanyLogo}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "change-profile-content")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "text-blue-500",
                  "cursor-pointer"
                )}
                tag="div"
                {...onClickChangeLogo}
              >
                {textLogoUpdate}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm", "color-grey-600")}
                tag="div"
              >
                {"Upload a square company logo (PNG or JPEG). "}
                <br />
                {"Maximum size: 2 MB."}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isWarningVisible ? (
          <_Builtin.Block className={_utils.cx(_styles, "mt-9")} tag="div">
            {slotWarning}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-inputs-wrapper")}
        tag="div"
      >
        {slotBasicForm}
      </_Builtin.Block>
    </_Component>
  );
}
