import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./TeamListItem.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1546":{"id":"e-1546","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-587","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1547"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"734bebfa-3d4c-48c0-8642-09598032cc59","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"734bebfa-3d4c-48c0-8642-09598032cc59","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710312098777},"e-1547":{"id":"e-1547","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-588","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1546"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"734bebfa-3d4c-48c0-8642-09598032cc59","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"734bebfa-3d4c-48c0-8642-09598032cc59","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1710312098781}},"actionLists":{"a-587":{"id":"a-587","title":"Team Actions Hover In","actionItemGroups":[{"actionItems":[{"id":"a-587-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-930","selectorGuids":["1314adde-fa10-5262-b802-853b4c29d792"]},"value":0,"unit":""}},{"id":"a-587-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-930","selectorGuids":["1314adde-fa10-5262-b802-853b4c29d792"]},"value":"none"}}]},{"actionItems":[{"id":"a-587-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-930","selectorGuids":["1314adde-fa10-5262-b802-853b4c29d792"]},"value":1,"unit":""}},{"id":"a-587-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-930","selectorGuids":["1314adde-fa10-5262-b802-853b4c29d792"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1710312103325},"a-588":{"id":"a-588","title":"Team Actions Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-588-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".div-block-930","selectorGuids":["1314adde-fa10-5262-b802-853b4c29d792"]},"value":0,"unit":""}},{"id":"a-588-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-930","selectorGuids":["1314adde-fa10-5262-b802-853b4c29d792"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1710312103325}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function TeamListItem({
  as: _Component = _Builtin.Block,
  slotUserRole,
  userStatusProps = {},
  userStatusText = "Active",
  dateText = "29 Aug 2023",
  onClickRemove = {},
  userName = "Roberto Carlos",
  userEmail = "roberto@sample.com",
  slotProfileImage,
  isDeleteVisible = true,
  onClickCancelInvite = {},
  isCancelInviteVisible = true,
  onClickEditInvite = {},
  isEditInviteVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "tu-list-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "tu-list-item", "user")}
        id={_utils.cx(
          _styles,
          "w-node-a60860aa-9493-87fc-f445-b3f1087efc8c-087efc8b"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "tu-list-item-user-image")}
          tag="div"
        >
          {slotProfileImage}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "tu-list-item-user-info")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {userName}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {userEmail}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "tu-list-item")}
        id={_utils.cx(
          _styles,
          "w-node-a60860aa-9493-87fc-f445-b3f1087efc93-087efc8b"
        )}
        tag="div"
      >
        {slotUserRole}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "tu-list-item")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "tu-list-item-status")}
          tag="div"
          {...userStatusProps}
        >
          {userStatusText}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "tu-list-item")}
        id={_utils.cx(
          _styles,
          "w-node-a60860aa-9493-87fc-f445-b3f1087efc98-087efc8b"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-color-black")}
          tag="div"
        >
          {dateText}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "tu-list-item", "actions")}
        id={_utils.cx(
          _styles,
          "w-node-a60860aa-9493-87fc-f445-b3f1087efc9b-087efc8b"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "actions-team-card")}
          data-w-id="734bebfa-3d4c-48c0-8642-09598032cc59"
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon-embed")}
            value="%3Csvg%20width%3D%2214%22%20height%3D%2216%22%20viewBox%3D%220%200%2014%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.25%208C0.270833%207.33333%200.5625%206.83333%201.125%206.5C1.70833%206.16667%202.29167%206.16667%202.875%206.5C3.4375%206.83333%203.72917%207.33333%203.75%208C3.72917%208.66667%203.4375%209.16667%202.875%209.5C2.29167%209.83333%201.70833%209.83333%201.125%209.5C0.5625%209.16667%200.270833%208.66667%200.25%208ZM5.25%208C5.27083%207.33333%205.5625%206.83333%206.125%206.5C6.70833%206.16667%207.29167%206.16667%207.875%206.5C8.4375%206.83333%208.72917%207.33333%208.75%208C8.72917%208.66667%208.4375%209.16667%207.875%209.5C7.29167%209.83333%206.70833%209.83333%206.125%209.5C5.5625%209.16667%205.27083%208.66667%205.25%208ZM12%206.25C12.6667%206.27083%2013.1667%206.5625%2013.5%207.125C13.8333%207.70833%2013.8333%208.29167%2013.5%208.875C13.1667%209.4375%2012.6667%209.72917%2012%209.75C11.3333%209.72917%2010.8333%209.4375%2010.5%208.875C10.1667%208.29167%2010.1667%207.70833%2010.5%207.125C10.8333%206.5625%2011.3333%206.27083%2012%206.25Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-930")}
            tag="div"
          >
            {isEditInviteVisible ? (
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "div-block-932",
                  "gap-3",
                  "cursor-pointer"
                )}
                tag="div"
                {...onClickEditInvite}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2217%22%20viewBox%3D%220%200%2016%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.2188%201.90625C14.0104%201.71875%2013.7708%201.625%2013.5%201.625C13.2292%201.625%2012.9896%201.71875%2012.7812%201.90625L11.9688%202.75L13.75%204.53125L14.5938%203.71875C14.7812%203.51042%2014.875%203.27083%2014.875%203C14.875%202.72917%2014.7812%202.48958%2014.5938%202.28125L14.2188%201.90625ZM5.90625%208.8125C5.78125%208.9375%205.69792%209.09375%205.65625%209.28125L5.15625%2011.3438L7.21875%2010.875C7.40625%2010.8125%207.5625%2010.7188%207.6875%2010.5938L13.0312%205.25L11.25%203.46875L5.90625%208.8125ZM12.0938%201.21875C12.5104%200.822917%2012.9792%200.625%2013.5%200.625C14.0417%200.625%2014.5104%200.822917%2014.9062%201.21875L15.2812%201.59375C15.6771%202.01042%2015.875%202.47917%2015.875%203C15.875%203.54167%2015.6771%204.01042%2015.2812%204.40625L8.40625%2011.3125C8.13542%2011.5833%207.8125%2011.7604%207.4375%2011.8438L4.625%2012.5C4.4375%2012.5208%204.28125%2012.4688%204.15625%2012.3438C4.03125%2012.2188%203.97917%2012.0729%204%2011.9062L4.65625%209.0625C4.73958%208.6875%204.91667%208.36458%205.1875%208.09375L12.0938%201.21875ZM2.5%202.5H6.5C6.8125%202.52083%206.97917%202.6875%207%203C6.97917%203.3125%206.8125%203.47917%206.5%203.5H2.5C2.08333%203.52083%201.72917%203.66667%201.4375%203.9375C1.16667%204.22917%201.02083%204.58333%201%205V14C1.02083%2014.4167%201.16667%2014.7708%201.4375%2015.0625C1.72917%2015.3333%202.08333%2015.4792%202.5%2015.5H11.5C11.9167%2015.4792%2012.2708%2015.3333%2012.5625%2015.0625C12.8333%2014.7708%2012.9792%2014.4167%2013%2014V10C13.0208%209.6875%2013.1875%209.52083%2013.5%209.5C13.8125%209.52083%2013.9792%209.6875%2014%2010V14C13.9792%2014.7083%2013.7396%2015.3021%2013.2812%2015.7812C12.8021%2016.2396%2012.2083%2016.4792%2011.5%2016.5H2.5C1.79167%2016.4792%201.19792%2016.2396%200.71875%2015.7812C0.260417%2015.3021%200.0208333%2014.7083%200%2014V5C0.0208333%204.29167%200.260417%203.69792%200.71875%203.21875C1.19792%202.76042%201.79167%202.52083%202.5%202.5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block tag="div">{"Edit"}</_Builtin.Block>
              </_Builtin.Block>
            ) : null}
            {isCancelInviteVisible ? (
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "div-block-932",
                  "gap-3",
                  "cursor-pointer"
                )}
                tag="div"
                {...onClickCancelInvite}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2218%22%20height%3D%2217%22%20viewBox%3D%220%200%2025%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.71969%200H16.6237C17.1014%200.0238846%2017.5074%200.191077%2017.8418%200.501576C18.1523%200.835961%2018.3195%201.242%2018.3434%201.71969C18.3195%202.29292%2018.0926%202.74673%2017.6627%203.08111L17.1611%203.47521C15.943%203.59463%2014.8801%204.01261%2013.9725%204.72915C13.041%205.4218%2012.3603%206.31747%2011.9304%207.41617L9.85239%208.95672C9.39859%209.24334%208.94478%209.24334%208.49097%208.95672L0.680711%203.08111C0.250788%202.74673%200.0238846%202.29292%200%201.71969C0.0238846%201.242%200.191077%200.835961%200.501576%200.501576C0.835961%200.191077%201.242%200.0238846%201.71969%200ZM10.5331%209.85239L11.5004%209.13586C11.4765%209.35082%2011.4646%209.55384%2011.4646%209.74491C11.4885%2011.2974%2011.9662%2012.6349%2012.8977%2013.7575H2.29292C1.64804%2013.7336%201.11063%2013.5067%200.680711%2013.0768C0.250788%2012.6469%200.0238846%2012.1095%200%2011.4646V4.01261L7.81026%209.85239C8.2163%2010.1629%208.67011%2010.3181%209.17168%2010.3181C9.67326%2010.3181%2010.1271%2010.1629%2010.5331%209.85239ZM22.9292%209.74491C22.9292%2010.6764%2022.7023%2011.5363%2022.2485%2012.3244C21.7947%2013.1126%2021.1617%2013.7456%2020.3497%2014.2233C19.5376%2014.6771%2018.6777%2014.904%2017.7701%2014.904C16.8625%2014.904%2016.0027%2014.6771%2015.1906%2014.2233C14.3785%2013.7456%2013.7456%2013.1126%2013.2918%2012.3244C12.838%2011.5363%2012.6111%2010.6764%2012.6111%209.74491C12.6111%208.81341%2012.838%207.95357%2013.2918%207.16538C13.7456%206.37719%2014.3785%205.74424%2015.1906%205.26655C16.0027%204.81275%2016.8625%204.58584%2017.7701%204.58584C18.6777%204.58584%2019.5376%204.81275%2020.3497%205.26655C21.1617%205.74424%2021.7947%206.37719%2022.2485%207.16538C22.7023%207.95357%2022.9292%208.81341%2022.9292%209.74491ZM21.3313%207.79593C21.0686%207.55708%2020.4333%206.78772%2020.1705%207.02657C20.1705%207.02657%2018.7733%203.8693%2018.3075%206.01892C17.8418%208.16853%2015.5919%206.42018%2015.5919%206.42018C15.0545%209.75924%2014.7153%208.47425%2014.4526%208.7131C14.2137%208.97583%2014.2137%2010.2847%2014.4526%2010.5474L15.8283%2012.3818C16.091%2012.6206%2018.0448%2013.3157%2018.3075%2013.0768L21.7899%2010.5474C22.0288%2010.2847%2021.5702%208.05866%2021.3313%207.79593Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3Cpath%20d%3D%22M18.1202%2014.9617C17.117%2014.9474%2016.1999%2014.7037%2015.3687%2014.2308C14.5375%2013.7436%2013.864%2013.07%2013.3481%2012.2102C12.8608%2011.336%2012.6172%2010.4188%2012.6172%209.45868C12.6172%208.49852%2012.8608%207.58135%2013.3481%206.70718C13.864%205.84733%2014.5375%205.17378%2015.3687%204.68654C16.1999%204.21362%2017.117%203.97%2018.1202%203.95567C19.1233%203.97%2020.0405%204.21362%2020.8717%204.68654C21.7029%205.17378%2022.3764%205.84733%2022.8923%206.70718C23.3796%207.58135%2023.6232%208.49852%2023.6232%209.45868C23.6232%2010.4188%2023.3796%2011.336%2022.8923%2012.2102C22.3764%2013.07%2021.7029%2013.7436%2020.8717%2014.2308C20.0405%2014.7037%2019.1233%2014.9474%2018.1202%2014.9617ZM16.379%207.71749C16.1784%207.96112%2016.1784%208.20474%2016.379%208.44836L17.3893%209.45868L16.379%2010.469C16.1784%2010.7126%2016.1784%2010.9562%2016.379%2011.1999C16.6226%2011.4005%2016.8663%2011.4005%2017.1099%2011.1999L18.1202%2010.1895L19.1305%2011.1999C19.3741%2011.4005%2019.6178%2011.4005%2019.8614%2011.1999C20.062%2010.9562%2020.062%2010.7126%2019.8614%2010.469L18.8511%209.45868L19.8614%208.44836C20.062%208.20474%2020.062%207.96112%2019.8614%207.71749C19.6178%207.51686%2019.3741%207.51686%2019.1305%207.71749L18.1202%208.72781L17.1099%207.71749C16.8663%207.51686%2016.6226%207.51686%2016.379%207.71749Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-red-500")}
                  tag="div"
                >
                  {"Cancel Invite"}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
            {isDeleteVisible ? (
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "div-block-932",
                  "cursor-pointer"
                )}
                tag="div"
                {...onClickRemove}
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2214%22%20height%3D%2217%22%20viewBox%3D%220%200%2014%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.5625%201.5C5.375%201.5%205.22917%201.58333%205.125%201.75L4.65625%202.5H9.34375L8.875%201.75C8.77083%201.58333%208.625%201.5%208.4375%201.5H5.5625ZM10.5312%202.5H12H13H13.5C13.8125%202.52083%2013.9792%202.6875%2014%203C13.9792%203.3125%2013.8125%203.47917%2013.5%203.5H12.9375L12.125%2014.6562C12.0833%2015.1771%2011.875%2015.6146%2011.5%2015.9688C11.125%2016.3021%2010.6667%2016.4792%2010.125%2016.5H3.875C3.33333%2016.4792%202.875%2016.3021%202.5%2015.9688C2.125%2015.6146%201.91667%2015.1771%201.875%2014.6562L1.0625%203.5H0.5C0.1875%203.47917%200.0208333%203.3125%200%203C0.0208333%202.6875%200.1875%202.52083%200.5%202.5H1H2H3.46875L4.28125%201.21875C4.59375%200.760417%205.02083%200.520833%205.5625%200.5H8.4375C8.97917%200.520833%209.40625%200.760417%209.71875%201.21875L10.5312%202.5ZM11.9375%203.5H2.0625L2.875%2014.5625C2.89583%2014.8333%203%2015.0521%203.1875%2015.2188C3.375%2015.4062%203.60417%2015.5%203.875%2015.5H10.125C10.3958%2015.5%2010.625%2015.4062%2010.8125%2015.2188C11%2015.0521%2011.1042%2014.8333%2011.125%2014.5625L11.9375%203.5Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-red-500")}
                  tag="div"
                >
                  {"Delete"}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
