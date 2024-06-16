"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
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
                  value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2220%22%20height%3D%2220%22%20rx%3D%224%22%20fill%3D%22%23FF9C00%22%20fill-opacity%3D%220.160784%22%2F%3E%0A%3Cpath%20d%3D%22M11.5562%205.7125C11.6437%205.6375%2011.7437%205.6%2011.8562%205.6C12.0312%205.6125%2012.1625%205.68125%2012.25%205.80625C12.3375%205.93125%2012.3562%206.06875%2012.3062%206.21875L11.0312%209.8H13.0937C13.2312%209.8%2013.35%209.85%2013.45%209.95C13.55%2010.05%2013.6%2010.1687%2013.6%2010.3062C13.6%2010.4562%2013.5437%2010.5812%2013.4312%2010.6812L8.4437%2015.0875C8.3562%2015.1625%208.2562%2015.2%208.1437%2015.2C7.9687%2015.1875%207.83745%2015.1188%207.74995%2014.9938C7.66245%2014.8688%207.6437%2014.7313%207.6937%2014.5813L8.9687%2011H6.88745C6.58745%2010.975%206.42495%2010.8125%206.39995%2010.5125C6.39995%2010.375%206.4562%2010.2562%206.5687%2010.1562L11.5562%205.7125ZM11.5562%206.51875L7.18745%2010.4H9.39995C9.49995%2010.4%209.5812%2010.4437%209.6437%2010.5312C9.7062%2010.6187%209.7187%2010.7062%209.6812%2010.7937L8.4437%2014.3L12.85%2010.4H10.6C10.5%2010.4%2010.4187%2010.3562%2010.3562%2010.2687C10.2937%2010.1812%2010.2812%2010.0937%2010.3187%2010.0062L11.5562%206.51875Z%22%20fill%3D%22%23CC4E00%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              )}
            </_Builtin.Block>
            <Text content={textWorkflowType} weight="medium" />
          </_Builtin.Block>
          <Text content={textTypeDescription} color="neutral" weight="" />
        </_Builtin.Block>
        {isDeleteVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "wc_icon_button")}
            tag="div"
            {...onClickDelete}
          >
            <GlobalIcon iconName="delete" weight="thin" color="error-11" />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "workflow_item_body")}
        tag="div"
      >
        {slotInputFields ?? (
          <>
            <InputWithLabel isDescription={false} isAddDynamic={true} />
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
