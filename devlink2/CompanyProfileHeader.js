import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./CompanyProfileHeader.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-73":{"id":"e-73","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-36","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-74"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"118a8e72-c81a-037e-ea79-99ce713ae2bf"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699520629939}},"actionLists":{"a-36":{"id":"a-36","title":"comp-switch-[close]","actionItemGroups":[{"actionItems":[{"id":"a-36-n","actionTypeId":"STYLE_SIZE","config":{"delay":0,"easing":"easeInOut","duration":200,"target":{"selector":".rs-company-list-wrapper","selectorGuids":["86dd3d8b-805b-319d-847b-1138e3da8648"]},"heightValue":38,"widthUnit":"PX","heightUnit":"px","locked":false}},{"id":"a-36-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":400,"target":{"selector":".rs-header-backdrop","selectorGuids":["bd257bf0-4663-e13d-8bcc-017ce43a31a1"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-36-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"selector":".rs-header-backdrop","selectorGuids":["bd257bf0-4663-e13d-8bcc-017ce43a31a1"]}}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699513676716}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CompanyProfileHeader({
  as: _Component = _Builtin.Block,
  slotLogo,
  companyName = "Unknown Company",
  onclickCompany = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "rs-header-block-left", "clickable")}
      data-w-id="118a8e72-c81a-037e-ea79-99ce713ae2bf"
      tag="div"
      {...onclickCompany}
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A.line-clamp-1%20%7B%0Adisplay%3A%20-webkit-box%3B%0A%20%20-webkit-line-clamp%3A%201%3B%0A%20%20-webkit-box-orient%3A%20vertical%3B%20%20%0A%20%20overflow%3A%20hidden%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "rs-header-company-image")}
        tag="div"
      >
        {slotLogo}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "text-color-white",
          "fw-semibold",
          "line-clamp-1"
        )}
        tag="div"
      >
        {companyName}
      </_Builtin.Block>
    </_Component>
  );
}
