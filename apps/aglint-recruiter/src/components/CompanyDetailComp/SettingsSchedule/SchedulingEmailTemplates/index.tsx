/* eslint-disable security/detect-object-injection */
import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { Box, Popover, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import { Checkbox } from '@/devlink/Checkbox';
import { EditEmail } from '@/devlink/EditEmail';
import { EmailTemplateCards } from '@/devlink/EmailTemplateCards';
import { EmailTemplatesStart } from '@/devlink/EmailTemplatesStart';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import { ButtonFilter } from '@/devlink2/ButtonFilter';
import { FilterDropdown } from '@/devlink2/FilterDropdown';
import EmailPreviewPopover from '@/src/components/Common/EmailTemplateEditor/EmailPreviewPopover';
import EmailTemplateEditForm from '@/src/components/Common/EmailTemplateEditor/EmailTemplateEditForm';
import SearchField from '@/src/components/Common/SearchField/SearchField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useKeyPress } from '@/src/hooks/useKeyPress';
import { emailTemplateCopy } from '@/src/types/companyEmailTypes';
import { YTransform } from '@/src/utils/framer-motions/Animation';
import { supabase } from '@/src/utils/supabase/client';
import { capitalizeAll } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import {
  fetchEmailTemplates,
  filterEmailByTemplateTab,
  SortCurrentTabTemps,
  tempFilterOptions,
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

  const temp_tab = router.query.tab as any;
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

  const { pressed: up } = useKeyPress('ArrowUp');
  const { pressed: down } = useKeyPress('ArrowDown');

  useEffect(() => {
    if (up && !isFocus) handleup();
    else if (down && !isFocus) handleDown();
  }, [up, down]);

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

  const [filter, setFilter] = useState<string[]>([]);

  useEffect(() => {
    if (currentTabQueryTemplates().length > 0) {
      setEmailRoute(currentTabQueryTemplates()[0]?.type);
    }
  }, [isEditorLoad]);

  //dropdown filter logic
  const [anchorElFilter, setAnchorElFilter] =
    React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElFilter(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElFilter(null);
  };

  const open = Boolean(anchorElFilter);

  const filterOptions = Object.keys(tempFilterOptions[temp_tab]);

  const filteredEnum = Object.keys(tempFilterOptions[temp_tab])
    .filter((key) => filter.includes(key))
    .reduce((arr, key) => {
      return arr.concat(tempFilterOptions[temp_tab][key]);
    }, []);

  const Options = () => {
    return filterOptions.map((opt, i) => {
      return (
        <Stack
          direction={'row'}
          sx={{
            alignItems: 'center',

            ': hover': { background: 'var(--neutral-2)' },
          }}
          spacing={1}
          padding={'var(--space-2) var(--space-3)'}
          key={i}
          onClick={() => {
            setFilter((pre) => {
              if (filter.includes(opt)) {
                return pre.filter((p) => p !== opt);
              } else {
                return [...pre, opt];
              }
            });
          }}
        >
          <Checkbox
            key={`${'scheduleType'}-checkbox`}
            isChecked={filter.includes(opt)}
            onClickCheck={{
              onClick: () => {},
            }}
          />
          <Typography
            key={`${opt}-label`}
            sx={{
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            {capitalizeAll(opt)}
          </Typography>
        </Stack>
      );
    });
  };

  return (
    <Stack>
      <Box>
        {!isEditorLoad && templates.length > 0 && (
          <EmailTemplatesStart
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
                <ButtonFilter
                  textLabel='Type'
                  isActive={!anchorElFilter}
                  isDotVisible={filter.length > 0}
                  onClickStatus={{
                    onClick: handleClick,
                  }}
                  slotRightIcon={
                    <Stack>
                      <GlobalIcon
                        iconName={
                          anchorElFilter
                            ? 'keyboard_arrow_up'
                            : 'keyboard_arrow_down'
                        }
                      />
                    </Stack>
                  }
                />
                <Popover
                  open={open}
                  anchorEl={anchorElFilter}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{ vertical: -10, horizontal: 0 }}
                  sx={{
                    '& .MuiPopover-paper': {
                      borderRadius: 'var(--radius-4)',
                      borderColor: 'var(--neutral-6)',
                      minWidth: '176px',
                    },
                  }}
                >
                  <FilterDropdown
                    isRemoveVisible={false}
                    slotOption={<Options />}
                    onClickReset={{
                      onClick: () => {
                        setFilter([]);
                      },
                    }}
                  />
                </Popover>
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
                  .filter((email) =>
                    filteredEnum.length > 0
                      ? filteredEnum.includes(email.type)
                      : true,
                  )
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
                      isPreviewVisible={router.query.tab === 'emailTemplate'}
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
