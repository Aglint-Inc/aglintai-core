import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { CandidateDetailsCard } from "./CandidateDetailsCard";
import { AddtoJobList } from "./AddtoJobList";
import { CandidateDialog } from "./CandidateDialog";
import * as _utils from "./utils";
import _styles from "./CandidateDatabaseDetail.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1458":{"id":"e-1458","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-530","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1459"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d4b3858d-7766-63cc-4349-4e8a95780a2e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d4b3858d-7766-63cc-4349-4e8a95780a2e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700039841258},"e-1459":{"id":"e-1459","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-531","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1458"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d4b3858d-7766-63cc-4349-4e8a95780a2e","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d4b3858d-7766-63cc-4349-4e8a95780a2e","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700039841260},"e-1460":{"id":"e-1460","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-531","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1461"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"97c2fd30-d532-31bd-4828-17ab7e564ec6","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"97c2fd30-d532-31bd-4828-17ab7e564ec6","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700040347803},"e-1462":{"id":"e-1462","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-532","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1463"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad9d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad9d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700045418634},"e-1463":{"id":"e-1463","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-533","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1462"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad9d","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"8678ceb8-a929-4369-7ec7-1eaf5f29ad9d","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700045418637},"e-1464":{"id":"e-1464","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-534","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1465"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d4b3858d-7766-63cc-4349-4e8a95780971","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d4b3858d-7766-63cc-4349-4e8a95780971","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700047430485},"e-1465":{"id":"e-1465","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-535","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1464"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"d4b3858d-7766-63cc-4349-4e8a95780971","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"d4b3858d-7766-63cc-4349-4e8a95780971","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700047430488},"e-1468":{"id":"e-1468","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-538","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1469"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"f8c22b46-f0a8-145f-3b5b-c17ae0cf7f39"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700138910580},"e-1469":{"id":"e-1469","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-539","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1468"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"f8c22b46-f0a8-145f-3b5b-c17ae0cf7f39"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1700138910582}},"actionLists":{"a-530":{"id":"a-530","title":"add to job click 1","actionItemGroups":[{"actionItems":[{"id":"a-530-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".cdb-select-dropdown-body.dropdown-body","selectorGuids":["a9ce653d-ab8f-2ca2-c6e2-890f051d241d","a9ce653d-ab8f-2ca2-c6e2-890f051d243a"]},"value":0,"unit":""}},{"id":"a-530-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cdb-select-dropdown-body.dropdown-body","selectorGuids":["a9ce653d-ab8f-2ca2-c6e2-890f051d241d","a9ce653d-ab8f-2ca2-c6e2-890f051d243a"]},"value":"none"}}]},{"actionItems":[{"id":"a-530-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".cdb-select-dropdown-body.dropdown-body","selectorGuids":["a9ce653d-ab8f-2ca2-c6e2-890f051d241d","a9ce653d-ab8f-2ca2-c6e2-890f051d243a"]},"value":1,"unit":""}},{"id":"a-530-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cdb-select-dropdown-body.dropdown-body","selectorGuids":["a9ce653d-ab8f-2ca2-c6e2-890f051d241d","a9ce653d-ab8f-2ca2-c6e2-890f051d243a"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700039844872},"a-531":{"id":"a-531","title":"add to job click 2","actionItemGroups":[{"actionItems":[{"id":"a-531-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".cdb-select-dropdown-body.dropdown-body","selectorGuids":["a9ce653d-ab8f-2ca2-c6e2-890f051d241d","a9ce653d-ab8f-2ca2-c6e2-890f051d243a"]},"value":0,"unit":""}},{"id":"a-531-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cdb-select-dropdown-body.dropdown-body","selectorGuids":["a9ce653d-ab8f-2ca2-c6e2-890f051d241d","a9ce653d-ab8f-2ca2-c6e2-890f051d243a"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700039844872},"a-532":{"id":"a-532","title":"Add to job side Open","actionItemGroups":[{"actionItems":[{"id":"a-532-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".cdb-select-dropdown-body.dropdown-body-candi","selectorGuids":["a9ce653d-ab8f-2ca2-c6e2-890f051d241d","dc41357b-a735-491e-78dd-9b823125455c"]},"value":0,"unit":""}},{"id":"a-532-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cdb-select-dropdown-body.dropdown-body-candi","selectorGuids":["a9ce653d-ab8f-2ca2-c6e2-890f051d241d","dc41357b-a735-491e-78dd-9b823125455c"]},"value":"none"}}]},{"actionItems":[{"id":"a-532-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".cdb-select-dropdown-body.dropdown-body-candi","selectorGuids":["a9ce653d-ab8f-2ca2-c6e2-890f051d241d","dc41357b-a735-491e-78dd-9b823125455c"]},"value":1,"unit":""}},{"id":"a-532-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cdb-select-dropdown-body.dropdown-body-candi","selectorGuids":["a9ce653d-ab8f-2ca2-c6e2-890f051d241d","dc41357b-a735-491e-78dd-9b823125455c"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700045450028},"a-533":{"id":"a-533","title":"Add to job side Close","actionItemGroups":[{"actionItems":[{"id":"a-533-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".cdb-select-dropdown-body.dropdown-body-candi","selectorGuids":["a9ce653d-ab8f-2ca2-c6e2-890f051d241d","dc41357b-a735-491e-78dd-9b823125455c"]},"value":0,"unit":""}},{"id":"a-533-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cdb-select-dropdown-body.dropdown-body-candi","selectorGuids":["a9ce653d-ab8f-2ca2-c6e2-890f051d241d","dc41357b-a735-491e-78dd-9b823125455c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700045450028},"a-534":{"id":"a-534","title":"Candidate Download Open","actionItemGroups":[{"actionItems":[{"id":"a-534-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".download-wrap","selectorGuids":["e4b570d5-1802-ddc2-825b-5534bfaacd4f"]},"value":0,"unit":""}},{"id":"a-534-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".download-wrap","selectorGuids":["e4b570d5-1802-ddc2-825b-5534bfaacd4f"]},"value":"none"}}]},{"actionItems":[{"id":"a-534-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".download-wrap","selectorGuids":["e4b570d5-1802-ddc2-825b-5534bfaacd4f"]},"value":1,"unit":""}},{"id":"a-534-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".download-wrap","selectorGuids":["e4b570d5-1802-ddc2-825b-5534bfaacd4f"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700047434410},"a-535":{"id":"a-535","title":"Candidate Download Close","actionItemGroups":[{"actionItems":[{"id":"a-535-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".download-wrap","selectorGuids":["e4b570d5-1802-ddc2-825b-5534bfaacd4f"]},"value":0,"unit":""}},{"id":"a-535-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".download-wrap","selectorGuids":["e4b570d5-1802-ddc2-825b-5534bfaacd4f"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700047434410},"a-538":{"id":"a-538","title":"Chat Bubble Open","actionItemGroups":[{"actionItems":[{"id":"a-538-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"flex"}},{"id":"a-538-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":30,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-538-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":0,"unit":""}},{"id":"a-538-n-9","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"none"}},{"id":"a-538-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"none"}},{"id":"a-538-n-5","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":0,"unit":""}},{"id":"a-538-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":1,"unit":""}}]},{"actionItems":[{"id":"a-538-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":0,"unit":""}},{"id":"a-538-n-15","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"f8c22b46-f0a8-145f-3b5b-c17ae0cf7f39"},"xValue":0.9,"yValue":0.9,"locked":true}},{"id":"a-538-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"block"}},{"id":"a-538-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":1,"unit":""}},{"id":"a-538-n-12","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":0,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-538-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"none"}},{"id":"a-538-n-7","actionTypeId":"STYLE_OPACITY","config":{"delay":100,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":1,"unit":""}},{"id":"a-538-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":100,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1700132612161},"a-539":{"id":"a-539","title":"Chat Bubble Close","actionItemGroups":[{"actionItems":[{"id":"a-539-n-8","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":200,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":1,"unit":""}},{"id":"a-539-n-15","actionTypeId":"TRANSFORM_SCALE","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":true,"id":"f8c22b46-f0a8-145f-3b5b-c17ae0cf7f39"},"xValue":1,"yValue":1,"locked":true}},{"id":"a-539-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":0,"unit":""}},{"id":"a-539-n-11","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"yValue":30,"xUnit":"PX","yUnit":"px","zUnit":"PX"}},{"id":"a-539-n-14","actionTypeId":"GENERAL_DISPLAY","config":{"delay":100,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":"none"}},{"id":"a-539-n-13","actionTypeId":"STYLE_OPACITY","config":{"delay":100,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons.close","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","9eeb8ee6-ea6c-c3f8-e6a8-380a3a0c8366"]},"value":0,"unit":""}},{"id":"a-539-n-9","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"SIBLINGS","selector":".chat-box-menu-wrap","selectorGuids":["e4e50e61-12d4-9b2b-8d89-ff0bcc1b3137"]},"value":"none"}},{"id":"a-539-n-12","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".icons.message","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351","83f34a6b-15c3-201a-af07-af305a72c5f2"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1700132612161}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateDatabaseDetail({
  as: _Component = _Builtin.Block,
  onClickViewJobDescription = {},
  onClickDownload = {},
  onClickImport = {},
  slotSearchInput,
  onClickAll = {},
  isAllActive = true,
  onClickBookmarked = true,
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
  isViewJdVisible = true,
  onClickFilter = {},
  textRole = "Software Developer",
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
            <_Builtin.Link
              className={_utils.cx(_styles, "link-block-4", "bold-text-mobile")}
              button={false}
              options={{
                href: "#",
              }}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600-3")}
                tag="div"
                {...onClickCandidateDatabase}
              >
                {"Candidate Database"}
              </_Builtin.Block>
            </_Builtin.Link>
            <_Builtin.Block
              className={_utils.cx(_styles, "icon-block-4")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-2")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.60958%203.31233C5.43708%203.0967%205.47204%202.78205%205.68767%202.60955C5.87934%202.45621%206.14925%202.46679%206.32802%202.62249L6.39045%202.68763L10.3905%207.68763C10.5157%207.84416%2010.5336%208.05715%2010.4441%208.22981L10.3905%208.31233L6.39045%2013.3123C6.21795%2013.528%205.9033%2013.5629%205.68767%2013.3904C5.496%2013.2371%205.44708%2012.9714%205.55973%2012.7628L5.60958%2012.6876L9.35902%207.99998L5.60958%203.31233Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "one-line-clamp")}
              dyn={{
                bind: {},
              }}
              tag="div"
            >
              {textRole}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "tablet-left-auto",
                "text-underline"
              )}
              tag="div"
            >
              {isViewJdVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-blue-500-2", "ml-12")}
                  tag="div"
                  {...onClickViewJobDescription}
                >
                  {"View Job Description"}
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cdb-header-button-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "select-action-btn",
                "small",
                "outline",
                "relative"
              )}
              data-w-id="d4b3858d-7766-63cc-4349-4e8a95780971"
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2030%2030%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.2832%2024.3125C7.87305%2024.2852%207.6543%2024.0664%207.62695%2023.6563C7.6543%2023.2461%207.87305%2023.0273%208.2832%2023H22.7207C23.1309%2023.0273%2023.3496%2023.2461%2023.377%2023.6563C23.3496%2024.0664%2023.1309%2024.2852%2022.7207%2024.3125H8.2832ZM15.9531%2020.1699C15.6523%2020.4434%2015.3516%2020.4434%2015.0508%2020.1699L9.80078%2014.9199C9.52734%2014.6191%209.52734%2014.3184%209.80078%2014.0176C10.1016%2013.7441%2010.4023%2013.7441%2010.7031%2014.0176L14.8457%2018.1191V13.8125V6.59375C14.873%206.18359%2015.0918%205.96484%2015.502%205.9375C15.9121%205.96484%2016.1309%206.18359%2016.1582%206.59375V13.8125V18.1191L20.3008%2014.0176C20.6016%2013.7441%2020.9023%2013.7441%2021.2031%2014.0176C21.4766%2014.3184%2021.4766%2014.6191%2021.2031%2014.9199L15.9531%2020.1699Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
              />
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
            <_Builtin.Block
              className={_utils.cx(_styles, "select-action-btn", "outline")}
              tag="div"
              {...onClickImport}
            >
              <_Builtin.Block tag="div">{"Import Candidate"}</_Builtin.Block>
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
              className={_utils.cx(_styles, "cdb-search-wrapper")}
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
                  className={_utils.cx(_styles, "cdb-tab-link")}
                  tag="div"
                  {...onClickAll}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "position-relative", "z-5")}
                    tag="div"
                  >
                    {"All"}
                  </_Builtin.Block>
                  {isAllActive ? (
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cdb-tab-link-bg")}
                      tag="div"
                    />
                  ) : null}
                </_Builtin.Block>
                {onClickBookmarked ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cdb-tab-link")}
                    tag="div"
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
                    {isBookMarkedActive ? (
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cdb-tab-link-bg")}
                        tag="div"
                      />
                    ) : null}
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "cdb-filter-wrapper")}
                data-w-id="d4b3858d-7766-63cc-4349-4e8a95780986"
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cdb-filter-top")}
                  tag="div"
                  {...onClickFilter}
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "cdb-filter-trigger",
                      "clickable"
                    )}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "icon-block-4")}
                      tag="div"
                    >
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icon-embed")}
                        value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.4999%205.78034L0.74723%202.02768C0.532642%201.80879%200.471494%201.48632%200.589579%201.20751C0.707664%200.9287%200.981816%200.748241%201.28239%200.750013L10.7302%200.75005C11.0302%200.754265%2011.2989%200.936931%2011.4131%201.21441C11.5274%201.4919%2011.4653%201.81077%2011.2526%202.02768L7.4999%205.78034V9.93001C7.4999%2010.1841%207.37623%2010.4232%207.16755%2010.5573L5.66791%2011.5545C5.17055%2011.8861%204.4999%2011.5262%204.4999%2010.9275V5.78034ZM1.28038%201.5001L5.25008%205.46977V10.9276C5.25008%2010.9278%206.75729%209.92966%206.75729%209.92966C6.75064%209.93393%206.75008%205.46977%206.75008%205.46977L6.85991%205.35994L10.7198%201.50006L1.28038%201.5001Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    </_Builtin.Block>
                    <_Builtin.Block tag="div">{"Filter"}</_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "cdb-filter-count")}
                    tag="div"
                  >
                    {"1"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "cdb-filter-content")}
                  tag="div"
                />
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
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cdb-card-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cdb-card-header")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cdb-card-header-left")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cdb-card-checkmark")}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(_styles, "checkbox-image")}
                              loading="lazy"
                              width="auto"
                              height="auto"
                              alt=""
                              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6544e03f56a77e2226e848a3_Frame%201%20(2).png"
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cdb-card-header-main"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "cdb-card-profile-image-block"
                              )}
                              tag="div"
                            />
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "cdb-card-profile-info"
                              )}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(_styles, "fw-semibold")}
                                tag="div"
                              >
                                {"Dianne Russell"}
                              </_Builtin.Block>
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "cdb-card-company-info"
                                )}
                                tag="div"
                              >
                                <_Builtin.Block
                                  className={_utils.cx(
                                    _styles,
                                    "cdb-card-company-info-block"
                                  )}
                                  tag="div"
                                >
                                  <_Builtin.Block
                                    className={_utils.cx(
                                      _styles,
                                      "icon-block-4"
                                    )}
                                    tag="div"
                                  >
                                    <_Builtin.HtmlEmbed
                                      className={_utils.cx(
                                        _styles,
                                        "icon-embed"
                                      )}
                                      value="%3Csvg%20width%3D%2215%22%20height%3D%2214%22%20viewBox%3D%220%200%2015%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.87695%202.0625V3.375H10.127V2.0625C10.1087%201.78906%209.96289%201.64323%209.68945%201.625H5.31445C5.04102%201.64323%204.89518%201.78906%204.87695%202.0625ZM4.00195%203.375V2.0625C4.02018%201.69792%204.14779%201.38802%204.38477%201.13281C4.63997%200.895833%204.94987%200.768228%205.31445%200.749999H9.68945C10.054%200.768228%2010.3639%200.895833%2010.6191%201.13281C10.8561%201.38802%2010.9837%201.69792%2011.002%202.0625V3.375H12.752C13.2441%203.39323%2013.6543%203.56641%2013.9824%203.89453C14.3105%204.22266%2014.4837%204.63281%2014.502%205.125V12.125C14.4837%2012.6172%2014.3105%2013.0273%2013.9824%2013.3555C13.6543%2013.6836%2013.2441%2013.8568%2012.752%2013.875H2.25195C1.75977%2013.8568%201.34961%2013.6836%201.02148%2013.3555C0.693359%2013.0273%200.520182%2012.6172%200.501953%2012.125V5.125C0.520182%204.63281%200.693359%204.22266%201.02148%203.89453C1.34961%203.56641%201.75977%203.39323%202.25195%203.375H4.00195ZM10.5645%204.25H4.43945H2.25195C1.99674%204.25%201.78711%204.33203%201.62305%204.49609C1.45898%204.66016%201.37695%204.86979%201.37695%205.125V7.75H5.31445H6.18945H8.81445H9.68945H13.627V5.125C13.627%204.86979%2013.5449%204.66016%2013.3809%204.49609C13.2168%204.33203%2013.0072%204.25%2012.752%204.25H10.5645ZM13.627%208.625H9.68945V9.9375C9.68945%2010.1927%209.60742%2010.4023%209.44336%2010.5664C9.2793%2010.7305%209.06966%2010.8125%208.81445%2010.8125H6.18945C5.93424%2010.8125%205.72461%2010.7305%205.56055%2010.5664C5.39648%2010.4023%205.31445%2010.1927%205.31445%209.9375V8.625H1.37695V12.125C1.37695%2012.3802%201.45898%2012.5898%201.62305%2012.7539C1.78711%2012.918%201.99674%2013%202.25195%2013H12.752C13.0072%2013%2013.2168%2012.918%2013.3809%2012.7539C13.5449%2012.5898%2013.627%2012.3802%2013.627%2012.125V8.625ZM6.18945%208.625V9.9375H8.81445V8.625H6.18945Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
                                    />
                                  </_Builtin.Block>
                                  <_Builtin.Block
                                    className={_utils.cx(
                                      _styles,
                                      "text-grey-600-3"
                                    )}
                                    tag="div"
                                  >
                                    {"Software Engineer at Aglint"}
                                  </_Builtin.Block>
                                </_Builtin.Block>
                                <_Builtin.Block
                                  className={_utils.cx(
                                    _styles,
                                    "cdb-card-company-info-block"
                                  )}
                                  tag="div"
                                >
                                  <_Builtin.Block
                                    className={_utils.cx(
                                      _styles,
                                      "icon-block-4"
                                    )}
                                    tag="div"
                                  >
                                    <_Builtin.HtmlEmbed
                                      className={_utils.cx(
                                        _styles,
                                        "icon-embed"
                                      )}
                                      value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.877%208C14.8405%206.76042%2014.4121%205.73047%2013.5918%204.91016C12.7715%204.08984%2011.7415%203.66146%2010.502%203.625C9.26237%203.66146%208.23242%204.08984%207.41211%204.91016C6.5918%205.73047%206.16341%206.76042%206.12695%208C6.12695%208.4375%206.2819%209.01172%206.5918%209.72266C6.90169%2010.4518%207.29362%2011.2083%207.76758%2011.9922C8.24154%2012.7578%208.72461%2013.4687%209.2168%2014.125C9.70898%2014.7995%2010.1374%2015.3646%2010.502%2015.8203C10.8665%2015.3646%2011.2949%2014.7995%2011.7871%2014.125C12.2793%2013.4687%2012.7624%2012.7578%2013.2363%2011.9922C13.7285%2011.2083%2014.1296%2010.4518%2014.4395%209.72266C14.7311%209.01172%2014.877%208.4375%2014.877%208ZM15.752%208C15.7155%208.82031%2015.4238%209.76823%2014.877%2010.8437C14.3118%2011.9193%2013.6738%2012.9583%2012.9629%2013.9609C12.252%2014.9818%2011.6504%2015.793%2011.1582%2016.3945C10.9759%2016.6133%2010.7572%2016.7227%2010.502%2016.7227C10.2467%2016.7227%2010.028%2016.6133%209.8457%2016.3945C9.35352%2015.793%208.75195%2014.9818%208.04102%2013.9609C7.33008%2012.9583%206.69206%2011.9193%206.12695%2010.8437C5.58008%209.76823%205.28841%208.82031%205.25195%208C5.28841%206.50521%205.79883%205.26562%206.7832%204.28125C7.76758%203.29687%209.00716%202.78646%2010.502%202.75C11.9967%202.78646%2013.2363%203.29687%2014.2207%204.28125C15.2051%205.26562%2015.7155%206.50521%2015.752%208ZM9.18945%208C9.20768%208.49219%209.42643%208.875%209.8457%209.14844C10.2832%209.36719%2010.7207%209.36719%2011.1582%209.14844C11.5775%208.875%2011.7962%208.49219%2011.8145%208C11.7962%207.50781%2011.5775%207.125%2011.1582%206.85156C10.7207%206.63281%2010.2832%206.63281%209.8457%206.85156C9.42643%207.125%209.20768%207.50781%209.18945%208ZM10.502%2010.1875C9.68164%2010.1693%209.05273%209.80469%208.61523%209.09375C8.21419%208.36458%208.21419%207.63542%208.61523%206.90625C9.05273%206.19531%209.68164%205.83073%2010.502%205.8125C11.3223%205.83073%2011.9512%206.19531%2012.3887%206.90625C12.7897%207.63542%2012.7897%208.36458%2012.3887%209.09375C11.9512%209.80469%2011.3223%2010.1693%2010.502%2010.1875Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
                                    />
                                  </_Builtin.Block>
                                  <_Builtin.Block
                                    className={_utils.cx(
                                      _styles,
                                      "text-grey-600-3"
                                    )}
                                    tag="div"
                                  >
                                    {"Berlin, germany"}
                                  </_Builtin.Block>
                                </_Builtin.Block>
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cdb-card-header-right"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cdb-star-block")}
                            tag="div"
                          >
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "icon-embed")}
                              value="%3Csvg%20width%3D%2221%22%20height%3D%2220%22%20viewBox%3D%220%200%2021%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.2776%2019.309C4.30316%2019.7962%203.15978%2019.0046%203.39333%2017.8422L4.79175%2012.4816L0.43115%208.9419C-0.333906%208.17685%200.046597%206.74996%201.20911%206.75118L6.81848%206.40059L8.89175%201.34838C9.16923%200.238476%2010.6911%200.238476%2011.2078%201.27908L13.1901%206.52645L18.7481%206.87496C19.9737%206.87496%2020.4786%208.38958%2019.5167%209.11043L15.2045%2012.6068L16.6044%2017.9734C16.8704%2019.0373%2015.6622%2019.7808%2014.6575%2019.274L9.99785%2016.2452L5.2776%2019.309ZM10.0776%201.73663L10.0674%201.7615C10.0718%201.75593%2010.0778%201.74974%2010.0776%201.73663ZM7.67912%207.59926L7.28801%207.6237L1.24902%207.99992C1.27552%207.99992%206.20543%2012.018%206.20543%2012.018L6.10378%2012.4077L4.61189%2018.1225C4.59747%2018.1946%204.64557%2018.2279%204.65841%2018.2259L9.99902%2014.7545L10.3396%2014.9759L15.2785%2018.1909C15.342%2018.2227%2015.3732%2018.2051%2015.3929%2018.2776L13.7926%2012.143L14.1054%2011.8894L18.749%208.12492C18.7685%208.1103%2012.307%207.72351%2012.307%207.72351L12.1644%207.34579L10.065%201.77943C10.0636%201.7767%207.67912%207.59926%207.67912%207.59926Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(
                                _styles,
                                "icon-embed",
                                "absolute"
                              )}
                              value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.3618%2019.4499C15.1243%2019.4499%2014.8868%2019.3874%2014.6868%2019.2499L9.99926%2016.2124L5.31176%2019.2499C4.87426%2019.5374%204.32426%2019.5124%203.89926%2019.2124C3.47559%2018.9107%203.28579%2018.3763%203.42426%2017.8749L4.86176%2012.4749L0.524264%208.94993C0.122975%208.62702%20-0.0363446%208.08932%200.124264%207.59993C0.286764%207.09993%200.724264%206.76243%201.24926%206.73743L6.82426%206.43743L8.83676%201.22493C9.02426%200.737427%209.47426%200.424927%209.99926%200.424927C10.5243%200.424927%2010.9743%200.737427%2011.1618%201.22493L13.1743%206.43743L18.7493%206.73743C19.2743%206.76243%2019.7118%207.09993%2019.8743%207.59993C20.0368%208.09993%2019.8743%208.62493%2019.4743%208.96243L15.1368%2012.4874L16.5743%2017.8874C16.7118%2018.3874%2016.5243%2018.9124%2016.0993%2019.2249C15.8868%2019.3624%2015.6243%2019.4499%2015.3618%2019.4499Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cdb-card-body")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cvs-intro-overview-block-2"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cvs-intro-top")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "icon-block-4")}
                              tag="div"
                            >
                              <_Builtin.HtmlEmbed
                                className={_utils.cx(_styles, "icon-embed")}
                                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip0_3341_29934)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12.667%206.00008L13.5003%204.16675L15.3337%203.33341L13.5003%202.50008L12.667%200.666748L11.8337%202.50008L10.0003%203.33341L11.8337%204.16675L12.667%206.00008ZM7.66699%206.33342L6.00033%202.66675L4.33366%206.33342L0.666992%208.00008L4.33366%209.66675L6.00033%2013.3334L7.66699%209.66675L11.3337%208.00008L7.66699%206.33342ZM12.667%2010.0001L11.8337%2011.8334L10.0003%2012.6667L11.8337%2013.5001L12.667%2015.3334L13.5003%2013.5001L15.3337%2012.6667L13.5003%2011.8334L12.667%2010.0001Z%22%20fill%3D%22%2317494D%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cclippath%20id%3D%22clip0_3341_29934%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2Fclippath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                              />
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(_styles, "text-kale-800-2")}
                              tag="div"
                            >
                              {"Overview"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Paragraph
                            className={_utils.cx(_styles, "text-kale-600-4")}
                          >
                            {
                              "Eike led software as a Senior System Software Engineer at NVIDIA Corporation, specializing in autonomous vehicles."
                            }
                          </_Builtin.Paragraph>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cdb-card-tags-wrapper"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cdb-card-tag")}
                            tag="div"
                          >
                            {"Entry to Senior-Level Professionals"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cdb-card-tag")}
                            tag="div"
                          >
                            {"Business HR"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cdb-card-tag")}
                            tag="div"
                          >
                            {"Business Operations"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cdb-card-tag")}
                            tag="div"
                          >
                            {"Business Management"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cdb-card-tag")}
                            tag="div"
                          >
                            {"Customer Service"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cdb-card-tag")}
                            tag="div"
                          >
                            {"PR/Communications"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, "cdb-card-block")}
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cdb-card-header")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, "cdb-card-header-left")}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cdb-card-checkmark")}
                            tag="div"
                          >
                            <_Builtin.Image
                              className={_utils.cx(_styles, "checkbox-image")}
                              loading="lazy"
                              width="auto"
                              height="auto"
                              alt=""
                              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6544e03f56a77e2226e848a3_Frame%201%20(2).png"
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              "cdb-card-header-main"
                            )}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "cdb-card-profile-image-block"
                              )}
                              tag="div"
                            />
                            <_Builtin.Block
                              className={_utils.cx(
                                _styles,
                                "cdb-card-profile-info"
                              )}
                              tag="div"
                            >
                              <_Builtin.Block
                                className={_utils.cx(_styles, "fw-semibold")}
                                tag="div"
                              >
                                {"Dianne Russell"}
                              </_Builtin.Block>
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "cdb-card-company-info"
                                )}
                                tag="div"
                              >
                                <_Builtin.Block
                                  className={_utils.cx(
                                    _styles,
                                    "cdb-card-company-info-block"
                                  )}
                                  tag="div"
                                >
                                  <_Builtin.Block
                                    className={_utils.cx(
                                      _styles,
                                      "icon-block-4"
                                    )}
                                    tag="div"
                                  >
                                    <_Builtin.HtmlEmbed
                                      className={_utils.cx(
                                        _styles,
                                        "icon-embed"
                                      )}
                                      value="%3Csvg%20width%3D%2215%22%20height%3D%2214%22%20viewBox%3D%220%200%2015%2014%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.87695%202.0625V3.375H10.127V2.0625C10.1087%201.78906%209.96289%201.64323%209.68945%201.625H5.31445C5.04102%201.64323%204.89518%201.78906%204.87695%202.0625ZM4.00195%203.375V2.0625C4.02018%201.69792%204.14779%201.38802%204.38477%201.13281C4.63997%200.895833%204.94987%200.768228%205.31445%200.749999H9.68945C10.054%200.768228%2010.3639%200.895833%2010.6191%201.13281C10.8561%201.38802%2010.9837%201.69792%2011.002%202.0625V3.375H12.752C13.2441%203.39323%2013.6543%203.56641%2013.9824%203.89453C14.3105%204.22266%2014.4837%204.63281%2014.502%205.125V12.125C14.4837%2012.6172%2014.3105%2013.0273%2013.9824%2013.3555C13.6543%2013.6836%2013.2441%2013.8568%2012.752%2013.875H2.25195C1.75977%2013.8568%201.34961%2013.6836%201.02148%2013.3555C0.693359%2013.0273%200.520182%2012.6172%200.501953%2012.125V5.125C0.520182%204.63281%200.693359%204.22266%201.02148%203.89453C1.34961%203.56641%201.75977%203.39323%202.25195%203.375H4.00195ZM10.5645%204.25H4.43945H2.25195C1.99674%204.25%201.78711%204.33203%201.62305%204.49609C1.45898%204.66016%201.37695%204.86979%201.37695%205.125V7.75H5.31445H6.18945H8.81445H9.68945H13.627V5.125C13.627%204.86979%2013.5449%204.66016%2013.3809%204.49609C13.2168%204.33203%2013.0072%204.25%2012.752%204.25H10.5645ZM13.627%208.625H9.68945V9.9375C9.68945%2010.1927%209.60742%2010.4023%209.44336%2010.5664C9.2793%2010.7305%209.06966%2010.8125%208.81445%2010.8125H6.18945C5.93424%2010.8125%205.72461%2010.7305%205.56055%2010.5664C5.39648%2010.4023%205.31445%2010.1927%205.31445%209.9375V8.625H1.37695V12.125C1.37695%2012.3802%201.45898%2012.5898%201.62305%2012.7539C1.78711%2012.918%201.99674%2013%202.25195%2013H12.752C13.0072%2013%2013.2168%2012.918%2013.3809%2012.7539C13.5449%2012.5898%2013.627%2012.3802%2013.627%2012.125V8.625ZM6.18945%208.625V9.9375H8.81445V8.625H6.18945Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
                                    />
                                  </_Builtin.Block>
                                  <_Builtin.Block
                                    className={_utils.cx(
                                      _styles,
                                      "text-grey-600-3"
                                    )}
                                    tag="div"
                                  >
                                    {"Software Engineer at Aglint"}
                                  </_Builtin.Block>
                                </_Builtin.Block>
                                <_Builtin.Block
                                  className={_utils.cx(
                                    _styles,
                                    "cdb-card-company-info-block"
                                  )}
                                  tag="div"
                                >
                                  <_Builtin.Block
                                    className={_utils.cx(
                                      _styles,
                                      "icon-block-4"
                                    )}
                                    tag="div"
                                  >
                                    <_Builtin.HtmlEmbed
                                      className={_utils.cx(
                                        _styles,
                                        "icon-embed"
                                      )}
                                      value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.877%208C14.8405%206.76042%2014.4121%205.73047%2013.5918%204.91016C12.7715%204.08984%2011.7415%203.66146%2010.502%203.625C9.26237%203.66146%208.23242%204.08984%207.41211%204.91016C6.5918%205.73047%206.16341%206.76042%206.12695%208C6.12695%208.4375%206.2819%209.01172%206.5918%209.72266C6.90169%2010.4518%207.29362%2011.2083%207.76758%2011.9922C8.24154%2012.7578%208.72461%2013.4687%209.2168%2014.125C9.70898%2014.7995%2010.1374%2015.3646%2010.502%2015.8203C10.8665%2015.3646%2011.2949%2014.7995%2011.7871%2014.125C12.2793%2013.4687%2012.7624%2012.7578%2013.2363%2011.9922C13.7285%2011.2083%2014.1296%2010.4518%2014.4395%209.72266C14.7311%209.01172%2014.877%208.4375%2014.877%208ZM15.752%208C15.7155%208.82031%2015.4238%209.76823%2014.877%2010.8437C14.3118%2011.9193%2013.6738%2012.9583%2012.9629%2013.9609C12.252%2014.9818%2011.6504%2015.793%2011.1582%2016.3945C10.9759%2016.6133%2010.7572%2016.7227%2010.502%2016.7227C10.2467%2016.7227%2010.028%2016.6133%209.8457%2016.3945C9.35352%2015.793%208.75195%2014.9818%208.04102%2013.9609C7.33008%2012.9583%206.69206%2011.9193%206.12695%2010.8437C5.58008%209.76823%205.28841%208.82031%205.25195%208C5.28841%206.50521%205.79883%205.26562%206.7832%204.28125C7.76758%203.29687%209.00716%202.78646%2010.502%202.75C11.9967%202.78646%2013.2363%203.29687%2014.2207%204.28125C15.2051%205.26562%2015.7155%206.50521%2015.752%208ZM9.18945%208C9.20768%208.49219%209.42643%208.875%209.8457%209.14844C10.2832%209.36719%2010.7207%209.36719%2011.1582%209.14844C11.5775%208.875%2011.7962%208.49219%2011.8145%208C11.7962%207.50781%2011.5775%207.125%2011.1582%206.85156C10.7207%206.63281%2010.2832%206.63281%209.8457%206.85156C9.42643%207.125%209.20768%207.50781%209.18945%208ZM10.502%2010.1875C9.68164%2010.1693%209.05273%209.80469%208.61523%209.09375C8.21419%208.36458%208.21419%207.63542%208.61523%206.90625C9.05273%206.19531%209.68164%205.83073%2010.502%205.8125C11.3223%205.83073%2011.9512%206.19531%2012.3887%206.90625C12.7897%207.63542%2012.7897%208.36458%2012.3887%209.09375C11.9512%209.80469%2011.3223%2010.1693%2010.502%2010.1875Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
                                    />
                                  </_Builtin.Block>
                                  <_Builtin.Block
                                    className={_utils.cx(
                                      _styles,
                                      "text-grey-600-3"
                                    )}
                                    tag="div"
                                  >
                                    {"Berlin, germany"}
                                  </_Builtin.Block>
                                </_Builtin.Block>
                              </_Builtin.Block>
                            </_Builtin.Block>
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cdb-card-header-right"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cdb-star-block")}
                            tag="div"
                          >
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, "icon-embed")}
                              value="%3Csvg%20width%3D%2221%22%20height%3D%2220%22%20viewBox%3D%220%200%2021%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.2776%2019.309C4.30316%2019.7962%203.15978%2019.0046%203.39333%2017.8422L4.79175%2012.4816L0.43115%208.9419C-0.333906%208.17685%200.046597%206.74996%201.20911%206.75118L6.81848%206.40059L8.89175%201.34838C9.16923%200.238476%2010.6911%200.238476%2011.2078%201.27908L13.1901%206.52645L18.7481%206.87496C19.9737%206.87496%2020.4786%208.38958%2019.5167%209.11043L15.2045%2012.6068L16.6044%2017.9734C16.8704%2019.0373%2015.6622%2019.7808%2014.6575%2019.274L9.99785%2016.2452L5.2776%2019.309ZM10.0776%201.73663L10.0674%201.7615C10.0718%201.75593%2010.0778%201.74974%2010.0776%201.73663ZM7.67912%207.59926L7.28801%207.6237L1.24902%207.99992C1.27552%207.99992%206.20543%2012.018%206.20543%2012.018L6.10378%2012.4077L4.61189%2018.1225C4.59747%2018.1946%204.64557%2018.2279%204.65841%2018.2259L9.99902%2014.7545L10.3396%2014.9759L15.2785%2018.1909C15.342%2018.2227%2015.3732%2018.2051%2015.3929%2018.2776L13.7926%2012.143L14.1054%2011.8894L18.749%208.12492C18.7685%208.1103%2012.307%207.72351%2012.307%207.72351L12.1644%207.34579L10.065%201.77943C10.0636%201.7767%207.67912%207.59926%207.67912%207.59926Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(
                                _styles,
                                "icon-embed",
                                "absolute"
                              )}
                              value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.3618%2019.4499C15.1243%2019.4499%2014.8868%2019.3874%2014.6868%2019.2499L9.99926%2016.2124L5.31176%2019.2499C4.87426%2019.5374%204.32426%2019.5124%203.89926%2019.2124C3.47559%2018.9107%203.28579%2018.3763%203.42426%2017.8749L4.86176%2012.4749L0.524264%208.94993C0.122975%208.62702%20-0.0363446%208.08932%200.124264%207.59993C0.286764%207.09993%200.724264%206.76243%201.24926%206.73743L6.82426%206.43743L8.83676%201.22493C9.02426%200.737427%209.47426%200.424927%209.99926%200.424927C10.5243%200.424927%2010.9743%200.737427%2011.1618%201.22493L13.1743%206.43743L18.7493%206.73743C19.2743%206.76243%2019.7118%207.09993%2019.8743%207.59993C20.0368%208.09993%2019.8743%208.62493%2019.4743%208.96243L15.1368%2012.4874L16.5743%2017.8874C16.7118%2018.3874%2016.5243%2018.9124%2016.0993%2019.2249C15.8868%2019.3624%2015.6243%2019.4499%2015.3618%2019.4499Z%22%20fill%3D%22%23F79A3E%22%2F%3E%0A%3C%2Fsvg%3E"
                            />
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, "cdb-card-body")}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cvs-intro-overview-block-2"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cvs-intro-top")}
                            tag="div"
                          >
                            <_Builtin.Block
                              className={_utils.cx(_styles, "icon-block-4")}
                              tag="div"
                            >
                              <_Builtin.HtmlEmbed
                                className={_utils.cx(_styles, "icon-embed")}
                                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip0_3341_29934)%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M12.667%206.00008L13.5003%204.16675L15.3337%203.33341L13.5003%202.50008L12.667%200.666748L11.8337%202.50008L10.0003%203.33341L11.8337%204.16675L12.667%206.00008ZM7.66699%206.33342L6.00033%202.66675L4.33366%206.33342L0.666992%208.00008L4.33366%209.66675L6.00033%2013.3334L7.66699%209.66675L11.3337%208.00008L7.66699%206.33342ZM12.667%2010.0001L11.8337%2011.8334L10.0003%2012.6667L11.8337%2013.5001L12.667%2015.3334L13.5003%2013.5001L15.3337%2012.6667L13.5003%2011.8334L12.667%2010.0001Z%22%20fill%3D%22%2317494D%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3Cclippath%20id%3D%22clip0_3341_29934%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2Fclippath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
                              />
                            </_Builtin.Block>
                            <_Builtin.Block
                              className={_utils.cx(_styles, "text-kale-800-2")}
                              tag="div"
                            >
                              {"Overview"}
                            </_Builtin.Block>
                          </_Builtin.Block>
                          <_Builtin.Paragraph
                            className={_utils.cx(_styles, "text-kale-600-4")}
                          >
                            {
                              "Eike led software as a Senior System Software Engineer at NVIDIA Corporation, specializing in autonomous vehicles."
                            }
                          </_Builtin.Paragraph>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cdb-card-tags-wrapper"
                          )}
                          tag="div"
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cdb-card-tag")}
                            tag="div"
                          >
                            {"Entry to Senior-Level Professionals"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cdb-card-tag")}
                            tag="div"
                          >
                            {"Business HR"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cdb-card-tag")}
                            tag="div"
                          >
                            {"Business Operations"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cdb-card-tag")}
                            tag="div"
                          >
                            {"Business Management"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cdb-card-tag")}
                            tag="div"
                          >
                            {"Customer Service"}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, "cdb-card-tag")}
                            tag="div"
                          >
                            {"PR/Communications"}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
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
                      data-w-id="d4b3858d-7766-63cc-4349-4e8a95780a2e"
                      tag="div"
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cdb-select-btn",
                          "clickable"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block tag="div">
                          {"Add to job"}
                        </_Builtin.Block>
                        <_Builtin.Block tag="div">
                          <_Builtin.HtmlEmbed
                            className={_utils.cx(_styles, "icon-embed")}
                            value="%3Csvg%20width%3D%2211%22%20height%3D%227%22%20viewBox%3D%220%200%2011%207%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.64102%205.84062C5.4806%205.98646%205.32018%205.98646%205.15977%205.84062L0.959765%201.64062C0.813932%201.48021%200.813932%201.31979%200.959765%201.15937C1.12018%201.01354%201.2806%201.01354%201.44102%201.15937L5.40039%205.09687L9.35977%201.15937C9.52018%201.01354%209.6806%201.01354%209.84102%201.15937C9.98685%201.31979%209.98685%201.48021%209.84102%201.64062L5.64102%205.84062Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                          />
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          "cdb-select-dropdown-body",
                          "dropdown-body"
                        )}
                        tag="div"
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            "cdb-select-dropdown-inner"
                          )}
                          tag="div"
                        >
                          {slotAddtoJob ?? (
                            <>
                              <AddtoJobList />
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "cdb-select-dropdown-option"
                                )}
                                tag="div"
                              >
                                <_Builtin.Block tag="div">
                                  {"This is some text inside of a div block."}
                                </_Builtin.Block>
                              </_Builtin.Block>
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "cdb-select-dropdown-option"
                                )}
                                tag="div"
                              >
                                <_Builtin.Block tag="div">
                                  {"This is some text inside of a div block."}
                                </_Builtin.Block>
                              </_Builtin.Block>
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "cdb-select-dropdown-option"
                                )}
                                tag="div"
                              >
                                <_Builtin.Block tag="div">
                                  {"This is some text inside of a div block."}
                                </_Builtin.Block>
                              </_Builtin.Block>
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "cdb-select-dropdown-option"
                                )}
                                tag="div"
                              >
                                <_Builtin.Block tag="div">
                                  {"This is some text inside of a div block."}
                                </_Builtin.Block>
                              </_Builtin.Block>
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "cdb-select-dropdown-option"
                                )}
                                tag="div"
                              >
                                <_Builtin.Block tag="div">
                                  {"This is some text inside of a div block."}
                                </_Builtin.Block>
                              </_Builtin.Block>
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "cdb-select-dropdown-option"
                                )}
                                tag="div"
                              >
                                <_Builtin.Block tag="div">
                                  {"This is some text inside of a div block."}
                                </_Builtin.Block>
                              </_Builtin.Block>
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "cdb-select-dropdown-option"
                                )}
                                tag="div"
                              >
                                <_Builtin.Block tag="div">
                                  {"This is some text inside of a div block."}
                                </_Builtin.Block>
                              </_Builtin.Block>
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "cdb-select-dropdown-option"
                                )}
                                tag="div"
                              >
                                <_Builtin.Block tag="div">
                                  {"This is some text inside of a div block."}
                                </_Builtin.Block>
                              </_Builtin.Block>
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "cdb-select-dropdown-option"
                                )}
                                tag="div"
                              >
                                <_Builtin.Block tag="div">
                                  {"This is some text inside of a div block."}
                                </_Builtin.Block>
                              </_Builtin.Block>
                              <_Builtin.Block
                                className={_utils.cx(
                                  _styles,
                                  "cdb-select-dropdown-option"
                                )}
                                tag="div"
                              >
                                <_Builtin.Block tag="div">
                                  {"This is some text inside of a div block."}
                                </_Builtin.Block>
                              </_Builtin.Block>
                            </>
                          )}
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "cdb-sidebar")} tag="div">
          {slotCandidateDialog ?? (
            <CandidateDialog slotAddtoJob={slotAddtoJob} />
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
