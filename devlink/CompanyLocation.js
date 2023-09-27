import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./CompanyLocation.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1279":{"id":"e-1279","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-437","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1280"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"7f03ee71-98f6-b885-6c12-74504b4627a7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7f03ee71-98f6-b885-6c12-74504b4627a7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695814661604},"e-1280":{"id":"e-1280","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-438","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1279"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"7f03ee71-98f6-b885-6c12-74504b4627a7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"7f03ee71-98f6-b885-6c12-74504b4627a7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695814661607}},"actionLists":{"a-437":{"id":"a-437","title":"Company Location Hover In","actionItemGroups":[{"actionItems":[{"id":"a-437-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".location-saved-wrappers","selectorGuids":["be40181a-6c73-780d-f56a-9f13d567b57a"]},"globalSwatchId":"","rValue":0,"bValue":0,"gValue":0,"aValue":0}},{"id":"a-437-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".location-delete-wrappers","selectorGuids":["9ec61334-e594-fee9-aacb-eaec52e40f69"]},"value":"none"}},{"id":"a-437-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".location-delete-wrappers","selectorGuids":["9ec61334-e594-fee9-aacb-eaec52e40f69"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-437-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".location-saved-wrappers","selectorGuids":["be40181a-6c73-780d-f56a-9f13d567b57a"]},"globalSwatchId":"3a86b552","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-437-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".location-delete-wrappers","selectorGuids":["9ec61334-e594-fee9-aacb-eaec52e40f69"]},"value":"flex"}},{"id":"a-437-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".location-delete-wrappers","selectorGuids":["9ec61334-e594-fee9-aacb-eaec52e40f69"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1695814673509},"a-438":{"id":"a-438","title":"Company Location Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-438-n-4","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".location-saved-wrappers","selectorGuids":["be40181a-6c73-780d-f56a-9f13d567b57a"]},"globalSwatchId":"","rValue":0,"bValue":0,"gValue":0,"aValue":0}},{"id":"a-438-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".location-delete-wrappers","selectorGuids":["9ec61334-e594-fee9-aacb-eaec52e40f69"]},"value":0,"unit":""}},{"id":"a-438-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":400,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".location-delete-wrappers","selectorGuids":["9ec61334-e594-fee9-aacb-eaec52e40f69"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1695814673509}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CompanyLocation({
  as: _Component = _Builtin.Block,
  textLocation = "This is some text inside of a div block.",
  onClickEdit = {},
  onClickDelete = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "all-location-saved-wrappers")}
      data-w-id="7f03ee71-98f6-b885-6c12-74504b4627a7"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "location-saved-wrappers")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2213%22%20viewBox%3D%220%200%2012%2013%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.99982%207.99999C4.89525%207.99999%203.99982%207.10456%203.99982%205.99999C3.99982%204.89542%204.89525%203.99999%205.99982%203.99999C7.10439%203.99999%207.99982%204.89542%207.99982%205.99999C7.99982%207.10456%207.10439%207.99999%205.99982%207.99999ZM5.99982%206.99999C6.5521%206.99999%206.99982%206.55227%206.99982%205.99999C6.99982%205.4477%206.5521%204.99999%205.99982%204.99999C5.44753%204.99999%204.99982%205.4477%204.99982%205.99999C4.99982%206.55227%205.44753%206.99999%205.99982%206.99999ZM1%205.75648C1.07285%203.06051%203.31462%200.932652%206.01047%201.0001C8.64923%201.0465%2010.815%203.10221%2010.9998%205.76999C10.9998%206.89319%2010.6689%207.71641%209.94157%208.72815C9.79648%208.92997%209.26463%209.63012%209.25066%209.64886C8.85393%2010.1809%208.41863%2010.6698%207.73702%2011.3769C7.69367%2011.4219%207.17451%2011.9573%207.02721%2012.1113C6.76655%2012.384%206.56138%2012.6063%206.37704%2012.8182C6.17965%2013.0451%205.82807%2013.0476%205.6274%2012.8236C5.30575%2012.4646%204.03644%2011.1343%203.99339%2011.0882C3.4992%2010.5595%203.10609%2010.1121%202.74807%209.66068C2.14663%208.90235%202.15448%208.9124%201.9657%208.646C1.30459%207.71309%200.999818%206.88482%201%205.75648ZM4.72392%2010.4053C4.74931%2010.4325%205.49194%2011.2109%205.99509%2011.7482C6.09046%2011.6454%206.19272%2011.5371%206.30443%2011.4203C6.45463%2011.2632%206.97585%2010.7257%207.01704%2010.6829C7.67162%2010.0038%208.08345%209.54135%208.44898%209.05111C8.46992%209.02302%208.99364%208.33357%209.12962%208.14443C9.74507%207.28834%209.99982%206.65456%2010.001%205.80477C9.85345%203.68851%208.11231%202.03637%205.98711%201.99982C3.84183%201.94527%202.0576%203.6383%201.99982%205.76999C1.99982%206.66027%202.23275%207.29331%202.7816%208.06781C2.95461%208.31195%202.94797%208.30345%203.53157%209.03929C3.87035%209.46645%204.2467%209.89479%204.72392%2010.4053Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "text-sm", "color-black")}
          tag="div"
        >
          {textLocation}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "location-delete-wrappers")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons", "curser-hover-pointer")}
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M0%209.44681V11.4894C0%2011.7714%200.228621%2012%200.510638%2012H2.55319C2.68862%2012%202.8185%2011.9462%202.91427%2011.8504L10.063%204.70172C10.0631%204.70157%2010.0633%204.70143%2010.0634%204.70128L11.6972%203.06746C12.1009%202.66379%2012.1009%202.03409%2011.6972%201.63041L10.3696%200.302754C9.96591%20-0.100918%209.33621%20-0.100918%208.93254%200.302754L0.149562%209.08573C0.0537992%209.1815%200%209.31138%200%209.44681ZM9.70213%203.61827L10.9715%202.34894L9.65106%201.02853L8.38173%202.29787L9.70213%203.61827ZM7.65957%203.02002L1.02128%209.65832V10.9787H2.34168L8.97998%204.34043L7.65957%203.02002Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          {...onClickEdit}
        />
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons", "curser-hover-pointer")}
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4%202V1C4%200.423858%204.42386%200%205%200H7C7.57614%200%208%200.423858%208%201V2H10C10.2761%202%2010.5%202.22386%2010.5%202.5C10.5%202.77614%2010.2761%203%2010%203H7.5H4.5H2C1.72386%203%201.5%202.77614%201.5%202.5C1.5%202.22386%201.72386%202%202%202H4ZM7%202V1H5V2H7ZM5%209.5C5%209.77614%204.77614%2010%204.5%2010C4.22386%2010%204%209.77614%204%209.5V5C4%204.72386%204.22386%204.5%204.5%204.5C4.77614%204.5%205%204.72386%205%205V9.5ZM8%209.5C8%209.77614%207.77614%2010%207.5%2010C7.22386%2010%207%209.77614%207%209.5V5C7%204.72386%207.22386%204.5%207.5%204.5C7.77614%204.5%208%204.72386%208%205V9.5ZM2%204.5C2%204.22386%202.22386%204%202.5%204C2.77614%204%203%204.22386%203%204.5V11H9V4.5C9%204.22386%209.22386%204%209.5%204C9.77614%204%2010%204.22386%2010%204.5V11C10%2011.5761%209.57614%2012%209%2012H3C2.42386%2012%202%2011.5761%202%2011V4.5Z%22%20fill%3D%22%23E35B66%22%2F%3E%0A%3C%2Fsvg%3E"
          {...onClickDelete}
        />
      </_Builtin.Block>
    </_Component>
  );
}
