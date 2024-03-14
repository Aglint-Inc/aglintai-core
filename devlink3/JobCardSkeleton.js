import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./JobCardSkeleton.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-7":{"id":"e-7","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-9","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-8"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c2b6778c-7cfc-9712-23ce-14b0aada1d8b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c2b6778c-7cfc-9712-23ce-14b0aada1d8b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1709734728718},"e-8":{"id":"e-8","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-10","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-7"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c2b6778c-7cfc-9712-23ce-14b0aada1d8b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c2b6778c-7cfc-9712-23ce-14b0aada1d8b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1709734728718}},"actionLists":{"a-9":{"id":"a-9","title":"Job Card Hover In 2","actionItemGroups":[{"actionItems":[{"id":"a-9-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{},"globalSwatchId":"287ff474","rValue":34,"bValue":103,"gValue":143,"aValue":1}},{"id":"a-9-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{},"globalSwatchId":"80449ce7","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-9-n-3","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{},"globalSwatchId":"80449ce7","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1695892134302},"a-10":{"id":"a-10","title":"Job Card Hover Out 2","actionItemGroups":[{"actionItems":[{"id":"a-10-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{},"globalSwatchId":"8db28f70","rValue":237,"bValue":244,"gValue":248,"aValue":1}},{"id":"a-10-n-2","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{},"globalSwatchId":"a1b0a24f","rValue":24,"bValue":70,"gValue":97,"aValue":1}},{"id":"a-10-n-3","actionTypeId":"STYLE_TEXT_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{},"globalSwatchId":"a1b0a24f","rValue":24,"bValue":70,"gValue":97,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1695892134302}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function JobCardSkeleton({
  as: _Component = _Builtin.Block,
  slotSkeleton,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "rd-job-list-item")}
      data-w-id="c2b6778c-7cfc-9712-23ce-14b0aada1d8b"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "rd-job-info-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "rd-company-info-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "job-details")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "div-block-529-copy",
                "skeleton_wrap"
              )}
              tag="div"
            >
              {slotSkeleton}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "company-location-copy",
                "skeleton_wrap"
              )}
              tag="div"
            >
              {slotSkeleton}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "draft-warn-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "rd-status-badge-copy")}
            dyn={{
              bind: {},
            }}
            tag="div"
          >
            {slotSkeleton}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "applicants-number-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-549")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "applicants-number-copy")}
            tag="div"
          >
            {slotSkeleton}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "applicants-number", "_2")}
            tag="div"
          >
            {slotSkeleton}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "applicants-number", "_3")}
            tag="div"
          >
            {slotSkeleton}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "applicants-number", "_4")}
            tag="div"
          >
            {slotSkeleton}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "applicants-number", "_5")}
            tag="div"
          >
            {slotSkeleton}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-752")}
          tag="div"
        >
          {slotSkeleton}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
