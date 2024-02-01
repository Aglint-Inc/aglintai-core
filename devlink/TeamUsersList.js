import React from "react";
import * as _Builtin from "./_Builtin";
import { TeamListItem } from "./TeamListItem";
import * as _utils from "./utils";
import _styles from "./TeamUsersList.module.css";

export function TeamUsersList({
  as: _Component = _Builtin.Block,
  slotTeamList,
  pendInvitesVisibility = true,
  slotPendingInviteBtn,
  slotInviteBtn,
  slotUsersRoleList,
  onClickViewPendingInvites = {},
  textPending = "You currently have two pending invites awaiting your response.",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cs-team-users-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cs-team-users-list")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "tu-header-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "tu-header-content")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Manage Team Members"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-463")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600", "max-width-600")}
                tag="div"
              >
                {
                  "Add, manage, and organize your team's roles and permissions here."
                }
              </_Builtin.Block>
              <_Builtin.Block tag="div">{slotInviteBtn}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "tu-header-button-wrapper")}
            tag="div"
          />
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "tu-list")} tag="div">
          {pendInvitesVisibility ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "tu-pending-invites-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-462")}
                tag="div"
              >
                <_Builtin.Block tag="div">
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icon-embed")}
                    value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M16%208C16%203.58172%2012.4183%200%208%200C5.53028%200%203.48184%201.11748%202%203.11499V1.5L1.99194%201.41012C1.94961%201.17688%201.74546%201%201.5%201C1.22386%201%201%201.22386%201%201.5V4.5L1.00806%204.58988C1.05039%204.82312%201.25454%205%201.5%205H4.5L4.58988%204.99194C4.82312%204.94961%205%204.74546%205%204.5L4.99194%204.41012C4.94961%204.17688%204.74546%204%204.5%204H2.59764C3.91575%202.06249%205.74896%201%208%201C11.866%201%2015%204.13401%2015%208C15%2011.866%2011.866%2015%208%2015C4.13401%2015%201%2011.866%201%208C1%207.72386%200.776142%207.5%200.5%207.5C0.223858%207.5%200%207.72386%200%208C0%2012.4183%203.58172%2016%208%2016C12.4183%2016%2016%2012.4183%2016%208ZM7.5%204.5C7.74546%204.5%207.94961%204.67688%207.99194%204.91012L8%205V8.359L10.8123%2010.6096C11.004%2010.7629%2011.0529%2011.0286%2010.9403%2011.2371L10.8904%2011.3123C10.7371%2011.504%2010.4714%2011.5529%2010.2629%2011.4403L10.1877%2011.3904L7.18765%208.99043C7.09277%208.91453%207.0296%208.8074%207.00813%208.68982L7%208.6V5C7%204.72386%207.22386%204.5%207.5%204.5Z%22%20fill%3D%22%23703815%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-yellow-800")}
                  tag="div"
                >
                  {textPending}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                <_Builtin.Block
                  className={_utils.cx(_styles, "button-dark-yellow-outline")}
                  tag="div"
                  {...onClickViewPendingInvites}
                >
                  <_Builtin.Block tag="div">
                    {"View pending invites"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "tu-list-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "tu-list-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "tu-list-header")}
                tag="div"
              >
                <_Builtin.Block tag="div">
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icon-embed")}
                    value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M2%2011C2%208.79085%203.79086%207%206%207C8.20915%207%2010%208.79085%2010%2011H9C9%209.34315%207.65685%208%206%208C4.34314%208%203%209.34315%203%2011H2ZM6%206.5C4.3425%206.5%203%205.1575%203%203.5C3%201.8425%204.3425%200.5%206%200.5C7.6575%200.5%209%201.8425%209%203.5C9%205.1575%207.6575%206.5%206%206.5ZM6%205.5C7.105%205.5%208%204.605%208%203.5C8%202.395%207.105%201.5%206%201.5C4.895%201.5%204%202.395%204%203.5C4%204.605%204.895%205.5%206%205.5Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"User"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "tu-list-header")}
                tag="div"
              >
                <_Builtin.Block tag="div">
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icon-embed")}
                    value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M11.3335%2010.1634V14.7444C11.3335%2014.9285%2011.1842%2015.0778%2011.0001%2015.0778C10.9397%2015.0778%2010.8805%2015.0614%2010.8287%2015.0303L8.00014%2013.3332L5.17164%2015.0303C5.01378%2015.125%204.80903%2015.0738%204.71431%2014.916C4.68323%2014.8641%204.66681%2014.8048%204.66681%2014.7444V10.1634C3.44752%209.18604%202.66681%207.6841%202.66681%205.99984C2.66681%203.05432%205.05462%200.666504%208.00014%200.666504C10.9457%200.666504%2013.3335%203.05432%2013.3335%205.99984C13.3335%207.6841%2012.5527%209.18604%2011.3335%2010.1634ZM6.00014%2010.9455V12.9782L8.00014%2011.7782L10.0001%2012.9782V10.9455C9.38254%2011.1955%208.70741%2011.3332%208.00014%2011.3332C7.29288%2011.3332%206.61776%2011.1955%206.00014%2010.9455ZM8.00014%209.99984C10.2093%209.99984%2012.0001%208.20897%2012.0001%205.99984C12.0001%203.7907%2010.2093%201.99984%208.00014%201.99984C5.791%201.99984%204.00014%203.7907%204.00014%205.99984C4.00014%208.20897%205.791%209.99984%208.00014%209.99984Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"User Role"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "tu-list-header")}
                tag="div"
              >
                <_Builtin.Block tag="div">
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icon-embed")}
                    value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M1.99985%208.00016H3.33318V14.0002H1.99985V8.00016ZM12.6665%205.3335H13.9998V14.0002H12.6665V5.3335ZM7.33318%201.3335H8.66651V14.0002H7.33318V1.3335Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Status"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "tu-list-header")}
                tag="div"
              >
                <_Builtin.Block tag="div">
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icon-embed")}
                    value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M6.00001%200.666992V2.00033H10V0.666992H11.3333V2.00033H14C14.3682%202.00033%2014.6667%202.29881%2014.6667%202.66699V13.3337C14.6667%2013.7019%2014.3682%2014.0003%2014%2014.0003H2.00001C1.63182%2014.0003%201.33334%2013.7019%201.33334%2013.3337V2.66699C1.33334%202.29881%201.63182%202.00033%202.00001%202.00033H4.66668V0.666992H6.00001ZM13.3333%207.33366H2.66668V12.667H13.3333V7.33366ZM4.66668%203.33366H2.66668V6.00033H13.3333V3.33366H11.3333V4.66699H10V3.33366H6.00001V4.66699H4.66668V3.33366Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Date Added"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "tu-list-header")}
                tag="div"
              >
                <_Builtin.Block tag="div">
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "icon-embed")}
                    value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M10.6041%202.15991C11.0413%202.68451%2011.3893%203.28394%2011.6242%203.9143C11.7695%204.27736%2011.639%204.68232%2011.3288%204.92091L10.5064%205.53382C10.5391%205.84324%2010.5392%206.15524%2010.5066%206.46466L11.3449%207.08369C11.649%207.31768%2011.7795%207.72264%2011.6394%208.07213C11.4036%208.71525%2011.0586%209.30666%2010.6263%209.82486C10.386%2010.1372%209.96898%2010.2261%209.60258%2010.0794L8.66351%209.67581C8.40962%209.8596%208.13927%2010.0152%207.85293%2010.1422L7.73614%2011.162C7.68916%2011.5378%207.40584%2011.8414%207.01961%2011.9136C6.66588%2011.9707%206.33263%2012%206%2012C5.66549%2012%205.3301%2011.9702%204.97785%2011.9114C4.60416%2011.8414%204.32083%2011.5378%204.27324%2011.1569L4.15699%2010.1416C3.87278%2010.0147%203.60041%209.85755%203.34737%209.67539L2.39569%2010.0842C2.04756%2010.2235%201.63683%2010.1292%201.39589%209.84009C0.951358%209.30666%200.606372%208.71525%200.375759%208.0857C0.230538%207.72264%200.360949%207.31768%200.671209%207.07909L1.4936%206.46618C1.46084%206.15623%201.46084%205.84369%201.49361%205.53374L0.685392%204.9311C0.364164%204.70871%200.228881%204.2815%200.370559%203.92787C0.608057%203.28015%200.955446%202.68738%201.38369%202.18514C1.62398%201.87277%202.04101%201.78389%202.4088%201.93122L3.33733%202.33358C3.59158%202.14961%203.86235%201.99395%204.14914%201.86687L4.27386%200.837983C4.3206%200.464022%204.59164%200.159103%204.98038%200.0863794C5.33411%200.029326%205.66736%200%206%200C6.33263%200%206.66588%200.029326%207.03608%200.0893181C7.41016%200.162566%207.69155%200.473068%207.7268%200.843545L7.84327%201.86848C8.12737%201.9954%208.39964%202.15249%208.65259%202.33459L9.58649%201.93324C9.93379%201.77488%2010.3445%201.86298%2010.6041%202.15991ZM9.90526%202.88468L8.49646%203.49012L8.26099%203.29501C7.94838%203.03599%207.58728%202.82741%207.20913%202.6899L6.91815%202.58409L6.88319%202.27645L6.74458%201.05597C6.485%201.01875%206.24095%201%206%201C5.75619%201%205.5092%201.0192%205.25477%201.0558L5.06942%202.58497L4.78087%202.6899C4.39521%202.83014%204.04569%203.03111%203.73009%203.29411L3.49362%203.49116L3.21119%203.36878L2.0999%202.88701C1.78529%203.27166%201.53279%203.70111%201.34576%204.17646L2.5764%205.09364L2.52225%205.39767C2.45129%205.79609%202.45129%206.20391%202.52225%206.60233L2.5764%206.90636L2.32879%207.09091L1.34566%207.82354C1.52805%208.29022%201.78113%208.72394%202.10094%209.12265L3.50353%208.51988L3.73901%208.71499C4.05161%208.97401%204.41271%209.18259%204.79087%209.3201L5.08156%209.42581L5.11675%209.73312L5.25527%2010.943C5.50873%2010.9807%205.75568%2011%206%2011C6.24684%2011%206.49694%2010.9803%206.75473%2010.9428L6.92843%209.42581L7.21913%209.3201C7.60479%209.17986%207.9543%208.97889%208.26991%208.71589L8.50557%208.5195L8.78742%208.64062L9.90896%209.12277C10.2262%208.72724%2010.478%208.29667%2010.6641%207.82396L9.42332%206.90789L9.47774%206.60233C9.54871%206.20391%209.54871%205.79609%209.47774%205.39767L9.42359%205.09364L9.67121%204.90909L10.6538%204.17682C10.4682%203.709%2010.213%203.26966%209.90526%202.88468ZM10.6915%204.27469C10.6911%204.27354%2010.6906%204.27239%2010.6902%204.27123C10.6906%204.27239%2010.691%204.27354%2010.6915%204.27469ZM1.26879%204.11909L1.27516%204.12384C1.27309%204.12217%201.27097%204.12059%201.26879%204.11909ZM1.30424%204.2857C1.30494%204.28394%201.30561%204.28219%201.30625%204.28045C1.30553%204.28218%201.30488%204.28394%201.30424%204.2857ZM6.73226%200.947469C6.73242%200.949143%206.7326%200.95081%206.73282%200.952467L6.73226%200.947469ZM6%208C4.89543%208%204%207.10457%204%206C4%204.89543%204.89543%204%206%204C7.10457%204%208%204.89543%208%206C8%207.10457%207.10457%208%206%208ZM6%207C6.55228%207%207%206.55228%207%206C7%205.44772%206.55228%205%206%205C5.44771%205%205%205.44772%205%206C5%206.55228%205.44771%207%206%207Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  tag="div"
                >
                  {"Actions"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-464")}
              tag="div"
            >
              {slotTeamList ?? <TeamListItem />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cs-team-users-roles", "hide")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "tu-header-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "tu-header-content", "max-width-500")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-lg", "fw-semibold")}
              tag="div"
            >
              {"Roles"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {
                "Each user group has distinct permissions tailored to their needs. You can customize these permissions for each group or create a new user group"
              }
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "tu-roles-wrapper")}
          tag="div"
        >
          {slotUsersRoleList}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
