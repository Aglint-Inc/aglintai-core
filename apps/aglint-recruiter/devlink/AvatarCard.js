"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./AvatarCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1404":{"id":"e-1404","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-495","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1405"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c6197904-d616-fad8-6dd9-87347c57f041","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c6197904-d616-fad8-6dd9-87347c57f041","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698675503362},"e-1405":{"id":"e-1405","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-496","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1404"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c6197904-d616-fad8-6dd9-87347c57f041","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c6197904-d616-fad8-6dd9-87347c57f041","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698675503371},"e-1434":{"id":"e-1434","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-512","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1435"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"707f859f-fbb1-03e7-2b83-ff810eceda57","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"707f859f-fbb1-03e7-2b83-ff810eceda57","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699092997716},"e-1435":{"id":"e-1435","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-513","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1434"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"707f859f-fbb1-03e7-2b83-ff810eceda57","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"707f859f-fbb1-03e7-2b83-ff810eceda57","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699092997716},"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-495":{"id":"a-495","title":"Avatar video Overlay in","actionItemGroups":[{"actionItems":[{"id":"a-495-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":0,"unit":""}},{"id":"a-495-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":"none"}}]},{"actionItems":[{"id":"a-495-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":1,"unit":""}},{"id":"a-495-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698674528534},"a-496":{"id":"a-496","title":"Avatar video Overlay Out","actionItemGroups":[{"actionItems":[{"id":"a-496-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":0,"unit":""}},{"id":"a-496-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1698674528534},"a-512":{"id":"a-512","title":"Avatar video Overlay in 2","actionItemGroups":[{"actionItems":[{"id":"a-512-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":0,"unit":""}},{"id":"a-512-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":"none"}}]},{"actionItems":[{"id":"a-512-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":1,"unit":""}},{"id":"a-512-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698674528534},"a-513":{"id":"a-513","title":"Avatar video Overlay Out 2","actionItemGroups":[{"actionItems":[{"id":"a-513-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":0,"unit":""}},{"id":"a-513-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1698674528534},"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AvatarCard({
  as: _Component = _Builtin.Block,
  isActive = false,
  slotAvatarVideo,
  textAvatarName = "Avatar_name",
  isPause = false,
  isPlay = true,
  onClickPlayPause = {},
  isVideoIconVisible = true,
  onClickChecked = {},
  isChecked = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "avatar-assesment-slot")}
      data-w-id="c6197904-d616-fad8-6dd9-87347c57f041"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-avatar-videos")}
        tag="div"
      >
        {slotAvatarVideo}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "avatar-name-wrap")}
        tag="div"
      >
        <_Builtin.Block tag="div">{textAvatarName}</_Builtin.Block>
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "active-avatar-state")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-545")}
            tag="div"
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "avatar-card-overlay")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cursor-pointer")}
          tag="div"
          {...onClickPlayPause}
        >
          {isPlay ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons", "avatar-play")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2230%22%20height%3D%2230%22%20viewbox%3D%220%200%2030%2030%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20filter%3D%22url(%23filter0_b_4384_81316)%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2215%22%20cy%3D%2215%22%20r%3D%2215%22%20fill%3D%22white%22%20fill-opacity%3D%220.8%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cpath%20d%3D%22M20.8569%2014.076C21.523%2014.4618%2021.5216%2015.4241%2020.8544%2015.8081L12.7138%2020.4927C12.0465%2020.8766%2011.2139%2020.3943%2011.215%2019.6245L11.2283%2010.2322C11.2294%209.46236%2012.0634%208.98242%2012.7296%209.36827L20.8569%2014.076Z%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cfilter%20id%3D%22filter0_b_4384_81316%22%20x%3D%22-1.23711%22%20y%3D%22-1.23711%22%20width%3D%2232.4742%22%20height%3D%2232.4742%22%20filterunits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%20%20%20%20%20%20%3Cfeflood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%20%20%20%20%20%20%3Cfegaussianblur%20in%3D%22BackgroundImageFix%22%20stddeviation%3D%220.618557%22%2F%3E%0A%20%20%20%20%20%20%3Cfecomposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_4384_81316%22%2F%3E%0A%20%20%20%20%20%20%3Cfeblend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_4384_81316%22%20result%3D%22shape%22%2F%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
          {isPause ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons", "avatar-pause")}
              value="%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20viewbox%3D%220%200%2030%2030%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20filter%3D%22url(%23filter0_b_4384_81289)%22%3E%0A%3Ccircle%20cx%3D%2215%22%20cy%3D%2215%22%20r%3D%2215%22%20fill%3D%22white%22%20fill-opacity%3D%220.8%22%2F%3E%0A%3C%2Fg%3E%0A%3Crect%20x%3D%2211%22%20y%3D%2210%22%20width%3D%223%22%20height%3D%2211%22%20rx%3D%221%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%3Crect%20x%3D%2216%22%20y%3D%2210%22%20width%3D%223%22%20height%3D%2211%22%20rx%3D%221%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22filter0_b_4384_81289%22%20x%3D%22-1.23711%22%20y%3D%22-1.23711%22%20width%3D%2232.4742%22%20height%3D%2232.4742%22%20filterunits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%3Cfeflood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%3Cfegaussianblur%20in%3D%22BackgroundImageFix%22%20stddeviation%3D%220.618557%22%2F%3E%0A%3Cfecomposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_4384_81289%22%2F%3E%0A%3Cfeblend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_4384_81289%22%20result%3D%22shape%22%2F%3E%0A%3C%2Ffilter%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-553")}
        tag="div"
      />
      {isVideoIconVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "video-icon-wrap")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2214%22%20height%3D%2210%22%20viewbox%3D%220%200%2014%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.57473%200.747513C1.26848%200.762826%201.00817%200.870013%200.79379%201.06908C0.594728%201.28345%200.48754%201.54376%200.472228%201.85001V7.73001C0.48754%208.03626%200.594728%208.29657%200.79379%208.51095C1.00817%208.71001%201.26848%208.8172%201.57473%208.83251H7.45473C7.76098%208.8172%208.02129%208.71001%208.23566%208.51095C8.43473%208.29657%208.54191%208.03626%208.55723%207.73001V6.00736V3.57267V1.85001C8.54191%201.54376%208.43473%201.28345%208.23566%201.06908C8.02129%200.870013%207.76098%200.762826%207.45473%200.747513H1.57473ZM8.92473%206.65048V7.73001C8.90941%208.14345%208.76395%208.48798%208.48832%208.76361C8.2127%209.03923%207.86816%209.1847%207.45473%209.20001H1.57473C1.16129%209.1847%200.816759%209.03923%200.541134%208.76361C0.265509%208.48798%200.12004%208.14345%200.104728%207.73001V1.85001C0.12004%201.43658%200.265509%201.09204%200.541134%200.81642C0.816759%200.540795%201.16129%200.395326%201.57473%200.380013H7.45473C7.86816%200.395326%208.2127%200.540795%208.48832%200.81642C8.76395%201.09204%208.90941%201.43658%208.92473%201.85001V2.92954V3.57267V6.00736V6.65048ZM12.0255%208.35017L9.65973%207.04095V6.62751L12.2093%208.02861C12.2858%208.07454%2012.37%208.09751%2012.4619%208.09751C12.7682%208.06689%2012.9366%207.89845%2012.9672%207.5922V1.98783C12.9366%201.68158%2012.7682%201.51314%2012.4619%201.48251C12.37%201.48251%2012.2858%201.50548%2012.2093%201.55142L9.65973%202.95251V2.53908L12.0255%201.22986C12.1633%201.15329%2012.3088%201.11501%2012.4619%201.11501C12.7069%201.11501%2012.9136%201.19923%2013.0821%201.36767C13.2505%201.53611%2013.3347%201.74283%2013.3347%201.98783V7.5922C13.3347%207.8372%2013.2505%208.04392%2013.0821%208.21236C12.9136%208.38079%2012.7069%208.46501%2012.4619%208.46501C12.3088%208.46501%2012.1633%208.42673%2012.0255%208.35017Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "checkbox-wrap-avatar-card")}
        tag="div"
        {...onClickChecked}
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
