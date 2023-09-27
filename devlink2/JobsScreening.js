import React from "react";
import * as _Builtin from "./_Builtin";
import { ScreeningLink } from "./ScreeningLink";
import { EmailTemplate } from "./EmailTemplate";
import * as _utils from "./utils";
import _styles from "./JobsScreening.module.css";

export function JobsScreening({
  as: _Component = _Builtin.Block,
  onClickExportCsv = {},
  onClickSortBy = {},
  onClickFilter = {},
  textShowResults = "Showing 19 out of 19 Candidates",
  slotSearchInput,
  slotJobScreeningContent,
  slotScreeningLeft,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cdd-tab-content-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cdd-tab-content-top")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-285")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {"Screening"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cdd-import-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "content-7", "clickable")}
              tag="div"
              {...onClickExportCsv}
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "vectors-wrapper-41")}
                width={12}
                height={12}
                loading="lazy"
                src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65047121f55e98229ef58e02_Vectors-Wrapper.svg"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "label-8")}
                tag="div"
              >
                {"Export CSV"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cdd-search-filter")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cdd-filter-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "rd-filter-block")}
              tag="div"
              {...onClickSortBy}
            >
              <_Builtin.Image
                className={_utils.cx(_styles, "rd-filter-icon")}
                width={12}
                height={12}
                loading="lazy"
                src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65030d085ea1a69e3594c991_Vectors-Wrapper.svg"
              />
              <_Builtin.Block tag="div">{"Sort by"}</_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cdd-filter-resume-match")}
              tag="div"
            >
              {"Resume Match Asc"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "", "rd-filter-block")}
              tag="div"
              {...onClickFilter}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "filter-token")}
                tag="div"
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "vectors-wrapper-18")}
                  width={10.939278602600098}
                  height={10.930898666381836}
                  loading="lazy"
                  src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65030d090b86d460a1805107_Vectors-Wrapper.svg"
                />
              </_Builtin.Block>
              <_Builtin.Block className={_utils.cx(_styles, "")} tag="div">
                {"Filter"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-284")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "color-grey-600")}
              tag="div"
            >
              {textShowResults}
            </_Builtin.Block>
            <_Builtin.Block className={_utils.cx(_styles, "input")} tag="div">
              {slotSearchInput}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cdd-content-main")}
        tag="div"
      >
        <_Builtin.Block
          id={_utils.cx(
            _styles,
            "w-node-b8988743-eb9c-0a8c-6a49-89a6abce96fa-abce96da"
          )}
          tag="div"
        >
          {slotJobScreeningContent}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cdd-content-side")}
          tag="div"
        >
          {slotScreeningLeft ?? (
            <>
              <ScreeningLink />
              <EmailTemplate />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
