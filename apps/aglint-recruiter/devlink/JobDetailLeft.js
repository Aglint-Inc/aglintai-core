import React from "react";
import * as _Builtin from "./_Builtin";
import { InputText } from "./InputText";
import * as _utils from "./utils";
import _styles from "./JobDetailLeft.module.css";

export function JobDetailLeft({
  as: _Component = _Builtin.Block,
  textCompany = "This is some text inside of a div block.",
  slotCompanyImage,
  textJobDescription = "Corem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.\n\nCurabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis. Suspendisse quis arcu sem. Aenean feugiat ex eu vestibulum vestibulum. Morbi a eleifend magna. Nam metus lacus, porttitor eu mauris a, blandit ultrices nibh. Mauris sit amet magna non ligula vestibulum eleifend. Nulla varius volutpat turpis sed lacinia. Nam eget mi in purus lobortis eleifend. Sed nec ante dictum sem condimentum ullamcorper quis venenatis nisi. Proin vitae facilisis nisi, ac posuere leo.\n\nNam pulvinar blandit velit, id condimentum diam faucibus at. Aliquam lacus nisi, sollicitudin at nisi nec, fermentum congue felis. Quisque mauris dolor, fringilla sed tincidunt ac, finibus non odio. Sed vitae mauris nec ante pretium finibus. Donec nisl neque, pharetra ac elit eu, faucibus aliquam ligula. Nullam dictum, tellus tincidunt tempor laoreet, nibh elit sollicitudin felis, eget feugiat sapien diam nec nisl. Aenean gravida turpis nisi, consequat dictum risus dapibus a. Duis felis ante, varius in neque eu, tempor suscipit sem. Maecenas ullamcorper gravida sem sit amet cursus. Etiam pulvinar purus vitae justo pharetra consequat. Mauris id mi ut arcu feugiat maximus. Mauris consequat tellus id tempus aliquet.\n",
  slotRequiredSkills,
  slotJobTitle,
  slotJobLocation,
  slotWorkplaceType,
  slotJobType,
  slotExperience,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "frame-1008")}
      id={_utils.cx(
        _styles,
        "w-node-_84a7f1f7-b550-6dd8-1f6a-32731509bbc5-1509bbc5"
      )}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "frame-1097")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "frame-980")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "medium-bold-8")}
            tag="div"
          >
            {"Company  "}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "frame-1098")} tag="div">
          <_Builtin.Block className={_utils.cx(_styles, "frame-711")} tag="div">
            {slotCompanyImage}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "large-bold-2")}
            dyn={{
              bind: {},
            }}
            tag="div"
          >
            {textCompany}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "frame-1099")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "cdd-job-details")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "", "fw-semibold", "color-grey-500")}
            tag="div"
          >
            {"Job Title"}
          </_Builtin.Block>
          <_Builtin.Block
            id={_utils.cx(
              _styles,
              "w-node-_76d12a1e-e555-a8a6-a35d-3ee6f84ce5e9-1509bbc5"
            )}
            tag="div"
          >
            {slotJobTitle}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "", "fw-semibold", "color-grey-500")}
            tag="div"
          >
            {"Job Location"}
          </_Builtin.Block>
          <_Builtin.Block
            id={_utils.cx(
              _styles,
              "w-node-db249763-781a-6218-8c75-3a3603cb9748-1509bbc5"
            )}
            tag="div"
          >
            {slotJobLocation}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "", "fw-semibold", "color-grey-500")}
            tag="div"
          >
            {"Workplace type"}
          </_Builtin.Block>
          <_Builtin.Block
            id={_utils.cx(
              _styles,
              "w-node-ea27432d-f2a2-d2ef-d58b-60db2c678db1-1509bbc5"
            )}
            tag="div"
          >
            {slotWorkplaceType}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "", "fw-semibold", "color-grey-500")}
            tag="div"
          >
            {"Job Type"}
          </_Builtin.Block>
          <_Builtin.Block
            id={_utils.cx(
              _styles,
              "w-node-c836bac1-9f2e-0017-965e-f122bfb356bd-1509bbc5"
            )}
            tag="div"
          >
            {slotJobType}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "", "fw-semibold", "color-grey-500")}
            tag="div"
          >
            {"Experience"}
          </_Builtin.Block>
          <_Builtin.Block
            id={_utils.cx(
              _styles,
              "w-node-c3b06121-2f71-1173-daad-299a188e179e-1509bbc5"
            )}
            tag="div"
          >
            {slotExperience}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "", "fw-semibold", "color-grey-500")}
            tag="div"
          >
            {"Required Skills"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-289")}
            tag="div"
          >
            {slotRequiredSkills ?? <InputText />}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cdd-job-description")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "", "medium-bold-8")}
            tag="div"
          >
            {"Job Description"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "medium-default-14")}
            tag="div"
          >
            {textJobDescription}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
