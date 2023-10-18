import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./ShareVia.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1236":{"id":"e-1236","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-421","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1237"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"42aecb35-db63-b919-84ad-ac919662baa7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"42aecb35-db63-b919-84ad-ac919662baa7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695630690463},"e-1237":{"id":"e-1237","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-422","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1236"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"42aecb35-db63-b919-84ad-ac919662baa7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"42aecb35-db63-b919-84ad-ac919662baa7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695630690465},"e-1277":{"id":"e-1277","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-435","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1278"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"27369fbb-7dee-cd12-b62b-37d81cd5ed07","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"27369fbb-7dee-cd12-b62b-37d81cd5ed07","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695810059997},"e-1278":{"id":"e-1278","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-436","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1277"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"27369fbb-7dee-cd12-b62b-37d81cd5ed07","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"27369fbb-7dee-cd12-b62b-37d81cd5ed07","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695810059997},"e-1352":{"id":"e-1352","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1353"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365602},"e-1353":{"id":"e-1353","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1352"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365605},"e-1382":{"id":"e-1382","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-489","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1383"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1383":{"id":"e-1383","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-490","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1382"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479}},"actionLists":{"a-421":{"id":"a-421","title":"Share Guide Hover in","actionItemGroups":[{"actionItems":[{"id":"a-421-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".share-guide-wrapper","selectorGuids":["e4fb8e85-3f25-d179-6e93-528533b9e629"]},"value":"none"}},{"id":"a-421-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".share-guide-wrapper","selectorGuids":["e4fb8e85-3f25-d179-6e93-528533b9e629"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-421-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".share-guide-wrapper","selectorGuids":["e4fb8e85-3f25-d179-6e93-528533b9e629"]},"value":"block"}},{"id":"a-421-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".share-guide-wrapper","selectorGuids":["e4fb8e85-3f25-d179-6e93-528533b9e629"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1695630701866},"a-422":{"id":"a-422","title":"Share Guide Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-422-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".share-guide-wrapper","selectorGuids":["e4fb8e85-3f25-d179-6e93-528533b9e629"]},"value":0,"unit":""}},{"id":"a-422-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".share-guide-wrapper","selectorGuids":["e4fb8e85-3f25-d179-6e93-528533b9e629"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1695630701866},"a-435":{"id":"a-435","title":"Share Guide Hover in 2","actionItemGroups":[{"actionItems":[{"id":"a-435-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".share-guide-wrapper","selectorGuids":["e4fb8e85-3f25-d179-6e93-528533b9e629"]},"value":"none"}},{"id":"a-435-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".share-guide-wrapper","selectorGuids":["e4fb8e85-3f25-d179-6e93-528533b9e629"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-435-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".share-guide-wrapper","selectorGuids":["e4fb8e85-3f25-d179-6e93-528533b9e629"]},"value":"block"}},{"id":"a-435-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".share-guide-wrapper","selectorGuids":["e4fb8e85-3f25-d179-6e93-528533b9e629"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1695630701866},"a-436":{"id":"a-436","title":"Share Guide Hover Out 2","actionItemGroups":[{"actionItems":[{"id":"a-436-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".share-guide-wrapper","selectorGuids":["e4fb8e85-3f25-d179-6e93-528533b9e629"]},"value":0,"unit":""}},{"id":"a-436-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".share-guide-wrapper","selectorGuids":["e4fb8e85-3f25-d179-6e93-528533b9e629"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1695630701866},"a-471":{"id":"a-471","title":"Email Interaction Hover In","actionItemGroups":[{"actionItems":[{"id":"a-471-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-471-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-471-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-471-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-471-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-471-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-472":{"id":"a-472","title":"Email Interaction Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-472-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-472-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-472-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-489":{"id":"a-489","title":"Email Interaction Hover In 2","actionItemGroups":[{"actionItems":[{"id":"a-489-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-489-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-489-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-489-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-489-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-489-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-490":{"id":"a-490","title":"Email Interaction Hover Out 2","actionItemGroups":[{"actionItems":[{"id":"a-490-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-490-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-490-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ShareVia({
  as: _Component = _Builtin.Block,
  onClickCopy = {},
  slotVideo,
  textGuide = "This is some text inside of a div block.",
  onClickShareLinkedIn = {},
  onClickMail = {},
  textLink = "https://www.aglinthq.com/job/l/u/0/#inbox/dwendjdjhbhjkecsd..",
  isHowtoShareVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "cj-share-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cj-share-header-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cj-share-icon-block")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2213%22%20height%3D%2213%22%20viewbox%3D%220%200%2013%2013%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.32843%205.17645L4.001%205.849L3.3%206.564L2.97487%206.23834L1.57843%207.63355C0.807191%208.40479%200.807191%209.65521%201.57843%2010.4264L1.68648%2010.5268C2.46235%2011.1961%203.63514%2011.1626%204.37132%2010.4264L5.76724%209.03071L5.422%208.685L6.122%207.97L6.82843%208.67645C7.02369%208.87171%207.02369%209.18829%206.82843%209.38355L5.07843%2011.1336C3.91667%2012.2953%202.03308%2012.2953%200.87132%2011.1336C-0.29044%209.97179%20-0.29044%208.08821%200.87132%206.92645L2.62132%205.17645C2.81658%204.98118%203.13316%204.98118%203.32843%205.17645ZM8.21984%203.08575C8.41606%202.95272%208.68528%202.97472%208.85709%203.15002C9.0289%203.32532%209.04548%203.59492%208.90853%203.78843L8.84998%203.85709L6.32486%206.33196L3.85709%208.84998L3.78843%208.90853C3.59492%209.04548%203.32532%209.0289%203.15002%208.85709C2.97472%208.68528%202.95272%208.41606%203.08575%208.21984L3.14291%208.15002L5.61778%205.62489L8.15002%203.14291L8.21984%203.08575ZM11.1336%200.87132C12.2953%202.03308%2012.2953%203.91667%2011.1336%205.07843L9.38355%206.82843C9.18829%207.02369%208.87171%207.02369%208.67645%206.82843L7.971%206.123L8.686%205.422L9.03%205.76653L10.4264%204.37132C11.1977%203.60008%2011.1977%202.34966%2010.4264%201.57843L10.3184%201.47804C9.54253%200.808784%208.36973%200.842247%207.63355%201.57843L6.23764%202.97417L6.564%203.301L5.849%204.001L5.17645%203.32843C4.98118%203.13316%204.98118%202.81658%205.17645%202.62132L6.92645%200.87132C8.08821%20-0.29044%209.97179%20-0.29044%2011.1336%200.87132Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Shareable Job Link"}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cj-share-via-main")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cj-share-copy-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-share-copy-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cj-copy-link-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm", "fw-semibold")}
                tag="div"
              >
                {textLink}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cj-copy-icon")}
              tag="div"
              {...onClickCopy}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.5%2010C3.77614%2010%204%2010.2239%204%2010.5C4%2010.7761%203.77614%2011%203.5%2011H1C0.447715%2011%200%2010.5523%200%2010V1C0%200.447715%200.447715%200%201%200H10C10.5523%200%2011%200.447715%2011%201V3.5C11%203.77614%2010.7761%204%2010.5%204C10.2239%204%2010%203.77614%2010%203.5V1H1V10H3.5ZM6%206V15H15V6H6ZM6%205H15C15.5523%205%2016%205.44772%2016%206V15C16%2015.5523%2015.5523%2016%2015%2016H6C5.44772%2016%205%2015.5523%205%2015V6C5%205.44772%205.44772%205%206%205Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-share-posted-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-xxsm",
                "fw-semibold",
                "text-grey-400"
              )}
              tag="div"
            >
              {"Posted via"}
            </_Builtin.Block>
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec43089020f_Frame%201092.svg"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cj-share-via")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-share-via-header")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cj-share-icon")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.14645%202.61242C3.34171%202.80834%203.65829%202.80834%203.85355%202.61242L5%201.46207V7.27468C5%207.55176%205.22386%207.77638%205.5%207.77638C5.77614%207.77638%206%207.55176%206%207.27468V1.56241L7.04645%202.61242C7.24171%202.80834%207.55829%202.80834%207.75355%202.61242C7.94882%202.41649%207.94882%202.09883%207.75355%201.9029L6.15355%200.297456C5.75829%20-0.0991519%205.14171%20-0.0991519%204.74645%200.297456L3.14645%201.9029C2.95118%202.09883%202.95118%202.41649%203.14645%202.61242ZM7.5%204.76617C7.22386%204.76617%207%204.54155%207%204.26447C7%203.98739%207.22386%203.76277%207.5%203.76277H10C10.5761%203.76277%2011%204.18807%2011%204.76617V10.7866C11%2011.3647%2010.5761%2011.79%2010%2011.79H1C0.423858%2011.79%200%2011.3647%200%2010.7866V4.76617C0%204.18807%200.423858%203.76277%201%203.76277H3.5C3.77614%203.76277%204%203.98739%204%204.26447C4%204.54155%203.77614%204.76617%203.5%204.76617H1V10.7866H10V4.76617H7.5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-sm",
                "fw-semibold",
                "color-grey-500"
              )}
              tag="div"
            >
              {"Share via"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-share-via-options")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "share-via-option-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "share-via-option")}
                tag="div"
                {...onClickShareLinkedIn}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "share-via-option-icon-block")}
                  tag="div"
                >
                  <_Builtin.Image
                    className={_utils.cx(_styles, "share-via-option-icon")}
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890206_LinkedIn%20-%20png%20-%2012px.png"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-sm", "fw-semibold")}
                  tag="div"
                >
                  {"Linkedin"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "share-via-option")}
              tag="div"
              {...onClickMail}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "share-via-option-icon-block")}
                tag="div"
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "share-via-option-icon")}
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt=""
                  src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec4308901c0_64dcae8d0156e8d54cb108e9_google%20logo.svg"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-sm", "fw-semibold")}
                tag="div"
              >
                {"Mail"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          {isHowtoShareVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "linked-wrappers")}
              data-w-id="42aecb35-db63-b919-84ad-ac919662baa7"
              tag="div"
            >
              <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.5%205C6.05228%205%206.5%204.55228%206.5%204C6.5%203.44772%206.05228%203%205.5%203C4.94772%203%204.5%203.44772%204.5%204C4.5%204.55228%204.94772%205%205.5%205ZM5.5%2010C5.77614%2010%206%209.77614%206%209.5V6.5C6%206.22386%205.77614%206%205.5%206C5.22386%206%205%206.22386%205%206.5V9.5C5%209.77614%205.22386%2010%205.5%2010ZM5.5%2012C2.46243%2012%200%209.53757%200%206.5C0%203.46243%202.46243%201%205.5%201C8.53757%201%2011%203.46243%2011%206.5C11%209.53757%208.53757%2012%205.5%2012ZM5.5%2011C7.98528%2011%2010%208.98528%2010%206.5C10%204.01472%207.98528%202%205.5%202C3.01472%202%201%204.01472%201%206.5C1%208.98528%203.01472%2011%205.5%2011Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E" />
              <_Builtin.Block tag="div">
                {"How to share via linkedin?"}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "share-guide-wrapper")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "slot-video-share-guide")}
                  tag="div"
                >
                  {slotVideo}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-guide-wrappers")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">{textGuide}</_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
