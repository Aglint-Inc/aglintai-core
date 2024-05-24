"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { InputWithLabel } from "./InputWithLabel";
import * as _utils from "./utils";
import _styles from "./WorkflowItem.module.css";

export function WorkflowItem({
  as: _Component = _Builtin.Block,
  slotInputFields,
  textWorkflowType = "Action",
  textTypeDescription = "An action will be performed",
  slotWorkflowIcon,
}) {
  return (
    <_Component className={_utils.cx(_styles, "workflow_item")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "workflow_item_top")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "wi_top_left")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "flex_hr_10")}
            tag="div"
          >
            <_Builtin.Block className={_utils.cx(_styles, "wi_icon")} tag="div">
              {slotWorkflowIcon ?? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex")}
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2220%22%20rx%3D%224%22%20fill%3D%22%23E9EBED%22%20fill-opacity%3D%220.5%22%2F%3E%0A%3Cpath%20d%3D%22M7.4502%206.8375C7.3502%206.7875%207.2502%206.7875%207.1502%206.8375C7.0502%206.9%207.0002%206.9875%207.0002%207.1V13.7C7.0002%2013.8125%207.0502%2013.9%207.1502%2013.9625C7.2502%2014.0125%207.3502%2014.0125%207.4502%2013.9625L12.8502%2010.6625C12.9502%2010.6%2013.0002%2010.5125%2013.0002%2010.4C13.0002%2010.2875%2012.9502%2010.2%2012.8502%2010.1375L7.4502%206.8375ZM6.86895%206.3125C7.16895%206.15%207.46895%206.15625%207.76895%206.33125L13.1689%209.63125C13.4439%209.80625%2013.5877%2010.0625%2013.6002%2010.4C13.5877%2010.7375%2013.4439%2010.9937%2013.1689%2011.1687L7.76895%2014.4688C7.46895%2014.6438%207.16895%2014.65%206.86895%2014.4875C6.56895%2014.3125%206.4127%2014.05%206.4002%2013.7V7.1C6.4127%206.75%206.56895%206.4875%206.86895%206.3125Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              )}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {textWorkflowType}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey_600")}
            tag="div"
          >
            {textTypeDescription}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "wi_top_right")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%2227%22%20height%3D%2228%22%20viewBox%3D%220%200%2027%2028%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20y%3D%220.5%22%20width%3D%2227%22%20height%3D%2227%22%20rx%3D%225%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M18.375%2014C18.3594%2014.4219%2018.1719%2014.75%2017.8125%2014.9844C17.4375%2015.1719%2017.0625%2015.1719%2016.6875%2014.9844C16.3281%2014.75%2016.1406%2014.4219%2016.125%2014C16.1406%2013.5781%2016.3281%2013.25%2016.6875%2013.0156C17.0625%2012.8281%2017.4375%2012.8281%2017.8125%2013.0156C18.1719%2013.25%2018.3594%2013.5781%2018.375%2014ZM14.625%2014C14.6094%2014.4219%2014.4219%2014.75%2014.0625%2014.9844C13.6875%2015.1719%2013.3125%2015.1719%2012.9375%2014.9844C12.5781%2014.75%2012.3906%2014.4219%2012.375%2014C12.3906%2013.5781%2012.5781%2013.25%2012.9375%2013.0156C13.3125%2012.8281%2013.6875%2012.8281%2014.0625%2013.0156C14.4219%2013.25%2014.6094%2013.5781%2014.625%2014ZM9.75%2015.125C9.32812%2015.1094%209%2014.9219%208.76562%2014.5625C8.57812%2014.1875%208.57812%2013.8125%208.76562%2013.4375C9%2013.0781%209.32812%2012.8906%209.75%2012.875C10.1719%2012.8906%2010.5%2013.0781%2010.7344%2013.4375C10.9219%2013.8125%2010.9219%2014.1875%2010.7344%2014.5625C10.5%2014.9219%2010.1719%2015.1094%209.75%2015.125Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "workflow_item_body")}
        tag="div"
      >
        {slotInputFields ?? (
          <>
            <InputWithLabel isDescription={true} isAddDynamic={true} />
            <InputWithLabel />
            <InputWithLabel />
            <_Builtin.Block
              className={_utils.cx(_styles, "email_template_edit")}
              tag="div"
            >
              <InputWithLabel
                textFieldName="Sender Name"
                isDescription={true}
                isAddDynamic={true}
              />
              <InputWithLabel isAddDynamic={true} />
            </_Builtin.Block>
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
