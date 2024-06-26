/* eslint-disable security/detect-object-injection */
import { DatabaseEnums, DatabaseTableInsert } from '@aglint/shared-types';
import {
  Box,
  MenuItem,
  Popover,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { EditEmail } from '@/devlink/EditEmail';
import { EmailTemplateCards } from '@/devlink/EmailTemplateCards';
import { EmailTemplatesStart } from '@/devlink/EmailTemplatesStart';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import { PreviewEmail } from '@/devlink2/PreviewEmail';
import TipTapAIEditor from '@/src/components/Common/TipTapAIEditor';
import UITypography from '@/src/components/Common/UITypography';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { emailTemplateCopy } from '@/src/types/companyEmailTypes';
import { YTransform } from '@/src/utils/framer-motions/Animation';
import toast from '@/src/utils/toast';

import { upateEmailTemplate } from './utils';

function SchedulerEmailTemps() {
  const { emailTemplates } = useAuthDetails();
  const [emailTemplate, setEmailTemplate] =
    useState<DatabaseTableInsert['company_email_template'][]>(null);
  const [tiptapLoader, setTipTapLoder] = useState(false);
  const [selectedTemplate, setSelectedTemplate] =
    useState<DatabaseTableInsert['company_email_template']>(null);
  const [isEditorLoad, setIsEditorLoad] = useState(true);
  const [saving, setSaving] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
    setHtml(null);
  };
  const [isHtml, setHtml] = useState(null);
  const [popOverLoading, setPopOverLoading] = useState(false);

  useEffect(() => {
    if (emailTemplates.data) {
      setEmailTemplate([...emailTemplates.data]);
      setSelectedTemplate(emailTemplates.data[11]);
    }

    setTimeout(() => {
      setIsEditorLoad(false);
    }, 500);
  }, [emailTemplates]);

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
    await emailTemplates.refetch();
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
  const options = [
    '{{recruiterName}}',
    '{{companyName}}',
    '{{interviewerFirstName}}',
  ];

  return (
    <Stack>
      <Box
        sx={
          {
            // border: '1px solid var(--neutral-6)',
            // borderRadius: 'var(--radius-4)',
          }
        }
      >
        {emailTemplate && (
          <EmailTemplatesStart
            slotEmailTemplateCards={emailTemplate
              ?.filter((emailPath) => emailTempKeys.includes(emailPath.type))
              .filter(
                (v, i, a) => a.findIndex((v2) => v2.type === v.type) === i,
              )
              .sort((a, b) => a.type.localeCompare(b.type))
              .map((emailPath) => (
                <EmailTemplateCards
                  key={emailPath.id}
                  isActive={selectedTemplate.type === emailPath.type}
                  textDescription={emailTemplateCopy[emailPath.type]?.trigger}
                  textTitle={emailTemplateCopy[emailPath.type]?.listing}
                  onClickApplicationRecieved={{
                    onClick: () => {
                      setTipTapLoder(true);
                      setSelectedTemplate(emailPath);
                      setTimeout(() => {
                        setTipTapLoder(false);
                      }, 500);
                    },
                  }}
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
                      isPreviewVisible={
                        selectedTemplate.type == emailTempKeys[0] ? false : true
                      }
                      textTipsMessage={
                        emailTemplateCopy[selectedTemplate?.type]
                          ?.dynamicContent
                      }
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
                          <Stack spacing={'var(--space-5)'}>
                            <Stack spacing={1}>
                              <UITypography type='small' fontBold='normal'>
                                Sender Name
                              </UITypography>
                              <Stack>
                                {`This name appears as the "From" name in emails to
                            candidates. Choose a representative name for your
                            company or recruiter.
                            `}
                              </Stack>
                              <Select
                                defaultValue={selectedTemplate?.from_name}
                                onChange={(e) => {
                                  setSelectedTemplate((pre) => {
                                    pre.from_name = e.target.value;
                                    return { ...pre };
                                  });
                                }}
                                sx={{
                                  '& .MuiOutlinedInput-notchedOutline': {
                                    border: '1px solid #DAD9D6',
                                  },
                                  '&:hover .MuiOutlinedInput-notchedOutline': {
                                    border: '1px solid #DAD9D6',
                                  },
                                  '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                      border: '1px solid #DAD9D6',
                                    },
                                }}
                              >
                                {options.length === 0 ? (
                                  <Stack
                                    px={1}
                                    style={{
                                      fontStyle: 'italic',
                                      color: 'var(--neutral-9)',
                                      cursor: 'default',
                                    }}
                                  >
                                    No options available
                                  </Stack>
                                ) : (
                                  options.map((value, idx) => (
                                    <MenuItem
                                      key={idx}
                                      value={value}
                                      sx={{
                                        backgroundColor: '#f7f7f7', // normal state background color
                                        '&:hover': {
                                          backgroundColor: '#ededed', // hover state background color
                                        },
                                        '&.Mui-selected': {
                                          backgroundColor: '#e3e3e3', // selected state background color
                                          '&:hover': {
                                            backgroundColor: '#d6d6d6', // maintain selected state color on hover
                                          },
                                        },
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          backgroundColor: '#f7ebfc',
                                          paddingLeft: '3px',
                                          paddingRight: '3px',
                                          paddingBottom: '3px',
                                          color: '#B552E2',
                                          borderRadius: '2px',
                                          width: 'fit-content',
                                        }}
                                      >
                                        {value}
                                      </Typography>
                                    </MenuItem>
                                  ))
                                )}
                              </Select>
                            </Stack>

                            <Stack>
                              <UITypography type='small' fontBold='normal'>
                                Email Subject
                              </UITypography>
                              <Stack
                                sx={{
                                  mt: '8px',
                                  border: '1px solid',
                                  borderColor: 'var(--neutral-6)',
                                  borderRadius: 'var(--radius-2)',
                                }}
                              >
                                <TipTapAIEditor
                                  enablAI={false}
                                  toolbar={false}
                                  placeholder={
                                    emailTemplateCopy[selectedTemplate?.type]
                                      ?.subjectPlaceHolder
                                  }
                                  singleLine={true}
                                  padding={1}
                                  editor_type='email'
                                  template_type={selectedTemplate.type}
                                  handleChange={(html) => {
                                    const text = html;
                                    setSelectedTemplate((pre) => {
                                      pre.subject = text;
                                      return { ...pre };
                                    });
                                  }}
                                  initialValue={selectedTemplate?.subject}
                                />
                              </Stack>
                            </Stack>

                            <Stack>
                              <UITypography type='small' fontBold='normal'>
                                Email Body
                              </UITypography>
                              <Stack
                                sx={{
                                  mt: '8px',
                                  border: '1px solid',
                                  borderColor: 'var(--neutral-6)',
                                  borderRadius: 'var(--radius-2)',
                                }}
                              >
                                <TipTapAIEditor
                                  enablAI={false}
                                  placeholder={''}
                                  maxHeight='250px'
                                  height='360px'
                                  editor_type='email'
                                  template_type={selectedTemplate.type}
                                  handleChange={(html) => {
                                    const text = html;
                                    setSelectedTemplate((pre) => {
                                      pre.body = text;
                                      return { ...pre };
                                    });
                                  }}
                                  initialValue={selectedTemplate.body}
                                />
                              </Stack>
                            </Stack>
                          </Stack>
                        )
                      }
                    />
                    <Popover
                      id='popover-agent'
                      open={open}
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{ vertical: -6, horizontal: 0 }}
                      onClose={handleClose}
                    >
                      <PreviewEmail
                        slotContent={
                          popOverLoading ? (
                            <Stack
                              alignItems={'center'}
                              height={'400px'}
                              justifyContent={'center'}
                            >
                              <LoaderSvg />
                            </Stack>
                          ) : (
                            <iframe
                              width={'790px'}
                              height={'490px'}
                              color='white'
                              srcDoc={isHtml}
                              title='Previw Email'
                            />
                          )
                        }
                        onClickClose={{
                          onClick: () => {
                            setAnchorEl(null);
                            setHtml(null);
                          },
                        }}
                      />
                    </Popover>
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

export const emailTempKeys: DatabaseEnums['email_slack_types'][] = [
  'agent_email_candidate',
  'confInterview_email_organizer',
  'confirmInterview_email_applicant',
  'debrief_email_interviewer',
  'interReschedReq_email_recruiter',
  'interviewCancel_email_applicant',
  'InterviewCancelReq_email_recruiter',
  'interviewReschedule_email_applicant',
  'interviewStart_email_applicant',
  'interviewStart_email_interviewers',
  'selfScheduleReminder_email_applicant',
  'sendAvailabilityRequest_email_applicant',
  'sendAvailReqReminder_email_applicant',
  'sendSelfScheduleRequest_email_applicant',
  'availabilityReqResend_email_candidate',
];
