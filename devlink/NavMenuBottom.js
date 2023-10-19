import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./NavMenuBottom.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1352":{"id":"e-1352","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1353"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365602},"e-1353":{"id":"e-1353","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1352"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365605},"e-1382":{"id":"e-1382","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-489","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1383"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1383":{"id":"e-1383","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-490","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1382"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1386":{"id":"e-1386","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1387"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976388},"e-1387":{"id":"e-1387","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1386"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976390}},"actionLists":{"a-471":{"id":"a-471","title":"Email Interaction Hover In","actionItemGroups":[{"actionItems":[{"id":"a-471-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-471-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-471-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-471-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-471-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-471-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-472":{"id":"a-472","title":"Email Interaction Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-472-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-472-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-472-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-489":{"id":"a-489","title":"Email Interaction Hover In 2","actionItemGroups":[{"actionItems":[{"id":"a-489-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-489-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-489-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-489-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-489-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-489-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-490":{"id":"a-490","title":"Email Interaction Hover Out 2","actionItemGroups":[{"actionItems":[{"id":"a-490-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-490-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-490-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function NavMenuBottom({
  as: _Component = _Builtin.Block,
  slotProfileImage,
  textName = "Robert Fergson",
  textEmail = "robert@aglinthq.com",
  isMyNotification = true,
  isMyCompany = true,
  onClickLogout = {},
  isNotificationVisible = true,
  isProfileVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "rd-menu-items-wrapper")}
      tag="div"
    >
      {isNotificationVisible ? (
        <_Builtin.Link
          className={_utils.cx(_styles, "nav_sublink", "hide")}
          button={false}
          id="cover-letter"
          options={{
            href: "/notifications",
          }}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3DcurrentColor%3E%0A%20%20%3Cpath%20d%3D%22M13.3333%2011.334H14.6666V12.6673H1.33325V11.334H2.66659V6.66732C2.66659%203.7218%205.0544%201.33398%207.99992%201.33398C10.9455%201.33398%2013.3333%203.7218%2013.3333%206.66732V11.334ZM11.9999%2011.334V6.66732C11.9999%204.45818%2010.2091%202.66732%207.99992%202.66732C5.79078%202.66732%203.99992%204.45818%203.99992%206.66732V11.334H11.9999ZM5.99992%2014.0007H9.99992V15.334H5.99992V14.0007Z%22%20fill%3DcurrentColor%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block tag="div">{"Notifications"}</_Builtin.Block>
          {isMyNotification ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "aui_nav_sublink_active")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3DcurrentColor%3E%0A%20%20%3Cpath%20d%3D%22M13.3333%2011.334H14.6666V12.6673H1.33325V11.334H2.66659V6.66732C2.66659%203.7218%205.0544%201.33398%207.99992%201.33398C10.9455%201.33398%2013.3333%203.7218%2013.3333%206.66732V11.334ZM11.9999%2011.334V6.66732C11.9999%204.45818%2010.2091%202.66732%207.99992%202.66732C5.79078%202.66732%203.99992%204.45818%203.99992%206.66732V11.334H11.9999ZM5.99992%2014.0007H9.99992V15.334H5.99992V14.0007Z%22%20fill%3DcurrentColor%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"Notifications"}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Link>
      ) : null}
      <_Builtin.Link
        className={_utils.cx(_styles, "nav_sublink")}
        button={false}
        id="cover-letter"
        options={{
          href: "/company",
        }}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "embed_flex")}
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3DcurrentColor%3E%0A%20%20%3Cpath%20d%3D%22M1.3335%207.99987C1.3335%207.42353%201.40663%206.86427%201.54413%206.33087C2.27098%206.36855%202.99248%206.00677%203.38136%205.33321C3.76994%204.66017%203.72287%203.85514%203.32764%203.24467C4.12252%202.46353%205.11238%201.88015%206.21752%201.57422C6.5483%202.22257%207.22236%202.66655%208.00016%202.66655C8.77796%202.66655%209.45203%202.22257%209.78283%201.57422C10.888%201.88015%2011.8778%202.46353%2012.6727%203.24467C12.2774%203.85514%2012.2304%204.66017%2012.619%205.33321C13.0078%206.00677%2013.7294%206.36855%2014.4562%206.33087C14.5937%206.86427%2014.6668%207.42353%2014.6668%207.99987C14.6668%208.5762%2014.5937%209.13547%2014.4562%209.66887C13.7294%209.6312%2013.0078%209.993%2012.619%2010.6665C12.2304%2011.3396%2012.2774%2012.1446%2012.6727%2012.7551C11.8778%2013.5362%2010.888%2014.1196%209.78283%2014.4255C9.45203%2013.7772%208.77796%2013.3332%208.00016%2013.3332C7.22236%2013.3332%206.5483%2013.7772%206.21752%2014.4255C5.11238%2014.1196%204.12252%2013.5362%203.32764%2012.7551C3.72287%2012.1446%203.76994%2011.3396%203.38136%2010.6665C2.99248%209.993%202.27098%209.6312%201.54413%209.66887C1.40663%209.13547%201.3335%208.5762%201.3335%207.99987ZM4.53606%209.99987C4.95613%2010.7275%205.07655%2011.5639%204.91228%2012.3491C5.18414%2012.5425%205.47353%2012.7101%205.77676%2012.8494C6.37467%2012.3141%207.15963%2011.9999%208.00016%2011.9999C8.8407%2011.9999%209.62563%2012.3141%2010.2236%2012.8494C10.5268%2012.7101%2010.8162%2012.5425%2011.088%2012.3491C10.9238%2011.5639%2011.0442%2010.7275%2011.4643%209.99987C11.8843%209.27233%2012.5485%208.74987%2013.3105%208.49953C13.3258%208.33433%2013.3335%208.16773%2013.3335%207.99987C13.3335%207.83207%2013.3258%207.6654%2013.3105%207.50027C12.5485%207.24993%2011.8843%206.72747%2011.4643%205.99988C11.0442%205.2723%2010.9238%204.43585%2011.088%203.6507C10.8162%203.45725%2010.5268%203.28965%2010.2236%203.15035C9.62563%203.68563%208.8407%203.99988%208.00016%203.99988C7.15963%203.99988%206.37467%203.68563%205.77676%203.15035C5.47353%203.28965%205.18414%203.45725%204.91228%203.6507C5.07655%204.43585%204.95613%205.2723%204.53606%205.99988C4.116%206.72747%203.45186%207.24993%202.68984%207.50027C2.67454%207.6654%202.66683%207.83207%202.66683%207.99987C2.66683%208.16773%202.67454%208.33433%202.68984%208.49953C3.45186%208.74987%204.116%209.27233%204.53606%209.99987ZM8.00016%209.99987C6.89556%209.99987%206.00016%209.10447%206.00016%207.99987C6.00016%206.89533%206.89556%205.99988%208.00016%205.99988C9.10476%205.99988%2010.0002%206.89533%2010.0002%207.99987C10.0002%209.10447%209.10476%209.99987%208.00016%209.99987ZM8.00016%208.66653C8.36836%208.66653%208.66683%208.36807%208.66683%207.99987C8.66683%207.63167%208.36836%207.3332%208.00016%207.3332C7.63196%207.3332%207.3335%207.63167%207.3335%207.99987C7.3335%208.36807%207.63196%208.66653%208.00016%208.66653Z%22%20fill%3DcurrentColor%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block tag="div">{"Company Settings"}</_Builtin.Block>
        {isMyCompany ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "aui_nav_sublink_active")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3DcurrentColor%3E%0A%20%20%3Cpath%20d%3D%22M1.3335%207.99987C1.3335%207.42353%201.40663%206.86427%201.54413%206.33087C2.27098%206.36855%202.99248%206.00677%203.38136%205.33321C3.76994%204.66017%203.72287%203.85514%203.32764%203.24467C4.12252%202.46353%205.11238%201.88015%206.21752%201.57422C6.5483%202.22257%207.22236%202.66655%208.00016%202.66655C8.77796%202.66655%209.45203%202.22257%209.78283%201.57422C10.888%201.88015%2011.8778%202.46353%2012.6727%203.24467C12.2774%203.85514%2012.2304%204.66017%2012.619%205.33321C13.0078%206.00677%2013.7294%206.36855%2014.4562%206.33087C14.5937%206.86427%2014.6668%207.42353%2014.6668%207.99987C14.6668%208.5762%2014.5937%209.13547%2014.4562%209.66887C13.7294%209.6312%2013.0078%209.993%2012.619%2010.6665C12.2304%2011.3396%2012.2774%2012.1446%2012.6727%2012.7551C11.8778%2013.5362%2010.888%2014.1196%209.78283%2014.4255C9.45203%2013.7772%208.77796%2013.3332%208.00016%2013.3332C7.22236%2013.3332%206.5483%2013.7772%206.21752%2014.4255C5.11238%2014.1196%204.12252%2013.5362%203.32764%2012.7551C3.72287%2012.1446%203.76994%2011.3396%203.38136%2010.6665C2.99248%209.993%202.27098%209.6312%201.54413%209.66887C1.40663%209.13547%201.3335%208.5762%201.3335%207.99987ZM4.53606%209.99987C4.95613%2010.7275%205.07655%2011.5639%204.91228%2012.3491C5.18414%2012.5425%205.47353%2012.7101%205.77676%2012.8494C6.37467%2012.3141%207.15963%2011.9999%208.00016%2011.9999C8.8407%2011.9999%209.62563%2012.3141%2010.2236%2012.8494C10.5268%2012.7101%2010.8162%2012.5425%2011.088%2012.3491C10.9238%2011.5639%2011.0442%2010.7275%2011.4643%209.99987C11.8843%209.27233%2012.5485%208.74987%2013.3105%208.49953C13.3258%208.33433%2013.3335%208.16773%2013.3335%207.99987C13.3335%207.83207%2013.3258%207.6654%2013.3105%207.50027C12.5485%207.24993%2011.8843%206.72747%2011.4643%205.99988C11.0442%205.2723%2010.9238%204.43585%2011.088%203.6507C10.8162%203.45725%2010.5268%203.28965%2010.2236%203.15035C9.62563%203.68563%208.8407%203.99988%208.00016%203.99988C7.15963%203.99988%206.37467%203.68563%205.77676%203.15035C5.47353%203.28965%205.18414%203.45725%204.91228%203.6507C5.07655%204.43585%204.95613%205.2723%204.53606%205.99988C4.116%206.72747%203.45186%207.24993%202.68984%207.50027C2.67454%207.6654%202.66683%207.83207%202.66683%207.99987C2.66683%208.16773%202.67454%208.33433%202.68984%208.49953C3.45186%208.74987%204.116%209.27233%204.53606%209.99987ZM8.00016%209.99987C6.89556%209.99987%206.00016%209.10447%206.00016%207.99987C6.00016%206.89533%206.89556%205.99988%208.00016%205.99988C9.10476%205.99988%2010.0002%206.89533%2010.0002%207.99987C10.0002%209.10447%209.10476%209.99987%208.00016%209.99987ZM8.00016%208.66653C8.36836%208.66653%208.66683%208.36807%208.66683%207.99987C8.66683%207.63167%208.36836%207.3332%208.00016%207.3332C7.63196%207.3332%207.3335%207.63167%207.3335%207.99987C7.3335%208.36807%207.63196%208.66653%208.00016%208.66653Z%22%20fill%3DcurrentColor%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"Company Settings"}</_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Link>
      <_Builtin.Block
        className={_utils.cx(_styles, "", "subnav-link")}
        tag="div"
        {...onClickLogout}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "menu-item-icon-block")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewbox%3D%220%200%2014%2014%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20d%3D%22M3.6546%202.22009L4.3237%203.17594C3.12019%204.01996%202.33341%205.41778%202.33341%206.99935C2.33341%209.57669%204.42275%2011.666%207.00008%2011.666C9.57742%2011.666%2011.6667%209.57669%2011.6667%206.99935C11.6667%205.41778%2010.8799%204.01996%209.67647%203.17594L10.3456%202.22009C11.85%203.27511%2012.8334%205.02238%2012.8334%206.99935C12.8334%2010.221%2010.2217%2012.8327%207.00008%2012.8327C3.77842%2012.8327%201.16675%2010.221%201.16675%206.99935C1.16675%205.02238%202.15021%203.27511%203.6546%202.22009ZM6.41675%206.99935V1.16602H7.58342V6.99935H6.41675Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block tag="div">{"Logout"}</_Builtin.Block>
      </_Builtin.Block>
      {isProfileVisible ? (
        <_Builtin.Link
          className={_utils.cx(_styles, "rd-menu-profile-block")}
          button={false}
          options={{
            href: "/profile",
          }}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "rd-menu-profile-image")}
            tag="div"
          >
            {slotProfileImage}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "rd-menu-profile-info")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "",
                "max-width-130",
                "one-line-clamp"
              )}
              tag="div"
            >
              {textName}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-sm",
                "color-grey-400",
                "one-line-clamp"
              )}
              tag="div"
            >
              {textEmail}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Link>
      ) : null}
    </_Component>
  );
}
