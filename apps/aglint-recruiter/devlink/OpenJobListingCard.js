"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./OpenJobListingCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1320":{"id":"e-1320","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-451","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1321"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696266303507},"e-1321":{"id":"e-1321","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-452","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1320"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1696266303511}},"actionLists":{"a-451":{"id":"a-451","title":"Open Jobs Mouse hover In","actionItemGroups":[{"actionItems":[{"id":"a-451-n-4","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":true,"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86"},"globalSwatchId":"80449ce7","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]},{"actionItems":[{"id":"a-451-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":true,"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86"},"globalSwatchId":"d2a1a159","rValue":237,"bValue":255,"gValue":247,"aValue":1}},{"id":"a-451-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".apply-button-icon","selectorGuids":["12c54e31-c3ac-72b0-9c6c-f40c4b94ca08"]},"value":"flex"}},{"id":"a-451-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".apply-button-icon","selectorGuids":["12c54e31-c3ac-72b0-9c6c-f40c4b94ca08"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1696266307244},"a-452":{"id":"a-452","title":"Open Jobs Mouse hover Out","actionItemGroups":[{"actionItems":[{"id":"a-452-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":true,"id":"3b6022e9-7521-6a98-1483-a49ee53c9b86"},"globalSwatchId":"80449ce7","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-452-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".apply-button-icon","selectorGuids":["12c54e31-c3ac-72b0-9c6c-f40c4b94ca08"]},"value":0,"unit":""}},{"id":"a-452-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".apply-button-icon","selectorGuids":["12c54e31-c3ac-72b0-9c6c-f40c4b94ca08"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1696266307244}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function OpenJobListingCard({
  as: _Component = _Builtin.Block,
  textJobRole = "Linux Device Driver Engineer - Embedded System",
  textLocation = "California, United States",
  textWorkingType = "Internship, On-site",
  textCompanyType = "Information and Technology",
  onClickApplyNow = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "open-jobs-list-card")}
      data-w-id="3b6022e9-7521-6a98-1483-a49ee53c9b86"
      tag="div"
      {...onClickApplyNow}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "text-regular", "fw-semibold")}
        tag="div"
      >
        {textJobRole}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "open-job-info-list")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-428")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2213%22%20viewbox%3D%220%200%2012%2013%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M5.99982%207.99999C4.89525%207.99999%203.99982%207.10456%203.99982%205.99999C3.99982%204.89542%204.89525%203.99999%205.99982%203.99999C7.10439%203.99999%207.99982%204.89542%207.99982%205.99999C7.99982%207.10456%207.10439%207.99999%205.99982%207.99999ZM5.99982%206.99999C6.5521%206.99999%206.99982%206.55227%206.99982%205.99999C6.99982%205.4477%206.5521%204.99999%205.99982%204.99999C5.44753%204.99999%204.99982%205.4477%204.99982%205.99999C4.99982%206.55227%205.44753%206.99999%205.99982%206.99999ZM1%205.75648C1.07285%203.06051%203.31462%200.932652%206.01047%201.0001C8.64923%201.0465%2010.815%203.10221%2010.9998%205.76999C10.9998%206.89319%2010.6689%207.71641%209.94157%208.72815C9.79648%208.92997%209.26463%209.63012%209.25066%209.64886C8.85393%2010.1809%208.41863%2010.6698%207.73702%2011.3769C7.69367%2011.4219%207.17451%2011.9573%207.02721%2012.1113C6.76655%2012.384%206.56138%2012.6063%206.37704%2012.8182C6.17965%2013.0451%205.82807%2013.0476%205.6274%2012.8236C5.30575%2012.4646%204.03644%2011.1343%203.99339%2011.0882C3.4992%2010.5595%203.10609%2010.1121%202.74807%209.66068C2.14663%208.90235%202.15448%208.9124%201.9657%208.646C1.30459%207.71309%200.999818%206.88482%201%205.75648ZM4.72392%2010.4053C4.74931%2010.4325%205.49194%2011.2109%205.99509%2011.7482C6.09046%2011.6454%206.19272%2011.5371%206.30443%2011.4203C6.45463%2011.2632%206.97585%2010.7257%207.01704%2010.6829C7.67162%2010.0038%208.08345%209.54135%208.44898%209.05111C8.46992%209.02302%208.99364%208.33357%209.12962%208.14443C9.74507%207.28834%209.99982%206.65456%2010.001%205.80477C9.85345%203.68851%208.11231%202.03637%205.98711%201.99982C3.84183%201.94527%202.0576%203.6383%201.99982%205.76999C1.99982%206.66027%202.23275%207.29331%202.7816%208.06781C2.95461%208.31195%202.94797%208.30345%203.53157%209.03929C3.87035%209.46645%204.2467%209.89479%204.72392%2010.4053Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {textLocation}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-428")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewbox%3D%220%200%2014%2014%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M4.08317%202.91732V1.16732C4.08317%200.845154%204.34434%200.583984%204.6665%200.583984H9.33317C9.65534%200.583984%209.9165%200.845154%209.9165%201.16732V2.91732H12.2498C12.572%202.91732%2012.8332%203.17849%2012.8332%203.50065V11.6673C12.8332%2011.9895%2012.572%2012.2507%2012.2498%2012.2507H1.74984C1.42767%2012.2507%201.1665%2011.9895%201.1665%2011.6673V3.50065C1.1665%203.17849%201.42767%202.91732%201.74984%202.91732H4.08317ZM2.33317%209.33398V11.084H11.6665V9.33398H2.33317ZM2.33317%208.16732H11.6665V4.08398H2.33317V8.16732ZM5.24984%201.75065V2.91732H8.74984V1.75065H5.24984ZM6.4165%206.41732H7.58317V7.58398H6.4165V6.41732Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {textWorkingType}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-428")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M10%202C10.3682%202%2010.6667%202.29848%2010.6667%202.66667V5.33333C10.6667%205.70152%2010.3682%206%2010%206H8.66667V7.33333H11.3333C11.7015%207.33333%2012%207.6318%2012%208V10H13.3333C13.7015%2010%2014%2010.2985%2014%2010.6667V13.3333C14%2013.7015%2013.7015%2014%2013.3333%2014H9.33333C8.96513%2014%208.66667%2013.7015%208.66667%2013.3333V10.6667C8.66667%2010.2985%208.96513%2010%209.33333%2010H10.6667V8.66667H5.33333V10H6.66667C7.03487%2010%207.33333%2010.2985%207.33333%2010.6667V13.3333C7.33333%2013.7015%207.03487%2014%206.66667%2014H2.66667C2.29848%2014%202%2013.7015%202%2013.3333V10.6667C2%2010.2985%202.29848%2010%202.66667%2010H4V8C4%207.6318%204.29848%207.33333%204.66667%207.33333H7.33333V6H6C5.63181%206%205.33333%205.70152%205.33333%205.33333V2.66667C5.33333%202.29848%205.63181%202%206%202H10ZM6%2011.3333H3.33333V12.6667H6V11.3333ZM12.6667%2011.3333H10V12.6667H12.6667V11.3333ZM9.33333%203.33333H6.66667V4.66667H9.33333V3.33333Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {textCompanyType}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "apply-button-icon")}
        tag="div"
        {...onClickApplyNow}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-blue-600")}
          tag="div"
        >
          {"Apply Now"}
        </_Builtin.Block>
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.3333%202.66666C15.6606%202.66666%2015.9328%202.90249%2015.9893%203.21349L16%203.33332V7.33332C16%207.70151%2015.7015%207.99999%2015.3333%207.99999C15.0061%207.99999%2014.7339%207.76416%2014.6774%207.45316L14.6667%207.33332V4.94132L9.13807%2010.4714C8.90665%2010.7028%208.54742%2010.7285%208.28759%2010.5485L8.19526%2010.4714L6%208.27599L1.13807%2013.1381C0.906649%2013.3695%200.547417%2013.3952%200.287593%2013.2152L0.195262%2013.1381C-0.0361597%2012.9066%20-0.0618732%2012.5474%200.118122%2012.2876L0.195262%2012.1953L5.5286%206.86192C5.76002%206.6305%206.11925%206.60478%206.37907%206.78478L6.4714%206.86192L8.66667%209.05732L13.7227%203.99999H11.3333C11.0061%203.99999%2010.7339%203.76416%2010.6774%203.45316L10.6667%203.33332C10.6667%203.00604%2010.9025%202.73385%2011.2135%202.6774L11.3333%202.66666H15.3333Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
    </_Component>
  );
}
