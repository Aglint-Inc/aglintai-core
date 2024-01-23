import React from 'react';
import * as _Builtin from './_Builtin';
import * as _interactions from './interactions';
import * as _utils from './utils';
import _styles from './EmailTemplate.module.css';

const _interactionsData = JSON.parse(
  '{"events":{"e":{"id":"e","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-2"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"},"targets":[{"selector":".aui-button-wrap.email","originalId":"650c129b14ba3ec43089005f|f3340951-3b1b-ee78-4e07-92dd67f04da8","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694910129600}},"actionLists":{"a":{"id":"a","title":"email-temp-editor-[close]","actionItemGroups":[{"actionItems":[{"id":"a-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":300,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe136"]},"value":0,"unit":""}},{"id":"a-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"outExpo","duration":800,"target":{"selector":".rd-email-edit-wrapper","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe0d1"]},"xValue":500,"xUnit":"px","yUnit":"PX","zUnit":"PX"}},{"id":"a-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":600,"easing":"","duration":0,"target":{"useEventTarget":"PARENT","selector":".rd-company-sidebar","selectorGuids":["2c8defbe-35b9-4599-ee14-45d94f9fe136"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694910134507}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}',
);

export function EmailTemplate({
  as: _Component = _Builtin.Block,
  textEmailHeaderCategory = 'Interview Email',
  onClickEdit = {},
  slotEmailPreviewImage,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, 'cdd-template-block', 'jobs-templ')}
      tag='div'
    >
      <_Builtin.Block className={_utils.cx(_styles, 'div-block-292')} tag='div'>
        <_Builtin.Block
          className={_utils.cx(_styles, 'fw-semibold', 'color-grey-500')}
          tag='div'
        >
          {textEmailHeaderCategory}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'rd-company-sidebar')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'rd-email-edit-wrapper')}
            tag='div'
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, 'hide')}
              value='%3Cstyle%3E%0A.rd-email-edit-wrapper%3A%3A-webkit-scrollbar%20%7B%0A%20%20display%3A%20none%3B%0A%7D%0A%0A.rd-email-edit-wrapper%20%7B%0A%20%20-ms-overflow-style%3A%20none%3B%0A%20%20scrollbar-width%3A%20none%3B%0A%7D%0A%3C%2Fstyle%3E'
            />
            <_Builtin.Block
              className={_utils.cx(_styles, 'div-block-307')}
              tag='div'
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  'text-lg',
                  'fw-semibold',
                  'text-grey-500',
                )}
                tag='div'
              >
                {'Interview Email'}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, 'rd-company-edit-btns')}
                tag='div'
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, 'aui-button-wrap', 'email')}
                  tag='div'
                  tabIndex='0'
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      'aui-button',
                      'is-small',
                      'is-button-outlined',
                    )}
                    tag='div'
                    tabIndex='0'
                  >
                    <_Builtin.Block tag='div'>{'Save Changes'}</_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, 'aui-button-wrap', 'email')}
                  tag='div'
                  tabIndex='0'
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      'aui-button',
                      'is-small',
                      'is-button-outlined',
                      'danger',
                    )}
                    tag='div'
                    tabIndex='0'
                  >
                    <_Builtin.Block tag='div'>{'Close'}</_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, 'div-block-308')}
              tag='div'
            >
              <_Builtin.Block
                className={_utils.cx(_styles, 'sidebar-wrapper', 'rd-company')}
                tag='div'
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, 'sidebar-block')}
                  tag='div'
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, 'rd-email-edit-block')}
                    tag='div'
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        'text-sm',
                        'fw-semibold',
                        'color-black',
                      )}
                      tag='div'
                    >
                      {'Body Content'}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        'cj-richtext-editor-wrapper',
                      )}
                      tag='div'
                    >
                      <_Builtin.Block
                        className={_utils.cx(_styles, 'cj-richtext-cotrols')}
                        tag='div'
                      >
                        <_Builtin.Block
                          className={_utils.cx(_styles, 'cj-rt-paragraph')}
                          tag='div'
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, 'medium-default-11')}
                            tag='div'
                          >
                            {'Paragraph'}
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              'chevron-down---16px-icon',
                            )}
                            tag='div'
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                'vectors-wrapper-31',
                              )}
                              width='11.00003719329834'
                              height='5.00001859664917'
                              loading='lazy'
                              src='https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504043394863d835c0a86cc_Vectors-Wrapper.svg'
                            />
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, 'cj-rt-controls-block')}
                          tag='div'
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, 'cj-rt-control-icon')}
                            tag='div'
                          >
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, 'icon')}
                              value='%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M3%201.5C3%201.22386%203.22386%201%203.5%201H7C9.17614%201%2011%202.82386%2011%205C11%206.31462%2010.3344%207.50068%209.32761%208.23374C10.87%208.79245%2012%2010.2871%2012%2012C12%2014.1761%2010.1761%2016%208%2016H3.5C3.22386%2016%203%2015.7761%203%2015.5V8.5V1.5ZM4%208H7C8.62386%208%2010%206.62386%2010%205C10%203.37614%208.62386%202%207%202H4V8ZM4%209V15H8C9.62386%2015%2011%2013.6239%2011%2012C11%2010.3761%209.62386%209%208%209H7H4Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E'
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, 'cj-rt-control-icon')}
                            tag='div'
                          >
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, 'icon')}
                              value='%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.5%202.0001H8.38151L5.59579%2015.0001H4.5C4.22386%2015.0001%204%2015.224%204%2015.5001C4%2015.7762%204.22386%2016.0001%204.5%2016.0001H5.99031C5.99712%2016.0002%206.0039%2016.0002%206.01067%2016.0001H7.5C7.77614%2016.0001%208%2015.7762%208%2015.5001C8%2015.224%207.77614%2015.0001%207.5%2015.0001H6.61849L9.40421%202.0001H10.5C10.7761%202.0001%2011%201.77625%2011%201.5001C11%201.22396%2010.7761%201.0001%2010.5%201.0001H9.00965C9.00287%200.999965%208.99611%200.999966%208.98937%201.0001H7.5C7.22386%201.0001%207%201.22396%207%201.5001C7%201.77625%207.22386%202.0001%207.5%202.0001Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E'
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, 'cj-rt-control-icon')}
                            tag='div'
                          >
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, 'icon')}
                              value='%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.5%2016C2.22386%2016%202%2015.7761%202%2015.5C2%2015.2239%202.22386%2015%202.5%2015H12.5C12.7761%2015%2013%2015.2239%2013%2015.5C13%2015.7761%2012.7761%2016%2012.5%2016H2.5ZM3%201.5C3%201.22386%203.22386%201%203.5%201C3.77614%201%204%201.22386%204%201.5V9.5C4%2011.4239%205.57614%2013%207.5%2013C9.42386%2013%2011%2011.4239%2011%209.5V1.5C11%201.22386%2011.2239%201%2011.5%201C11.7761%201%2012%201.22386%2012%201.5V9.5C12%2011.9761%209.97614%2014%207.5%2014C5.02386%2014%203%2011.9761%203%209.5V1.5Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E'
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(_styles, 'cj-rt-control-icon')}
                            tag='div'
                          >
                            <_Builtin.HtmlEmbed
                              className={_utils.cx(_styles, 'icon')}
                              value='%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewbox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M11.6464%205.85369C11.4512%205.65842%2011.4512%205.34184%2011.6464%205.14658C11.8417%204.95132%2012.1583%204.95132%2012.3536%205.14658L14.4536%207.24658C14.8488%207.64184%2014.8488%208.25842%2014.4617%208.64537L12.3617%2010.8454C12.171%2011.0451%2011.8545%2011.0525%2011.6548%2010.8618C11.455%2010.6711%2011.4477%2010.3546%2011.6383%2010.1549L13.743%207.95022L11.6464%205.85369ZM4.36168%2010.1549C4.55235%2010.3546%204.54499%2010.6711%204.34524%2010.8618C4.14549%2011.0525%203.82899%2011.0451%203.63832%2010.8454L1.54645%208.65369C1.15118%208.25842%201.15118%207.64184%201.54645%207.24658L3.64645%205.14658C3.84171%204.95132%204.15829%204.95132%204.35355%205.14658C4.54882%205.34184%204.54882%205.65842%204.35355%205.85369L2.25651%207.95073C2.25794%207.95151%204.36168%2010.1549%204.36168%2010.1549ZM9.53576%202.81444C9.63832%202.55805%209.9293%202.43334%2010.1857%202.53589C10.4421%202.63845%2010.5668%202.92944%2010.4642%203.18583L6.46424%2013.1858C6.36168%2013.4422%206.0707%2013.5669%205.8143%2013.4644C5.55791%2013.3618%205.43321%2013.0708%205.53576%2012.8144L9.53576%202.81444Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E'
                            />
                          </_Builtin.Block>
                        </_Builtin.Block>
                        <_Builtin.Block
                          className={_utils.cx(_styles, 'cj-rt-controls-block')}
                          tag='div'
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, 'cj-rt-control-icon')}
                            tag='div'
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                'vectors-wrapper-33',
                              )}
                              width='14'
                              height='13'
                              loading='lazy'
                              src='https://uploads-ssl.webflow.com/64688200899246757fda7a37/650406032fb689392940aa9d_Vectors-Wrapper.svg'
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              '',
                              'cj-rt-control-icon',
                            )}
                            tag='div'
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                'vectors-wrapper-34',
                              )}
                              width='13.769068717956543'
                              height='13.850000381469727'
                              loading='lazy'
                              src='https://uploads-ssl.webflow.com/64688200899246757fda7a37/65040604bc4e5ef14157a09d_Vectors-Wrapper.svg'
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              '',
                              'cj-rt-control-icon',
                            )}
                            tag='div'
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                '',
                                'vectors-wrapper-33',
                              )}
                              width='14'
                              height='13'
                              loading='lazy'
                              src='https://uploads-ssl.webflow.com/64688200899246757fda7a37/65040605c8b96fcc667a74b1_Vectors-Wrapper.svg'
                            />
                          </_Builtin.Block>
                          <_Builtin.Block
                            className={_utils.cx(
                              _styles,
                              '',
                              'cj-rt-control-icon',
                            )}
                            tag='div'
                          >
                            <_Builtin.Image
                              className={_utils.cx(
                                _styles,
                                'vectors-wrapper-32',
                              )}
                              width='14.25'
                              height='13'
                              loading='lazy'
                              src='https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504060655c5313f7f217aa2_Vectors-Wrapper.svg'
                            />
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, 'cj-rt-input-block')}
                        tag='div'
                      >
                        <_Builtin.FormWrapper
                          className={_utils.cx(_styles, 'form-block-4')}
                        >
                          <_Builtin.FormForm
                            className={_utils.cx(_styles, 'form-4')}
                            name='email-form-2'
                            data-name='Email Form 2'
                            method='get'
                            id='email-form-2'
                          >
                            <_Builtin.FormTextarea
                              className={_utils.cx(
                                _styles,
                                'rd-email-content-input',
                              )}
                              name='field-4'
                              maxLength={5000}
                              data-name='Field 4'
                              required={false}
                              autoFocus={false}
                              id='field-4'
                            />
                            <_Builtin.FormButton
                              className={_utils.cx(_styles, 'hide')}
                              type='submit'
                              value='Submit'
                              data-wait='Please wait...'
                            />
                          </_Builtin.FormForm>
                          <_Builtin.FormSuccessMessage
                            className={_utils.cx(_styles, 'hide')}
                          >
                            <_Builtin.Block tag='div'>
                              {'Thank you! Your submission has been received!'}
                            </_Builtin.Block>
                          </_Builtin.FormSuccessMessage>
                          <_Builtin.FormErrorMessage
                            className={_utils.cx(_styles, 'hide')}
                          >
                            <_Builtin.Block tag='div'>
                              {
                                'Oops! Something went wrong while submitting the form.'
                              }
                            </_Builtin.Block>
                          </_Builtin.FormErrorMessage>
                        </_Builtin.FormWrapper>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, 'rd-email-edit-block')}
                    tag='div'
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        'text-sm',
                        'fw-semibold',
                        'color-black',
                      )}
                      tag='div'
                    >
                      {'CTA text'}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, 'input')}
                      tag='div'
                    >
                      <_Builtin.FormWrapper
                        className={_utils.cx(_styles, 'form-block-3')}
                      >
                        <_Builtin.FormForm
                          className={_utils.cx(_styles, 'form-4')}
                          name='email-form'
                          data-name='Email Form'
                          method='get'
                          id='email-form'
                        >
                          <_Builtin.FormTextInput
                            className={_utils.cx(_styles, 'text-field-3')}
                            autoFocus={false}
                            maxLength={256}
                            name='email-2'
                            data-name='Email 2'
                            placeholder='Placeholder'
                            type='email'
                            disabled={false}
                            required={false}
                            id='email-2'
                          />
                        </_Builtin.FormForm>
                        <_Builtin.FormSuccessMessage
                          className={_utils.cx(_styles, 'hide')}
                        >
                          <_Builtin.Block tag='div'>
                            {'Thank you! Your submission has been received!'}
                          </_Builtin.Block>
                        </_Builtin.FormSuccessMessage>
                        <_Builtin.FormErrorMessage
                          className={_utils.cx(_styles, 'hide')}
                        >
                          <_Builtin.Block tag='div'>
                            {
                              'Oops! Something went wrong while submitting the form.'
                            }
                          </_Builtin.Block>
                        </_Builtin.FormErrorMessage>
                      </_Builtin.FormWrapper>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, 'rd-email-edit-block')}
                    tag='div'
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        'text-sm',
                        'fw-semibold',
                        'color-black',
                      )}
                      tag='div'
                    >
                      {'Interview Link'}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        'text-sm',
                        'color-grey-600',
                      )}
                      tag='div'
                    >
                      {
                        'The interview link will be automatically generated by aglint. no action required'
                      }
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, 'toggle-dropdown')}
                    tag='div'
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        'toggle-dropdown-toggle',
                        'company',
                      )}
                      tag='div'
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          'fw-semibold',
                          'color-black',
                        )}
                        tag='div'
                      >
                        {
                          'Automatically send emails for taking interview to the candidates those who have marked interviewing.'
                        }
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, 'toggle-btn-block')}
                        tag='div'
                      >
                        <_Builtin.NotSupported _atom='Animation' />
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  'sidebar-wrapper',
                  'rd-company',
                  'max-width-300',
                )}
                tag='div'
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, 'sidebar-block')}
                  tag='div'
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, 'rd-email-edit-block')}
                    tag='div'
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        'text-sm',
                        'fw-semibold',
                        'color-black',
                      )}
                      tag='div'
                    >
                      {'Preview'}
                    </_Builtin.Block>
                    <_Builtin.Image
                      width='auto'
                      height='auto'
                      loading='lazy'
                      alt=''
                      src='https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890212_36413fdbae77050b8f006cb7b0099e1c.png'
                    />
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, 'rd-email-edit-block')}
                    tag='div'
                  >
                    <_Builtin.Block
                      className={_utils.cx(
                        _styles,
                        'text-sm',
                        'fw-semibold',
                        'color-black',
                      )}
                      tag='div'
                    >
                      {'Switch template'}
                    </_Builtin.Block>
                    <_Builtin.Block
                      className={_utils.cx(_styles, 'div-block-310')}
                      tag='div'
                    >
                      <_Builtin.Image
                        width='auto'
                        height='auto'
                        loading='lazy'
                        alt=''
                        src='https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890212_36413fdbae77050b8f006cb7b0099e1c.png'
                      />
                      <_Builtin.Image
                        width='auto'
                        height='auto'
                        loading='lazy'
                        alt=''
                        src='https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec43089021a_8d2be2254997c1696ce7b0e9f2ccdbbd.png'
                      />
                      <_Builtin.Image
                        width='auto'
                        height='auto'
                        loading='lazy'
                        alt=''
                        src='https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/650c129b14ba3ec430890213_abc7bfd9cfc0e34b54dcccc1b45fada9.png'
                      />
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, 'rd-email-edit-block')}
                    tag='div'
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, 'email-note-block')}
                      tag='div'
                    >
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          'text-sm',
                          'fw-semibold',
                          'text-yellow-800',
                        )}
                        tag='div'
                      >
                        {'CTA text'}
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(
                          _styles,
                          'text-sm',
                          'color-grey-600',
                        )}
                        tag='div'
                      >
                        {
                          'The company details, including the name, logo, and social media links..etc mentioned in the template, are sourced from the company settings. To make adjustments to this information, you can edit the company settings accordingly.'
                        }
                      </_Builtin.Block>
                      <_Builtin.Block
                        className={_utils.cx(_styles, 'aui-button-wrap')}
                        tag='div'
                        tabIndex=''
                      >
                        <_Builtin.Block
                          className={_utils.cx(
                            _styles,
                            'aui-button',
                            'is-small',
                          )}
                          tag='div'
                          tabIndex=''
                        >
                          <_Builtin.Block
                            className={_utils.cx(_styles, 'text-blue-500')}
                            tag='div'
                          >
                            {'Got it'}
                          </_Builtin.Block>
                        </_Builtin.Block>
                      </_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'rd-email-edit-btn', 'clickable')}
          tag='div'
          {...onClickEdit}
        >
          <_Builtin.Block className={_utils.cx(_styles, 'label-8')} tag='div'>
            {'Edit'}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, 'div-block-293')} tag='div'>
        <_Builtin.Block
          className={_utils.cx(_styles, 'slot-email-preview-image')}
          tag='div'
        >
          {slotEmailPreviewImage}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
