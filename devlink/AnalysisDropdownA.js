import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { DropdownEntry } from "./DropdownEntry";
import * as _utils from "./utils";
import _styles from "./AnalysisDropdownA.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-758":{"id":"e-758","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-325","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-759"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".analysis-dropdown-toggle","originalId":"650c129b14ba3ec430890068|f0e45c11-b86a-32d2-33e8-6540429d6690","appliesTo":"CLASS"},"targets":[{"selector":".analysis-dropdown-toggle","originalId":"650c129b14ba3ec430890068|f0e45c11-b86a-32d2-33e8-6540429d6690","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1692711288093},"e-759":{"id":"e-759","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-326","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-758"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".analysis-dropdown-toggle","originalId":"650c129b14ba3ec430890068|f0e45c11-b86a-32d2-33e8-6540429d6690","appliesTo":"CLASS"},"targets":[{"selector":".analysis-dropdown-toggle","originalId":"650c129b14ba3ec430890068|f0e45c11-b86a-32d2-33e8-6540429d6690","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1692711288100},"e-760":{"id":"e-760","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-327","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-771"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".analysis-dropdown-toggle","originalId":"650c129b14ba3ec430890068|f0e45c11-b86a-32d2-33e8-6540429d6690","appliesTo":"CLASS"},"targets":[{"selector":".analysis-dropdown-toggle","originalId":"650c129b14ba3ec430890068|f0e45c11-b86a-32d2-33e8-6540429d6690","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1692713205421},"e-761":{"id":"e-761","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-328","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-760"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".analysis-dropdown-toggle","originalId":"650c129b14ba3ec430890068|f0e45c11-b86a-32d2-33e8-6540429d6690","appliesTo":"CLASS"},"targets":[{"selector":".analysis-dropdown-toggle","originalId":"650c129b14ba3ec430890068|f0e45c11-b86a-32d2-33e8-6540429d6690","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1692713205429},"e-766":{"id":"e-766","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-325","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-767"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".analysis-dropdown-toggle-2","originalId":"64b8fb93b31916643c70224d|08186070-c9e5-e43b-03a6-abe386f8048d","appliesTo":"CLASS"},"targets":[{"selector":".analysis-dropdown-toggle-2","originalId":"64b8fb93b31916643c70224d|08186070-c9e5-e43b-03a6-abe386f8048d","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1692711288093},"e-767":{"id":"e-767","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-326","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-766"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".analysis-dropdown-toggle-2","originalId":"64b8fb93b31916643c70224d|08186070-c9e5-e43b-03a6-abe386f8048d","appliesTo":"CLASS"},"targets":[{"selector":".analysis-dropdown-toggle-2","originalId":"64b8fb93b31916643c70224d|08186070-c9e5-e43b-03a6-abe386f8048d","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1692711288100},"e-768":{"id":"e-768","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-327","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-771"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".analysis-dropdown-toggle-2","originalId":"64b8fb93b31916643c70224d|08186070-c9e5-e43b-03a6-abe386f8048d","appliesTo":"CLASS"},"targets":[{"selector":".analysis-dropdown-toggle-2","originalId":"64b8fb93b31916643c70224d|08186070-c9e5-e43b-03a6-abe386f8048d","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1692713205421},"e-769":{"id":"e-769","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-328","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-770"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".analysis-dropdown-toggle-2","originalId":"64b8fb93b31916643c70224d|08186070-c9e5-e43b-03a6-abe386f8048d","appliesTo":"CLASS"},"targets":[{"selector":".analysis-dropdown-toggle-2","originalId":"64b8fb93b31916643c70224d|08186070-c9e5-e43b-03a6-abe386f8048d","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1692713205429}},"actionLists":{"a-325":{"id":"a-325","title":"rating-detail-dropdown-[open]","actionItemGroups":[{"actionItems":[{"id":"a-325-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".analysis-dropdown-list","selectorGuids":["bef7a5f3-31d2-ac49-c6cb-4e663abe77dd"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}},{"id":"a-325-n-3","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".arrow-icon","selectorGuids":["bef7a5f3-31d2-ac49-c6cb-4e663abe77d2"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]},{"actionItems":[{"id":"a-325-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".analysis-dropdown-list","selectorGuids":["bef7a5f3-31d2-ac49-c6cb-4e663abe77dd"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}},{"id":"a-325-n-4","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".arrow-icon","selectorGuids":["bef7a5f3-31d2-ac49-c6cb-4e663abe77d2"]},"zValue":180,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1692711295369},"a-326":{"id":"a-326","title":"rating-detail-dropdown-[close]","actionItemGroups":[{"actionItems":[{"id":"a-326-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".analysis-dropdown-list","selectorGuids":["bef7a5f3-31d2-ac49-c6cb-4e663abe77dd"]},"heightValue":0,"widthUnit":"PX","heightUnit":"px","locked":false}},{"id":"a-326-n-2","actionTypeId":"TRANSFORM_ROTATE","config":{"delay":0,"easing":"easeInOut","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".arrow-icon","selectorGuids":["bef7a5f3-31d2-ac49-c6cb-4e663abe77d2"]},"zValue":0,"xUnit":"DEG","yUnit":"DEG","zUnit":"deg"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1692711479784},"a-327":{"id":"a-327","title":"rating-dropdown-[hover-in]","actionItemGroups":[{"actionItems":[{"id":"a-327-n-3","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".analysis-dropdown-toggle","selectorGuids":["bef7a5f3-31d2-ac49-c6cb-4e663abe77d6"]},"globalSwatchId":"80449ce7","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]},{"actionItems":[{"id":"a-327-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".analysis-dropdown-toggle","selectorGuids":["bef7a5f3-31d2-ac49-c6cb-4e663abe77d6"]},"globalSwatchId":"3a86b552","rValue":248,"bValue":249,"gValue":249,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1692713218760},"a-328":{"id":"a-328","title":"rating-dropdown-[hover-out]","actionItemGroups":[{"actionItems":[{"id":"a-328-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".analysis-dropdown-toggle","selectorGuids":["bef7a5f3-31d2-ac49-c6cb-4e663abe77d6"]},"globalSwatchId":"80449ce7","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1692713218760}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AnalysisDropdownA({
  as: _Component = _Builtin.Block,
  dropdownTitle = "4 Matching Skills",
  dropdownDescription = "Found 4 matching skills with your job description",
  slotEntries,
  isPositive = false,
  isNegative = false,
  isNeutral = false,
  overviewText = "",
  overviewProps = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "analysis-dropdown")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "analysis-dropdown-toggle")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "ratings-details-dropdown-title")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "dropdown-mark-icon")}
            tag="div"
          >
            {isPositive ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed-icon")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%200C2.69%200%200%202.69%200%206C0%209.31%202.69%2012%206%2012C9.31%2012%2012%209.31%2012%206C12%202.69%209.31%200%206%200ZM9.44%204.94L5.94%208.44C5.82%208.56%205.66%208.62%205.5%208.62C5.34%208.62%205.18%208.56%205.06%208.44L3.06%206.44C2.82%206.2%202.82%205.8%203.06%205.56C3.3%205.32%203.7%205.32%203.94%205.56L5.5%207.12L8.56%204.06C8.8%203.82%209.2%203.82%209.44%204.06C9.69%204.3%209.69%204.7%209.44%204.94Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
            {isNegative ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed-icon")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.5%2012C2.46%2012%200%209.54%200%206.5C0%203.46%202.46%201%205.5%201C8.54%201%2011%203.46%2011%206.5C11%209.54%208.54%2012%205.5%2012ZM5%209.5C5%209.78%205.22%2010%205.5%2010C5.78%2010%206%209.78%206%209.5V6.5C6%206.22%205.78%206%205.5%206C5.22%206%205%206.22%205%206.5V9.5ZM5.5%203C4.95%203%204.5%203.45%204.5%204C4.5%204.55%204.95%205%205.5%205C6.05%205%206.5%204.55%206.5%204C6.5%203.45%206.05%203%205.5%203Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
            {isNeutral ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed-icon")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M1%204.5C1%202.01472%203.01472%200%205.5%200C7.98528%200%2010%202.01472%2010%204.5C10%206.02983%209.2293%207.42083%208%208.2424V10H3V8.2424C1.7707%207.42083%201%206.02983%201%204.5ZM3%2011H8C8%2011.5523%207.55228%2012%207%2012H4C3.44772%2012%203%2011.5523%203%2011ZM6%206H6.5C7.16667%206%207.16667%205%206.5%205H4.5C3.83333%205%203.83333%206%204.5%206H5V7.5C5%208.16667%206%208.16667%206%207.5V6Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{dropdownTitle}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-246")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "fw-semibold")}
            tag="div"
            {...overviewProps}
          >
            {overviewText}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "ratings-details-dropdown-arrow")}
            tag="div"
          >
            <_Builtin.Image
              className={_utils.cx(_styles, "arrow-icon")}
              loading="lazy"
              width={3.999999761581421}
              height={7.199999809265137}
              alt=""
              src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/64e4aea57eb054c91bcf9b68_Vectors-Wrapper.svg"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "analysis-dropdown-list")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "analysis-dropdown-list-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "text-grey-600")}
            tag="div"
          >
            {dropdownDescription}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "rating-details-tags-wrapper")}
            tag="div"
          >
            {slotEntries ?? (
              <DropdownEntry
                isNeutral={false}
                isPositive={false}
                isNegative={false}
              />
            )}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
