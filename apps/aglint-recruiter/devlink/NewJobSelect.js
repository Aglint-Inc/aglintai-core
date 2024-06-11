"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./NewJobSelect.module.css";

export function NewJobSelect({
  as: _Component = _Builtin.Block,
  onClickCreateJobAglint = {},
  slotImportJobCard,
}) {
  return (
    <_Component className={_utils.cx(_styles, "new-job-select-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cj-option-wrapper")}
        tag="div"
      >
        <Text content="Select an option to continue with" weight="medium" />
        <_Builtin.Block
          className={_utils.cx(_styles, "cj-option-card-wrap")}
          tag="div"
          box-shadow="3"
          {...onClickCreateJobAglint}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-badge-wrap")}
            tag="div"
          >
            <Text content="Recommended" color="accent" size="1" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-option-icon-block")}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "vectors-wrapper-29")}
              loading="lazy"
              width="23.75"
              height="23.75"
              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/650369589a66f64187642eb1_Vectors-Wrapper.svg"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-option-info")}
            tag="div"
          >
            <Text
              content="Create Job throgh Aglint"
              color="accent"
              weight="medium"
            />
            <Text content="Craft your job listing effortlessly in just three simple steps with Aglint." />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cj-imports-wrapper")}
        tag="div"
      >
        <Text content="Or Import existing job" color="neutral" />
        <_Builtin.Block
          className={_utils.cx(_styles, "cj-imports-options-drawer")}
          tag="div"
        >
          {slotImportJobCard}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
