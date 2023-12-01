import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./ScreeningQuestionAudio.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1436":{"id":"e-1436","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-514","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1437"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"707f859f-fbb1-03e7-2b83-ff810eceda58","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"707f859f-fbb1-03e7-2b83-ff810eceda58","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699093697770},"e-1437":{"id":"e-1437","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-515","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1436"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"707f859f-fbb1-03e7-2b83-ff810eceda58","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"707f859f-fbb1-03e7-2b83-ff810eceda58","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699093697773}},"actionLists":{"a-514":{"id":"a-514","title":"Audio play Hover in","actionItemGroups":[{"actionItems":[{"id":"a-514-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-overlay-audio","selectorGuids":["d34529b2-c785-3d94-1f7c-5d546fd58de2"]},"value":0,"unit":""}},{"id":"a-514-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-overlay-audio","selectorGuids":["d34529b2-c785-3d94-1f7c-5d546fd58de2"]},"value":"none"}}]},{"actionItems":[{"id":"a-514-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".div-overlay-audio","selectorGuids":["d34529b2-c785-3d94-1f7c-5d546fd58de2"]},"value":1,"unit":""}},{"id":"a-514-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-overlay-audio","selectorGuids":["d34529b2-c785-3d94-1f7c-5d546fd58de2"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1699093702212},"a-515":{"id":"a-515","title":"Audio play Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-515-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".div-overlay-audio","selectorGuids":["d34529b2-c785-3d94-1f7c-5d546fd58de2"]},"value":0,"unit":""}},{"id":"a-515-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-overlay-audio","selectorGuids":["d34529b2-c785-3d94-1f7c-5d546fd58de2"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699093702212}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ScreeningQuestionAudio({
  as: _Component = _Builtin.Block,
  slotInput,
  slotAvatar,
  isPlayIconVisible = true,
  isPauseIconVisible = true,
  isMicVisible = true,
  onClickPlayPause = {},
  isEditVisible = true,
  isGenerateVisible = false,
  onClickEdit = {},
  onClickDelete = {},
  isSaveButtonVisible = false,
  onClickSave = {},
  onClickCancel = {},
  isActive = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "new-screening-video-wrap")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "audio-wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "audio-avatar-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-573")}
            tag="div"
          >
            {slotAvatar}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-overlay-audio")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cursor-pointer")}
              tag="div"
              {...onClickPlayPause}
            >
              {isPlayIconVisible ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons", "avatar-play")}
                  value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20filter%3D%22url(%23filter0_b_4384_81316)%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2215%22%20cy%3D%2215%22%20r%3D%2215%22%20fill%3D%22white%22%20fill-opacity%3D%220.8%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cpath%20d%3D%22M20.8569%2014.076C21.523%2014.4618%2021.5216%2015.4241%2020.8544%2015.8081L12.7138%2020.4927C12.0465%2020.8766%2011.2139%2020.3943%2011.215%2019.6245L11.2283%2010.2322C11.2294%209.46236%2012.0634%208.98242%2012.7296%209.36827L20.8569%2014.076Z%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cfilter%20id%3D%22filter0_b_4384_81316%22%20x%3D%22-1.23711%22%20y%3D%22-1.23711%22%20width%3D%2232.4742%22%20height%3D%2232.4742%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%20%20%20%20%20%20%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20in%3D%22BackgroundImageFix%22%20stdDeviation%3D%220.618557%22%2F%3E%0A%20%20%20%20%20%20%3CfeComposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_4384_81316%22%2F%3E%0A%20%20%20%20%20%20%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_4384_81316%22%20result%3D%22shape%22%2F%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                />
              ) : null}
              {isPauseIconVisible ? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons", "avatar-pause")}
                  value="%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20filter%3D%22url(%23filter0_b_4384_81289)%22%3E%0A%3Ccircle%20cx%3D%2215%22%20cy%3D%2215%22%20r%3D%2215%22%20fill%3D%22white%22%20fill-opacity%3D%220.8%22%2F%3E%0A%3C%2Fg%3E%0A%3Crect%20x%3D%2211%22%20y%3D%2210%22%20width%3D%223%22%20height%3D%2211%22%20rx%3D%221%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%3Crect%20x%3D%2216%22%20y%3D%2210%22%20width%3D%223%22%20height%3D%2211%22%20rx%3D%221%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22filter0_b_4384_81289%22%20x%3D%22-1.23711%22%20y%3D%22-1.23711%22%20width%3D%2232.4742%22%20height%3D%2232.4742%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%3CfeGaussianBlur%20in%3D%22BackgroundImageFix%22%20stdDeviation%3D%220.618557%22%2F%3E%0A%3CfeComposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_4384_81289%22%2F%3E%0A%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_4384_81289%22%20result%3D%22shape%22%2F%3E%0A%3C%2Ffilter%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                />
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isMicVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "video-icon-wrapper")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%228%22%20height%3D%2213%22%20viewBox%3D%220%200%208%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.68997%203.11617C5.67466%202.70274%205.52919%202.3582%205.25356%202.08258C4.97794%201.80695%204.63341%201.66149%204.21997%201.64617C3.80653%201.66149%203.462%201.80695%203.18638%202.08258C2.91075%202.3582%202.76528%202.70274%202.74997%203.11617V6.79117C2.76528%207.20461%202.91075%207.54914%203.18638%207.82477C3.462%208.10039%203.80653%208.24586%204.21997%208.26117C4.63341%208.24586%204.97794%208.10039%205.25356%207.82477C5.52919%207.54914%205.67466%207.20461%205.68997%206.79117V3.11617ZM2.01497%203.11617C2.03028%202.48836%202.24466%201.96774%202.6581%201.5543C3.07153%201.14086%203.59216%200.926486%204.21997%200.911173C4.84778%200.926486%205.36841%201.14086%205.78185%201.5543C6.19528%201.96774%206.40966%202.48836%206.42497%203.11617V6.79117C6.40966%207.41898%206.19528%207.93961%205.78185%208.35305C5.36841%208.76648%204.84778%208.98086%204.21997%208.99617C3.59216%208.98086%203.07153%208.76648%202.6581%208.35305C2.24466%207.93961%202.03028%207.41898%202.01497%206.79117V3.11617ZM1.27997%205.68867V6.79117C1.29528%207.61805%201.57856%208.31477%202.12981%208.88133C2.69638%209.43258%203.3931%209.71586%204.21997%209.73117C5.04685%209.71586%205.74356%209.43258%206.31013%208.88133C6.86138%208.31477%207.14466%207.61805%207.15997%206.79117V5.68867C7.17528%205.45899%207.29778%205.33649%207.52747%205.32117C7.75716%205.33649%207.87966%205.45899%207.89497%205.68867V6.79117C7.87966%207.77117%207.5581%208.59805%206.93028%209.2718C6.31778%209.94555%205.53685%2010.336%204.58747%2010.4432V11.9362H6.05747C6.28716%2011.9515%206.40966%2012.074%206.42497%2012.3037C6.40966%2012.5334%206.28716%2012.6559%206.05747%2012.6712H4.21997H2.38247C2.15278%2012.6559%202.03028%2012.5334%202.01497%2012.3037C2.03028%2012.074%202.15278%2011.9515%202.38247%2011.9362H3.85247V10.4432C2.9031%2010.336%202.12216%209.94555%201.50966%209.2718C0.881846%208.59805%200.560284%207.77117%200.544971%206.79117V5.68867C0.560284%205.45899%200.682784%205.33649%200.912471%205.32117C1.14216%205.33649%201.26466%205.45899%201.27997%205.68867Z%22%20fill%3D%22white%22%20style%3D%22fill%3Awhite%3Bfill%3Awhite%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-548")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-input-new-screen")}
          tag="div"
        >
          {slotInput}
        </_Builtin.Block>
        {isGenerateVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-500", "cursor-pointer")}
            tag="div"
          >
            {"Generate"}
          </_Builtin.Block>
        ) : null}
        {isEditVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "edit-delete-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-blue-500", "cursor-pointer")}
              tag="div"
              {...onClickEdit}
            >
              {"Edit"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "color-grey-600", "cursor-pointer")}
              tag="div"
              {...onClickDelete}
            >
              {"Delete"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isSaveButtonVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "edit-delete-wrappers")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-blue-500", "cursor-pointer")}
              tag="div"
              {...onClickSave}
            >
              {"Save"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "color-grey-600", "cursor-pointer")}
              tag="div"
              {...onClickCancel}
            >
              {"Cancel"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "active-screening-card")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
