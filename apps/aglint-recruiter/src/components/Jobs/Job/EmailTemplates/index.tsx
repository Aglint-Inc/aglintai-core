/* eslint-disable security/detect-object-injection */
import { DatabaseEnums, DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { Box, Popover, Stack } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { EditEmail } from '@/devlink/EditEmail';
import { EmailTemplateCards } from '@/devlink/EmailTemplateCards';
import { EmailTemplatesStart } from '@/devlink/EmailTemplatesStart';
import { LoaderSvg } from '@/devlink/LoaderSvg';
import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';
import { PreviewEmail } from '@/devlink2/PreviewEmail';
import Loader from '@/src/components/Common/Loader';
import { useCurrentJob } from '@/src/queries/job-assessment/keys';
import { emailTemplateCopy } from '@/src/types/companyEmailTypes';
import { supabase } from '@/src/utils/supabase/client';
import { capitalize } from '@/src/utils/text/textUtils';
import toast from '@/src/utils/toast';

import { JobEmailTemplateForms } from './form';
const templates_order: DatabaseEnums['email_slack_types'][] = [
  'applicationRecieved_email_applicant',
  'applicantReject_email_applicant',
];
const JobEmailTemplatesDashboard = () => {
  const { isFetching } = useCurrJobTemps();

  return (
    <Stack height={'100%'} width={'100%'}>
      {isFetching ? (
        <Loader />
      ) : (
        <PageLayout
          slotTopbarLeft={<JobEmailTemplatesDashboardBreadCrumbs />}
          slotTopbarRight={<></>}
          slotBody={
            <Box padding={'24px'} bgcolor={'var(--neutral-2)'}>
              <JobEmailTemplates />
            </Box>
          }
        />
      )}
    </Stack>
  );
};

export default JobEmailTemplatesDashboard;

const JobEmailTemplatesDashboardBreadCrumbs = () => {
  const { push } = useRouter();
  const { job } = useCurrentJob();
  return (
    <>
      <Breadcrum
        isLink
        textName={`${capitalize(job?.status ?? 'all')} jobs`}
        onClickLink={{
          onClick: () => {
            push(`/jobs?status=${job?.status ?? 'all'}`);
          },
          style: { cursor: 'pointer' },
        }}
      />
      <Breadcrum
        isLink
        textName={capitalize(job?.job_title ?? 'Job')}
        onClickLink={{
          onClick: () => {
            push(`/jobs/${job?.id}`);
          },
          style: { cursor: 'pointer' },
        }}
        showArrow
      />
      <Breadcrum textName={`Email Templates`} showArrow />
    </>
  );
};

const JobEmailTemplates = () => {
  const {
    editTemp,
    isloadTiptap,
    selectedTemp,
    handleChangeSelectedTemplate,
    handleUpdateTemp,
    isUpdatingDb,
    handleSubmit,
  } = useCurrJobTemps();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isHtml, setHtml] = useState(null);
  const [popOverLoading, setPopOverLoading] = useState(false);

  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
    setHtml(null);
  };

  const preview = async () => {
    setPopOverLoading(true);
    try {
      const { data } = await axios.post(`/api/emails/preview`, {
        mail_type: editTemp.type,
        body: editTemp.body,
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

  return (
    <EmailTemplatesStart
      isWarningVisible={true}
      slotEmailTemplateCards={
        <>
          <Sections
            selectedTemp={selectedTemp}
            handleChangeSelectedTemplate={handleChangeSelectedTemplate}
          />
        </>
      }
      slotEmailDetails={
        <>
          {isloadTiptap ? (
            <>
              <Loader />
            </>
          ) : (
            <EditEmail
              editEmailDescription={
                emailTemplateCopy[editTemp.type].description
              }
              textEmailName={emailTemplateCopy[editTemp.type].heading}
              onClickPreview={{
                onClick: (e) => {
                  preview();
                  setAnchorEl(e.currentTarget);
                },
              }}
              slotSaveButton={
                <ButtonSolid
                  size={2}
                  isLoading={isUpdatingDb}
                  textButton={'Save'}
                  onClickButton={{
                    onClick: () => {
                      handleSubmit();

                      toast.message('Saved Successfully!');
                    },
                  }}
                />
              }
              slotForm={
                <>
                  <JobEmailTemplateForms
                    // selection={selection}
                    // handleChange={handleChange}
                    handleChange={handleUpdateTemp}
                    editTemp={editTemp}
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
                </>
              }
              isSaveChangesButtonVisible={false}
            />
          )}
        </>
      }
    />
  );
};

const Sections = ({
  selectedTemp,
  handleChangeSelectedTemplate,
}: {
  selectedTemp: DatabaseEnums['email_slack_types'];
  handleChangeSelectedTemplate: (
    // eslint-disable-next-line no-unused-vars
    type: DatabaseEnums['email_slack_types'],
  ) => void;
}) => {
  return (
    <>
      {templates_order.map((tempKey) => {
        return (
          <EmailTemplateCards
            key={tempKey}
            textTitle={emailTemplateCopy[tempKey].heading}
            textDescription={emailTemplateCopy[tempKey].description}
            isActive={selectedTemp === tempKey}
            onClickApplicationRecieved={{
              onClick: () => {
                handleChangeSelectedTemplate(tempKey);
              },
            }}
          />
        );
      })}
    </>
  );
};

export function useCurrJobTemps() {
  const router = useRouter();
  const [selectedTemp, setSelectedTemp] = useState<
    DatabaseEnums['email_slack_types']
  >('applicationRecieved_email_applicant');
  const [isloadTiptap, setIsloadTiptap] = useState(false);
  const {
    data: templates,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: ['job_email_template'],
    queryFn: async () => {
      const tempRecords = supabaseWrap(
        await supabase
          .from('job_email_template')
          .select()
          .eq('job_id', router.query.id),
      );
      const templates: Partial<
        Record<
          DatabaseEnums['email_slack_types'],
          DatabaseTable['job_email_template']
        >
      > = {};

      tempRecords.forEach((temp) => {
        templates[temp.type] = { ...temp };
      });

      return templates;
    },
  });
  const queryClient = useQueryClient();

  const {
    mutateAsync,
    isPending: isUpdatingDb,
    isError: isUpdatingFailed,
  } = useMutation({
    mutationFn: async (updated_val: DatabaseTable['job_email_template']) => {
      const [updated_temp] = supabaseWrap(
        await supabase
          .from('job_email_template')
          .update({
            body: updated_val.body,
            from_name: updated_val.from_name,
            subject: updated_val.subject,
          })
          .eq('job_id', router.query.id)
          .eq('type', updated_val.type)
          .select(),
      );
      return updated_temp;
    },
    onSuccess: (updated_temp) => {
      const prevData = queryClient.getQueryData(['job_email_template']) as any;
      const updatedData = { ...prevData };
      updatedData[updated_temp.type] = {
        ...updated_temp,
      };
      queryClient.setQueryData(['job_email_template'], updatedData);
    },
  });
  const [editTemp, setEditTemp] = useState<DatabaseTable['job_email_template']>(
    isFetched && {
      ...templates[templates_order[0]],
    },
  );
  const handleUpdateTemp = (
    updated_val: DatabaseTable['job_email_template'],
  ) => {
    setEditTemp(() => ({ ...updated_val }));
  };

  const handleChangeSelectedTemplate = (
    type: DatabaseEnums['email_slack_types'],
  ) => {
    setSelectedTemp(type);
    setEditTemp(() => ({ ...templates[type] }));
    setIsloadTiptap(true);
    setTimeout(() => {
      setIsloadTiptap(false);
    }, 300);
  };

  const handleSubmit = async () => {
    mutateAsync(editTemp);
  };

  return {
    selectedTemp,
    isFetching,
    isloadTiptap,
    editTemp,
    handleUpdateTemp,
    handleChangeSelectedTemplate,
    handleSubmit,
    isUpdatingDb,
    isUpdatingFailed,
  };
}
