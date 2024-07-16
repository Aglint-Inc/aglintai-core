/* eslint-disable security/detect-object-injection */
import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { Box, Stack } from '@mui/material';
import axios from 'axios';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import { EditEmail } from '@/devlink/EditEmail';
import { EmailTemplateCards } from '@/devlink/EmailTemplateCards';
import { EmailTemplatesStart } from '@/devlink/EmailTemplatesStart';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import { NewTabPill } from '@/devlink3/NewTabPill';
import EmailPreviewPopover from '@/src/components/Common/EmailTemplateEditor/EmailPreviewPopover';
import EmailTemplateEditForm from '@/src/components/Common/EmailTemplateEditor/EmailTemplateEditForm';
import SearchField from '@/src/components/Common/SearchField/SearchField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useKeyPress } from '@/src/hooks/useKeyPress';
import { emailTemplateCopy } from '@/src/types/companyEmailTypes';
import { YTransform } from '@/src/utils/framer-motions/Animation';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  fetchEmailTemplates,
  filterEmailByTemplateTab,
  SortCurrentTabTemps,
  TEMPLATE_TABS,
  template_tabs,
} from './utils';

function SchedulerEmailTemps({ setSaving }) {
  const { recruiter_id } = useAuthDetails();
  const [templates, setTemplates] = useState<
    DatabaseTable['company_email_template'][]
  >([]);
  const [tiptapLoader, setTipTapLoder] = useState(false);

  const [isEditorLoad, setIsEditorLoad] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [searchQry, setSearchQry] = useState('');
  const router = useRouter();

  const [isHtml, setHtml] = useState(null);
  const [popOverLoading, setPopOverLoading] = useState(false);

  const [isFocus, setIsFocus] = useState(false);

  const temp_tab = router.query.template_tab as any;
  const temp_email = router.query.email as DatabaseEnums['email_slack_types'];

  useEffect(() => {
    (async () => {
      try {
        let template_tab = template_tabs[0].key;
        if (!template_tabs.find((t) => t.key === temp_tab)) {
          template_tab = template_tabs[0].key;
        }
        const temps = await fetchEmailTemplates(recruiter_id);
        if (!temps || !router.isReady) return;

        const curr_tab_temps = SortCurrentTabTemps(temps);

        const current_filtered_temp = curr_tab_temps.filter((t) =>
          filterEmailByTemplateTab(template_tab, t.type),
        );

        if (!current_filtered_temp.find((e) => e.type === temp_email)) {
          setEmailRoute(current_filtered_temp[0].type);
        }

        setTemplates([...curr_tab_temps]);

        setTipTapLoder(true);
        setTimeout(() => {
          setTipTapLoder(false);
          setIsEditorLoad(false);
        }, 500);
      } catch (err) {
        toast.error('Something went wrong');
      }
    })();
  }, [recruiter_id]);
  useEffect(() => {
    if (!template_tabs.find((t) => t.key === temp_tab)) {
      setTabRoute(template_tabs[0].key);
    }
  }, [router.isReady, router.query]);

  async function updateEmailToDB(
    updated_template: DatabaseTable['company_email_template'],
  ) {
    try {
      setSaving('saving');
      supabaseWrap(
        await supabase
          .from('company_email_template')
          .update({ ...updated_template })
          .eq('id', updated_template.id),
      );
      setTimeout(() => {
        setSaving('saved');
      }, 1000);
    } catch (err) {
      toast.error('Something went wrong!');
    }
  }
  const preview = async () => {
    setPopOverLoading(true);
    try {
      const { data } = await axios.post(`/api/emails/preview`, {
        mail_type: temp_email,

        recruiter_id: recruiter_id,
      });
      setHtml(data);
      setPopOverLoading(false);
      return data;
    } catch (error) {
      setPopOverLoading(false);
      toast.error(`Error fetching preview: ${error}`);
    }
  };

  const handleChangeTemplateTab = (update_tab: TEMPLATE_TABS) => {
    const current_filtered_temp = templates.filter((t) =>
      filterEmailByTemplateTab(update_tab, t.type),
    );
    setEmailRoute(current_filtered_temp[0].type);
    setTipTapLoder(true);
    setTimeout(() => {
      setTipTapLoder(false);
    }, 500);
    setSearchQry('');
    setTabRoute(update_tab);
  };

  const debouncedUpdateEmail = useCallback(debounce(updateEmailToDB, 300), []);
  const handleUpdateEmailTemp = async (
    updatedTemplate: DatabaseTable['company_email_template'],
  ) => {
    const updatedTemps = templates.map((temp) => {
      if (temp.type === updatedTemplate.type) {
        return updatedTemplate;
      }
      return temp;
    });
    setTemplates(updatedTemps);
    debouncedUpdateEmail(updatedTemplate);
  };
  const selectedTemplate = templates.find((t) => t.type === temp_email);

  const sections = template_tabs.map((tab) => tab.key);
  const tabCount: number = sections.length - 1;
  const currentIndex: number = sections.indexOf(temp_tab);

  const handlePrevious = () => {
    const pre =
      // eslint-disable-next-line security/detect-object-injection
      currentIndex === 0 ? sections[tabCount] : sections[currentIndex - 1];
    handleChangeTemplateTab(pre);
  };
  const handleNext = () => {
    const next =
      currentIndex === tabCount ? sections[0] : sections[currentIndex + 1];
    handleChangeTemplateTab(next);
  };
  const handleup = () => {
    const templates = currentTabQueryTemplates().map(
      (t) => t.type,
    ) as DatabaseEnums['email_slack_types'][];

    const index = templates.indexOf(temp_email);
    setEmailRoute(templates[index === 0 ? 0 : index < 0 ? 0 : index - 1]);
  };
  const handleDown = () => {
    const templates = currentTabQueryTemplates().map(
      (t) => t.type,
    ) as DatabaseEnums['email_slack_types'][];

    const index = templates.indexOf(temp_email);
    const count = templates.length - 1;
    setEmailRoute(
      templates[index === count ? count : index < 0 ? count : index + 1],
    );
  };

  const { pressed: right } = useKeyPress('ArrowRight');
  const { pressed: left } = useKeyPress('ArrowLeft');
  const { pressed: up } = useKeyPress('ArrowUp');
  const { pressed: down } = useKeyPress('ArrowDown');

  useEffect(() => {
    if (left && !isFocus) handlePrevious();
    else if (right && !isFocus) handleNext();
    else if (up && !isFocus) handleup();
    else if (down && !isFocus) handleDown();
  }, [left, right, up, down]);

  function setEmailRoute(temp) {
    router.query.email = temp;
    router.push(router);
  }
  function setTabRoute(tab) {
    router.query.template_tab = tab;
    router.push(router);
  }

  const currentTabQueryTemplates = () => {
    return templates
      .filter((emailPath) => {
        const flag = filterEmailByTemplateTab(temp_tab as any, emailPath.type);
        if (searchQry.length > 0) {
          return (
            flag &&
            emailTemplateCopy[emailPath.type].heading
              .toLocaleLowerCase()
              .includes(searchQry.toLocaleLowerCase())
          );
        }
        return flag;
      })
      .sort((a, b) => {
        if (
          emailTemplateCopy[a.type].heading > emailTemplateCopy[b.type].heading
        ) {
          return 1;
        }
        if (
          emailTemplateCopy[b.type].heading > emailTemplateCopy[a.type].heading
        ) {
          return -1;
        }
        return 0;
      });
  };

  return (
    <Stack>
      <Box>
        {templates.length > 0 && (
          <EmailTemplatesStart
            slotNewTabPill={template_tabs.map((tab) => {
              return (
                <NewTabPill
                  key={tab.key}
                  textLabel={tab.label}
                  isPillActive={tab.key === temp_tab}
                  onClickPill={{
                    onClick: () => {
                      handleChangeTemplateTab(tab.key);
                    },
                  }}
                />
              );
            })}
            slotSearchFilter={
              <>
                <SearchField
                  placeholder={'Search Templates.'}
                  onChange={(e) => {
                    setSearchQry(e.target.value);
                  }}
                  onClear={() => {
                    setSearchQry('');
                  }}
                  value={searchQry}
                  isFullWidth={true}
                  onBlur={() => setIsFocus(false)}
                  onFocus={() => setIsFocus(true)}
                />
              </>
            }
            slotEmailTemplateCards={
              <>
                {templates
                  .filter((emailPath) => {
                    const flag = filterEmailByTemplateTab(
                      temp_tab as any,
                      emailPath.type,
                    );
                    if (searchQry.length > 0) {
                      return (
                        flag &&
                        emailTemplateCopy[emailPath.type].heading
                          .toLocaleLowerCase()
                          .includes(searchQry.toLocaleLowerCase())
                      );
                    }
                    return flag;
                  })
                  .sort((a, b) => {
                    if (
                      emailTemplateCopy[a.type].heading >
                      emailTemplateCopy[b.type].heading
                    ) {
                      return 1;
                    }
                    if (
                      emailTemplateCopy[b.type].heading >
                      emailTemplateCopy[a.type].heading
                    ) {
                      return -1;
                    }
                    return 0;
                  })
                  .map((emailPath) => (
                    <EmailTemplateCards
                      key={emailPath.id}
                      isActive={emailPath.type === temp_email}
                      textDescription={
                        emailTemplateCopy[emailPath.type].description
                      }
                      textTitle={emailTemplateCopy[emailPath.type]?.heading}
                      onClickApplicationRecieved={{
                        onClick: () => {
                          if (temp_email !== emailPath.type) {
                            setTipTapLoder(true);
                            setEmailRoute(emailPath.type);
                            setTimeout(() => {
                              setTipTapLoder(false);
                            }, 500);
                          }
                        },
                      }}
                      slotBadge={<></>}
                    />
                  ))}
              </>
            }
            slotEmailDetails={
              <>
                {isEditorLoad && (
                  <>
                    <Stack
                      direction='row'
                      alignItems='center'
                      justifyContent='center'
                      bgcolor='var(--neutral-2)'
                      sx={{ width: '100%', height: 'calc(100vh - 96px)' }}
                    >
                      <LoaderSvg />
                    </Stack>
                  </>
                )}
                {!isEditorLoad && (
                  <YTransform uniqueKey={temp_email}>
                    <EditEmail
                      currentModule={'scheduler'}
                      slotSaveButton={<></>}
                      onClickPreview={{
                        onClick: (e) => {
                          preview();
                          setAnchorEl(e.currentTarget);
                        },
                      }}
                      isPreviewVisible={router.query.template_tab === 'email'}
                      textTipsMessage={undefined}
                      editEmailDescription={
                        emailTemplateCopy[temp_email].description
                      }
                      isSaveChangesButtonVisible={false}
                      textEmailName={emailTemplateCopy[temp_email].heading}
                      slotForm={
                        tiptapLoader ? (
                          <Stack
                            alignItems={'center'}
                            justifyContent={'center'}
                            sx={{
                              height: 'calc(100vh - 220px)',
                              width: '100%',
                            }}
                          >
                            <LoaderSvg />
                          </Stack>
                        ) : (
                          <EmailTemplateEditForm
                            onBlur={() => setIsFocus(false)}
                            onFocus={() => setIsFocus(true)}
                            senderNameChange={(e) => {
                              handleUpdateEmailTemp({
                                ...selectedTemplate,
                                from_name: e.target.value,
                              });
                            }}
                            emailBodyChange={(str) => {
                              handleUpdateEmailTemp({
                                ...selectedTemplate,
                                body: str,
                              });
                            }}
                            emailSubjectChange={(str) => {
                              handleUpdateEmailTemp({
                                ...selectedTemplate,
                                subject: str,
                              });
                            }}
                            selectedTemplate={{ ...selectedTemplate }}
                            showSender={
                              router.query.template_tab !== 'slack' &&
                              router.query.template_tab !== 'calender'
                            }
                            showSubject={
                              router.query.template_tab !== 'slack' &&
                              router.query.template_tab !== 'calender'
                            }
                          />
                        )
                      }
                    />
                    <EmailPreviewPopover
                      anchorEl={anchorEl}
                      setAnchorEl={setAnchorEl}
                      setHtml={setHtml}
                      isHtml={isHtml}
                      Loading={popOverLoading}
                    />
                  </YTransform>
                )}
              </>
            }
          />
        )}
      </Box>
    </Stack>
  );
}

export default SchedulerEmailTemps;
