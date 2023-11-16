import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./CandidateFilterOption.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-73":{"id":"e-73","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-37","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-74"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"6f053728-3e90-1505-cefb-ae73973f1652"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700117195852},"e-74":{"id":"e-74","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-73"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"6f053728-3e90-1505-cefb-ae73973f1652"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700117195853},"e-75":{"id":"e-75","name":"","animationType":"preset","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-37","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-76"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"6f053728-3e90-1505-cefb-ae73973f165d"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700118370167},"e-76":{"id":"e-76","name":"","animationType":"preset","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-38","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-75"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"6f053728-3e90-1505-cefb-ae73973f165d"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700118370167}},"actionLists":{"a-37":{"id":"a-37","title":"sort-dropdown-[open]","actionItemGroups":[{"actionItems":[{"id":"a-37-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"locked":false,"target":{"useEventTarget":"SIBLINGS","selector":".cl-filter-options","selectorGuids":["c3a05671-86fd-2253-ecd3-aa13b050ff43"]},"heightValue":32,"widthUnit":"PX","heightUnit":"px"}}]},{"actionItems":[{"id":"a-37-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":300,"locked":false,"target":{"useEventTarget":"SIBLINGS","selector":".cl-filter-options","selectorGuids":["c3a05671-86fd-2253-ecd3-aa13b050ff43"]},"widthUnit":"PX","heightUnit":"AUTO"}}]}],"createdOn":1700117236602,"useFirstGroupAsInitialState":true},"a-38":{"id":"a-38","title":"sort-dropdown-[close]","actionItemGroups":[{"actionItems":[{"id":"a-38-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":300,"locked":false,"target":{"useEventTarget":"SIBLINGS","selector":".cl-filter-options","selectorGuids":["c3a05671-86fd-2253-ecd3-aa13b050ff43"]},"heightValue":32,"widthUnit":"PX","heightUnit":"px"}}]}],"createdOn":1700117508931,"useFirstGroupAsInitialState":false}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateFilterOption({ as: _Component = _Builtin.Block }) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "cl-filter-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cl-filter-dropdown-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cl-filter-options")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cl-filter-border")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "cl-text-block")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Resume score"}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cl-text-block")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Assessment score"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cl-filter-icon-block")}
          data-w-id="6f053728-3e90-1505-cefb-ae73973f1652"
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon-embed")}
            value="%3Csvg%20width%3D%226%22%20height%3D%2212%22%20viewBox%3D%220%200%206%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3%200L5.59808%203.6H0.401924L3%200Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3Cpath%20d%3D%22M3%2010.8L0.401924%207.20005L5.59808%207.20005L3%2010.8Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cl-filter-dropdown-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cl-filter-options")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cl-filter-border")}
            tag="div"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "cl-text-block")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Greater than"}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cl-text-block")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Less than"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cl-filter-icon-block")}
          data-w-id="6f053728-3e90-1505-cefb-ae73973f165d"
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon-embed")}
            value="%3Csvg%20width%3D%226%22%20height%3D%2212%22%20viewBox%3D%220%200%206%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3%200L5.59808%203.6H0.401924L3%200Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3Cpath%20d%3D%22M3%2010.8L0.401924%207.20005L5.59808%207.20005L3%2010.8Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div" />
      <_Builtin.Block
        className={_utils.cx(_styles, "cl-filter-option-close")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icon-embed")}
          value="%3Csvg%20width%3D%2210%22%20height%3D%2210%22%20viewBox%3D%220%200%2010%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.71126%200.627653L5.22676%204.11672L8.71582%200.627653C8.92728%200.469059%209.12993%200.469059%209.32376%200.627653C9.48236%200.82149%209.48236%201.01533%209.32376%201.20916L5.8347%204.72466L9.32376%208.21372C9.48236%208.42518%209.48236%208.62783%209.32376%208.82166C9.12993%208.98026%208.92728%208.98026%208.71582%208.82166L5.22676%205.3326L1.71126%208.82166C1.51743%208.98026%201.32359%208.98026%201.12975%208.82166C0.97116%208.62783%200.97116%208.42518%201.12975%208.21372L4.61882%204.72466L1.12975%201.20916C0.97116%201.01533%200.97116%200.82149%201.12975%200.627653C1.32359%200.469059%201.51743%200.469059%201.71126%200.627653Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
    </_Component>
  );
}
