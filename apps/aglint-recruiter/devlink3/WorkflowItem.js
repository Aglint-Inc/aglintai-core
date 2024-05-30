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
  isDeleteVisible,
  onClickDelete,
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
        {isDeleteVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "wc_icon_button")}
            tag="div"
            {...onClickDelete}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2227%22%20height%3D%2227%22%20viewBox%3D%220%200%2027%2027%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2227%22%20height%3D%2227%22%20rx%3D%225%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M12.4219%208.25C12.2812%208.25%2012.1719%208.3125%2012.0938%208.4375L11.7422%209H15.2578L14.9062%208.4375C14.8281%208.3125%2014.7188%208.25%2014.5781%208.25H12.4219ZM16.1484%209H17.25H18H18.375C18.6094%209.01562%2018.7344%209.14062%2018.75%209.375C18.7344%209.60938%2018.6094%209.73438%2018.375%209.75H17.9531L17.3438%2018.1172C17.3125%2018.5078%2017.1562%2018.8359%2016.875%2019.1016C16.5938%2019.3516%2016.25%2019.4844%2015.8438%2019.5H11.1562C10.75%2019.4844%2010.4062%2019.3516%2010.125%2019.1016C9.84375%2018.8359%209.6875%2018.5078%209.65625%2018.1172L9.04688%209.75H8.625C8.39062%209.73438%208.26562%209.60938%208.25%209.375C8.26562%209.14062%208.39062%209.01562%208.625%209H9H9.75H10.8516L11.4609%208.03906C11.6953%207.69531%2012.0156%207.51562%2012.4219%207.5H14.5781C14.9844%207.51562%2015.3047%207.69531%2015.5391%208.03906L16.1484%209ZM17.2031%209.75H9.79688L10.4062%2018.0469C10.4219%2018.25%2010.5%2018.4141%2010.6406%2018.5391C10.7812%2018.6797%2010.9531%2018.75%2011.1562%2018.75H15.8438C16.0469%2018.75%2016.2188%2018.6797%2016.3594%2018.5391C16.5%2018.4141%2016.5781%2018.25%2016.5938%2018.0469L17.2031%209.75Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        ) : null}
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
