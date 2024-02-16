import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./TeamAvailabilityCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-123":{"id":"e-123","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-72","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-124"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"38140510-fb36-39f4-c259-52715097020d"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1708089463350}},"actionLists":{"a-72":{"id":"a-72","title":"DemoSlotAvailability","actionItemGroups":[{"actionItems":[{"id":"a-72-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"CHILDREN","selector":".div-block-950._1","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","8a34af14-268d-fc7d-a518-ede9d9783b36"]}}},{"id":"a-72-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-950._1","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","8a34af14-268d-fc7d-a518-ede9d9783b36"]},"value":0,"unit":""}},{"id":"a-72-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"CHILDREN","selector":".div-block-950._3","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","a01c25ba-4c7b-aa71-e326-59da037a126b"]}}},{"id":"a-72-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"CHILDREN","selector":".div-block-950._2","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","60581b33-b6d0-6d79-6226-258c169454ef"]}}}]},{"actionItems":[{"id":"a-72-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":200,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-950._1","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","8a34af14-268d-fc7d-a518-ede9d9783b36"]},"value":1,"unit":""}},{"id":"a-72-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"value":"flex","target":{"useEventTarget":"CHILDREN","selector":".div-block-950._1","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","8a34af14-268d-fc7d-a518-ede9d9783b36"]}}},{"id":"a-72-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":600,"easing":"","duration":0,"value":"flex","target":{"useEventTarget":"CHILDREN","selector":".div-block-950._2","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","60581b33-b6d0-6d79-6226-258c169454ef"]}}},{"id":"a-72-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":600,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-950._2","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","60581b33-b6d0-6d79-6226-258c169454ef"]},"value":1,"unit":""}},{"id":"a-72-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":1000,"easing":"ease","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-950._3","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","a01c25ba-4c7b-aa71-e326-59da037a126b"]},"value":1,"unit":""}},{"id":"a-72-n-10","actionTypeId":"GENERAL_DISPLAY","config":{"delay":1000,"easing":"","duration":0,"value":"flex","target":{"useEventTarget":"CHILDREN","selector":".div-block-950._3","selectorGuids":["783cb84e-a24c-40be-fdd3-9249e3fe795a","a01c25ba-4c7b-aa71-e326-59da037a126b"]}}}]}],"createdOn":1708089468830,"useFirstGroupAsInitialState":true}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function TeamAvailabilityCard({
  as: _Component = _Builtin.Block,
  slotUserImage,
  textName = "John confirmed 3 slots",
  textTime = "3 Hours ago",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "div-block-950")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-949")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-947", "no-border")}
          tag="div"
        >
          {slotUserImage ?? (
            <_Builtin.Image
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/65cf56cf24e1ad689fef10aa_timelineAvatar.svg"
            />
          )}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-948")}
          tag="div"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-952")} tag="div">
        <_Builtin.Block tag="div">{textName}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-951")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "text-grey-600")}
            tag="div"
          >
            {textTime}
          </_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6%2012C4.90625%2011.9844%203.90625%2011.7188%203%2011.2031C2.09375%2010.6719%201.35938%209.9375%200.796875%209C0.265625%208.04688%200%207.04688%200%206C0%204.95312%200.265625%203.95313%200.796875%203C1.35938%202.0625%202.09375%201.32813%203%200.796875C3.90625%200.28125%204.90625%200.015625%206%200C7.09375%200.015625%208.09375%200.28125%209%200.796875C9.90625%201.32813%2010.6406%202.0625%2011.2031%203C11.7344%203.95313%2012%204.95312%2012%206C12%207.04688%2011.7344%208.04688%2011.2031%209C10.6406%209.9375%209.90625%2010.6719%209%2011.2031C8.09375%2011.7188%207.09375%2011.9844%206%2012ZM8.64844%204.89844C8.86719%204.63281%208.86719%204.36719%208.64844%204.10156C8.38281%203.88281%208.11719%203.88281%207.85156%204.10156L5.25%206.70312L4.14844%205.60156C3.88281%205.38281%203.61719%205.38281%203.35156%205.60156C3.13281%205.86719%203.13281%206.13281%203.35156%206.39844L4.85156%207.89844C5.11719%208.11719%205.38281%208.11719%205.64844%207.89844L8.64844%204.89844Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
