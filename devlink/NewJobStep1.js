import React from "react";
import * as _Builtin from "./_Builtin";
import { ImportJobCard } from "./ImportJobCard";
import * as _utils from "./utils";
import _styles from "./NewJobStep1.module.css";

export function NewJobStep1({
  as: _Component = _Builtin.Block,
  onClickCreateJobAglint = {},
  slotImportJobCard,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "job-sidebar-main-block", "options")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-274")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "cj-option-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Select an option to continue with"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-option-block", "yellow-100")}
            tag="div"
            {...onClickCreateJobAglint}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "frame-1036")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-6")}
                tag="div"
              >
                {"Recommended"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cj-option-icon-block")}
              tag="div"
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "vectors-wrapper-29")}
                loading="lazy"
                width={23.75}
                height={23.75}
                src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/650369589a66f64187642eb1_Vectors-Wrapper.svg"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cj-option-info")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "medium-bold-5")}
                tag="div"
              >
                {"Create Job throgh Aglint"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "small-default-3")}
                tag="div"
              >
                {
                  "Craft your job listing effortlessly in just three simple steps with Aglint."
                }
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cj-imports-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "color-grey-600")}
            tag="div"
          >
            {"Or Import existing job"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-imports-options-drawer")}
            tag="div"
          >
            {slotImportJobCard ?? <ImportJobCard />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
