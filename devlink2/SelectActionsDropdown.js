import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./SelectActionsDropdown.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-91":{"id":"e-91","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-26","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-92"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"25c1b94f-ec29-f877-2c7c-942a68b9f2ee","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"25c1b94f-ec29-f877-2c7c-942a68b9f2ee","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701334578830},"e-92":{"id":"e-92","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-27","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-91"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"25c1b94f-ec29-f877-2c7c-942a68b9f2ee","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"25c1b94f-ec29-f877-2c7c-942a68b9f2ee","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1701334578831}},"actionLists":{"a-26":{"id":"a-26","title":"dropdown-[hover-in]","actionItemGroups":[{"actionItems":[{"id":"a-26-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dropdown-body","selectorGuids":["b89c86ff-2acf-76f2-26bb-713037de4d31"]},"value":"none"}}]},{"actionItems":[{"id":"a-26-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dropdown-body","selectorGuids":["b89c86ff-2acf-76f2-26bb-713037de4d31"]},"value":"block"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698824193169},"a-27":{"id":"a-27","title":"dropdown-[hover-out]","actionItemGroups":[{"actionItems":[{"id":"a-27-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".dropdown-body","selectorGuids":["b89c86ff-2acf-76f2-26bb-713037de4d31"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1698824250229}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function SelectActionsDropdown({
  as: _Component = _Builtin.Block,
  isInterview = true,
  onClickInterview = {},
  isQualified = true,
  onClickQualified = {},
  isDisqualified = true,
  onClickDisqualified = {},
  isMoveNew = false,
  onClickMoveNew = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "select-actions-dropdown")}
      data-w-id="25c1b94f-ec29-f877-2c7c-942a68b9f2ee"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "select-actions-dropdown-trigger")}
        tag="div"
      >
        <_Builtin.Block tag="div">{"Move to"}</_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "icon-block")} tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon-embed")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M12.6877%205.60958C12.9033%205.43708%2013.2179%205.47204%2013.3905%205.68767C13.5438%205.87934%2013.5332%206.14925%2013.3775%206.32802L13.3124%206.39045L8.31237%2010.3905C8.15584%2010.5157%207.94285%2010.5336%207.77019%2010.4441L7.68767%2010.3905L2.68767%206.39045C2.47204%206.21795%202.43708%205.9033%202.60958%205.68767C2.76292%205.496%203.02857%205.44708%203.23715%205.55973L3.31237%205.60958L8.00002%209.35902L12.6877%205.60958Z%22%20fill%3D%22%2368737D%22%20style%3D%22fill%3A%2368737D%3Bfill%3Acolor(display-p3%200.4078%200.4510%200.4902)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "select-actions-dropdown-content",
          "dropdown-body"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "select-actions-wrapper")}
          tag="div"
        >
          {isInterview ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "select-action-btn", "blue-100")}
              tag="div"
              {...onClickInterview}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed", "text-blue-700")}
                value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewbox%3D%220%200%2014%2014%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M8.74253%205.28348H7.44824L9.12824%202.09491C9.17967%201.96634%209.11967%201.85491%208.98253%201.85491H6.47967C6.34253%201.85491%206.18824%201.96634%206.13681%202.09491L4.88538%205.0092C4.82538%205.14634%204.88538%205.28348%205.02253%205.28348H6.14538L4.92824%208.77205C4.83396%209.02062%204.90253%209.23491%205.21967%208.95205L8.75967%205.61777C8.95681%205.42062%208.94824%205.28348%208.74253%205.28348ZM3.57306%2012.8203L6.82415%209.5692H13.0017V0.997768H1.00167V9.5692H3.5731V9.99777L3.57306%2012.8203ZM2.71596%2010.4263H1.00167C0.524981%2010.4263%200.144531%2010.0459%200.144531%209.5692V0.997768C0.144531%200.521074%200.524981%200.140625%201.00167%200.140625H13.0017C13.4784%200.140625%2013.8588%200.521074%2013.8588%200.997768V9.5692C13.8588%2010.0459%2013.4784%2010.4263%2013.0017%2010.4263H7.17919L4.17314%2013.4324C3.92826%2013.6725%203.56383%2013.7435%203.2467%2013.6129C2.92958%2013.4823%202.72082%2013.1753%202.71596%2012.8263V10.4263Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "text-blue-700")}
                tag="div"
              >
                {"Start Assessment"}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isQualified ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "select-action-btn", "green-100")}
              tag="div"
              {...onClickQualified}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed", "text-green-700")}
                value="%3Csvg%20width%3D%2217%22%20height%3D%2214%22%20viewbox%3D%220%200%2017%2014%22%20fill%3D%22currentColor%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.97422%204.125C3.97422%204.55156%204.08086%204.94531%204.29414%205.30625C4.50742%205.66719%204.79453%205.9543%205.15547%206.16758C5.53281%206.38086%205.92656%206.4875%206.33672%206.4875C6.74688%206.4875%207.14063%206.38086%207.51797%206.16758C7.87891%205.9543%208.16602%205.66719%208.3793%205.30625C8.59258%204.94531%208.69922%204.55156%208.69922%204.125C8.69922%203.69844%208.59258%203.30469%208.3793%202.94375C8.16602%202.58281%207.87891%202.2957%207.51797%202.08242C7.14063%201.86914%206.74688%201.7625%206.33672%201.7625C5.92656%201.7625%205.53281%201.86914%205.15547%202.08242C4.79453%202.2957%204.50742%202.58281%204.29414%202.94375C4.08086%203.30469%203.97422%203.69844%203.97422%204.125ZM7.46875%209.24375H5.20469C4.20391%209.27656%203.36719%209.62109%202.69453%2010.2773C2.00547%2010.95%201.64453%2011.7867%201.61172%2012.7875H11.0617C11.0289%2011.7867%2010.668%2010.95%209.97891%2010.2773C9.30625%209.62109%208.46953%209.27656%207.46875%209.24375ZM6.33672%207.275C5.7625%207.275%205.2375%207.13555%204.76172%206.85664C4.28594%206.57773%203.90039%206.19219%203.60508%205.7C3.32617%205.20781%203.18672%204.68281%203.18672%204.125C3.18672%203.56719%203.32617%203.04219%203.60508%202.55C3.90039%202.05781%204.28594%201.67227%204.76172%201.39336C5.2375%201.11445%205.7625%200.975001%206.33672%200.975001C6.91094%200.975001%207.43594%201.11445%207.91172%201.39336C8.3875%201.67227%208.77305%202.05781%209.06836%202.55C9.34727%203.04219%209.48672%203.56719%209.48672%204.125C9.48672%204.68281%209.34727%205.20781%209.06836%205.7C8.77305%206.19219%208.3875%206.57773%207.91172%206.85664C7.43594%207.13555%206.91094%207.275%206.33672%207.275ZM5.20469%208.45625H7.46875C8.69922%208.48906%209.73281%208.91563%2010.5695%209.73594C11.3898%2010.5727%2011.8164%2011.6063%2011.8492%2012.8367C11.8492%2013.05%2011.7754%2013.2223%2011.6277%2013.3535C11.4965%2013.5012%2011.3242%2013.575%2011.1109%2013.575H1.5625C1.34922%2013.575%201.17695%2013.5012%201.0457%2013.3535C0.898047%2013.2223%200.824219%2013.05%200.824219%2012.8367C0.857032%2011.6063%201.28359%2010.5727%202.10391%209.73594C2.94063%208.91563%203.97422%208.48906%205.20469%208.45625ZM16.4512%205.57695L13.3012%208.72695C13.1207%208.89102%2012.9402%208.89102%2012.7598%208.72695L11.1848%207.15195C11.0207%206.97148%2011.0207%206.79102%2011.1848%206.61055C11.3652%206.44648%2011.5457%206.44648%2011.7262%206.61055L13.0305%207.89023L15.9098%205.03555C16.0902%204.87148%2016.2707%204.87148%2016.4512%205.03555C16.6152%205.21602%2016.6152%205.39648%2016.4512%205.57695Z%22%20fill%3D%22currentColor%3B%22%20fill-opacity%3A1%3B%22%3D%22%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "text-green-700")}
                tag="div"
              >
                {"Move to Qualified"}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isDisqualified ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "select-action-btn", "red-100")}
              tag="div"
              {...onClickDisqualified}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed", "text-red-500")}
                value="%3Csvg%20width%3D%2217%22%20height%3D%2214%22%20viewbox%3D%220%200%2017%2014%22%20fill%3D%22currentColor%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.97422%204.125C3.97422%204.55156%204.08086%204.94531%204.29414%205.30625C4.50742%205.66719%204.79453%205.9543%205.15547%206.16758C5.53281%206.38086%205.92656%206.4875%206.33672%206.4875C6.74688%206.4875%207.14063%206.38086%207.51797%206.16758C7.87891%205.9543%208.16602%205.66719%208.3793%205.30625C8.59258%204.94531%208.69922%204.55156%208.69922%204.125C8.69922%203.69844%208.59258%203.30469%208.3793%202.94375C8.16602%202.58281%207.87891%202.2957%207.51797%202.08242C7.14063%201.86914%206.74688%201.7625%206.33672%201.7625C5.92656%201.7625%205.53281%201.86914%205.15547%202.08242C4.79453%202.2957%204.50742%202.58281%204.29414%202.94375C4.08086%203.30469%203.97422%203.69844%203.97422%204.125ZM7.46875%209.24375H5.20469C4.20391%209.27656%203.36719%209.62109%202.69453%2010.2773C2.00547%2010.95%201.64453%2011.7867%201.61172%2012.7875H11.0617C11.0289%2011.7867%2010.668%2010.95%209.97891%2010.2773C9.30625%209.62109%208.46953%209.27656%207.46875%209.24375ZM6.33672%207.275C5.7625%207.275%205.2375%207.13555%204.76172%206.85664C4.28594%206.57773%203.90039%206.19219%203.60508%205.7C3.32617%205.20781%203.18672%204.68281%203.18672%204.125C3.18672%203.56719%203.32617%203.04219%203.60508%202.55C3.90039%202.05781%204.28594%201.67227%204.76172%201.39336C5.2375%201.11445%205.7625%200.975001%206.33672%200.975001C6.91094%200.975001%207.43594%201.11445%207.91172%201.39336C8.3875%201.67227%208.77305%202.05781%209.06836%202.55C9.34727%203.04219%209.48672%203.56719%209.48672%204.125C9.48672%204.68281%209.34727%205.20781%209.06836%205.7C8.77305%206.19219%208.3875%206.57773%207.91172%206.85664C7.43594%207.13555%206.91094%207.275%206.33672%207.275ZM5.20469%208.45625H7.46875C8.69922%208.48906%209.73281%208.91563%2010.5695%209.73594C11.3898%2010.5727%2011.8164%2011.6063%2011.8492%2012.8367C11.8492%2013.05%2011.7754%2013.2223%2011.6277%2013.3535C11.4965%2013.5012%2011.3242%2013.575%2011.1109%2013.575H1.5625C1.34922%2013.575%201.17695%2013.5012%201.0457%2013.3535C0.898047%2013.2223%200.824219%2013.05%200.824219%2012.8367C0.857032%2011.6063%201.28359%2010.5727%202.10391%209.73594C2.94063%208.91563%203.97422%208.48906%205.20469%208.45625ZM12.366%204.6418C12.5465%204.47773%2012.727%204.47773%2012.9074%204.6418L14.2117%205.92148L15.516%204.6418C15.6965%204.47773%2015.877%204.47773%2016.0574%204.6418C16.2215%204.82227%2016.2215%205.00273%2016.0574%205.1832L14.7777%206.4875L16.0574%207.7918C16.2215%207.97227%2016.2215%208.15273%2016.0574%208.3332C15.877%208.49727%2015.6965%208.49727%2015.516%208.3332L14.2117%207.05352L12.9074%208.3332C12.727%208.49727%2012.5465%208.49727%2012.366%208.3332C12.202%208.15273%2012.202%207.97227%2012.366%207.7918L13.6457%206.4875L12.366%205.1832C12.202%205.00273%2012.202%204.82227%2012.366%204.6418Z%22%20fill%3D%22currentColor%3B%22%20fill-opacity%3A1%3B%22%3D%22%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "text-red-500")}
                tag="div"
              >
                {"Mark Disqualified"}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          {isMoveNew ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "select-action-btn", "grey-100")}
              tag="div"
              {...onClickMoveNew}
            >
              <_Builtin.Block tag="div">{"Move to New"}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
