import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CandidateFilter.module.css";

export function CandidateFilter({
  as: _Component = _Builtin.Block,
  filterCount = "1",
  onclickResumeClear = {},
  isResumeClear = false,
  slotResumeSlider,
  onclickInterviewClear = {},
  isInterviewClear = false,
  slotInterviewSlider,
  filterHeaderProps = {},
  isFilterBodyVisible = true,
  isCountVisible = false,
  dropdownBodyProps = {},
  onclickReset = {},
  isResetVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "jdet-filter-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "jdet-filter-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "jdet-filter-top")}
          tag="div"
          {...filterHeaderProps}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "jdet-filter-trigger", "clickable")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "icon-block")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.4999%205.78034L0.74723%202.02768C0.532642%201.80879%200.471494%201.48632%200.589579%201.20751C0.707664%200.9287%200.981816%200.748241%201.28239%200.750013L10.7302%200.75005C11.0302%200.754265%2011.2989%200.936931%2011.4131%201.21441C11.5274%201.4919%2011.4653%201.81077%2011.2526%202.02768L7.4999%205.78034V9.93001C7.4999%2010.1841%207.37623%2010.4232%207.16755%2010.5573L5.66791%2011.5545C5.17055%2011.8861%204.4999%2011.5262%204.4999%2010.9275V5.78034ZM1.28038%201.5001L5.25008%205.46977V10.9276C5.25008%2010.9278%206.75729%209.92966%206.75729%209.92966C6.75064%209.93393%206.75008%205.46977%206.75008%205.46977L6.85991%205.35994L10.7198%201.50006L1.28038%201.5001Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block tag="div">{"Filter"}</_Builtin.Block>
          </_Builtin.Block>
          {isCountVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-filter-count")}
              tag="div"
            >
              {filterCount}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        {isFilterBodyVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cl-filter-content")}
            tag="div"
            {...dropdownBodyProps}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "jdet-filter-options")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "jdet-filter-option")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "jdet-filter-header-block")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">{"Resume Score"}</_Builtin.Block>
                  {isResumeClear ? (
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "jdet-filter-clear-block",
                        "clickable"
                      )}
                      tag="div"
                      {...onclickResumeClear}
                    >
                      <_Builtin.Block tag="div">{"Clear"}</_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "jdet-filter-slider-block")}
                  tag="div"
                >
                  {slotResumeSlider}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "jdet-filter-option")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "jdet-filter-header-block")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">{"Interview Score"}</_Builtin.Block>
                  {isInterviewClear ? (
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "jdet-filter-clear-block",
                        "clickable"
                      )}
                      tag="div"
                      {...onclickInterviewClear}
                    >
                      <_Builtin.Block tag="div">{"Clear"}</_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "jdet-filter-slider-block")}
                  tag="div"
                >
                  {slotInterviewSlider}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isResetVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cl-filter-reset", "clickable")}
          tag="div"
          {...onclickReset}
        >
          <_Builtin.Block tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M13.3335%204.23684V1.99992C13.3335%201.63173%2013.632%201.33325%2014.0002%201.33325C14.3684%201.33325%2014.6668%201.63173%2014.6668%201.99992V5.33325C14.6668%206.10144%2014.1017%206.66658%2013.3335%206.66658H10.0002C9.63197%206.66658%209.3335%206.36811%209.3335%205.99992C9.3335%205.63173%209.63197%205.33325%2010.0002%205.33325H12.5007C11.1182%203.54433%209.79812%202.66659%207.86683%202.66659C4.93207%202.66659%202.66683%205.00374%202.66683%207.99992C2.66683%2010.9465%205.01684%2013.3333%207.86683%2013.3333C9.34895%2013.3333%2010.7856%2012.6628%2011.7686%2011.557C12.0132%2011.2818%2012.4346%2011.257%2012.7097%2011.5016C12.9849%2011.7463%2013.0097%2012.1676%2012.7651%2012.4428C11.5337%2013.8282%209.73709%2014.6666%207.86683%2014.6666C4.27579%2014.6666%201.3335%2011.6783%201.3335%207.99992C1.3335%204.27652%204.1862%201.33325%207.86683%201.33325C10.1912%201.33325%2011.7904%202.33118%2013.3335%204.23684Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-600")}
            tag="div"
          >
            {"Reset"}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
