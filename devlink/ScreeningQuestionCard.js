import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./ScreeningQuestionCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1352":{"id":"e-1352","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1353"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365602},"e-1353":{"id":"e-1353","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1352"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365605},"e-1382":{"id":"e-1382","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-489","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1383"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1383":{"id":"e-1383","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-490","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1382"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1386":{"id":"e-1386","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1387"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976388},"e-1387":{"id":"e-1387","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1386"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976390},"e-1409":{"id":"e-1409","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-498","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1408"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"94ad54a0-5dd7-afbc-6986-427eb0c9ec04","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"94ad54a0-5dd7-afbc-6986-427eb0c9ec04","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698913869065},"e-1411":{"id":"e-1411","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-498","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1410"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"6778b9d0-e0e4-cda9-0ff3-a0cb5acb82f9"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698916199371}},"actionLists":{"a-471":{"id":"a-471","title":"Email Interaction Hover In","actionItemGroups":[{"actionItems":[{"id":"a-471-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-471-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-471-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-471-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-471-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-471-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-472":{"id":"a-472","title":"Email Interaction Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-472-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-472-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-472-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-489":{"id":"a-489","title":"Email Interaction Hover In 2","actionItemGroups":[{"actionItems":[{"id":"a-489-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-489-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-489-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-489-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-489-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-489-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-490":{"id":"a-490","title":"Email Interaction Hover Out 2","actionItemGroups":[{"actionItems":[{"id":"a-490-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-490-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-490-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-498":{"id":"a-498","title":"Assessment Video Overlay hover in 2","actionItemGroups":[{"actionItems":[{"id":"a-498-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":0,"unit":""}},{"id":"a-498-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"selector":".slot-empty-video-wrap","selectorGuids":["d3718a34-de50-a8a3-9bcb-6b4194a15c1f"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1698913183271}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ScreeningQuestionCard({
  as: _Component = _Builtin.Block,
  slotInput,
  onClickGenerate = {},
  slotVideo,
  isGeneratingLoaderVisible = false,
  slotGeneratingLottie,
  isEditButtonVisible = false,
  isGenerateButtonVisible = true,
  onClickEdit = {},
  onClickDelete = {},
  isSaveButtonVisible = false,
  isGenerateVisible = false,
  slotEmptyVideo,
  onClickGenerateVideo = {},
  isPauseButtonVisible = false,
  isPlayButtonVisible = true,
  onClickPause = {},
  onClickPlay = {},
  onClickSave = {},
  onClickCancel = {},
  isPlayPauseButtonVisible = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "new-screening-video-wrap")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "new-screen-intro-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-video-welcome")}
          tag="div"
        >
          {slotVideo}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-empty-video-wrap")}
          tag="div"
        >
          {isGeneratingLoaderVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "generate-overaly")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-541")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-540")}
                  tag="div"
                >
                  {slotGeneratingLottie}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-sm")}
                  tag="div"
                >
                  {"Generating Video."}
                  <br />
                  {"This May take a while"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isGenerateVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "generate-overaly")}
              data-w-id="94ad54a0-5dd7-afbc-6986-427eb0c9ec04"
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "button-white-ai")}
                tag="div"
                {...onClickGenerateVideo}
              >
                <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2214%22%20height%3D%2213%22%20viewBox%3D%220%200%2014%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.8125%200.84375C11.9401%200.861979%2012.013%200.934896%2012.0312%201.0625V2.59375H13.5625C13.6901%202.61198%2013.763%202.6849%2013.7812%202.8125C13.763%202.9401%2013.6901%203.01302%2013.5625%203.03125H12.0312V4.5625C12.013%204.6901%2011.9401%204.76302%2011.8125%204.78125C11.6849%204.76302%2011.612%204.6901%2011.5938%204.5625V3.03125H10.0625C9.9349%203.01302%209.86198%202.9401%209.84375%202.8125C9.86198%202.6849%209.9349%202.61198%2010.0625%202.59375H11.5938V1.0625C11.612%200.934896%2011.6849%200.861979%2011.8125%200.84375ZM11.8125%208.71875C11.9401%208.73698%2012.013%208.8099%2012.0312%208.9375V10.4688H13.5625C13.6901%2010.487%2013.763%2010.5599%2013.7812%2010.6875C13.763%2010.8151%2013.6901%2010.888%2013.5625%2010.9062H12.0312V12.4375C12.013%2012.5651%2011.9401%2012.638%2011.8125%2012.6562C11.6849%2012.638%2011.612%2012.5651%2011.5938%2012.4375V10.9062H10.0625C9.9349%2010.888%209.86198%2010.8151%209.84375%2010.6875C9.86198%2010.5599%209.9349%2010.487%2010.0625%2010.4688H11.5938V8.9375C11.612%208.8099%2011.6849%208.73698%2011.8125%208.71875ZM3.55469%205.27344L0.4375%206.72266L3.55469%208.14453C3.64583%208.19922%203.71875%208.27214%203.77344%208.36328L5.22266%2011.4805L6.64453%208.36328C6.69922%208.27214%206.77214%208.19922%206.86328%208.14453L9.98047%206.72266L6.86328%205.27344C6.77214%205.21875%206.69922%205.14583%206.64453%205.05469L5.22266%201.9375L3.77344%205.05469C3.71875%205.14583%203.64583%205.21875%203.55469%205.27344ZM5.60547%201.74609L7.05469%204.86328L10.1719%206.3125C10.3359%206.40365%2010.418%206.53125%2010.418%206.69531C10.418%206.8776%2010.3359%207.01432%2010.1719%207.10547L7.05469%208.55469L5.60547%2011.6719C5.51432%2011.8359%205.38672%2011.918%205.22266%2011.918C5.04036%2011.918%204.90365%2011.8359%204.8125%2011.6719L3.36328%208.55469L0.246094%207.10547C0.0820312%207.03255%200%206.90495%200%206.72266C0%206.54036%200.0820312%206.40365%200.246094%206.3125L3.36328%204.86328L4.8125%201.74609C4.90365%201.58203%205.04036%201.5%205.22266%201.5C5.40495%201.5%205.53255%201.58203%205.60547%201.74609Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E" />
                <_Builtin.Block tag="div">{"Generate Video"}</_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isPlayPauseButtonVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "generate-overlay")}
              data-w-id="6778b9d0-e0e4-cda9-0ff3-a0cb5acb82f9"
              tag="div"
            >
              <_Builtin.Block tag="div">
                {isPlayButtonVisible ? (
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons", "cursor-pointer")}
                    value="%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20filter%3D%22url(%23filter0_b_3600_33703)%22%3E%0A%3Ccircle%20cx%3D%2215%22%20cy%3D%2215%22%20r%3D%2215%22%20fill%3D%22white%22%20fill-opacity%3D%220.8%22%2F%3E%0A%3C%2Fg%3E%0A%3Cpath%20d%3D%22M20.8569%2014.076C21.523%2014.4618%2021.5216%2015.4241%2020.8544%2015.8081L12.7138%2020.4927C12.0465%2020.8766%2011.2139%2020.3943%2011.215%2019.6245L11.2283%2010.2322C11.2294%209.46236%2012.0634%208.98242%2012.7296%209.36827L20.8569%2014.076Z%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22filter0_b_3600_33703%22%20x%3D%22-1.23711%22%20y%3D%22-1.23711%22%20width%3D%2232.4742%22%20height%3D%2232.4742%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%3CfeGaussianBlur%20in%3D%22BackgroundImageFix%22%20stdDeviation%3D%220.618557%22%2F%3E%0A%3CfeComposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_3600_33703%22%2F%3E%0A%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_3600_33703%22%20result%3D%22shape%22%2F%3E%0A%3C%2Ffilter%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                    {...onClickPlay}
                  />
                ) : null}
                {isPauseButtonVisible ? (
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons", "cursor-pointer")}
                    value="%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cg%20filter%3D%22url(%23filter0_b_3600_33734)%22%3E%0A%3Ccircle%20cx%3D%2215%22%20cy%3D%2215%22%20r%3D%2215%22%20fill%3D%22white%22%20fill-opacity%3D%220.8%22%2F%3E%0A%3C%2Fg%3E%0A%3Crect%20x%3D%2211%22%20y%3D%2210%22%20width%3D%223%22%20height%3D%2211%22%20rx%3D%221%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%3Crect%20x%3D%2216%22%20y%3D%2210%22%20width%3D%223%22%20height%3D%2211%22%20rx%3D%221%22%20fill%3D%22black%22%20fill-opacity%3D%220.38%22%2F%3E%0A%3Cdefs%3E%0A%3Cfilter%20id%3D%22filter0_b_3600_33734%22%20x%3D%22-1.23711%22%20y%3D%22-1.23711%22%20width%3D%2232.4742%22%20height%3D%2232.4742%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%0A%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%0A%3CfeGaussianBlur%20in%3D%22BackgroundImageFix%22%20stdDeviation%3D%220.618557%22%2F%3E%0A%3CfeComposite%20in2%3D%22SourceAlpha%22%20operator%3D%22in%22%20result%3D%22effect1_backgroundBlur_3600_33734%22%2F%3E%0A%3CfeBlend%20mode%3D%22normal%22%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_backgroundBlur_3600_33734%22%20result%3D%22shape%22%2F%3E%0A%3C%2Ffilter%3E%0A%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                    {...onClickPause}
                  />
                ) : null}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-548")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-input-new-screen")}
          tag="div"
        >
          {slotInput}
        </_Builtin.Block>
        {isGenerateButtonVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "text-blue-500", "cursor-pointer")}
            tag="div"
            {...onClickGenerate}
          >
            {"Generate"}
          </_Builtin.Block>
        ) : null}
        {isEditButtonVisible ? (
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
    </_Component>
  );
}
