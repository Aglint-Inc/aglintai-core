"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AssessmentListCard.module.css";

export function AssessmentListCard({
  as: _Component = _Builtin.Block,
  slotIcons,
  textTitle = "This is some text inside of a div block.",
  textQuestionCount = "10 Questions",
  onClickRemove = {},
  isRemoveVisible = false,
  isActive = false,
  onClickCard = {},
  textDuration = "30 Mins",
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1053")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1054")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1057")}
          tag="div"
        >
          {slotIcons}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1059")}
          tag="div"
        >
          <_Builtin.Block tag="div">{textTitle}</_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1055")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {textQuestionCount}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1056")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1058")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%200C7.125%200.015625%208.13281%200.289062%209.02344%200.820312C9.92969%201.35156%2010.6484%202.07031%2011.1797%202.97656C11.7109%203.86719%2011.9844%204.875%2012%206C11.9844%207.125%2011.7109%208.13281%2011.1797%209.02344C10.6484%209.92969%209.92969%2010.6484%209.02344%2011.1797C8.13281%2011.7109%207.125%2011.9844%206%2012C4.875%2011.9844%203.86719%2011.7109%202.97656%2011.1797C2.07031%2010.6484%201.35156%209.92969%200.820312%209.02344C0.289062%208.13281%200.015625%207.125%200%206C0.015625%204.73438%200.359375%203.60938%201.03125%202.625C1.1875%202.45313%201.35938%202.42187%201.54688%202.53125C1.73438%202.67188%201.77344%202.84375%201.66406%203.04688C1.07031%203.90625%200.765625%204.89062%200.75%206C0.765625%206.98438%201.00781%207.86719%201.47656%208.64844C1.92969%209.44531%202.55469%2010.0703%203.35156%2010.5234C4.13281%2010.9922%205.01562%2011.2344%206%2011.25C6.98438%2011.2344%207.86719%2010.9922%208.64844%2010.5234C9.44531%2010.0703%2010.0703%209.44531%2010.5234%208.64844C10.9922%207.86719%2011.2344%206.98438%2011.25%206C11.2188%204.57812%2010.75%203.38281%209.84375%202.41406C8.92188%201.44531%207.76562%200.898437%206.375%200.773438V2.625C6.35938%202.85938%206.23438%202.98437%206%203C5.76562%202.98437%205.64062%202.85938%205.625%202.625V0.375C5.64062%200.140625%205.76562%200.015625%206%200ZM4.00781%203.49219L6.25781%205.74219C6.41406%205.91406%206.41406%206.08594%206.25781%206.25781C6.08594%206.41406%205.91406%206.41406%205.74219%206.25781L3.49219%204.00781C3.33594%203.83594%203.33594%203.66406%203.49219%203.49219C3.66406%203.33594%203.83594%203.33594%204.00781%203.49219Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600")}
                tag="div"
              >
                {textDuration}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isRemoveVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1061")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5%209C4.44772%209%204%208.55228%204%208C4%207.44772%204.44772%207%205%207H11C11.5523%207%2012%207.44772%2012%208C12%208.55228%2011.5523%209%2011%209H5Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            {...onClickRemove}
          />
        </_Builtin.Block>
      ) : null}
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1060")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
