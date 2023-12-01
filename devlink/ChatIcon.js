import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./ChatIcon.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1470":{"id":"e-1470","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-540","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1471"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"df166561-dfa5-55b2-e9ae-a7231d8ba5e7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"df166561-dfa5-55b2-e9ae-a7231d8ba5e7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700140956259},"e-1471":{"id":"e-1471","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-541","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1470"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"df166561-dfa5-55b2-e9ae-a7231d8ba5e7","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"df166561-dfa5-55b2-e9ae-a7231d8ba5e7","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700140956262}},"actionLists":{"a-540":{"id":"a-540","title":"testing","actionItemGroups":[{"actionItems":[{"id":"a-540-n","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"df166561-dfa5-55b2-e9ae-a7231d8ba5e7"},"xValue":1.05,"yValue":1.05,"locked":true}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700142067835},"a-541":{"id":"a-541","title":"testing 2","actionItemGroups":[{"actionItems":[{"id":"a-541-n","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"df166561-dfa5-55b2-e9ae-a7231d8ba5e7"},"xValue":1,"yValue":1,"locked":true}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700142067835}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ChatIcon({
  as: _Component = _Builtin.Block,
  isMessageIconVisible = true,
  isCloseIconVisible = false,
  onClickChat = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "div-block-588")}
      data-w-id="df166561-dfa5-55b2-e9ae-a7231d8ba5e7"
      tag="div"
      id="chat"
      {...onClickChat}
    >
      {isMessageIconVisible ? (
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons", "message")}
          value="%3Csvg%20width%3D%2221%22%20height%3D%2222%22%20viewBox%3D%220%200%2021%2022%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.5625%2016.375C6.94531%2016.375%207.25977%2016.498%207.50586%2016.7441C7.75195%2016.9902%207.875%2017.3047%207.875%2017.6875V19.6563L11.8945%2016.6211C12.1406%2016.457%2012.4004%2016.375%2012.6738%2016.375H18.375C18.7578%2016.375%2019.0723%2016.252%2019.3184%2016.0059C19.5645%2015.7598%2019.6875%2015.4453%2019.6875%2015.0625V3.25C19.6875%202.86719%2019.5645%202.55273%2019.3184%202.30664C19.0723%202.06055%2018.7578%201.9375%2018.375%201.9375H2.625C2.24219%201.9375%201.92773%202.06055%201.68164%202.30664C1.43555%202.55273%201.3125%202.86719%201.3125%203.25V15.0625C1.3125%2015.4453%201.43555%2015.7598%201.68164%2016.0059C1.92773%2016.252%202.24219%2016.375%202.625%2016.375H6.5625ZM-9.53674e-07%203.25C0.0273428%202.51172%200.287108%201.89648%200.779296%201.4043C1.27148%200.912108%201.88672%200.652342%202.625%200.624998H18.375C19.1133%200.652342%2019.7285%200.912108%2020.2207%201.4043C20.7129%201.89648%2020.9727%202.51172%2021%203.25V15.0625C20.9727%2015.8008%2020.7129%2016.416%2020.2207%2016.9082C19.7285%2017.4004%2019.1133%2017.6602%2018.375%2017.6875H12.6738L7.62891%2021.502C7.41016%2021.6387%207.17773%2021.6523%206.93164%2021.543C6.68555%2021.4336%206.5625%2021.2422%206.5625%2020.9688V19V17.6875H5.25H2.625C1.88672%2017.6602%201.27148%2017.4004%200.779296%2016.9082C0.287108%2016.416%200.0273428%2015.8008%20-9.53674e-07%2015.0625V3.25Z%22%20fill%3D%22white%22%20style%3D%22fill%3Awhite%3Bfill%3Awhite%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      ) : null}
      {isCloseIconVisible ? (
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons", "close")}
          value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M18.0801%201.14258C18.3809%200.869139%2018.6817%200.869139%2018.9825%201.14258C19.2559%201.44336%2019.2559%201.74414%2018.9825%202.04492L10.9434%2010.125L18.9825%2018.2051C19.2559%2018.5059%2019.2559%2018.8066%2018.9825%2019.1074C18.6817%2019.3809%2018.3809%2019.3809%2018.0801%2019.1074L10.0001%2011.0684L1.91998%2019.1074C1.6192%2019.3809%201.31842%2019.3809%201.01764%2019.1074C0.744201%2018.8066%200.744201%2018.5059%201.01764%2018.2051L9.0567%2010.125L1.01764%202.04492C0.744201%201.74414%200.744201%201.44336%201.01764%201.14258C1.31842%200.869139%201.6192%200.869139%201.91998%201.14258L10.0001%209.18164L18.0801%201.14258Z%22%20fill%3D%22white%22%20style%3D%22fill%3Awhite%3Bfill%3Awhite%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      ) : null}
    </_Component>
  );
}
