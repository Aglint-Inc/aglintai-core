"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
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
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2227%22%20height%3D%2227%22%20viewbox%3D%220%200%2027%2027%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2227%22%20height%3D%2227%22%20rx%3D%225%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M12.4219%208.25C12.2812%208.25%2012.1719%208.3125%2012.0938%208.4375L11.7422%209H15.2578L14.9062%208.4375C14.8281%208.3125%2014.7188%208.25%2014.5781%208.25H12.4219ZM16.1484%209H17.25H18H18.375C18.6094%209.01562%2018.7344%209.14062%2018.75%209.375C18.7344%209.60938%2018.6094%209.73438%2018.375%209.75H17.9531L17.3438%2018.1172C17.3125%2018.5078%2017.1562%2018.8359%2016.875%2019.1016C16.5938%2019.3516%2016.25%2019.4844%2015.8438%2019.5H11.1562C10.75%2019.4844%2010.4062%2019.3516%2010.125%2019.1016C9.84375%2018.8359%209.6875%2018.5078%209.65625%2018.1172L9.04688%209.75H8.625C8.39062%209.73438%208.26562%209.60938%208.25%209.375C8.26562%209.14062%208.39062%209.01562%208.625%209H9H9.75H10.8516L11.4609%208.03906C11.6953%207.69531%2012.0156%207.51562%2012.4219%207.5H14.5781C14.9844%207.51562%2015.3047%207.69531%2015.5391%208.03906L16.1484%209ZM17.2031%209.75H9.79688L10.4062%2018.0469C10.4219%2018.25%2010.5%2018.4141%2010.6406%2018.5391C10.7812%2018.6797%2010.9531%2018.75%2011.1562%2018.75H15.8438C16.0469%2018.75%2016.2188%2018.6797%2016.3594%2018.5391C16.5%2018.4141%2016.5781%2018.25%2016.5938%2018.0469L17.2031%209.75Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
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
