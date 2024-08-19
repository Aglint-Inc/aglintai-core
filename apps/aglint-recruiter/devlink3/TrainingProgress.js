"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { TrainingProgressList } from "./TrainingProgressList";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./TrainingProgress.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-95":{"id":"e-95","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-70","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-96"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"d0086500-dc7e-dd71-8fe3-288597e9f57e"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724081306285},"e-96":{"id":"e-96","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-71","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-95"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"d0086500-dc7e-dd71-8fe3-288597e9f57e"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724081306285},"e-97":{"id":"e-97","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-70","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-98"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"f51aea9e-3a98-2b3d-2e1f-0f944d5a8544"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724081457351},"e-98":{"id":"e-98","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-71","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-97"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"f51aea9e-3a98-2b3d-2e1f-0f944d5a8544"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724081457352}},"actionLists":{"a-70":{"id":"a-70","title":"InterviewModuleStats Hover in","actionItemGroups":[{"actionItems":[{"id":"a-70-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-link-accent","selectorGuids":["a85fc437-c602-315b-c2b1-78c6c5d35b85"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-70-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-link-accent","selectorGuids":["a85fc437-c602-315b-c2b1-78c6c5d35b85"]},"value":1,"unit":""}}]}],"createdOn":1724081311765,"useFirstGroupAsInitialState":true},"a-71":{"id":"a-71","title":"InterviewModuleStats Hover out","actionItemGroups":[{"actionItems":[{"id":"a-71-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-link-accent","selectorGuids":["a85fc437-c602-315b-c2b1-78c6c5d35b85"]},"value":0,"unit":""}}]}],"createdOn":1724081311765,"useFirstGroupAsInitialState":false}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function TrainingProgress({
  as: _Component = _Builtin.Block,
  onClickViewAllInterviewers = {},
  slotTrainingProgressList,
  isViewAllVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "dashboard_widget_wrap")}
      data-w-id="f51aea9e-3a98-2b3d-2e1f-0f944d5a8544"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "dashboard-widget-header")}
        tag="div"
      >
        <Text content="Training Progress" weight="medium" />
        {isViewAllVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "text-link-accent")}
            tag="div"
            {...onClickViewAllInterviewers}
          >
            {"View all"}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "sd_table")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "module_row", "progress")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "sd_table_header_cell")}
            id={_utils.cx(
              _styles,
              "w-node-f51aea9e-3a98-2b3d-2e1f-0f944d5a854c-4d5a8544"
            )}
            tag="div"
          >
            <Text weight="" size="1" color="neutral" content="Interviewer" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sd_table_header_cell")}
            id={_utils.cx(
              _styles,
              "w-node-f51aea9e-3a98-2b3d-2e1f-0f944d5a854f-4d5a8544"
            )}
            tag="div"
          >
            <Text weight="" size="1" color="neutral" content="Interview Type" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sd_table_header_cell")}
            id={_utils.cx(
              _styles,
              "w-node-f51aea9e-3a98-2b3d-2e1f-0f944d5a8552-4d5a8544"
            )}
            tag="div"
          >
            <Text
              weight=""
              size="1"
              color="neutral"
              content="Training History"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sd_table_body")}
          tag="div"
        >
          {slotTrainingProgressList ?? (
            <>
              <TrainingProgressList />
              <SlotComp componentNeme="TrainingProgressList" />
              <SlotComp componentNeme="TrainingProgressLoader" />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
