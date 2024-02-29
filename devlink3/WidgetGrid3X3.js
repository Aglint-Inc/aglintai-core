import React from "react";
import * as _Builtin from "./_Builtin";
import { WidgetUserCard } from "./WidgetUserCard";
import { WidgetJobCard } from "./WidgetJobCard";
import * as _utils from "./utils";
import _styles from "./WidgetGrid3X3.module.css";

export function WidgetGrid3X3({ as: _Component = _Builtin.Block, slotWidget }) {
  return (
    <_Component className={_utils.cx(_styles, "widget_flex3-3")} tag="div">
      {slotWidget ?? (
        <>
          <WidgetUserCard isSelected={true} />
          <WidgetUserCard />
          <WidgetUserCard />
          <WidgetUserCard />
          <WidgetUserCard />
          <WidgetUserCard />
          <WidgetJobCard
            id={_utils.cx(
              _styles,
              "w-node-_9e2b65f4-5235-c951-f68e-8d26ebb832ba-0d1e6518"
            )}
          />
          <WidgetJobCard
            id={_utils.cx(
              _styles,
              "w-node-_170192b1-9ffb-2c69-0749-4fdd73dec178-0d1e6518"
            )}
          />
          <WidgetJobCard
            id={_utils.cx(
              _styles,
              "w-node-_6d42b4bd-d490-2bbc-834f-3d51003c47fd-0d1e6518"
            )}
          />
          <WidgetJobCard
            id={_utils.cx(
              _styles,
              "w-node-_83a4077b-7b99-8b5d-f364-7cfaf8b9ce08-0d1e6518"
            )}
          />
          <WidgetJobCard
            id={_utils.cx(
              _styles,
              "w-node-_3c0a07b3-01bd-c93f-08d1-06744bba6f2b-0d1e6518"
            )}
          />
          <WidgetJobCard
            id={_utils.cx(
              _styles,
              "w-node-_4deca1ff-529d-ceda-08d9-fc1708317f3b-0d1e6518"
            )}
          />
        </>
      )}
    </_Component>
  );
}
