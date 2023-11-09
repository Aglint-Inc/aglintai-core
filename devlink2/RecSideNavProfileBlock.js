import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { CompanyProfileHeader } from "./CompanyProfileHeader";
import * as _utils from "./utils";
import _styles from "./RecSideNavProfileBlock.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-71":{"id":"e-71","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-35","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-72"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2883b22a-86c3-adf3-97c3-6e0f9ba1583c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2883b22a-86c3-adf3-97c3-6e0f9ba1583c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699513657358},"e-72":{"id":"e-72","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-36","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-71"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2883b22a-86c3-adf3-97c3-6e0f9ba1583c","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2883b22a-86c3-adf3-97c3-6e0f9ba1583c","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699513657359}},"actionLists":{"a-35":{"id":"a-35","title":"comp-switch-[open]","actionItemGroups":[{"actionItems":[{"id":"a-35-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".rs-company-list-wrapper","selectorGuids":["86dd3d8b-805b-319d-847b-1138e3da8648"]},"heightValue":38,"widthUnit":"PX","heightUnit":"px","locked":false}},{"id":"a-35-n-9","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"selector":".rs-header-backdrop","selectorGuids":["bd257bf0-4663-e13d-8bcc-017ce43a31a1"]},"value":0,"unit":""}},{"id":"a-35-n-7","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"selector":".rs-header-backdrop","selectorGuids":["bd257bf0-4663-e13d-8bcc-017ce43a31a1"]}}}]},{"actionItems":[{"id":"a-35-n-8","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"block","target":{"selector":".rs-header-backdrop","selectorGuids":["bd257bf0-4663-e13d-8bcc-017ce43a31a1"]}}}]},{"actionItems":[{"id":"a-35-n-2","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"inOutQuad","duration":300,"target":{"selector":".rs-company-list-wrapper","selectorGuids":["86dd3d8b-805b-319d-847b-1138e3da8648"]},"widthUnit":"PX","heightUnit":"AUTO","locked":false}},{"id":"a-35-n-10","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":100,"target":{"selector":".rs-header-backdrop","selectorGuids":["bd257bf0-4663-e13d-8bcc-017ce43a31a1"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1699512597796},"a-36":{"id":"a-36","title":"comp-switch-[close]","actionItemGroups":[{"actionItems":[{"id":"a-36-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":200,"target":{"selector":".rs-company-list-wrapper","selectorGuids":["86dd3d8b-805b-319d-847b-1138e3da8648"]},"heightValue":38,"widthUnit":"PX","heightUnit":"px","locked":false}},{"id":"a-36-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":400,"target":{"selector":".rs-header-backdrop","selectorGuids":["bd257bf0-4663-e13d-8bcc-017ce43a31a1"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-36-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"selector":".rs-header-backdrop","selectorGuids":["bd257bf0-4663-e13d-8bcc-017ce43a31a1"]}}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699513676716}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function RecSideNavProfileBlock({
  as: _Component = _Builtin.Block,
  slotCompanyList,
  onclickAdd = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "rs-header-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "rs-header-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "rs-header-top")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "rs-company-list-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "rs-company-list")}
              tag="div"
            >
              {slotCompanyList ?? (
                <>
                  <CompanyProfileHeader />
                  <CompanyProfileHeader />
                </>
              )}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "rs-company-add-btn", "clickable")}
              tag="div"
              {...onclickAdd}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "icon-block", "_30px", "rs-add")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icon-embed")}
                  value="%3Csvg%20width%3D%2213%22%20height%3D%2212%22%20viewBox%3D%220%200%2013%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.93753%200.499999V5.3125H11.75C12.0235%205.33073%2012.1693%205.47656%2012.1875%205.75C12.1693%206.02344%2012.0235%206.16927%2011.75%206.1875H6.93753V11C6.9193%2011.2734%206.77347%2011.4193%206.50003%2011.4375C6.22659%2011.4193%206.08076%2011.2734%206.06253%2011V6.1875H1.25003C0.976593%206.16927%200.830759%206.02344%200.81253%205.75C0.830759%205.47656%200.976593%205.33073%201.25003%205.3125H6.06253V0.499999C6.08076%200.226562%206.22659%200.0807284%206.50003%200.0624993C6.77347%200.0807284%206.9193%200.226562%206.93753%200.499999Z%22%20fill%3D%22white%22%20style%3D%22fill%3Awhite%3Bfill%3Awhite%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-300")}
                tag="div"
              >
                {"Add Company"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "rs-header-block-right")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "icon-block",
                "clickable",
                "padding-4"
              )}
              data-w-id="2883b22a-86c3-adf3-97c3-6e0f9ba1583c"
              tag="div"
              id="company-switch-arrows"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20width%3D%2217%22%20height%3D%2227%22%20viewBox%3D%220%200%2017%2027%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.35935%205.15938C8.51977%205.01354%208.68018%205.01354%208.8406%205.15938L13.0406%209.35938C13.1864%209.51979%2013.1864%209.68021%2013.0406%209.84063C12.8802%209.98646%2012.7198%209.98646%2012.5594%209.84063L8.59998%205.90313L4.6406%209.84063C4.48018%209.98646%204.31977%209.98646%204.15935%209.84063C4.01352%209.68021%204.01352%209.51979%204.15935%209.35938L8.35935%205.15938Z%22%20fill%3D%22%23D8DCDE%22%20style%3D%22fill%3A%23D8DCDE%3Bfill%3Acolor(display-p3%200.8471%200.8627%200.8706)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3Cpath%20d%3D%22M8.64065%2021.8406C8.48023%2021.9865%208.31982%2021.9865%208.1594%2021.8406L3.9594%2017.6406C3.81357%2017.4802%203.81357%2017.3198%203.9594%2017.1594C4.11982%2017.0135%204.28023%2017.0135%204.44065%2017.1594L8.40002%2021.0969L12.3594%2017.1594C12.5198%2017.0135%2012.6802%2017.0135%2012.8406%2017.1594C12.9865%2017.3198%2012.9865%2017.4802%2012.8406%2017.6406L8.64065%2021.8406Z%22%20fill%3D%22%23D8DCDE%22%20style%3D%22fill%3A%23D8DCDE%3Bfill%3Acolor(display-p3%200.8471%200.8627%200.8706)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "rs-header-backdrop")}
          tag="div"
        />
      </_Builtin.Block>
    </_Component>
  );
}
