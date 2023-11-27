import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { CandidateDetailsCard } from "./CandidateDetailsCard";
import { CandidateEmpty } from "./CandidateEmpty";
import { AddJobButton } from "./AddJobButton";
import { CandidateDialog } from "./CandidateDialog";
import * as _utils from "./utils";
import _styles from "./CandidateDatabaseDetail.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1352":{"id":"e-1352","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1353"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365602},"e-1353":{"id":"e-1353","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1352"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"0064b8cf-9479-2476-c6a2-f47e4400269f","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365605},"e-1382":{"id":"e-1382","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-489","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1383"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1383":{"id":"e-1383","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-490","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1382"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"a79fecd5-634e-0ac6-7d1c-48e52d7d03d9","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697550948479},"e-1386":{"id":"e-1386","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1387"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976388},"e-1387":{"id":"e-1387","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1386"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"6f093b60-cbb7-c451-fc49-a51ba7c34eb3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697701976390},"e-1480":{"id":"e-1480","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-534","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1481"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d4b3858d-7766-63cc-4349-4e8a95780973","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d4b3858d-7766-63cc-4349-4e8a95780973","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700662942673},"e-1481":{"id":"e-1481","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-535","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1480"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d4b3858d-7766-63cc-4349-4e8a95780973","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d4b3858d-7766-63cc-4349-4e8a95780973","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700662942678}},"actionLists":{"a-471":{"id":"a-471","title":"Email Interaction Hover In","actionItemGroups":[{"actionItems":[{"id":"a-471-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-471-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-471-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-471-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-471-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-471-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-472":{"id":"a-472","title":"Email Interaction Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-472-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-472-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-472-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-489":{"id":"a-489","title":"Email Interaction Hover In 2","actionItemGroups":[{"actionItems":[{"id":"a-489-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-489-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-489-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-489-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-489-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-489-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-490":{"id":"a-490","title":"Email Interaction Hover Out 2","actionItemGroups":[{"actionItems":[{"id":"a-490-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-490-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-490-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737},"a-534":{"id":"a-534","title":"Candidate Download Open","actionItemGroups":[{"actionItems":[{"id":"a-534-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".download-wrap","selectorGuids":["e4b570d5-1802-ddc2-825b-5534bfaacd4f"]},"value":0,"unit":""}},{"id":"a-534-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".download-wrap","selectorGuids":["e4b570d5-1802-ddc2-825b-5534bfaacd4f"]},"value":"none"}}]},{"actionItems":[{"id":"a-534-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".download-wrap","selectorGuids":["e4b570d5-1802-ddc2-825b-5534bfaacd4f"]},"value":1,"unit":""}},{"id":"a-534-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".download-wrap","selectorGuids":["e4b570d5-1802-ddc2-825b-5534bfaacd4f"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700047434410},"a-535":{"id":"a-535","title":"Candidate Download Close","actionItemGroups":[{"actionItems":[{"id":"a-535-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".download-wrap","selectorGuids":["e4b570d5-1802-ddc2-825b-5534bfaacd4f"]},"value":0,"unit":""}},{"id":"a-535-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".download-wrap","selectorGuids":["e4b570d5-1802-ddc2-825b-5534bfaacd4f"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700047434410}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateDatabaseDetail({
  as: _Component = _Builtin.Block,
  slotSearchInput,
  onClickAll = {},
  isAllActive = true,
  isBookMarkedActive = false,
  slotCandidateDetailsCard,
  isSelected = true,
  textSelectedCount = "2 Candidate selected",
  onClickClearSelection = {},
  onClickBookmarkSelection = {},
  slotAddtoJob,
  slotCandidateDialog,
  onClickCandidateDatabase = {},
  onClickDownloadBookmarked = {},
  onClickDowloadAllCandidate = {},
  onClickFilter = {},
  textRole = "Software Developer",
  onClickBookmarked = {},
  textAllCount = "2",
  textBookmarkCount = "2",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "candidates-database-wrapper")}
      tag="div"
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A.cvs-info-content-main%20%7B%0Aheight%3A%20calc(100%25%20-%20320px)%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "cdb-header-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cdb-header-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cdb-header-info-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "arrow-back-cd")}
              tag="div"
              {...onClickCandidateDatabase}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%225%22%20height%3D%229%22%20viewBox%3D%220%200%205%209%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.549479%204.70052C0.427951%204.56684%200.427951%204.43316%200.549479%204.29948L4.04948%200.799479C4.18316%200.677951%204.31684%200.677951%204.45052%200.799479C4.57205%200.93316%204.57205%201.06684%204.45052%201.20052L1.16927%204.5L4.45052%207.79948C4.57205%207.93316%204.57205%208.06684%204.45052%208.20052C4.31684%208.32205%204.18316%208.32205%204.04948%208.20052L0.549479%204.70052Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "fw-semibold",
                "one-line-clamp",
                "mx-width-662"
              )}
              dyn={{
                bind: {},
              }}
              tag="div"
            >
              {textRole}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "tablet-left-auto")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "text-blue-600",
                  "ml-8",
                  "cursor-pointer"
                )}
                tag="div"
                {...onClickFilter}
              >
                {"Edit Query"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cdb-header-button-wrapper", "hide")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "select-action-btn",
                "outline",
                "relative"
              )}
              data-w-id="d4b3858d-7766-63cc-4349-4e8a95780973"
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20width%3D%2210%22%20height%3D%2211%22%20viewBox%3D%220%200%2010%2011%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.05234%2010.7C0.833593%2010.6854%200.716927%2010.5688%200.702343%2010.35C0.716927%2010.1313%200.833593%2010.0146%201.05234%2010H8.75234C8.97109%2010.0146%209.08776%2010.1313%209.10234%2010.35C9.08776%2010.5688%208.97109%2010.6854%208.75234%2010.7H1.05234ZM5.14297%208.49062C4.98255%208.63646%204.82214%208.63646%204.66172%208.49062L1.86172%205.69062C1.71589%205.53021%201.71589%205.36979%201.86172%205.20937C2.02214%205.06354%202.18255%205.06354%202.34297%205.20937L4.55234%207.39687V5.1V1.25C4.56693%201.03125%204.68359%200.914583%204.90234%200.899999C5.12109%200.914583%205.23776%201.03125%205.25234%201.25V5.1V7.39687L7.46172%205.20937C7.62214%205.06354%207.78255%205.06354%207.94297%205.20937C8.0888%205.36979%208.0888%205.53021%207.94297%205.69062L5.14297%208.49062Z%22%20fill%3D%22%231F73B7%22%20style%3D%22fill%3A%231F73B7%3Bfill%3Acolor(display-p3%200.1216%200.4510%200.7176)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"Download"}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "download-wrap")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "download-sub-wrap")}
                  tag="div"
                  {...onClickDownloadBookmarked}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2214%22%20height%3D%2216%22%20viewBox%3D%220%200%2014%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.32656%2015.05C0.998437%2015.0281%200.823437%2014.8531%200.801562%2014.525C0.823437%2014.1969%200.998437%2014.0219%201.32656%2014H12.8766C13.2047%2014.0219%2013.3797%2014.1969%2013.4016%2014.525C13.3797%2014.8531%2013.2047%2015.0281%2012.8766%2015.05H1.32656ZM7.4625%2011.7359C7.22188%2011.9547%206.98125%2011.9547%206.74063%2011.7359L2.54062%207.53594C2.32187%207.29531%202.32187%207.05469%202.54062%206.81406C2.78125%206.59531%203.02187%206.59531%203.2625%206.81406L6.57656%2010.0953V6.65V0.874999C6.59844%200.546874%206.77344%200.371874%207.10156%200.349999C7.42969%200.371874%207.60469%200.546874%207.62656%200.874999V6.65V10.0953L10.9406%206.81406C11.1813%206.59531%2011.4219%206.59531%2011.6625%206.81406C11.8813%207.05469%2011.8813%207.29531%2011.6625%207.53594L7.4625%2011.7359Z%22%20fill%3D%22%231F73B7%22%20style%3D%22fill%3A%231F73B7%3Bfill%3Acolor(display-p3%200.1216%200.4510%200.7176)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block tag="div">
                    {"Download only bookmarked candidates"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "download-sub-wrap")}
                  tag="div"
                  {...onClickDowloadAllCandidate}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icons")}
                    value="%3Csvg%20width%3D%2214%22%20height%3D%2216%22%20viewBox%3D%220%200%2014%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.32656%2015.05C0.998437%2015.0281%200.823437%2014.8531%200.801562%2014.525C0.823437%2014.1969%200.998437%2014.0219%201.32656%2014H12.8766C13.2047%2014.0219%2013.3797%2014.1969%2013.4016%2014.525C13.3797%2014.8531%2013.2047%2015.0281%2012.8766%2015.05H1.32656ZM7.4625%2011.7359C7.22188%2011.9547%206.98125%2011.9547%206.74063%2011.7359L2.54062%207.53594C2.32187%207.29531%202.32187%207.05469%202.54062%206.81406C2.78125%206.59531%203.02187%206.59531%203.2625%206.81406L6.57656%2010.0953V6.65V0.874999C6.59844%200.546874%206.77344%200.371874%207.10156%200.349999C7.42969%200.371874%207.60469%200.546874%207.62656%200.874999V6.65V10.0953L10.9406%206.81406C11.1813%206.59531%2011.4219%206.59531%2011.6625%206.81406C11.8813%207.05469%2011.8813%207.29531%2011.6625%207.53594L7.4625%2011.7359Z%22%20fill%3D%22%231F73B7%22%20style%3D%22fill%3A%231F73B7%3Bfill%3Acolor(display-p3%200.1216%200.4510%200.7176)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block tag="div">
                    {"Download all candidates"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cdb-main-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cdb-main-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cdb-main-top")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cdb-search-wrapper", "hide")}
              tag="div"
            >
              {slotSearchInput}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cdb-filters-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cdb-tabs-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cdb-tab-link", "pointer")}
                  tag="div"
                  {...onClickAll}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "position-relative", "z-5")}
                    tag="div"
                  >
                    {"All"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "number-wrap", "bg-grey-200")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-sm")}
                      tag="div"
                    >
                      {textAllCount}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  {isAllActive ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cdb-tab-link-bg")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "position-relative",
                          "z-5"
                        )}
                        tag="div"
                      >
                        {"All"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "number-wrap")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "text-sm")}
                          tag="div"
                        >
                          {textAllCount}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "cdb-tab-link",
                    "pointer",
                    "color-grey-800"
                  )}
                  tag="div"
                  {...onClickBookmarked}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "position-relative", "z-5")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2216%22%20height%3D%2215%22%20viewBox%3D%220%200%2016%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.33398%205.37109C6.18815%205.64453%205.96029%205.80859%205.65039%205.86328L1.9043%206.41016L4.63867%209.11719C4.83919%209.31771%204.92122%209.57292%204.88477%209.88281L4.22852%2013.6836L7.5918%2011.9062C7.86523%2011.7604%208.13867%2011.7604%208.41211%2011.9062L11.7754%2013.6836L11.1191%209.88281C11.0827%209.57292%2011.1647%209.31771%2011.3652%209.11719L14.0996%206.41016L10.3262%205.86328C10.0345%205.80859%209.81576%205.64453%209.66992%205.37109L8.00195%201.89844L6.33398%205.37109ZM11.748%2014.668L8.00195%2012.6719L4.25586%2014.668C4.01888%2014.7956%203.79102%2014.7773%203.57227%2014.6133C3.35352%2014.4492%203.26237%2014.2396%203.29883%2013.9844L4.00977%209.71875L0.974609%206.71094C0.792317%206.52865%200.73763%206.3099%200.810546%206.05469C0.901692%205.79948%201.08398%205.65365%201.35742%205.61719L5.54102%204.98828L7.40039%201.13281C7.52799%200.895833%207.72852%200.768228%208.00195%200.749999C8.27539%200.768228%208.47591%200.895833%208.60352%201.13281L10.4629%204.98828L14.6465%205.58984C14.9199%205.64453%2015.1022%205.79948%2015.1934%206.05469C15.2663%206.3099%2015.2116%206.52865%2015.0293%206.71094L11.9941%209.71875L12.7051%2013.9844C12.7415%2014.2396%2012.6504%2014.4492%2012.4316%2014.6133C12.2129%2014.7773%2011.985%2014.7956%2011.748%2014.668Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E" />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "position-relative", "z-5")}
                    tag="div"
                  >
                    {"Bookmarked"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "number-wrap", "bg-grey-200")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "text-sm")}
                      tag="div"
                    >
                      {textBookmarkCount}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  {isBookMarkedActive ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cdb-tab-link-bg")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "position-relative",
                          "z-5"
                        )}
                        tag="div"
                      >
                        <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2216%22%20height%3D%2215%22%20viewBox%3D%220%200%2016%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.33398%205.37109C6.18815%205.64453%205.96029%205.80859%205.65039%205.86328L1.9043%206.41016L4.63867%209.11719C4.83919%209.31771%204.92122%209.57292%204.88477%209.88281L4.22852%2013.6836L7.5918%2011.9062C7.86523%2011.7604%208.13867%2011.7604%208.41211%2011.9062L11.7754%2013.6836L11.1191%209.88281C11.0827%209.57292%2011.1647%209.31771%2011.3652%209.11719L14.0996%206.41016L10.3262%205.86328C10.0345%205.80859%209.81576%205.64453%209.66992%205.37109L8.00195%201.89844L6.33398%205.37109ZM11.748%2014.668L8.00195%2012.6719L4.25586%2014.668C4.01888%2014.7956%203.79102%2014.7773%203.57227%2014.6133C3.35352%2014.4492%203.26237%2014.2396%203.29883%2013.9844L4.00977%209.71875L0.974609%206.71094C0.792317%206.52865%200.73763%206.3099%200.810546%206.05469C0.901692%205.79948%201.08398%205.65365%201.35742%205.61719L5.54102%204.98828L7.40039%201.13281C7.52799%200.895833%207.72852%200.768228%208.00195%200.749999C8.27539%200.768228%208.47591%200.895833%208.60352%201.13281L10.4629%204.98828L14.6465%205.58984C14.9199%205.64453%2015.1022%205.79948%2015.1934%206.05469C15.2663%206.3099%2015.2116%206.52865%2015.0293%206.71094L11.9941%209.71875L12.7051%2013.9844C12.7415%2014.2396%2012.6504%2014.4492%2012.4316%2014.6133C12.2129%2014.7773%2011.985%2014.7956%2011.748%2014.668Z%22%20fill%3D%22%23fff%22%2F%3E%0A%3C%2Fsvg%3E" />
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "position-relative",
                          "z-5"
                        )}
                        tag="div"
                      >
                        {"Bookmarked"}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "number-wrap")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "text-sm")}
                          tag="div"
                        >
                          {textBookmarkCount}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  ) : null}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cdb-main-bottom")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cdb-main-content")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "cdb-cards-wrapper")}
                tag="div"
              >
                {slotCandidateDetailsCard ?? (
                  <>
                    <CandidateDetailsCard />
                    <CandidateEmpty />
                  </>
                )}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cdb-selection-bar")}
              tag="div"
            >
              {isSelected ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "cdb-select-bar-block")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cdb-select-left-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "fw-semibold")}
                      tag="div"
                    >
                      {textSelectedCount}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cdb-select-clear-btn")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "text-blue-600-2",
                          "text-underline"
                        )}
                        tag="div"
                        {...onClickClearSelection}
                      >
                        {"Clear Selection"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cdb-select-right-block")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "cdb-select-btn",
                        "clickable"
                      )}
                      tag="div"
                      {...onClickBookmarkSelection}
                    >
                      <_Builtin.Block tag="div">
                        <_Builtin.HtmlEmbed
                          className={_utils.cx(_styles, "icon-embed")}
                          value="%3Csvg%20width%3D%2216%22%20height%3D%2215%22%20viewBox%3D%220%200%2016%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.33398%205.37109C6.18815%205.64453%205.96029%205.80859%205.65039%205.86328L1.9043%206.41016L4.63867%209.11719C4.83919%209.31771%204.92122%209.57292%204.88477%209.88281L4.22852%2013.6836L7.5918%2011.9062C7.86523%2011.7604%208.13867%2011.7604%208.41211%2011.9062L11.7754%2013.6836L11.1191%209.88281C11.0827%209.57292%2011.1647%209.31771%2011.3652%209.11719L14.0996%206.41016L10.3262%205.86328C10.0345%205.80859%209.81576%205.64453%209.66992%205.37109L8.00195%201.89844L6.33398%205.37109ZM11.748%2014.668L8.00195%2012.6719L4.25586%2014.668C4.01888%2014.7956%203.79102%2014.7773%203.57227%2014.6133C3.35352%2014.4492%203.26237%2014.2396%203.29883%2013.9844L4.00977%209.71875L0.974609%206.71094C0.792317%206.52865%200.73763%206.3099%200.810546%206.05469C0.901692%205.79948%201.08398%205.65365%201.35742%205.61719L5.54102%204.98828L7.40039%201.13281C7.52799%200.895833%207.72852%200.768228%208.00195%200.749999C8.27539%200.768228%208.47591%200.895833%208.60352%201.13281L10.4629%204.98828L14.6465%205.58984C14.9199%205.64453%2015.1022%205.79948%2015.1934%206.05469C15.2663%206.3099%2015.2116%206.52865%2015.0293%206.71094L11.9941%209.71875L12.7051%2013.9844C12.7415%2014.2396%2012.6504%2014.4492%2012.4316%2014.6133C12.2129%2014.7773%2011.985%2014.7956%2011.748%2014.668Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                        />
                      </_Builtin.Block>
                      <_Builtin.Block tag="div">
                        {"Bookmark selection"}
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        "cdb-select-dropdown",
                        "dropdown"
                      )}
                      tag="div"
                    >
                      {slotAddtoJob ?? <AddJobButton />}
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "cdb-sidebar")} tag="div">
          {slotCandidateDialog ?? <CandidateDialog />}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
