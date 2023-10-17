import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./DisconnectInterviewModal.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-948":{"id":"e-948","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-386","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-949"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"},"targets":[{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694910129600}},"actionLists":{"a-386":{"id":"a-386","title":"email-temp-editor-[close]","actionItemGroups":[{"actionItems":[{"id":"a-386-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":0,"unit":""}},{"id":"a-386-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":800,"target":{"selector":".rd-email-edit-wrapper","selectorGuids":["2295ead5-85e1-b9a6-3337-5728082f803c"]},"xValue":500,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-386-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":600,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["5acd8927-8dc5-556d-8bbb-b45e8eb0ffa7"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694910134507}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function DisconnectInterviewModal({
  as: _Component = _Builtin.Block,
  isDisconnectVisible = true,
  isLoadingVisible = false,
  slotLoaderLottie,
  onClickDisconnect = {},
  onClickClose = {},
  onClickCancel = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "int-disconnect-popup-wrapper")}
      tag="div"
    >
      {isDisconnectVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "int-disconnect-popup-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "int-disconnect-header-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-color-black")}
              tag="div"
            >
              {"Are you really want to disconnect from the interview ?"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "int-disconnect-close-btn",
                "clickable"
              )}
              tag="div"
              {...onClickClose}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_3571_22049%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_3571_22049)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "int-disconnect-main-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "int-disconnect-warning-block")}
              tag="div"
            >
              <_Builtin.Block tag="div">
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icon-embed")}
                  value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M27.318%2025.3877L15.7305%203.05645C15.093%201.8002%2013.0493%201.8002%2012.393%203.05645L0.805515%2025.3877C0.505515%2025.9689%200.524265%2026.6627%200.861765%2027.2252C1.19926%2027.7877%201.81801%2028.1252%202.47426%2028.1252H25.6493C26.3055%2028.1252%2026.9055%2027.7877%2027.243%2027.2252C27.5805%2026.6627%2027.618%2025.9689%2027.318%2025.3877ZM13.1255%2011.2503C13.1255%2010.7253%2013.538%2010.3128%2014.063%2010.3128C14.588%2010.3128%2015.0005%2010.7253%2015.0005%2011.2503V17.8128C15.0005%2018.3378%2014.588%2018.7503%2014.063%2018.7503C13.538%2018.7503%2013.1255%2018.3378%2013.1255%2017.8128V11.2503ZM14.063%2024.3753C13.0317%2024.3753%2012.188%2023.5316%2012.188%2022.5003C12.188%2021.4691%2013.0317%2020.6253%2014.063%2020.6253C15.0942%2020.6253%2015.938%2021.4691%2015.938%2022.5003C15.938%2023.5316%2015.0942%2024.3753%2014.063%2024.3753Z%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-yellow-800-3")}
                tag="div"
              >
                {
                  "Your interview will be marked as incomplete since you didn’t answered all questions. Click ‘cancel’ to continue to interview."
                }
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "int-disconnect-buttons-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-501")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-red-600",
                    "cursor-pointer"
                  )}
                  tag="div"
                  {...onClickDisconnect}
                >
                  {"Disconnect"}
                </_Builtin.Block>
                <_Builtin.Block tag="div" {...onClickCancel}>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "aui-button-wrap")}
                    tag="div"
                    tabIndex="0"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "aui-button",
                        "is-button-bg-blue"
                      )}
                      tag="div"
                      tabIndex="0"
                    >
                      <_Builtin.Block tag="div">{"Cancel"}</_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isLoadingVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "int-disconnect-loader-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "int-disconnect-disconnect-lottie")}
            tag="div"
          >
            {slotLoaderLottie}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600-3")}
            tag="div"
          >
            {"Completed all questions. Redirecting to thanks"}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
