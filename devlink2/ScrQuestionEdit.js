import React from "react";
import * as _Builtin from "./_Builtin";
import { ScrQuestionOptionEdit } from "./ScrQuestionOptionEdit";
import * as _utils from "./utils";
import _styles from "./ScrQuestionEdit.module.css";

export function ScrQuestionEdit({
  as: _Component = _Builtin.Block,
  onclickRequiredCheckbox = {},
  isReqChecked = false,
  slotQuestionInput,
  isOptionsVisible = true,
  slotOptions,
  onclickAddOption = {},
  slotButtons,
  onclickDelete = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "scr-question-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "scr-question-top")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-question-top-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "icon-block")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.8359%203.38281C11.5703%203.16406%2011.3047%203.16406%2011.0391%203.38281L10.3594%204.0625L11.4375%205.14062L12.1172%204.46094C12.3359%204.19531%2012.3359%203.92969%2012.1172%203.66406L11.8359%203.38281ZM6.42188%208C6.34375%208.07812%206.29688%208.16406%206.28125%208.25781L5.88281%209.61719L7.24219%209.21875C7.33594%209.20312%207.42188%209.15625%207.5%209.07812L10.6406%205.9375L9.5625%204.85938L6.42188%208ZM10.2422%202.58594C10.5859%202.25781%2010.9844%202.09375%2011.4375%202.09375C11.8906%202.09375%2012.2891%202.25781%2012.6328%202.58594L12.9141%202.86719C13.2422%203.21094%2013.4062%203.60938%2013.4062%204.0625C13.4062%204.51562%2013.2422%204.91406%2012.9141%205.25781L8.29688%209.875C8.09375%2010.0781%207.85156%2010.2188%207.57031%2010.2969L5.22656%2010.9766C5.00781%2011.0234%204.82031%2010.9766%204.66406%2010.8359C4.50781%2010.6797%204.46094%2010.4922%204.52344%2010.2734L5.20312%207.92969C5.28125%207.66406%205.42188%207.42188%205.625%207.20312L10.2422%202.58594ZM3.5625%203.5H6.1875C6.53125%203.53125%206.71875%203.71875%206.75%204.0625C6.71875%204.40625%206.53125%204.59375%206.1875%204.625H3.5625C3.29688%204.625%203.07812%204.71875%202.90625%204.90625C2.71875%205.07812%202.625%205.29688%202.625%205.5625V11.9375C2.625%2012.2031%202.71875%2012.4219%202.90625%2012.5938C3.07812%2012.7812%203.29688%2012.875%203.5625%2012.875H9.9375C10.2031%2012.875%2010.4219%2012.7812%2010.5938%2012.5938C10.7812%2012.4219%2010.875%2012.2031%2010.875%2011.9375V9.3125C10.9062%208.96875%2011.0938%208.78125%2011.4375%208.75C11.7812%208.78125%2011.9688%208.96875%2012%209.3125V11.9375C11.9844%2012.5156%2011.7812%2013%2011.3906%2013.3906C11%2013.7812%2010.5156%2013.9844%209.9375%2014H3.5625C2.98438%2013.9844%202.5%2013.7812%202.10938%2013.3906C1.71875%2013%201.51562%2012.5156%201.5%2011.9375V5.5625C1.51562%204.98438%201.71875%204.5%202.10938%204.10938C2.5%203.71875%202.98438%203.51563%203.5625%203.5Z%22%20fill%3D%22%2368737D%22%20style%3D%22fill%3A%2368737D%3Bfill%3Acolor(display-p3%200.4078%200.4510%200.4902)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {"Edit question"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-question-top-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "scr-req-checkbox")}
            tag="div"
            {...onclickRequiredCheckbox}
          >
            {isReqChecked ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "scr-req-checkbox-icon")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icon-embed")}
                  value="%3Csvg%20width%3D%22100%25%22%20height%3D%22100%25%22%20viewBox%3D%220%200%2011%2012%22%20fill%3DcurrentColor%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.75%200.75H9.25C9.67188%200.765625%2010.0234%200.914062%2010.3047%201.19531C10.5859%201.47656%2010.7344%201.82812%2010.75%202.25V9.75C10.7344%2010.1719%2010.5859%2010.5234%2010.3047%2010.8047C10.0234%2011.0859%209.67188%2011.2344%209.25%2011.25H1.75C1.32812%2011.2344%200.976562%2011.0859%200.695312%2010.8047C0.414062%2010.5234%200.265625%2010.1719%200.25%209.75V2.25C0.265625%201.82812%200.414062%201.47656%200.695312%201.19531C0.976562%200.914062%201.32812%200.765625%201.75%200.75ZM8.14844%204.89844C8.36719%204.63281%208.36719%204.36719%208.14844%204.10156C7.88281%203.88281%207.61719%203.88281%207.35156%204.10156L4.75%206.70312L3.64844%205.60156C3.38281%205.38281%203.11719%205.38281%202.85156%205.60156C2.63281%205.86719%202.63281%206.13281%202.85156%206.39844L4.35156%207.89844C4.61719%208.11719%204.88281%208.11719%205.14844%207.89844L8.14844%204.89844Z%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            ) : null}
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-418")}
              tag="div"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {"required field"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "scr-question-input-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-question-input-block")}
          tag="div"
        >
          {slotQuestionInput}
        </_Builtin.Block>
        {isOptionsVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "scr-quesion-options-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {"Options"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "scr-question-options-wrapper")}
              tag="div"
            >
              {slotOptions ?? <ScrQuestionOptionEdit />}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-419")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "scr-question-add-btn")}
                tag="div"
                {...onclickAddOption}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "icon-block")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icon-embed")}
                    value="%3Csvg%20width%3D%2211%22%20height%3D%2210%22%20viewBox%3D%220%200%2011%2010%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.0625%200.6875V4.4375H9.8125C10.1562%204.46875%2010.3438%204.65625%2010.375%205C10.3438%205.34375%2010.1562%205.53125%209.8125%205.5625H6.0625V9.3125C6.03125%209.65625%205.84375%209.84375%205.5%209.875C5.15625%209.84375%204.96875%209.65625%204.9375%209.3125V5.5625H1.1875C0.84375%205.53125%200.65625%205.34375%200.625%205C0.65625%204.65625%200.84375%204.46875%201.1875%204.4375H4.9375V0.6875C4.96875%200.34375%205.15625%200.15625%205.5%200.125C5.84375%200.15625%206.03125%200.34375%206.0625%200.6875Z%22%20fill%3D%22%23337FBD%22%20style%3D%22fill%3A%23337FBD%3Bfill%3Acolor(display-p3%200.2000%200.4980%200.7412)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-blue-500")}
                  tag="div"
                >
                  {"Add option"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-421")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-question-delete-btn")}
          tag="div"
          {...onclickDelete}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "icon-block")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20width%3D%2211%22%20height%3D%2213%22%20viewBox%3D%220%200%2011%2013%22%20fill%3DcurrentColor%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M4.42188%201.25C4.28125%201.25%204.17188%201.3125%204.09375%201.4375L3.74219%202H7.25781L6.90625%201.4375C6.82812%201.3125%206.71875%201.25%206.57812%201.25H4.42188ZM8.14844%202H9.25H10H10.375C10.6094%202.01563%2010.7344%202.14062%2010.75%202.375C10.7344%202.60938%2010.6094%202.73437%2010.375%202.75H9.95312L9.34375%2011.1172C9.3125%2011.5078%209.15625%2011.8359%208.875%2012.1016C8.59375%2012.3516%208.25%2012.4844%207.84375%2012.5H3.15625C2.75%2012.4844%202.40625%2012.3516%202.125%2012.1016C1.84375%2011.8359%201.6875%2011.5078%201.65625%2011.1172L1.04688%202.75H0.625C0.390625%202.73437%200.265625%202.60938%200.25%202.375C0.265625%202.14062%200.390625%202.01563%200.625%202H1H1.75H2.85156L3.46094%201.03906C3.69531%200.695312%204.01562%200.515625%204.42188%200.5H6.57812C6.98438%200.515625%207.30469%200.695312%207.53906%201.03906L8.14844%202ZM9.20312%202.75H1.79688L2.40625%2011.0469C2.42188%2011.25%202.5%2011.4141%202.64062%2011.5391C2.78125%2011.6797%202.95312%2011.75%203.15625%2011.75H7.84375C8.04688%2011.75%208.21875%2011.6797%208.35938%2011.5391C8.5%2011.4141%208.57812%2011.25%208.59375%2011.0469L9.20312%202.75Z%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block tag="div">{"Delete"}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "scr-question-buttons-wrapper")}
          tag="div"
        >
          {slotButtons}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
