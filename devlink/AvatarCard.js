import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./AvatarCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1404":{"id":"e-1404","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-495","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1405"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c6197904-d616-fad8-6dd9-87347c57f041","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c6197904-d616-fad8-6dd9-87347c57f041","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698675503362},"e-1405":{"id":"e-1405","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-496","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1404"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"c6197904-d616-fad8-6dd9-87347c57f041","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"c6197904-d616-fad8-6dd9-87347c57f041","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698675503371}},"actionLists":{"a-495":{"id":"a-495","title":"Avatar video Overlay in","actionItemGroups":[{"actionItems":[{"id":"a-495-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":0,"unit":""}},{"id":"a-495-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":"none"}}]},{"actionItems":[{"id":"a-495-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":1,"unit":""}},{"id":"a-495-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698674528534},"a-496":{"id":"a-496","title":"Avatar video Overlay Out","actionItemGroups":[{"actionItems":[{"id":"a-496-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":0,"unit":""}},{"id":"a-496-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".avatar-card-overlay","selectorGuids":["bdc38d73-d8c0-12fd-87ee-b723f83dc313"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1698674528534}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AvatarCard({
  as: _Component = _Builtin.Block,
  isActive = false,
  slotAvatarVideo,
  textAvatarName = "Avatar_name",
  isPause = false,
  isPlay = true,
  onClickPlayPause = {},
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
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20filter%3D%22url(%23filter0_b_4384_81316)%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%2215%22%20cy%3D%2215%22%20r%3D%2215%22%20fill%3D%22white%22%20fill-opacity%3D%220.8%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cpath%20d%3D%22M20.8569%2014.076C21.523%2014.4618%2021.5216%2015.4241%2020.8544%2015.8081L12.7138%2020.4927C12.0465%2020.8766%2011.2139%2020.3943%2011.215%2019.6245L11.2283%2010.2322C11.2294%209.46236%2012.0634%208.98242%2012.7296%209.36827L20.8569%2014.076Z%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cfilter%20id%3D%22filter0_b_4384_81316%22%20x%3D%22-1.23711%22%20y%3D%22-1.23711%22%20width%3D%2232.4742%22%20height%3D%2232.4742%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%20%20%20%20%20%20%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%20%20%20%20%20%20%3CfeGaussianBlur%20in%3D%22BackgroundImageFix%22%20stdDeviation%3D%220.618557%22%2F%3E%0A%20%20%20%20%20%20%3CfeComposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_4384_81316%22%2F%3E%0A%20%20%20%20%20%20%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_4384_81316%22%20result%3D%22shape%22%2F%3E%0A%20%20%20%20%3C%2Ffilter%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
          {isPause ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons", "avatar-pause")}
              value="%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20filter%3D%22url(%23filter0_b_4384_81289)%22%3E%0A%3Ccircle%20cx%3D%2215%22%20cy%3D%2215%22%20r%3D%2215%22%20fill%3D%22white%22%20fill-opacity%3D%220.8%22%2F%3E%0A%3C%2Fg%3E%0A%3Crect%20x%3D%2211%22%20y%3D%2210%22%20width%3D%223%22%20height%3D%2211%22%20rx%3D%221%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%3Crect%20x%3D%2216%22%20y%3D%2210%22%20width%3D%223%22%20height%3D%2211%22%20rx%3D%221%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22filter0_b_4384_81289%22%20x%3D%22-1.23711%22%20y%3D%22-1.23711%22%20width%3D%2232.4742%22%20height%3D%2232.4742%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%3CfeGaussianBlur%20in%3D%22BackgroundImageFix%22%20stdDeviation%3D%220.618557%22%2F%3E%0A%3CfeComposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_4384_81289%22%2F%3E%0A%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_4384_81289%22%20result%3D%22shape%22%2F%3E%0A%3C%2Ffilter%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
