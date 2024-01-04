import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./NotificationAndProfile.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-684":{"id":"e-684","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-300","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-685"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".navmenu_link","originalId":"64c7628d257634068611bc88|fcf6e88a-1c6b-2fdb-a2ec-f46513aa3a67","appliesTo":"CLASS"},"targets":[{"selector":".navmenu_link","originalId":"64c7628d257634068611bc88|fcf6e88a-1c6b-2fdb-a2ec-f46513aa3a67","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1691400998963},"e-685":{"id":"e-685","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-301","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-684"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".navmenu_link","originalId":"64c7628d257634068611bc88|fcf6e88a-1c6b-2fdb-a2ec-f46513aa3a67","appliesTo":"CLASS"},"targets":[{"selector":".navmenu_link","originalId":"64c7628d257634068611bc88|fcf6e88a-1c6b-2fdb-a2ec-f46513aa3a67","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1691400998964},"e-704":{"id":"e-704","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-300","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-705"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".nav_mainlink","originalId":"64c7628d257634068611bc88|fcf6e88a-1c6b-2fdb-a2ec-f46513aa3a67","appliesTo":"CLASS"},"targets":[{"selector":".nav_mainlink","originalId":"64c7628d257634068611bc88|fcf6e88a-1c6b-2fdb-a2ec-f46513aa3a67","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1691400998963},"e-705":{"id":"e-705","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-301","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-704"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".nav_mainlink","originalId":"64c7628d257634068611bc88|fcf6e88a-1c6b-2fdb-a2ec-f46513aa3a67","appliesTo":"CLASS"},"targets":[{"selector":".nav_mainlink","originalId":"64c7628d257634068611bc88|fcf6e88a-1c6b-2fdb-a2ec-f46513aa3a67","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1691400998964}},"actionLists":{"a-300":{"id":"a-300","title":"Nav Menu Tooltip [show] 4","actionItemGroups":[{"actionItems":[{"id":"a-300-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".aui_navmenu_tooltip","selectorGuids":["53b8a4f4-0499-18f6-dae1-365c5ce1895d"]},"value":0,"unit":""}},{"id":"a-300-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".aui_navmenu_tooltip","selectorGuids":["53b8a4f4-0499-18f6-dae1-365c5ce1895d"]},"value":"none"}},{"id":"a-300-n-3","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".aui_navmenu_tooltip","selectorGuids":["53b8a4f4-0499-18f6-dae1-365c5ce1895d"]},"xValue":0.8,"yValue":0.8,"locked":true}}]},{"actionItems":[{"id":"a-300-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".aui_navmenu_tooltip","selectorGuids":["53b8a4f4-0499-18f6-dae1-365c5ce1895d"]},"value":"block"}}]},{"actionItems":[{"id":"a-300-n-5","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".aui_navmenu_tooltip","selectorGuids":["53b8a4f4-0499-18f6-dae1-365c5ce1895d"]},"xValue":1,"yValue":1,"locked":true}},{"id":"a-300-n-6","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".aui_navmenu_tooltip","selectorGuids":["53b8a4f4-0499-18f6-dae1-365c5ce1895d"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1690795104465},"a-301":{"id":"a-301","title":"Nav Menu Tooltip [hide] 4","actionItemGroups":[{"actionItems":[{"id":"a-301-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".aui_navmenu_tooltip","selectorGuids":["53b8a4f4-0499-18f6-dae1-365c5ce1895d"]},"value":0,"unit":""}},{"id":"a-301-n-2","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".aui_navmenu_tooltip","selectorGuids":["53b8a4f4-0499-18f6-dae1-365c5ce1895d"]},"xValue":0.8,"yValue":0.8,"locked":true}}]},{"actionItems":[{"id":"a-301-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".aui_navmenu_tooltip","selectorGuids":["53b8a4f4-0499-18f6-dae1-365c5ce1895d"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1690795104465}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function NotificationAndProfile({
  as: _Component = _Builtin.Block,
  slotProfileImage,
  textNotificationCOunt = "",
  isNotificationCountVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "notification_profile_mobile")}
      tag="div"
    >
      <_Builtin.Link
        className={_utils.cx(_styles, "nav_mainlink_mobile", "negative")}
        button={false}
        block="inline"
        options={{
          href: "/notifications",
        }}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M20%2017H22V19H2V17H4V10C4%205.58172%207.58172%202%2012%202C16.4183%202%2020%205.58172%2020%2010V17ZM18%2017V10C18%206.68629%2015.3137%204%2012%204C8.68629%204%206%206.68629%206%2010V17H18ZM9%2021H15V23H9V21Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "aui_navmenu_tooltip")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Notifications"}</_Builtin.Block>
        </_Builtin.Block>
        {isNotificationCountVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "notification_count")}
            tag="div"
          >
            {textNotificationCOunt}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Link>
      <_Builtin.Link
        className={_utils.cx(_styles, "nav_mainlink_mobile")}
        button={false}
        block="inline"
        options={{
          href: "/profile",
        }}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "aui_navmenu_profile")}
          tag="div"
        >
          {slotProfileImage}
        </_Builtin.Block>
      </_Builtin.Link>
    </_Component>
  );
}
