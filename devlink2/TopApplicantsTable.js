import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { TopCandidateListItem } from "./TopCandidateListItem";
import * as _utils from "./utils";
import _styles from "./TopApplicantsTable.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-49":{"id":"e-49","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-25","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-50"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-column","originalId":"4b74a769-3059-edcf-484b-79f39ef0625b","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-column","originalId":"4b74a769-3059-edcf-484b-79f39ef0625b","appliesTo":"CLASS"}],"config":{"loop":true,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1698671045933}},"actionLists":{"a-25":{"id":"a-25","title":"skeletal-loader","actionItemGroups":[{"actionItems":[{"id":"a-25-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".cv-skeletal-block.overlay","selectorGuids":["2ec0bc5c-523b-1d16-4320-7857f59c4392","0b04d1ab-054e-0f32-73a8-61df6c81b023"]},"xValue":-100,"yValue":-50,"xUnit":"%","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-25-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":2000,"target":{"useEventTarget":"CHILDREN","selector":".cv-skeletal-block.overlay","selectorGuids":["2ec0bc5c-523b-1d16-4320-7857f59c4392","0b04d1ab-054e-0f32-73a8-61df6c81b023"]},"xValue":100,"xUnit":"%","yUnit":"PX","zUnit":"PX"}}]},{"actionItems":[{"id":"a-25-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cv-skeletal-block.overlay","selectorGuids":["2ec0bc5c-523b-1d16-4320-7857f59c4392","0b04d1ab-054e-0f32-73a8-61df6c81b023"]},"xValue":-100,"xUnit":"%","yUnit":"PX","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698671059774}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function TopApplicantsTable({
  as: _Component = _Builtin.Block,
  slotList,
  onclickSelectAll = {},
  isAllSelected = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "cv-list")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-list-row", "top", "top-can")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "top-can-row-block",
            "border-r",
            "border-b",
            "grey-100"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column", "checkbox", "ml-0")}
            tag="div"
            {...onclickSelectAll}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-checkbox")}
              tag="div"
            >
              {isAllSelected ? (
                <_Builtin.Image
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt=""
                  src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/6530fd234c567296fc1dc71f_Frame%201%20(2).png"
                />
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column", "name", "grey-100")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Candidate"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "top-can-row-block",
            "border-r",
            "border-b",
            "grey-100"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column", "overview", "top")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "icon-block")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20width%3D%229%22%20height%3D%2212%22%20viewBox%3D%220%200%209%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.13379%201.18437L5.47129%205.1H7.89941C8.22025%205.11458%208.439%205.26771%208.55566%205.55937C8.65775%205.85104%208.59212%206.10625%208.35879%206.325L2.75879%2011.225C2.48171%2011.4438%202.19004%2011.4583%201.88379%2011.2688C1.60671%2011.0354%201.53379%2010.751%201.66504%2010.4156L3.34941%206.5H0.899414C0.593164%206.48542%200.374414%206.33229%200.243164%206.04062C0.14108%205.74896%200.206705%205.49375%200.440039%205.275L6.04004%200.374999C6.31712%200.156249%206.60879%200.141666%206.91504%200.331249C7.19212%200.564583%207.26504%200.848958%207.13379%201.18437Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block tag="div">{"Strength"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "top-can-row-block",
            "border-r",
            "border-b",
            "grey-100"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column", "overview", "top")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "icon-block")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2212%22%20viewBox%3D%220%200%2016%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.75254%200.309374L5.88691%203.56875L9.54004%200.374999C9.81712%200.156249%2010.1088%200.141666%2010.415%200.331249C10.6921%200.564583%2010.765%200.848958%2010.6338%201.18437L8.97129%205.1H11.3994C11.7202%205.11458%2011.939%205.26771%2012.0557%205.55937C12.1577%205.85104%2012.0921%206.10625%2011.8588%206.325L10.6994%207.33125L14.7025%2010.4594C14.9359%2010.6781%2014.965%2010.926%2014.79%2011.2031C14.5713%2011.4365%2014.3234%2011.4656%2014.0463%2011.2906L1.09629%201.14062C0.862955%200.921874%200.833789%200.673958%201.00879%200.396874C1.22754%200.163541%201.47546%200.134374%201.75254%200.309374ZM3.94004%205.275L4.29004%204.96875L6.23691%206.5H4.39941C4.07858%206.48542%203.85983%206.33229%203.74316%206.04062C3.64108%205.74896%203.70671%205.49375%203.94004%205.275ZM5.16504%2010.4156L6.69629%206.85L9.08066%208.75312L6.25879%2011.225C5.98171%2011.4438%205.69004%2011.4583%205.38379%2011.2688C5.10671%2011.0354%205.03379%2010.751%205.16504%2010.4156Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block tag="div">{"Weakness"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "top-can-row-block",
            "border-b",
            "grey-100"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-column", "overview", "top")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "icon-block")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.97441%202.05937L9.19941%201.6L9.65879%200.374999C9.70254%200.258333%209.78275%200.199999%209.89941%200.199999C10.0161%200.199999%2010.0963%200.258333%2010.14%200.374999L10.5994%201.6L11.8463%202.05937C11.9484%202.10312%2011.9994%202.18333%2011.9994%202.3C11.9994%202.41667%2011.9484%202.49687%2011.8463%202.54062L10.5994%203L10.14%204.24687C10.0963%204.34896%2010.0161%204.4%209.89941%204.4C9.78275%204.4%209.70254%204.34896%209.65879%204.24687L9.19941%203L7.97441%202.54062C7.85775%202.49687%207.79941%202.41667%207.79941%202.3C7.79941%202.18333%207.85775%202.10312%207.97441%202.05937ZM5.28379%201.79687L6.44316%204.29062L8.93691%205.45C9.06816%205.52292%209.13379%205.625%209.13379%205.75625C9.13379%205.90208%209.06816%206.01146%208.93691%206.08437L6.44316%207.24375L5.28379%209.7375C5.21087%209.86875%205.10879%209.93437%204.97754%209.93437C4.83171%209.93437%204.72233%209.86875%204.64941%209.7375L3.49004%207.24375L0.996289%206.08437C0.865039%206.02604%200.799414%205.92396%200.799414%205.77812C0.799414%205.63229%200.865039%205.52292%200.996289%205.45L3.49004%204.29062L4.64941%201.79687C4.72233%201.66562%204.83171%201.6%204.97754%201.6C5.12337%201.6%205.22546%201.66562%205.28379%201.79687ZM9.19941%208.6L9.65879%207.375C9.70254%207.25833%209.78275%207.2%209.89941%207.2C10.0161%207.2%2010.0963%207.25833%2010.14%207.375L10.5994%208.6L11.8463%209.05937C11.9484%209.10312%2011.9994%209.18333%2011.9994%209.3C11.9994%209.41667%2011.9484%209.49687%2011.8463%209.54062L10.5994%2010L10.14%2011.2469C10.0963%2011.349%2010.0161%2011.4%209.89941%2011.4C9.78275%2011.4%209.70254%2011.349%209.65879%2011.2469L9.19941%2010L7.97441%209.54062C7.85775%209.49687%207.79941%209.41667%207.79941%209.3C7.79941%209.18333%207.85775%209.10312%207.97441%209.05937L9.19941%208.6Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block tag="div">{"Summary"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "cv-list-body")} tag="div">
        {slotList ?? <TopCandidateListItem />}
      </_Builtin.Block>
    </_Component>
  );
}
