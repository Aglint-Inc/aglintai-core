import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./ChatInput.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1478":{"id":"e-1478","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-542","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1479"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b850e542-1fc2-392f-c28e-0aa954940e83","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b850e542-1fc2-392f-c28e-0aa954940e83","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700213449343},"e-1479":{"id":"e-1479","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-543","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1478"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"b850e542-1fc2-392f-c28e-0aa954940e83","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"b850e542-1fc2-392f-c28e-0aa954940e83","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700213449343}},"actionLists":{"a-542":{"id":"a-542","title":"Attach Tooltip Hover In","actionItemGroups":[{"actionItems":[{"id":"a-542-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".attach-tooltip","selectorGuids":["788d76e5-89e0-4b24-630b-0c545c831ead"]},"value":0,"unit":""}},{"id":"a-542-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".attach-tooltip","selectorGuids":["788d76e5-89e0-4b24-630b-0c545c831ead"]},"value":"none"}}]},{"actionItems":[{"id":"a-542-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".attach-tooltip","selectorGuids":["788d76e5-89e0-4b24-630b-0c545c831ead"]},"value":1,"unit":""}},{"id":"a-542-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".attach-tooltip","selectorGuids":["788d76e5-89e0-4b24-630b-0c545c831ead"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700205418032},"a-543":{"id":"a-543","title":"Attach Tooltip Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-543-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".attach-tooltip","selectorGuids":["788d76e5-89e0-4b24-630b-0c545c831ead"]},"value":0,"unit":""}},{"id":"a-543-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".attach-tooltip","selectorGuids":["788d76e5-89e0-4b24-630b-0c545c831ead"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700205418032}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ChatInput({
  as: _Component = _Builtin.Block,
  isSlotTypingVisible = true,
  onClickAttach = {},
  slotTypeInput,
  onClickSend = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return isSlotTypingVisible ? (
    <_Component
      className={_utils.cx(_styles, "slot-chat-type-input")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-592")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "relative")}
          data-w-id="b850e542-1fc2-392f-c28e-0aa954940e83"
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(
              _styles,
              "icons",
              "cursor-pointer",
              "height-28"
            )}
            value="%3Csvg%20width%3D%2214%22%20height%3D%2216%22%20viewBox%3D%220%200%2014%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.9062%202.09375C11.4271%201.63542%2010.875%201.40625%2010.25%201.40625C9.625%201.40625%209.07292%201.63542%208.59375%202.09375L2.59375%208.09375C1.86458%208.86458%201.5%209.75%201.5%2010.75C1.5%2011.75%201.86458%2012.6354%202.59375%2013.4062C3.36458%2014.1354%204.25%2014.5%205.25%2014.5C6.25%2014.5%207.13542%2014.1354%207.90625%2013.4062L12.6562%208.65625C12.8854%208.44792%2013.1146%208.44792%2013.3438%208.65625C13.5521%208.88542%2013.5521%209.11458%2013.3438%209.34375L8.59375%2014.0938C7.63542%2015.0312%206.52083%2015.5%205.25%2015.5C3.97917%2015.5%202.86458%2015.0312%201.90625%2014.0938C0.96875%2013.1354%200.5%2012.0208%200.5%2010.75C0.5%209.47917%200.96875%208.36458%201.90625%207.40625L7.90625%201.40625C8.59375%200.739583%209.375%200.40625%2010.25%200.40625C11.125%200.40625%2011.9062%200.739583%2012.5938%201.40625C13.2396%202.09375%2013.5729%202.875%2013.5938%203.75C13.5938%204.625%2013.2604%205.40625%2012.5938%206.09375L6.875%2011.8438C6.39583%2012.2812%205.86458%2012.4896%205.28125%2012.4688C4.67708%2012.4271%204.16667%2012.1667%203.75%2011.6875C3.41667%2011.25%203.26042%2010.7708%203.28125%2010.25C3.32292%209.72917%203.53125%209.28125%203.90625%208.90625L8.65625%204.15625C8.88542%203.94792%209.11458%203.94792%209.34375%204.15625C9.55208%204.38542%209.55208%204.61458%209.34375%204.84375L4.625%209.59375C4.41667%209.80208%204.30208%2010.0417%204.28125%2010.3125C4.28125%2010.5833%204.36458%2010.8333%204.53125%2011.0625C4.73958%2011.3125%205%2011.4479%205.3125%2011.4688C5.625%2011.4688%205.90625%2011.3646%206.15625%2011.1562L11.9062%205.40625C12.3646%204.92708%2012.5938%204.375%2012.5938%203.75C12.5938%203.125%2012.3646%202.57292%2011.9062%202.09375Z%22%20fill%3D%22%238F9195%22%20style%3D%22fill%3A%238F9195%3Bfill%3Acolor(display-p3%200.5608%200.5686%200.5843)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
            {...onClickAttach}
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "attach-tooltip")}
            tag="div"
          >
            <_Builtin.Block className={_utils.cx(_styles, "text-sm")} tag="div">
              {"Attach File"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-593")}
          tag="div"
        >
          {slotTypeInput}
        </_Builtin.Block>
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons", "cursor-pointer", "height-28")}
          value="%3Csvg%20width%3D%2216%22%20height%3D%2214%22%20viewBox%3D%220%200%2016%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.36719%201.01562L14.4531%206.23828C14.8906%206.47526%2015.1094%206.8125%2015.1094%207.25C15.1094%207.6875%2014.8906%208.02474%2014.4531%208.26172L2.36719%2013.4844C1.85677%2013.6667%201.44661%2013.5846%201.13672%2013.2383C0.808594%2012.8737%200.753906%2012.4544%200.972656%2011.9805L2.85938%208.45312C2.98698%208.21615%203.1875%208.07943%203.46094%208.04297L8.27344%207.44141C8.38281%207.42318%208.4375%207.35938%208.4375%207.25C8.4375%207.14062%208.38281%207.07682%208.27344%207.05859L3.46094%206.45703C3.1875%206.42057%202.98698%206.28385%202.85938%206.04688L0.972656%202.54688C0.753906%202.05469%200.808594%201.6263%201.13672%201.26172C1.44661%200.915365%201.85677%200.833333%202.36719%201.01562Z%22%20fill%3D%22%2317494D%22%20style%3D%22fill%3A%2317494D%3Bfill%3Acolor(display-p3%200.0902%200.2863%200.3020)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
          {...onClickSend}
        />
      </_Builtin.Block>
    </_Component>
  ) : null;
}
