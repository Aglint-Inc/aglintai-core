/* eslint-disable security/detect-object-injection */
import { DatabaseTableInsert } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { Box, Stack } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { EditEmail } from '@/devlink/EditEmail';
import { EmailTemplateCards } from '@/devlink/EmailTemplateCards';
import { EmailTemplatesStart } from '@/devlink/EmailTemplatesStart';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import { NewTabPill } from '@/devlink3/NewTabPill';
import EmailPreviewPopover from '@/src/components/Common/EmailTemplateEditor/EmailPreviewPopover';
import EmailTemplateEditForm from '@/src/components/Common/EmailTemplateEditor/EmailTemplateEditForm';
import SearchField from '@/src/components/Common/SearchField/SearchField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { emailTemplateCopy } from '@/src/types/companyEmailTypes';
import { YTransform } from '@/src/utils/framer-motions/Animation';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  filterEmailByTemplateTab,
  TEMPLATE_TABS,
  template_tabs,
  upateEmailTemplate,
} from './utils';

function SchedulerEmailTemps() {
  const { recruiter_id } = useAuthDetails();
  const [emailTemplate, setEmailTemplate] = useState<
    DatabaseTableInsert['company_email_template'][]
  >([]);
  const [tiptapLoader, setTipTapLoder] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<DatabaseTableInsert['company_email_template']>(null);
  const [isEditorLoad, setIsEditorLoad] = useState(true);
  const [saving, setSaving] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [searchQry, setSearchQry] = useState('');
  const router = useRouter();

  const [isHtml, setHtml] = useState(null);
  const [popOverLoading, setPopOverLoading] = useState(false);

  const temp_tab = router.query.template_tab as any;

  useEffect(() => {
    (async () => {
      try {
        const temps = await fetchEmailTemplates(recruiter_id);
        if (!temps || !router.isReady) return;

        const curr_tab_temps = SortCurrentTabTemps(temps);

        const current_filtered_temp = curr_tab_temps.filter((t) =>
          filterEmailByTemplateTab(temp_tab, t.type),
        );
        setSelectedTemplate({ ...current_filtered_temp[0] });
        setEmailTemplate([...curr_tab_temps]);

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
      router.query.template_tab = template_tabs[0].key;
      router.push(router);
    }
  }, [router.isReady, router.query]);

  async function updateEmail({
    id,
    data,
  }: {
    id: string;
    data: DatabaseTableInsert['company_email_template'];
  }) {
    await upateEmailTemplate({
      id,
      data: {
        ...data,
      },
    });
    setSaving(false);
    toast.message('Saved Successfully!');
  }
  const preview = async () => {
    setPopOverLoading(true);
    try {
      const { data } = await axios.post(`/api/emails/preview`, {
        mail_type: selectedTemplate.type,
        body: selectedTemplate.body,
      });
      setHtml(data);
      setPopOverLoading(false);
      return data;
    } catch (error) {
      setPopOverLoading(false);
      toast.error(`Error fetching preview: ${error}`);
      throw error;
    }
  };

  const senderNameChange = (e) => {
    setSelectedTemplate((pre) => {
      pre.from_name = e.target.value;
      return { ...pre };
    });
  };

  const emailSubjectChange = (html) => {
    const text = html;
    setSelectedTemplate((pre) => {
      pre.subject = text;
      return { ...pre };
    });
  };

  const emailBodyChange = (html) => {
    const text = html;
    setSelectedTemplate((pre) => {
      pre.body = text;
      return { ...pre };
    });
  };

  const handleChangeTemplateTab = (update_tab: TEMPLATE_TABS) => {
    const current_filtered_temp = emailTemplate.filter((t) =>
      filterEmailByTemplateTab(update_tab, t.type),
    );
    setSelectedTemplate({ ...current_filtered_temp[0] });
    setTipTapLoder(true);
    setTimeout(() => {
      setTipTapLoder(false);
    }, 500);
    setSearchQry('');
    router.query.template_tab = update_tab;
    router.push(router);
  };

  return (
    <Stack>
      <Box>
        {emailTemplate && (
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
                />
              </>
            }
            slotEmailTemplateCards={emailTemplate
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
                  isActive={emailPath.type === selectedTemplate.type}
                  textDescription={
                    emailTemplateCopy[emailPath.type].description
                  }
                  textTitle={emailTemplateCopy[emailPath.type]?.heading}
                  onClickApplicationRecieved={{
                    onClick: () => {
                      if (selectedTemplate.id !== emailPath.id) {
                        setTipTapLoder(true);
                        setSelectedTemplate(emailPath);
                        setTimeout(() => {
                          setTipTapLoder(false);
                        }, 500);
                      }
                    },
                  }}
                  slotBadge={<></>}
                />
              ))}
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
                  <YTransform uniqueKey={selectedTemplate}>
                    <EditEmail
                      slotSaveButton={
                        <ButtonSolid
                          size={2}
                          isLoading={saving}
                          textButton={'Save'}
                          onClickButton={{
                            onClick: () => {
                              setSaving(true);
                              updateEmail({
                                id: selectedTemplate.id,
                                data: selectedTemplate,
                              });
                            },
                          }}
                        />
                      }
                      onClickPreview={{
                        onClick: (e) => {
                          preview();
                          setAnchorEl(e.currentTarget);
                        },
                      }}
                      isPreviewVisible={router.query.template_tab === 'email'}
                      textTipsMessage={undefined}
                      editEmailDescription={
                        emailTemplateCopy[selectedTemplate?.type]?.description
                      }
                      isSaveChangesButtonVisible={false}
                      textEmailName={
                        emailTemplateCopy[selectedTemplate?.type]?.heading
                      }
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
                            senderNameChange={senderNameChange}
                            emailBodyChange={emailBodyChange}
                            emailSubjectChange={emailSubjectChange}
                            selectedTemplate={selectedTemplate}
                            showSender={
                              router.query.template_tab !== 'slack' &&
                              router.query.template_tab !== 'calender'
                            }
                            showSubject={
                              router.query.template_tab !== 'slack' &&
                              router.query.template_tab !== 'calender'
                            }
                            overrideBodyLabel={
                              router.query.template_tab === 'slack'
                                ? 'Slack Message'
                                : 'Slack m'
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

const fetchEmailTemplates = async (recruiter_id) => {
  const templates = supabaseWrap(
    await supabase
      .from('company_email_template')
      .select()
      .eq('recruiter_id', recruiter_id),
  );
  return templates;
};

const SortCurrentTabTemps = (
  templates: DatabaseTableInsert['company_email_template'][],
) => {
  const curr_tab_temps = templates
    .filter((temp) => emailTemplateCopy[temp.type]?.heading)
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

  return curr_tab_temps;
};
