import React from "react";
import * as _Builtin from "./_Builtin";
import { DarkPill } from "./DarkPill";
import * as _utils from "./utils";
import _styles from "./GraphBlock.module.css";

export function GraphBlock({
  as: _Component = _Builtin.Block,
  slotDarkPillLocation,
  slotLocationGraph,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "graph_wrapper")}
      id={_utils.cx(
        _styles,
        "w-node-de84a0a2-d089-4ca0-a547-fb54c99e46b0-c99e46b0"
      )}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "graph_title")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Candidates by"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "graph_filter")}
          tag="div"
        >
          {slotDarkPillLocation ?? (
            <>
              <DarkPill textPill="City" isActive={true} />
              <DarkPill textPill="State" />
              <DarkPill textPill="Country" />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "slot_grpah")} tag="div">
        {slotLocationGraph ?? (
          <_Builtin.Image
            className={_utils.cx(_styles, "dummy_image")}
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65e80bbf36098df0643efeb7_round%20graph.svg"
          />
        )}
      </_Builtin.Block>
    </_Component>
  );
}
