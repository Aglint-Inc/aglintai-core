"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./AudioAvatarCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1434":{"id":"e-1434","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-512","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1435"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"707f859f-fbb1-03e7-2b83-ff810eceda57","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"707f859f-fbb1-03e7-2b83-ff810eceda57","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699092997716},"e-1435":{"id":"e-1435","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-513","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1434"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"707f859f-fbb1-03e7-2b83-ff810eceda57","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"707f859f-fbb1-03e7-2b83-ff810eceda57","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699092997716},"e-1436":{"id":"e-1436","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-514","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1437"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"707f859f-fbb1-03e7-2b83-ff810eceda58","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"707f859f-fbb1-03e7-2b83-ff810eceda58","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699093697770},"e-1437":{"id":"e-1437","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-515","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1436"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"707f859f-fbb1-03e7-2b83-ff810eceda58","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"707f859f-fbb1-03e7-2b83-ff810eceda58","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699093697773},"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-512":{"id":"a-512","title":"Avatar video Overlay in 2","actionItemGroups":[{"actionItems":[{"id":"a-512-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":0,"unit":""}},{"id":"a-512-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":"none"}}]},{"actionItems":[{"id":"a-512-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":1,"unit":""}},{"id":"a-512-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698674528534},"a-513":{"id":"a-513","title":"Avatar video Overlay Out 2","actionItemGroups":[{"actionItems":[{"id":"a-513-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":0,"unit":""}},{"id":"a-513-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1698674528534},"a-514":{"id":"a-514","title":"Audio play Hover in","actionItemGroups":[{"actionItems":[{"id":"a-514-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-overlay-audio","selectorGuids":["d34529b2-c785-3d94-1f7c-5d546fd58de2"]},"value":0,"unit":""}},{"id":"a-514-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-overlay-audio","selectorGuids":["d34529b2-c785-3d94-1f7c-5d546fd58de2"]},"value":"none"}}]},{"actionItems":[{"id":"a-514-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".div-overlay-audio","selectorGuids":["d34529b2-c785-3d94-1f7c-5d546fd58de2"]},"value":1,"unit":""}},{"id":"a-514-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-overlay-audio","selectorGuids":["d34529b2-c785-3d94-1f7c-5d546fd58de2"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1699093702212},"a-515":{"id":"a-515","title":"Audio play Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-515-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".div-overlay-audio","selectorGuids":["d34529b2-c785-3d94-1f7c-5d546fd58de2"]},"value":0,"unit":""}},{"id":"a-515-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-overlay-audio","selectorGuids":["d34529b2-c785-3d94-1f7c-5d546fd58de2"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699093702212},"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AudioAvatarCard({
  as: _Component = _Builtin.Block,
  isAudioIconVisible = true,
  onClickCheck = {},
  isChecked = false,
  slotAvatar,
  isPlayButtonVisible = true,
  isPauseButtonVisible = false,
  onClickPlayPause = {},
  isActive = false,
  textName = "Avatar_name",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "avatar-assesment-slot-audio")}
      data-w-id="707f859f-fbb1-03e7-2b83-ff810eceda57"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "audio-tag-wrappers")}
        data-w-id="707f859f-fbb1-03e7-2b83-ff810eceda58"
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-avatar-audio")}
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
            {isPlayButtonVisible ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons", "avatar-play")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2230%22%20height%3D%2230%22%20viewbox%3D%220%200%2030%2030%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20filter%3D%22url(%23filter0_b_4384_81316)%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2215%22%20cy%3D%2215%22%20r%3D%2215%22%20fill%3D%22white%22%20fill-opacity%3D%220.8%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cpath%20d%3D%22M20.8569%2014.076C21.523%2014.4618%2021.5216%2015.4241%2020.8544%2015.8081L12.7138%2020.4927C12.0465%2020.8766%2011.2139%2020.3943%2011.215%2019.6245L11.2283%2010.2322C11.2294%209.46236%2012.0634%208.98242%2012.7296%209.36827L20.8569%2014.076Z%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cfilter%20id%3D%22filter0_b_4384_81316%22%20x%3D%22-1.23711%22%20y%3D%22-1.23711%22%20width%3D%2232.4742%22%20height%3D%2232.4742%22%20filterunits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%20%20%20%20%20%20%3Cfeflood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%20%20%20%20%20%20%3Cfegaussianblur%20in%3D%22BackgroundImageFix%22%20stddeviation%3D%220.618557%22%2F%3E%0A%20%20%20%20%20%20%3Cfecomposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_4384_81316%22%2F%3E%0A%20%20%20%20%20%20%3Cfeblend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_4384_81316%22%20result%3D%22shape%22%2F%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
            {isPauseButtonVisible ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons", "avatar-pause")}
                value="%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20viewbox%3D%220%200%2030%2030%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20filter%3D%22url(%23filter0_b_4384_81289)%22%3E%0A%3Ccircle%20cx%3D%2215%22%20cy%3D%2215%22%20r%3D%2215%22%20fill%3D%22white%22%20fill-opacity%3D%220.8%22%2F%3E%0A%3C%2Fg%3E%0A%3Crect%20x%3D%2211%22%20y%3D%2210%22%20width%3D%223%22%20height%3D%2211%22%20rx%3D%221%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%3Crect%20x%3D%2216%22%20y%3D%2210%22%20width%3D%223%22%20height%3D%2211%22%20rx%3D%221%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22filter0_b_4384_81289%22%20x%3D%22-1.23711%22%20y%3D%22-1.23711%22%20width%3D%2232.4742%22%20height%3D%2232.4742%22%20filterunits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%3Cfeflood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%3Cfegaussianblur%20in%3D%22BackgroundImageFix%22%20stddeviation%3D%220.618557%22%2F%3E%0A%3Cfecomposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_4384_81289%22%2F%3E%0A%3Cfeblend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_4384_81289%22%20result%3D%22shape%22%2F%3E%0A%3C%2Ffilter%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "avatar-name-wrap-audio")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textName}</_Builtin.Block>
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "active-avatar-state-audio")}
          tag="div"
        />
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-553")}
        tag="div"
      />
      {isAudioIconVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "video-icon-wrap")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%228%22%20height%3D%2213%22%20viewbox%3D%220%200%208%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.05723%203.11501C6.04191%202.59439%205.86582%202.15798%205.52895%201.80579C5.17676%201.46892%204.74035%201.29283%204.21973%201.27751C3.6991%201.29283%203.2627%201.46892%202.91051%201.80579C2.57363%202.15798%202.39754%202.59439%202.38223%203.11501V6.79001C2.39754%207.31064%202.57363%207.74704%202.91051%208.09923C3.2627%208.43611%203.6991%208.6122%204.21973%208.62751C4.74035%208.6122%205.17676%208.43611%205.52895%208.09923C5.86582%207.74704%206.04191%207.31064%206.05723%206.79001V3.11501ZM2.01473%203.11501C2.03004%202.4872%202.24441%201.96658%202.65785%201.55314C3.07129%201.1397%203.59191%200.925326%204.21973%200.910014C4.84754%200.925326%205.36816%201.1397%205.7816%201.55314C6.19504%201.96658%206.40941%202.4872%206.42473%203.11501V6.79001C6.40941%207.41783%206.19504%207.93845%205.7816%208.35189C5.36816%208.76533%204.84754%208.9797%204.21973%208.99501C3.59191%208.9797%203.07129%208.76533%202.65785%208.35189C2.24441%207.93845%202.03004%207.41783%202.01473%206.79001V3.11501ZM0.912227%205.50376V6.79001C0.942852%207.72408%201.26441%208.50501%201.87691%209.13283C2.50473%209.74532%203.28566%2010.0669%204.21973%2010.0975C5.15379%2010.0669%205.93473%209.74532%206.56254%209.13283C7.17504%208.50501%207.4966%207.72408%207.52723%206.79001V5.50376C7.54254%205.39658%207.60379%205.33533%207.71098%205.32001C7.81816%205.33533%207.87941%205.39658%207.89473%205.50376V6.79001C7.8641%207.80064%207.52723%208.64283%206.8841%209.31657C6.22566%2010.0056%205.39879%2010.3884%204.40348%2010.465V12.3025H6.24098C6.34816%2012.3178%206.40941%2012.3791%206.42473%2012.4863C6.40941%2012.5934%206.34816%2012.6547%206.24098%2012.67H4.21973H2.19848C2.09129%2012.6547%202.03004%2012.5934%202.01473%2012.4863C2.03004%2012.3791%202.09129%2012.3178%202.19848%2012.3025H4.03598V10.465C3.04066%2010.3884%202.21379%2010.0056%201.55535%209.31657C0.912227%208.64283%200.575352%207.80064%200.544727%206.79001V5.50376C0.56004%205.39658%200.62129%205.33533%200.728477%205.32001C0.835665%205.33533%200.896915%205.39658%200.912227%205.50376Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "checkbox-wrap-avatar-card")}
        tag="div"
        {...onClickCheck}
      >
        {isChecked ? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%208.58579L10.2929%205.29289C10.6834%204.90237%2011.3166%204.90237%2011.7071%205.29289C12.0976%205.68342%2012.0976%206.31658%2011.7071%206.70711L7.70711%2010.7071C7.31658%2011.0976%206.68342%2011.0976%206.29289%2010.7071L4.29289%208.70711C3.90237%208.31658%203.90237%207.68342%204.29289%207.29289C4.68342%206.90237%205.31658%206.90237%205.70711%207.29289L7%208.58579Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
