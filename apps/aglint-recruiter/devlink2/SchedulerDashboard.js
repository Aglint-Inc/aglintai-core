import React from 'react';
import * as _Builtin from './_Builtin';
import * as _interactions from './interactions';
import * as _utils from './utils';

const _interactionsData = JSON.parse(
  '{"events":{"e-119":{"id":"e-119","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-70","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-120"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"e0f5bdaf-0762-fa35-702e-c508647933fd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e0f5bdaf-0762-fa35-702e-c508647933fd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1707376717053},"e-120":{"id":"e-120","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-71","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-119"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"e0f5bdaf-0762-fa35-702e-c508647933fd","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e0f5bdaf-0762-fa35-702e-c508647933fd","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1707376717054},"e-121":{"id":"e-121","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-70","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-122"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"e0f5bdaf-0762-fa35-702e-c50864793408","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e0f5bdaf-0762-fa35-702e-c50864793408","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1707377041399},"e-122":{"id":"e-122","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-71","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-121"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"e0f5bdaf-0762-fa35-702e-c50864793408","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"e0f5bdaf-0762-fa35-702e-c50864793408","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1707377041399},"e-125":{"id":"e-125","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-70","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-126"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c47c251b5e557c2143b9b5|406082c1-f6fa-7c63-8c97-bd3fd59face4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c47c251b5e557c2143b9b5|406082c1-f6fa-7c63-8c97-bd3fd59face4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1708409398133},"e-126":{"id":"e-126","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-71","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-125"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c47c251b5e557c2143b9b5|406082c1-f6fa-7c63-8c97-bd3fd59face4","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c47c251b5e557c2143b9b5|406082c1-f6fa-7c63-8c97-bd3fd59face4","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1708409398133}},"actionLists":{"a-70":{"id":"a-70","title":"Scheduler card [Hover in]","actionItemGroups":[{"actionItems":[{"id":"a-70-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".scheduler_card","selectorGuids":["be9d0099-3ce3-2a15-27fe-8bc79e0488d6"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-70-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".scheduler_arrow_svg","selectorGuids":["0701a3a8-0753-42f3-87a5-8a16b2d55ef8"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-70-n-3","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".scheduler_card_icon","selectorGuids":["a90093aa-5667-f322-f838-7a45b5d0f127"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}}]},{"actionItems":[{"id":"a-70-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".scheduler_card","selectorGuids":["be9d0099-3ce3-2a15-27fe-8bc79e0488d6"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-70-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".scheduler_arrow_svg","selectorGuids":["0701a3a8-0753-42f3-87a5-8a16b2d55ef8"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-70-n-4","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".scheduler_card_icon","selectorGuids":["a90093aa-5667-f322-f838-7a45b5d0f127"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":true,"createdOn":1707376722930},"a-71":{"id":"a-71","title":"Scheduler card [Hover out]","actionItemGroups":[{"actionItems":[{"id":"a-71-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".scheduler_card","selectorGuids":["be9d0099-3ce3-2a15-27fe-8bc79e0488d6"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-71-n-2","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".scheduler_arrow_svg","selectorGuids":["0701a3a8-0753-42f3-87a5-8a16b2d55ef8"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-71-n-3","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"easeInOut","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".scheduler_card_icon","selectorGuids":["a90093aa-5667-f322-f838-7a45b5d0f127"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1707376722930}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}',
);

export function SchedulerDashboard({
  as: _Component = _Builtin.Block,
  onClickAllInterviews = {},
  onClickInterviewPanel = {},
  onClickMySchedule = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, 'scheduler_cards')} tag='div'>
      <_Builtin.Block
        className={_utils.cx(_styles, 'scheduler_card')}
        data-w-id='e0f5bdaf-0762-fa35-702e-c508647933fd'
        tag='div'
        {...onClickAllInterviews}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'sh_card_content')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'scheduler_card_icon')}
            tag='div'
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, 'embed_flex')}
              value='%3Csvg%20width%3D%2236%22%20height%3D%2236%22%20viewBox%3D%220%200%2036%2036%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M11.4%208.7C11.775%208.725%2011.975%208.925%2012%209.3V11.1H19.2V9.3C19.225%208.925%2019.425%208.725%2019.8%208.7C20.175%208.725%2020.375%208.925%2020.4%209.3V11.1H21.6C22.275%2011.125%2022.8375%2011.3625%2023.2875%2011.8125C23.7375%2012.2625%2023.975%2012.825%2024%2013.5V14.7V15.9V15.9375C23.8%2015.9125%2023.6%2015.9%2023.4%2015.9C23.2%2015.9%2023%2015.9125%2022.8%2015.9375V15.9H8.4V25.5C8.4%2025.85%208.5125%2026.1375%208.7375%2026.3625C8.9625%2026.5875%209.25%2026.7%209.6%2026.7H18.3C18.675%2027.15%2019.1125%2027.55%2019.6125%2027.9H9.6C8.925%2027.875%208.3625%2027.6375%207.9125%2027.1875C7.4625%2026.7375%207.225%2026.175%207.2%2025.5V15.9V14.7V13.5C7.225%2012.825%207.4625%2012.2625%207.9125%2011.8125C8.3625%2011.3625%208.925%2011.125%209.6%2011.1H10.8V9.3C10.825%208.925%2011.025%208.725%2011.4%208.7ZM21.6%2012.3H9.6C9.25%2012.3%208.9625%2012.4125%208.7375%2012.6375C8.5125%2012.8625%208.4%2013.15%208.4%2013.5V14.7H22.8V13.5C22.8%2013.15%2022.6875%2012.8625%2022.4625%2012.6375C22.2375%2012.4125%2021.95%2012.3%2021.6%2012.3ZM23.4%2026.7C24.15%2026.7%2024.85%2026.5125%2025.5%2026.1375C26.15%2025.7625%2026.6625%2025.25%2027.0375%2024.6C27.4125%2023.95%2027.6%2023.25%2027.6%2022.5C27.6%2021.75%2027.4125%2021.05%2027.0375%2020.4C26.6625%2019.75%2026.15%2019.2375%2025.5%2018.8625C24.85%2018.4875%2024.15%2018.3%2023.4%2018.3C22.65%2018.3%2021.95%2018.4875%2021.3%2018.8625C20.65%2019.2375%2020.1375%2019.75%2019.7625%2020.4C19.3875%2021.05%2019.2%2021.75%2019.2%2022.5C19.2%2023.25%2019.3875%2023.95%2019.7625%2024.6C20.1375%2025.25%2020.65%2025.7625%2021.3%2026.1375C21.95%2026.5125%2022.65%2026.7%2023.4%2026.7ZM23.4%2017.1C24.375%2017.1%2025.275%2017.3375%2026.1%2017.8125C26.925%2018.2875%2027.5875%2018.95%2028.0875%2019.8C28.5625%2020.65%2028.8%2021.55%2028.8%2022.5C28.8%2023.45%2028.5625%2024.35%2028.0875%2025.2C27.5875%2026.05%2026.925%2026.7125%2026.1%2027.1875C25.275%2027.6625%2024.375%2027.9%2023.4%2027.9C22.425%2027.9%2021.525%2027.6625%2020.7%2027.1875C19.875%2026.7125%2019.2125%2026.05%2018.7125%2025.2C18.2375%2024.35%2018%2023.45%2018%2022.5C18%2021.55%2018.2375%2020.65%2018.7125%2019.8C19.2125%2018.95%2019.875%2018.2875%2020.7%2017.8125C21.525%2017.3375%2022.425%2017.1%2023.4%2017.1ZM23.4%2019.5C23.775%2019.525%2023.975%2019.725%2024%2020.1V21.9H25.2C25.575%2021.925%2025.775%2022.125%2025.8%2022.5C25.775%2022.875%2025.575%2023.075%2025.2%2023.1H23.4C23.025%2023.075%2022.825%2022.875%2022.8%2022.5V20.1C22.825%2019.725%2023.025%2019.525%2023.4%2019.5Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E'
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'fw-semibold')}
            tag='div'
          >
            {'All Interviews'}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'text-gray-600')}
            tag='div'
          >
            {
              'Access a comprehensive overview and effortlessly manage all scheduled interviews from one convenient location.'
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'scheduler_arrow')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'scheduler_arrow_svg')}
            tag='div'
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, 'embed_flex')}
              value='%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.3984%208.60156C12.6172%208.86719%2012.6172%209.13281%2012.3984%209.39844L7.89844%2013.8984C7.63281%2014.1172%207.36719%2014.1172%207.10156%2013.8984C6.88281%2013.6328%206.88281%2013.3672%207.10156%2013.1016L11.2031%209L7.10156%204.89844C6.88281%204.63281%206.88281%204.36719%207.10156%204.10156C7.36719%203.88281%207.63281%203.88281%207.89844%204.10156L12.3984%208.60156Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E'
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'scheduler_card')}
        data-w-id='e0f5bdaf-0762-fa35-702e-c50864793408'
        tag='div'
        {...onClickInterviewPanel}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'sh_card_content')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'scheduler_card_icon')}
            tag='div'
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, 'embed_flex')}
              value='%3Csvg%20width%3D%2236%22%20height%3D%2236%22%20viewBox%3D%220%200%2036%2036%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.6%2011.7C9.625%2012.375%209.925%2012.9%2010.5%2013.275C11.1%2013.575%2011.7%2013.575%2012.3%2013.275C12.875%2012.9%2013.175%2012.375%2013.2%2011.7C13.175%2011.025%2012.875%2010.5%2012.3%2010.125C11.7%209.825%2011.1%209.825%2010.5%2010.125C9.925%2010.5%209.625%2011.025%209.6%2011.7ZM14.4%2011.7C14.375%2012.825%2013.875%2013.6875%2012.9%2014.2875C11.9%2014.8375%2010.9%2014.8375%209.9%2014.2875C8.925%2013.6875%208.425%2012.825%208.4%2011.7C8.425%2010.575%208.925%209.7125%209.9%209.1125C10.9%208.5625%2011.9%208.5625%2012.9%209.1125C13.875%209.7125%2014.375%2010.575%2014.4%2011.7ZM18%2014.7C17.1%2014.725%2016.4125%2015.125%2015.9375%2015.9C15.4875%2016.7%2015.4875%2017.5%2015.9375%2018.3C16.4125%2019.075%2017.1%2019.475%2018%2019.5C18.9%2019.475%2019.5875%2019.075%2020.0625%2018.3C20.5125%2017.5%2020.5125%2016.7%2020.0625%2015.9C19.5875%2015.125%2018.9%2014.725%2018%2014.7ZM18%2020.7C17.35%2020.7%2016.75%2020.5375%2016.2%2020.2125C15.65%2019.8875%2015.2125%2019.45%2014.8875%2018.9C14.5625%2018.325%2014.4%2017.725%2014.4%2017.1C14.4%2016.475%2014.5625%2015.875%2014.8875%2015.3C15.2125%2014.75%2015.65%2014.3125%2016.2%2013.9875C16.75%2013.6625%2017.35%2013.5%2018%2013.5C18.65%2013.5%2019.25%2013.6625%2019.8%2013.9875C20.35%2014.3125%2020.7875%2014.75%2021.1125%2015.3C21.4375%2015.875%2021.6%2016.475%2021.6%2017.1C21.6%2017.725%2021.4375%2018.325%2021.1125%2018.9C20.7875%2019.45%2020.35%2019.8875%2019.8%2020.2125C19.25%2020.5375%2018.65%2020.7%2018%2020.7ZM15.7875%2023.1C14.7625%2023.125%2013.8875%2023.475%2013.1625%2024.15C12.4625%2024.825%2012.075%2025.675%2012%2026.7H24C23.925%2025.675%2023.5375%2024.825%2022.8375%2024.15C22.1125%2023.475%2021.2375%2023.125%2020.2125%2023.1H15.7875ZM15.7875%2021.9H20.2125C21.6125%2021.925%2022.7875%2022.4125%2023.7375%2023.3625C24.6875%2024.3125%2025.175%2025.4875%2025.2%2026.8875C25.15%2027.5125%2024.8125%2027.85%2024.1875%2027.9H11.8125C11.1875%2027.85%2010.85%2027.5125%2010.8%2026.8875C10.825%2025.4875%2011.3125%2024.3125%2012.2625%2023.3625C13.2125%2022.4125%2014.3875%2021.925%2015.7875%2021.9ZM25.2%209.9C24.525%209.925%2024%2010.225%2023.625%2010.8C23.325%2011.4%2023.325%2012%2023.625%2012.6C24%2013.175%2024.525%2013.475%2025.2%2013.5C25.875%2013.475%2026.4%2013.175%2026.775%2012.6C27.075%2012%2027.075%2011.4%2026.775%2010.8C26.4%2010.225%2025.875%209.925%2025.2%209.9ZM25.2%2014.7C24.075%2014.675%2023.2125%2014.175%2022.6125%2013.2C22.0625%2012.2%2022.0625%2011.2%2022.6125%2010.2C23.2125%209.225%2024.075%208.725%2025.2%208.7C26.325%208.725%2027.1875%209.225%2027.7875%2010.2C28.3375%2011.2%2028.3375%2012.2%2027.7875%2013.2C27.1875%2014.175%2026.325%2014.675%2025.2%2014.7ZM25.8%2017.1H22.8C22.8%2016.675%2022.75%2016.275%2022.65%2015.9H25.8C27%2015.925%2027.9875%2016.3375%2028.7625%2017.1375C29.5625%2017.9125%2029.975%2018.9%2030%2020.1C29.975%2020.475%2029.775%2020.675%2029.4%2020.7C29.025%2020.675%2028.825%2020.475%2028.8%2020.1C28.775%2019.25%2028.4875%2018.5375%2027.9375%2017.9625C27.3625%2017.4125%2026.65%2017.125%2025.8%2017.1ZM13.2%2017.1H10.2C9.35%2017.125%208.6375%2017.4125%208.0625%2017.9625C7.5125%2018.5375%207.225%2019.25%207.2%2020.1C7.175%2020.475%206.975%2020.675%206.6%2020.7C6.225%2020.675%206.025%2020.475%206%2020.1C6.025%2018.9%206.4375%2017.9125%207.2375%2017.1375C8.0125%2016.3375%209%2015.925%2010.2%2015.9H13.35C13.25%2016.275%2013.2%2016.675%2013.2%2017.1Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E'
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'fw-semibold')}
            tag='div'
          >
            {'Interview Panel'}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'text-gray-600')}
            tag='div'
          >
            {
              'Effortlessly create and effectively manage your interview panel, all within a single centralized platform for seamless coordination and organization'
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'scheduler_arrow')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'scheduler_arrow_svg')}
            tag='div'
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, 'embed_flex')}
              value='%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.3984%208.60156C12.6172%208.86719%2012.6172%209.13281%2012.3984%209.39844L7.89844%2013.8984C7.63281%2014.1172%207.36719%2014.1172%207.10156%2013.8984C6.88281%2013.6328%206.88281%2013.3672%207.10156%2013.1016L11.2031%209L7.10156%204.89844C6.88281%204.63281%206.88281%204.36719%207.10156%204.10156C7.36719%203.88281%207.63281%203.88281%207.89844%204.10156L12.3984%208.60156Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E'
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'scheduler_card')}
        data-w-id='406082c1-f6fa-7c63-8c97-bd3fd59face4'
        tag='div'
        {...onClickMySchedule}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'sh_card_content')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'scheduler_card_icon')}
            tag='div'
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, 'embed_flex')}
              value='%3Csvg%20width%3D%2236%22%20height%3D%2236%22%20viewBox%3D%220%200%2036%2036%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12%209.3V11.1H19.2V9.3C19.225%208.925%2019.425%208.725%2019.8%208.7C20.175%208.725%2020.375%208.925%2020.4%209.3V11.1H21.6C22.275%2011.125%2022.8375%2011.3625%2023.2875%2011.8125C23.7375%2012.2625%2023.975%2012.825%2024%2013.5V14.7V15.9H23.4H22.8H20.4H8.4V25.5C8.4%2025.85%208.5125%2026.1375%208.7375%2026.3625C8.9625%2026.5875%209.25%2026.7%209.6%2026.7H18.3C18.675%2027.15%2019.1125%2027.55%2019.6125%2027.9H9.6C8.925%2027.875%208.3625%2027.6375%207.9125%2027.1875C7.4625%2026.7375%207.225%2026.175%207.2%2025.5V15.9V14.7V13.5C7.225%2012.825%207.4625%2012.2625%207.9125%2011.8125C8.3625%2011.3625%208.925%2011.125%209.6%2011.1H10.8V9.3C10.825%208.925%2011.025%208.725%2011.4%208.7C11.775%208.725%2011.975%208.925%2012%209.3ZM9.6%2012.3C9.25%2012.3%208.9625%2012.4125%208.7375%2012.6375C8.5125%2012.8625%208.4%2013.15%208.4%2013.5V14.7H22.8V13.5C22.8%2013.15%2022.6875%2012.8625%2022.4625%2012.6375C22.2375%2012.4125%2021.95%2012.3%2021.6%2012.3H9.6ZM25.65%2026.0625C25.325%2025.6875%2024.925%2025.5%2024.45%2025.5H22.35C21.85%2025.5%2021.45%2025.6875%2021.15%2026.0625C21.8%2026.4875%2022.55%2026.7%2023.4%2026.7C24.25%2026.7%2025%2026.4875%2025.65%2026.0625ZM26.55%2025.275C27.225%2024.5%2027.575%2023.575%2027.6%2022.5C27.575%2021.3%2027.1625%2020.3125%2026.3625%2019.5375C25.5875%2018.7375%2024.6%2018.325%2023.4%2018.3C22.2%2018.325%2021.2125%2018.7375%2020.4375%2019.5375C19.6375%2020.3125%2019.225%2021.3%2019.2%2022.5C19.225%2023.575%2019.575%2024.5%2020.25%2025.275C20.8%2024.65%2021.5%2024.325%2022.35%2024.3H24.45C25.3%2024.325%2026%2024.65%2026.55%2025.275ZM28.8%2022.5C28.8%2023.475%2028.5625%2024.375%2028.0875%2025.2C27.6125%2026.025%2026.95%2026.6875%2026.1%2027.1875C25.25%2027.6625%2024.35%2027.9%2023.4%2027.9C22.45%2027.9%2021.55%2027.6625%2020.7%2027.1875C19.85%2026.6875%2019.1875%2026.025%2018.7125%2025.2C18.2375%2024.375%2018%2023.475%2018%2022.5C18%2021.525%2018.2375%2020.625%2018.7125%2019.8C19.1875%2018.975%2019.85%2018.3125%2020.7%2017.8125C21.55%2017.3375%2022.45%2017.1%2023.4%2017.1C24.35%2017.1%2025.25%2017.3375%2026.1%2017.8125C26.95%2018.3125%2027.6125%2018.975%2028.0875%2019.8C28.5625%2020.625%2028.8%2021.525%2028.8%2022.5ZM23.4%2020.7C22.85%2020.75%2022.55%2021.05%2022.5%2021.6C22.55%2022.15%2022.85%2022.45%2023.4%2022.5C23.95%2022.45%2024.25%2022.15%2024.3%2021.6C24.25%2021.05%2023.95%2020.75%2023.4%2020.7ZM23.4%2023.7C22.6%2023.675%2022%2023.325%2021.6%2022.65C21.2%2021.95%2021.2%2021.25%2021.6%2020.55C22%2019.875%2022.6%2019.525%2023.4%2019.5C24.2%2019.525%2024.8%2019.875%2025.2%2020.55C25.6%2021.25%2025.6%2021.95%2025.2%2022.65C24.8%2023.325%2024.2%2023.675%2023.4%2023.7Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E'
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'fw-semibold')}
            tag='div'
          >
            {'My Schedules'}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'text-gray-600')}
            tag='div'
          >
            {
              'Effortlessly create new job from scratch or seamlessly import existing ones from popular ATS platforms like Greenhouse, Lever, and Ashby.'
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'scheduler_arrow')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'scheduler_arrow_svg')}
            tag='div'
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, 'embed_flex')}
              value='%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewBox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.3984%208.60156C12.6172%208.86719%2012.6172%209.13281%2012.3984%209.39844L7.89844%2013.8984C7.63281%2014.1172%207.36719%2014.1172%207.10156%2013.8984C6.88281%2013.6328%206.88281%2013.3672%207.10156%2013.1016L11.2031%209L7.10156%204.89844C6.88281%204.63281%206.88281%204.36719%207.10156%204.10156C7.36719%203.88281%207.63281%203.88281%207.89844%204.10156L12.3984%208.60156Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E'
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
