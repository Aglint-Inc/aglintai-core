import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./RecommendedAssessments.module.css";

export function RecommendedAssessments({
  as: _Component = _Builtin.Block,
  slotIcons,
  onClickAdd = {},
  textTitle = "NodeJS Coding Assessment",
  textDesc = "This assessment evaluates a candidate's proficiency in NodeJS, focusing on their ability to solve more complex problems and implement efficient, scalable solutions.",
  isIntermediate = true,
  isExpert = false,
  isEntryLevel = false,
  textDuration = "30 Mins",
  isSelected = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1037")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1039")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1045")}
          tag="div"
        >
          {slotIcons}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1038", "cursor-pointer")}
          tag="div"
          {...onClickAdd}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2211%22%20height%3D%2210%22%20viewBox%3D%220%200%2011%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.0625%200.6875V4.4375H9.8125C10.1562%204.46875%2010.3438%204.65625%2010.375%205C10.3438%205.34375%2010.1562%205.53125%209.8125%205.5625H6.0625V9.3125C6.03125%209.65625%205.84375%209.84375%205.5%209.875C5.15625%209.84375%204.96875%209.65625%204.9375%209.3125V5.5625H1.1875C0.84375%205.53125%200.65625%205.34375%200.625%205C0.65625%204.65625%200.84375%204.46875%201.1875%204.4375H4.9375V0.6875C4.96875%200.34375%205.15625%200.15625%205.5%200.125C5.84375%200.15625%206.03125%200.34375%206.0625%200.6875Z%22%20fill%3D%22%23337FBD%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-500")}
            tag="div"
          >
            {"Add"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1040")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textTitle}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {textDesc}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1043")}
        tag="div"
      >
        {isIntermediate ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1041")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2214%22%20viewBox%3D%220%200%2016%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20y%3D%220.5%22%20width%3D%224%22%20height%3D%2213%22%20rx%3D%222%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3Crect%20x%3D%226%22%20y%3D%220.5%22%20width%3D%224%22%20height%3D%2213%22%20rx%3D%222%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3Crect%20x%3D%2212%22%20y%3D%220.5%22%20width%3D%224%22%20height%3D%2213%22%20rx%3D%222%22%20fill%3D%22%23E9EBED%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "fw-semibold")}
              tag="div"
            >
              {"Intermediate"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isExpert ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1041")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2217%22%20height%3D%2214%22%20viewBox%3D%220%200%2017%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%220.5%22%20width%3D%224%22%20height%3D%2213%22%20rx%3D%222%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3Crect%20x%3D%226.5%22%20y%3D%220.5%22%20width%3D%224%22%20height%3D%2213%22%20rx%3D%222%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3Crect%20x%3D%2212.5%22%20y%3D%220.5%22%20width%3D%224%22%20height%3D%2213%22%20rx%3D%222%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "fw-semibold")}
              tag="div"
            >
              {"Expert"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isEntryLevel ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1041")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2217%22%20height%3D%2214%22%20viewBox%3D%220%200%2017%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.125%22%20y%3D%220.5%22%20width%3D%224%22%20height%3D%2213%22%20rx%3D%222%22%20fill%3D%22%23228F67%22%2F%3E%0A%3Crect%20x%3D%226.125%22%20y%3D%220.5%22%20width%3D%224%22%20height%3D%2213%22%20rx%3D%222%22%20fill%3D%22%23E9EBED%22%2F%3E%0A%3Crect%20x%3D%2212.125%22%20y%3D%220.5%22%20width%3D%224%22%20height%3D%2213%22%20rx%3D%222%22%20fill%3D%22%23E9EBED%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "fw-semibold")}
              tag="div"
            >
              {"Entry Level"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1042")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2213%22%20height%3D%2212%22%20viewBox%3D%220%200%2013%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.5%200C7.625%200.015625%208.63281%200.289062%209.52344%200.820312C10.4297%201.35156%2011.1484%202.07031%2011.6797%202.97656C12.2109%203.86719%2012.4844%204.875%2012.5%206C12.4844%207.125%2012.2109%208.13281%2011.6797%209.02344C11.1484%209.92969%2010.4297%2010.6484%209.52344%2011.1797C8.63281%2011.7109%207.625%2011.9844%206.5%2012C5.375%2011.9844%204.36719%2011.7109%203.47656%2011.1797C2.57031%2010.6484%201.85156%209.92969%201.32031%209.02344C0.789062%208.13281%200.515625%207.125%200.5%206C0.515625%204.73438%200.859375%203.60938%201.53125%202.625C1.6875%202.45313%201.85938%202.42187%202.04688%202.53125C2.23438%202.67188%202.27344%202.84375%202.16406%203.04688C1.57031%203.90625%201.26562%204.89062%201.25%206C1.26562%206.98438%201.50781%207.86719%201.97656%208.64844C2.42969%209.44531%203.05469%2010.0703%203.85156%2010.5234C4.63281%2010.9922%205.51562%2011.2344%206.5%2011.25C7.48438%2011.2344%208.36719%2010.9922%209.14844%2010.5234C9.94531%2010.0703%2010.5703%209.44531%2011.0234%208.64844C11.4922%207.86719%2011.7344%206.98438%2011.75%206C11.7188%204.57812%2011.25%203.38281%2010.3438%202.41406C9.42188%201.44531%208.26562%200.898437%206.875%200.773438V2.625C6.85938%202.85938%206.73438%202.98437%206.5%203C6.26562%202.98437%206.14062%202.85938%206.125%202.625V0.375C6.14062%200.140625%206.26562%200.015625%206.5%200ZM4.50781%203.49219L6.75781%205.74219C6.91406%205.91406%206.91406%206.08594%206.75781%206.25781C6.58594%206.41406%206.41406%206.41406%206.24219%206.25781L3.99219%204.00781C3.83594%203.83594%203.83594%203.66406%203.99219%203.49219C4.16406%203.33594%204.33594%203.33594%204.50781%203.49219Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{textDuration}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isSelected ? (
        <_Builtin.Block className={_utils.cx(_styles, "added-div")} tag="div" />
      ) : null}
    </_Component>
  );
}
