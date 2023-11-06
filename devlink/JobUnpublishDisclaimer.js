import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonPrimaryRegular } from "./ButtonPrimaryRegular";
import * as _utils from "./utils";
import _styles from "./JobUnpublishDisclaimer.module.css";

export function JobUnpublishDisclaimer({
  as: _Component = _Builtin.Block,
  onClickPreview = {},
  onClickDiscardChanges = {},
  slotButtonPrimaryRegular,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "create-job-preview-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "left-wrap-create-job-preview")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M18.2125%2016.925L10.4875%202.03749C10.0625%201.19999%208.70001%201.19999%208.26251%202.03749L0.537508%2016.925C0.337508%2017.3125%200.350008%2017.775%200.575008%2018.15C0.800008%2018.525%201.21251%2018.75%201.65001%2018.75H17.1C17.5375%2018.75%2017.9375%2018.525%2018.1625%2018.15C18.3875%2017.775%2018.4125%2017.3125%2018.2125%2016.925ZM8.75%207.5C8.75%207.15%209.025%206.875%209.375%206.875C9.725%206.875%2010%207.15%2010%207.5V11.875C10%2012.225%209.725%2012.5%209.375%2012.5C9.025%2012.5%208.75%2012.225%208.75%2011.875V7.5ZM9.375%2016.25C8.6875%2016.25%208.125%2015.6875%208.125%2015C8.125%2014.3125%208.6875%2013.75%209.375%2013.75C10.0625%2013.75%2010.625%2014.3125%2010.625%2015C10.625%2015.6875%2010.0625%2016.25%209.375%2016.25Z%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "text-yellow-800")}
          tag="div"
        >
          {"You have unpublished chaneges."}
          <_Builtin.Span
            className={_utils.cx(_styles, "text-underline")}
            {...onClickPreview}
          >
            {"Preview"}
          </_Builtin.Span>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-558")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "cursor-pointer")}
          tag="div"
          {...onClickDiscardChanges}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-600")}
            tag="div"
          >
            {"Discard Changes"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          {slotButtonPrimaryRegular ?? (
            <ButtonPrimaryRegular textLabel="Publish" />
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
