"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./WorkflowCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-73":{"id":"e-73","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-45","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-74"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f286b9bf-e923-854f-6be0-d2c7cf58cde5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f286b9bf-e923-854f-6be0-d2c7cf58cde5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1716360840148},"e-74":{"id":"e-74","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-46","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-73"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"f286b9bf-e923-854f-6be0-d2c7cf58cde5","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"f286b9bf-e923-854f-6be0-d2c7cf58cde5","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1716360840149}},"actionLists":{"a-45":{"id":"a-45","title":"wc_show_iconbuttons","actionItemGroups":[{"actionItems":[{"id":"a-45-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".wc_icon_button_group","selectorGuids":["08cc1377-1cef-3da5-9fb6-8ea7dc0a1a00"]},"value":0,"unit":""}},{"id":"a-45-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".wc_icon_button_group","selectorGuids":["08cc1377-1cef-3da5-9fb6-8ea7dc0a1a00"]},"value":"none"}}]},{"actionItems":[{"id":"a-45-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".wc_icon_button_group","selectorGuids":["08cc1377-1cef-3da5-9fb6-8ea7dc0a1a00"]},"value":"flex"}}]},{"actionItems":[{"id":"a-45-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".wc_icon_button_group","selectorGuids":["08cc1377-1cef-3da5-9fb6-8ea7dc0a1a00"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1716360843829},"a-46":{"id":"a-46","title":"wc_hide_iconbuttons","actionItemGroups":[{"actionItems":[{"id":"a-46-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"easeOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".wc_icon_button_group","selectorGuids":["08cc1377-1cef-3da5-9fb6-8ea7dc0a1a00"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-46-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".wc_icon_button_group","selectorGuids":["08cc1377-1cef-3da5-9fb6-8ea7dc0a1a00"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1716360843829}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function WorkflowCard({
  as: _Component = _Builtin.Block,
  textWorkflowTrigger = "Follow-Up Email Automation for Unresponsive Candidates",
  textJobs = "Used in 8 jobs",
  textWorkflowName = "Follow-Up Email Automation for Unresponsive Candidates",
  onClickEdit = {},
  onClickDelete = {},
  slotCheckbox,
  isCheckboxVisible = false,
  isChecked = false,
  isEditButton = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "workflow-card-outerwrap")}
      data-w-id="f286b9bf-e923-854f-6be0-d2c7cf58cde5"
      tag="div"
    >
      {isCheckboxVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "workflow_checkbox")}
          tag="div"
        >
          {slotCheckbox}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "workflow_card_wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "workflow_card")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "wc_top", "relative-1")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "width_100")}
              tag="div"
              {...onClickEdit}
            >
              <Text content={textWorkflowName} weight="medium" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "wc_icon_button_group")}
              tag="div"
            >
              {isEditButton ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "wc_icon_button")}
                  tag="div"
                  {...onClickEdit}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "embed_flex")}
                    value="%3Csvg%20width%3D%2227%22%20height%3D%2227%22%20viewbox%3D%220%200%2027%2027%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2227%22%20height%3D%2227%22%20rx%3D%225%22%20fill%3D%22white%22%2F%3E%0A%3Cpath%20d%3D%22M18.1641%208.55469C18.0078%208.41406%2017.8281%208.34375%2017.625%208.34375C17.4219%208.34375%2017.2422%208.41406%2017.0859%208.55469L16.4766%209.1875L17.8125%2010.5234L18.4453%209.91406C18.5859%209.75781%2018.6562%209.57812%2018.6562%209.375C18.6562%209.17188%2018.5859%208.99219%2018.4453%208.83594L18.1641%208.55469ZM11.9297%2013.7344C11.8359%2013.8281%2011.7734%2013.9453%2011.7422%2014.0859L11.3672%2015.6328L12.9141%2015.2812C13.0547%2015.2344%2013.1719%2015.1641%2013.2656%2015.0703L17.2734%2011.0625L15.9375%209.72656L11.9297%2013.7344ZM16.5703%208.03906C16.8828%207.74219%2017.2344%207.59375%2017.625%207.59375C18.0312%207.59375%2018.3828%207.74219%2018.6797%208.03906L18.9609%208.32031C19.2578%208.63281%2019.4062%208.98438%2019.4062%209.375C19.4062%209.78125%2019.2578%2010.1328%2018.9609%2010.4297L13.8047%2015.6094C13.6016%2015.8125%2013.3594%2015.9453%2013.0781%2016.0078L10.9688%2016.5C10.8281%2016.5156%2010.7109%2016.4766%2010.6172%2016.3828C10.5234%2016.2891%2010.4844%2016.1797%2010.5%2016.0547L10.9922%2013.9219C11.0547%2013.6406%2011.1875%2013.3984%2011.3906%2013.1953L16.5703%208.03906ZM9.375%209H12.375C12.6094%209.01562%2012.7344%209.14062%2012.75%209.375C12.7344%209.60938%2012.6094%209.73438%2012.375%209.75H9.375C9.0625%209.76562%208.79688%209.875%208.57812%2010.0781C8.375%2010.2969%208.26562%2010.5625%208.25%2010.875V17.625C8.26562%2017.9375%208.375%2018.2031%208.57812%2018.4219C8.79688%2018.625%209.0625%2018.7344%209.375%2018.75H16.125C16.4375%2018.7344%2016.7031%2018.625%2016.9219%2018.4219C17.125%2018.2031%2017.2344%2017.9375%2017.25%2017.625V14.625C17.2656%2014.3906%2017.3906%2014.2656%2017.625%2014.25C17.8594%2014.2656%2017.9844%2014.3906%2018%2014.625V17.625C17.9844%2018.1562%2017.8047%2018.6016%2017.4609%2018.9609C17.1016%2019.3047%2016.6562%2019.4844%2016.125%2019.5H9.375C8.84375%2019.4844%208.39844%2019.3047%208.03906%2018.9609C7.69531%2018.6016%207.51562%2018.1562%207.5%2017.625V10.875C7.51562%2010.3438%207.69531%209.89844%208.03906%209.53906C8.39844%209.19531%208.84375%209.01562%209.375%209Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              ) : null}
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
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "wc_bottom")}
            tag="div"
            {...onClickEdit}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "wc_bottom_left")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "wc_trigger_block")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.94531%200.140625C8.05469%200.046875%208.17969%200%208.32031%200C8.53906%200.015625%208.70312%200.101562%208.8125%200.257812C8.92188%200.414063%208.94531%200.585938%208.88281%200.773438L7.28906%205.25H9.86719C10.0391%205.25%2010.1875%205.3125%2010.3125%205.4375C10.4375%205.5625%2010.5%205.71094%2010.5%205.88281C10.5%206.07031%2010.4297%206.22656%2010.2891%206.35156L4.05469%2011.8594C3.94531%2011.9531%203.82031%2012%203.67969%2012C3.46094%2011.9844%203.29688%2011.8984%203.1875%2011.7422C3.07812%2011.5859%203.05469%2011.4141%203.11719%2011.2266L4.71094%206.75H2.10938C1.73438%206.71875%201.53125%206.51562%201.5%206.14062C1.5%205.96875%201.57031%205.82031%201.71094%205.69531L7.94531%200.140625ZM7.94531%201.14844L2.48438%206H5.25C5.375%206%205.47656%206.05469%205.55469%206.16406C5.63281%206.27344%205.64844%206.38281%205.60156%206.49219L4.05469%2010.875L9.5625%206H6.75C6.625%206%206.52344%205.94531%206.44531%205.83594C6.36719%205.72656%206.35156%205.61719%206.39844%205.50781L7.94531%201.14844Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <Text content={textWorkflowTrigger} weight="" color="neutral" />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "wc_bottom_right")}
              tag="div"
            >
              <Text
                content={textJobs}
                size="1"
                weight=""
                color="neutral"
                align="right"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isChecked ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "active-workflow-card")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
