import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CandidateDatabase.module.css";

export function CandidateDatabase({
  as: _Component = _Builtin.Block,
  textShowingResult = "Showing 20 Applicants",
  slotSearch,
  slotDataTable,
}) {
  return (
    <_Component className={_utils.cx(_styles, "side-content-data")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "side-content-header")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "rd-jobs-header-wrapper-data", "data")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {"Candidate Database"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "all-filter-data-wrapper",
            "cdd-database"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "left-filter-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {textShowingResult}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "right-filter-wrapper")}
            tag="div"
          >
            {slotSearch ?? (
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
                  >
                    <_Builtin.Image
                      className={_utils.cx(_styles, "rd-filter-icon")}
                      loading="lazy"
                      width={12}
                      height={12}
                      src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65030d085ea1a69e3594c991_Vectors-Wrapper.svg"
                    />
                    <_Builtin.Block tag="div">{"Sort by"}</_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "", "rd-filter-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "filter-token")}
                      tag="div"
                    >
                      <_Builtin.Image
                        className={_utils.cx(_styles, "vectors-wrapper-18")}
                        loading="lazy"
                        width={10.939278602600098}
                        height={10.930898666381836}
                        src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65030d090b86d460a1805107_Vectors-Wrapper.svg"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "")}
                      tag="div"
                    >
                      {"Filter"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-284")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "input")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "rd-search-icon-block")}
                      tag="div"
                    >
                      <_Builtin.Image
                        className={_utils.cx(_styles, "icon")}
                        loading="lazy"
                        width={15.5}
                        height={15.5}
                        src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/65030d0ada1b1e8bdf3f48e1_Vectors-Wrapper.svg"
                      />
                    </_Builtin.Block>
                    <_Builtin.FormWrapper
                      className={_utils.cx(_styles, "form-block-3")}
                    >
                      <_Builtin.FormForm
                        className={_utils.cx(_styles, "form-3")}
                        name="email-form"
                        data-name="Email Form"
                        method="get"
                        id="email-form"
                      >
                        <_Builtin.FormTextInput
                          className={_utils.cx(_styles, "text-field-3")}
                          autoFocus={false}
                          maxLength={256}
                          name="email-2"
                          data-name="Email 2"
                          placeholder="Search"
                          type="email"
                          disabled={false}
                          required={true}
                          id="email-2"
                        />
                      </_Builtin.FormForm>
                      <_Builtin.FormSuccessMessage
                        className={_utils.cx(_styles, "hide")}
                      >
                        <_Builtin.Block tag="div">
                          {"Thank you! Your submission has been received!"}
                        </_Builtin.Block>
                      </_Builtin.FormSuccessMessage>
                      <_Builtin.FormErrorMessage
                        className={_utils.cx(_styles, "hide")}
                      >
                        <_Builtin.Block tag="div">
                          {
                            "Oops! Something went wrong while submitting the form."
                          }
                        </_Builtin.Block>
                      </_Builtin.FormErrorMessage>
                    </_Builtin.FormWrapper>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            )}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "data-wrappers")}
          tag="div"
        >
          {slotDataTable}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A.data-wrappers%7B%0Aheight%3Acalc(100vh%20-%20160px)%3B%0Awidth%3Acalc(100vw%20-%20227px)%3B%0A%7D%0A%3C%2Fstyle%3E" />
    </_Component>
  );
}
