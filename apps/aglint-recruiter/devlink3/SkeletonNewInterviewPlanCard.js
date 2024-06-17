"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { EditOptionModule } from "./EditOptionModule";
import * as _utils from "./utils";
import _styles from "./SkeletonNewInterviewPlanCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-35":{"id":"e-35","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-36"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b6652d53-78c1-0f96-30a0-40aa8431d39a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b6652d53-78c1-0f96-30a0-40aa8431d39a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711953151594},"e-36":{"id":"e-36","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-35"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b6652d53-78c1-0f96-30a0-40aa8431d39a","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b6652d53-78c1-0f96-30a0-40aa8431d39a","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711953151594},"e-45":{"id":"e-45","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-25","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-46"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a3dd66ab-b625-b411-593b-d8d3a0dcaf83","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a3dd66ab-b625-b411-593b-d8d3a0dcaf83","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712832309435},"e-46":{"id":"e-46","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-26","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-45"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"a3dd66ab-b625-b411-593b-d8d3a0dcaf83","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"a3dd66ab-b625-b411-593b-d8d3a0dcaf83","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712832309435},"e-47":{"id":"e-47","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-48"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fa39f503-e285-8ca8-e1d3-b0b7549642dd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fa39f503-e285-8ca8-e1d3-b0b7549642dd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712915751014},"e-48":{"id":"e-48","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-47"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"fa39f503-e285-8ca8-e1d3-b0b7549642dd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"fa39f503-e285-8ca8-e1d3-b0b7549642dd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1712915751015},"e-81":{"id":"e-81","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-19","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-82"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"81140247-8670-8afa-be02-2d78ca36a57e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"81140247-8670-8afa-be02-2d78ca36a57e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718027263031},"e-82":{"id":"e-82","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-20","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-81"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"81140247-8670-8afa-be02-2d78ca36a57e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"81140247-8670-8afa-be02-2d78ca36a57e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718027263032}},"actionLists":{"a-19":{"id":"a-19","title":"option schedule hover in","actionItemGroups":[{"actionItems":[{"id":"a-19-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":"none"}},{"id":"a-19-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-19-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":"block"}},{"id":"a-19-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1711953157238},"a-20":{"id":"a-20","title":"option schedule hover out","actionItemGroups":[{"actionItems":[{"id":"a-20-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":0,"unit":""}},{"id":"a-20-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1711953157238},"a-25":{"id":"a-25","title":"option schedule hover in 2","actionItemGroups":[{"actionItems":[{"id":"a-25-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":"none"}},{"id":"a-25-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-25-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":"block"}},{"id":"a-25-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1711953157238},"a-26":{"id":"a-26","title":"option schedule hover out 2","actionItemGroups":[{"actionItems":[{"id":"a-26-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":0,"unit":""}},{"id":"a-26-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".sloteditoptions","selectorGuids":["85d382d5-45c9-d0d9-26ad-438675b051ba"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1711953157238}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SkeletonNewInterviewPlanCard({
  as: _Component = _Builtin.Block,
  slotLoader,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "npc-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "npc-left-wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "npc-slot-checkbox")}
          tag="div"
        >
          <_Builtin.Block tag="div" />
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "ske_badge", "width_80")}
              tag="div"
            >
              {slotLoader ?? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "dummy_skeleton")}
                  tag="div"
                />
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "npc-interview-detail-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "card_flex")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                <_Builtin.Block
                  className={_utils.cx(_styles, "ske_icon_24")}
                  tag="div"
                >
                  {slotLoader ?? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "dummy_skeleton")}
                      tag="div"
                    />
                  )}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ske_text_regular", "width_200")}
                tag="div"
              >
                {slotLoader ?? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dummy_skeleton")}
                    tag="div"
                  />
                )}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "card_flex")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                <_Builtin.Block
                  className={_utils.cx(_styles, "ske_icon_24")}
                  tag="div"
                >
                  {slotLoader ?? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "dummy_skeleton")}
                      tag="div"
                    />
                  )}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ske_text_regular", "width_120")}
                tag="div"
              >
                {slotLoader ?? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dummy_skeleton")}
                    tag="div"
                  />
                )}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "card_flex")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                <_Builtin.Block
                  className={_utils.cx(_styles, "ske_icon_24")}
                  tag="div"
                >
                  {slotLoader ?? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "dummy_skeleton")}
                      tag="div"
                    />
                  )}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ske_text_regular", "width_140")}
                tag="div"
              >
                {slotLoader ?? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "dummy_skeleton")}
                    tag="div"
                  />
                )}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "npc-right-wrap")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "npc-right")} tag="div">
          <_Builtin.Block tag="div" />
          <_Builtin.Block
            className={_utils.cx(_styles, "three-dot-wrap")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons", "cursor-pointer")}
              value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12%2015.5C12.5625%2015.5208%2013%2015.7708%2013.3125%2016.25C13.5625%2016.75%2013.5625%2017.25%2013.3125%2017.75C13%2018.2292%2012.5625%2018.4792%2012%2018.5C11.4375%2018.4792%2011%2018.2292%2010.6875%2017.75C10.4375%2017.25%2010.4375%2016.75%2010.6875%2016.25C11%2015.7708%2011.4375%2015.5208%2012%2015.5ZM12%2010.5C12.5625%2010.5208%2013%2010.7708%2013.3125%2011.25C13.5625%2011.75%2013.5625%2012.25%2013.3125%2012.75C13%2013.2292%2012.5625%2013.4792%2012%2013.5C11.4375%2013.4792%2011%2013.2292%2010.6875%2012.75C10.4375%2012.25%2010.4375%2011.75%2010.6875%2011.25C11%2010.7708%2011.4375%2010.5208%2012%2010.5ZM13.5%207C13.4792%207.5625%2013.2292%208%2012.75%208.3125C12.25%208.5625%2011.75%208.5625%2011.25%208.3125C10.7708%208%2010.5208%207.5625%2010.5%207C10.5208%206.4375%2010.7708%206%2011.25%205.6875C11.75%205.4375%2012.25%205.4375%2012.75%205.6875C13.2292%206%2013.4792%206.4375%2013.5%207Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "sloteditoptions")}
              tag="div"
            >
              <EditOptionModule />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
