import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Checkbox } from "./Checkbox";
import { ButtonPrimarySmall } from "./ButtonPrimarySmall";
import * as _utils from "./utils";
import _styles from "./JobPublishPop.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1194":{"id":"e-1194","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-415","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1195"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|6972d30d-8761-c489-6f6b-2de4ad9f043e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890042|6972d30d-8761-c489-6f6b-2de4ad9f043e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695219175665},"e-1206":{"id":"e-1206","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-420","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1207"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"650c129b14ba3ec430890042|857dbd17-da70-7f02-c07a-b46892567a1d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"650c129b14ba3ec430890042|857dbd17-da70-7f02-c07a-b46892567a1d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1695222875338}},"actionLists":{"a-415":{"id":"a-415","title":"candiadte-gert now email","actionItemGroups":[{"actionItems":[{"id":"a-415-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".people-experience-card-wrapper-2","selectorGuids":["c9c5a8f2-4546-156d-441a-1d0cdcad44cc"]},"value":"none"}},{"id":"a-415-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".network-people-slide-table","selectorGuids":["9b43dfeb-1cfa-4360-ae6f-6650004aba79"]},"value":"block"}},{"id":"a-415-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".name-load","selectorGuids":["a9df1b50-a146-2d10-d6dd-50c9f80bd585"]},"value":"block"}},{"id":"a-415-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".one-line-clamp","selectorGuids":["2267a95d-b916-dbb3-df92-44ccd0b05ec0"]},"value":"none"}},{"id":"a-415-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".people-email-card-wrapper-2.cta","selectorGuids":["c9c5a8f2-4546-156d-441a-1d0cdcad44cb","5e2a39a4-f452-7efd-c25d-8f9c6fa5bb29"]},"value":"flex"}},{"id":"a-415-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".people-possible-email-card-wrapper-2.without-cta","selectorGuids":["c9c5a8f2-4546-156d-441a-1d0cdcad44c5","fed6e318-4f9c-fde6-c6be-c9f0db52bb0b"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1695219179702},"a-420":{"id":"a-420","title":"candiadte-gert now email reset","actionItemGroups":[{"actionItems":[{"id":"a-420-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".people-experience-card-wrapper-2","selectorGuids":["c9c5a8f2-4546-156d-441a-1d0cdcad44cc"]},"value":"flex"}},{"id":"a-420-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".network-people-slide-table","selectorGuids":["9b43dfeb-1cfa-4360-ae6f-6650004aba79"]},"value":"none"}},{"id":"a-420-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".name-load","selectorGuids":["a9df1b50-a146-2d10-d6dd-50c9f80bd585"]},"value":"none"}},{"id":"a-420-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".one-line-clamp","selectorGuids":["2267a95d-b916-dbb3-df92-44ccd0b05ec0"]},"value":"block"}},{"id":"a-420-n-5","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".people-email-card-wrapper-2.cta","selectorGuids":["c9c5a8f2-4546-156d-441a-1d0cdcad44cb","5e2a39a4-f452-7efd-c25d-8f9c6fa5bb29"]},"value":"none"}},{"id":"a-420-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"selector":".people-possible-email-card-wrapper-2.without-cta","selectorGuids":["c9c5a8f2-4546-156d-441a-1d0cdcad44c5","fed6e318-4f9c-fde6-c6be-c9f0db52bb0b"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1695219179702}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function JobPublishPop({
  as: _Component = _Builtin.Block,
  textLink = "www.google.com/dshbkvhsdbkfhvbksdds..",
  onClickCopy = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "publishing-pop-wrapper")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-482")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-483")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "one-line-clamp")}
            tag="div"
          >
            {textLink}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "copy-publish-wrappers")}
          tag="div"
          {...onClickCopy}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3.5%2010C3.77614%2010%204%2010.2239%204%2010.5C4%2010.7761%203.77614%2011%203.5%2011H1C0.447715%2011%200%2010.5523%200%2010V1C0%200.447715%200.447715%200%201%200H10C10.5523%200%2011%200.447715%2011%201V3.5C11%203.77614%2010.7761%204%2010.5%204C10.2239%204%2010%203.77614%2010%203.5V1H1V10H3.5ZM6%206V15H15V6H6ZM6%205H15C15.5523%205%2016%205.44772%2016%206V15C16%2015.5523%2015.5523%2016%2015%2016H6C5.44772%2016%205%2015.5523%205%2015V6C5%205.44772%205.44772%205%206%205Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-485")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-484")}
          tag="div"
        >
          <Checkbox />
          <_Builtin.Block tag="div">{"Activate sourcing"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <ButtonPrimarySmall />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
