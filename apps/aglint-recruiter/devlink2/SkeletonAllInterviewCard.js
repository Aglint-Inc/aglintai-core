"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Skeleton } from "./Skeleton";
import * as _utils from "./utils";
import _styles from "./SkeletonAllInterviewCard.module.css";

export function SkeletonAllInterviewCard({
  as: _Component = _Builtin.Block,
  slotInterviewProgress,
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "allinterview_row_-candidate-copy",
        "new-copy"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1704")}
        id={_utils.cx(
          _styles,
          "w-node-_0720d4cd-fb44-e279-1c03-9f75fd6fb97e-fd6fb97d"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1312")}
          tag="div"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-958")}
          tag="div"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-834", "hide")}
          tag="div"
        />
        <_Builtin.Block tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%204C0%201.79086%201.79086%200%204%200H28C30.2091%200%2032%201.79086%2032%204V28C32%2030.2091%2030.2091%2032%2028%2032H4C1.79086%2032%200%2030.2091%200%2028V4Z%22%20fill%3D%22%238D8D86%22%2F%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20transform%3D%22translate(8%208)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M16.0001%208.93359C13.8646%208.93359%2012.1335%2010.6648%2012.1335%2012.8003C12.1335%2014.5633%2013.3135%2016.0508%2014.9268%2016.516C13.6531%2016.6712%2012.5607%2017.1217%2011.7378%2017.9327C10.6904%2018.965%2010.1602%2020.5016%2010.1602%2022.5068C10.1602%2022.7867%2010.387%2023.0135%2010.6668%2023.0135C10.9467%2023.0135%2011.1735%2022.7867%2011.1735%2022.5068C11.1735%2020.6722%2011.6565%2019.4356%2012.4491%2018.6544C13.2432%2017.8719%2014.4287%2017.4669%2016.0001%2017.4669C17.5715%2017.4669%2018.757%2017.8719%2019.5512%2018.6545C20.3437%2019.4356%2020.8268%2020.6722%2020.8268%2022.5068C20.8268%2022.7867%2021.0536%2023.0135%2021.3335%2023.0135C21.6133%2023.0136%2021.8401%2022.7867%2021.8401%2022.5069C21.8401%2020.5016%2021.3098%2018.965%2020.2624%2017.9327C19.4395%2017.1217%2018.3471%2016.6712%2017.0735%2016.516C18.6867%2016.0508%2019.8668%2014.5633%2019.8668%2012.8003C19.8668%2010.6648%2018.1356%208.93359%2016.0001%208.93359ZM13.1468%2012.8003C13.1468%2011.2244%2014.4243%209.94693%2016.0001%209.94693C17.576%209.94693%2018.8535%2011.2244%2018.8535%2012.8003C18.8535%2014.3761%2017.576%2015.6536%2016.0001%2015.6536C14.4243%2015.6536%2013.1468%2014.3761%2013.1468%2012.8003Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1267-copy")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "jjdjiji")} tag="div">
            <Skeleton />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "one-line-clamp")}
            tag="div"
          >
            <_Builtin.Block tag="div">
              <_Builtin.Block
                className={_utils.cx(_styles, "ehfeiurhfeur")}
                tag="div"
              >
                <Skeleton />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1710")}
          tag="div"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "candidate_cell",
          "z-index-none",
          "overflow-hidden"
        )}
        tag="div"
      >
        {slotInterviewProgress}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell", "space-between")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "sk_text_w_icon", "with_200")}
          tag="div"
          data-color="neutral-12"
        >
          <Skeleton />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
