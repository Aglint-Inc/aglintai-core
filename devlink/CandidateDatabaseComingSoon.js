import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CandidateDatabaseComingSoon.module.css";

export function CandidateDatabaseComingSoon({
  as: _Component = _Builtin.Block,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "candidate-database-wrapper-2")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "cdb-top-bar")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-lg", "fw-semibold")}
          tag="div"
        >
          {"Candidate Database"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cdb-coming-soon-label")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-xsm-3")}
            tag="div"
          >
            {"soon"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate-database-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cdb-image-block")}
          tag="div"
        >
          <_Builtin.Image
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/653152050a37f03894285185_Frame%201388.svg"
          />
          <_Builtin.Image
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/653152050a37f03894285184_Frame%201393.svg"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cdb-bottom-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cdb-bottom-badge")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2011%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3.64941%203V4.4H7.14941V3C7.13483%202.50417%206.96712%202.08854%206.64629%201.75312C6.31087%201.43229%205.89525%201.26458%205.39941%201.25C4.90358%201.26458%204.48796%201.43229%204.15254%201.75312C3.83171%202.08854%203.664%202.50417%203.64941%203ZM2.59941%204.4V3C2.614%202.2125%202.88379%201.54896%203.40879%201.00937C3.94837%200.484374%204.61191%200.214583%205.39941%200.199999C6.18691%200.214583%206.85046%200.484374%207.39004%201.00937C7.91504%201.54896%208.18483%202.2125%208.19941%203V4.4H8.89941C9.29316%204.41458%209.62129%204.55312%209.88379%204.81562C10.1463%205.07812%2010.2848%205.40625%2010.2994%205.8V10C10.2848%2010.3938%2010.1463%2010.7219%209.88379%2010.9844C9.62129%2011.2469%209.29316%2011.3854%208.89941%2011.4H1.89941C1.50566%2011.3854%201.17754%2011.2469%200.915039%2010.9844C0.652539%2010.7219%200.513997%2010.3938%200.499413%2010V5.8C0.513997%205.40625%200.652539%205.07812%200.915039%204.81562C1.17754%204.55312%201.50566%204.41458%201.89941%204.4H2.59941ZM1.54941%205.8V10C1.564%2010.2188%201.68066%2010.3354%201.89941%2010.35H8.89941C9.11816%2010.3354%209.23483%2010.2188%209.24941%2010V5.8C9.23483%205.58125%209.11816%205.46458%208.89941%205.45H1.89941C1.68066%205.46458%201.564%205.58125%201.54941%205.8Z%22%20fill%3D%22%23703815%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-yellow-800-4")}
              tag="div"
            >
              {"Coming Soon"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-lg", "fw-semibold")}
            tag="div"
          >
            {"Jorem ipsum dolor sit amet, consectetur adipiscing elit."}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600-3")}
            tag="div"
          >
            {
              "Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
            }
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
