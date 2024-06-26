"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./OpenJobListingCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1320":{"id":"e-1320","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-451","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1321"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696266303507},"e-1321":{"id":"e-1321","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-452","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1320"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696266303511}},"actionLists":{"a-451":{"id":"a-451","title":"Open Jobs Mouse hover In","actionItemGroups":[{"actionItems":[{"id":"a-451-n-4","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86"},"globalSwatchId":"--neutral-2","rValue":249,"bValue":248,"gValue":249,"aValue":1}}]},{"actionItems":[{"id":"a-451-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":true,"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86"},"globalSwatchId":"--neutral-3","rValue":241,"bValue":239,"gValue":240,"aValue":1}},{"id":"a-451-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".apply-button-icon","selectorGuids":["12c54e31-c3ac-72b0-9c6c-f40c4b94ca08"]},"value":"flex"}},{"id":"a-451-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".apply-button-icon","selectorGuids":["12c54e31-c3ac-72b0-9c6c-f40c4b94ca08"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1696266307244},"a-452":{"id":"a-452","title":"Open Jobs Mouse hover Out","actionItemGroups":[{"actionItems":[{"id":"a-452-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":true,"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86"},"globalSwatchId":"--neutral-2","rValue":249,"bValue":248,"gValue":249,"aValue":1}},{"id":"a-452-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".apply-button-icon","selectorGuids":["12c54e31-c3ac-72b0-9c6c-f40c4b94ca08"]},"value":0,"unit":""}},{"id":"a-452-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".apply-button-icon","selectorGuids":["12c54e31-c3ac-72b0-9c6c-f40c4b94ca08"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1696266307244}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function OpenJobListingCard({
  as: _Component = _Builtin.Block,
  textJobRole = "Linux Device Driver Engineer - Embedded System",
  textLocation = "California, United States",
  textWorkingType = "Internship, On-site",
  textCompanyType = "Information and Technology",
  onClickApplyNow = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "open-jobs-list-card")}
      data-w-id="3b6022e9-7521-6a98-1483-a49ee53c9b86"
      tag="div"
      {...onClickApplyNow}
    >
      <Text content={textJobRole} weight="medium" />
      <_Builtin.Block
        className={_utils.cx(_styles, "open-job-info-list")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-428")}
          tag="div"
        >
          <GlobalIcon iconName="location_on" />
          <Text content={textLocation} color="neutral" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-428")}
          tag="div"
        >
          <GlobalIcon iconName="badge" />
          <Text content={textWorkingType} color="neutral" />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-428")}
          tag="div"
        >
          <GlobalIcon iconName="corporate_fare" />
          <Text content={textCompanyType} color="neutral" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "apply-button-icon")}
        tag="div"
        {...onClickApplyNow}
      >
        <Text content="Apply Now" color="inherit" />
        <GlobalIcon iconName="north_east" color="inherit" />
      </_Builtin.Block>
    </_Component>
  );
}
