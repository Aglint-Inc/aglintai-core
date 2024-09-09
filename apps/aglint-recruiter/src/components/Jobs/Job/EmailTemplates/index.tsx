/* eslint-disable security/detect-object-injection */
import { type DatabaseEnums, type DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import { EditEmail } from '@devlink/EditEmail';
import { EmailTemplateCards } from '@devlink/EmailTemplateCards';
import { EmailTemplatesStart } from '@devlink/EmailTemplatesStart';
import { PageLayout } from '@devlink2/PageLayout';
import { Stack } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import EmailPreviewPopover from '@/components/Common/EmailTemplateEditor/EmailPreviewPopover';
import EmailTemplateEditForm from '@/components/Common/EmailTemplateEditor/EmailTemplateEditForm';
import Loader from '@/components/Common/Loader';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useJob } from '@/context/JobContext';
import { emailTemplateCopy } from '@/types/companyEmailTypes';
import ROUTES from '@/utils/routing/routes';
import { supabase } from '@/utils/supabase/client';
import { capitalize } from '@/utils/text/textUtils';
import toast from '@/utils/toast';

import { Settings } from '../Common/SharedTopNav/actions';

const templates_order: DatabaseEnums['email_slack_types'][] = [
  'applicationRecieved_email_applicant',
  'applicantReject_email_applicant',
];
const JobEmailTemplatesDashboard = () => {
  const [, setSaving] = useState<'saving' | 'saved'>('saved');
  const { isFetching } = useCurrJobTemps({ setSaving });

  return (
    <Stack height={'100%'} width={'100%'}>
      {isFetching ? (
        <Loader />
      ) : (
        <PageLayout
          slotTopbarLeft={<JobEmailTemplatesDashboardBreadCrumbs />}
          slotTopbarRight={<Settings />}
          slotSaving={<></>}
          slotBody={<JobEmailTemplates setSaving={setSaving} />}
        />
      )}
    </Stack>
  );
};

export default JobEmailTemplatesDashboard;

const JobEmailTemplatesDashboardBreadCrumbs = () => {
  const { push } = useRouter();
  const { job } = useJob();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href='#' onClick={() => push(ROUTES['/jobs']())}>
            Jobs
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href='#' onClick={() => push(`/jobs/${job?.id}`)}>
            {capitalize(job?.job_title ?? 'Job')}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Email Templates</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

const JobEmailTemplates = ({ setSaving }) => {
  const { job } = useJob();
  const { recruiter_id } = useAuthDetails();
  const {
    editTemp,
    isloadTiptap,
    selectedTemp,
    handleChangeSelectedTemplate,
    handleUpdateTemp,
  } = useCurrJobTemps({ setSaving });

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isHtml, setHtml] = useState(null);
  const [popOverLoading, setPopOverLoading] = useState(false);

  const preview = async () => {
    setPopOverLoading(true);
    try {
      const { data } = await axios.post(`/api/emails/preview`, {
        mail_type: editTemp.type,
        job_id: job?.id,
        recruiter_id: recruiter_id,
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
    handleUpdateTemp({ ...editTemp, from_name: e.target.value });
  };
  const emailSubjectChange = (html) => {
    const text = html;
    handleUpdateTemp({ ...editTemp, subject: text });
  };
  const emailBodyChange = (s) => {
    handleUpdateTemp({ ...editTemp, body: s });
  };

  return (
    <EmailTemplatesStart
      isSearchFilterVisible={false}
      showTabs={false}
      // isSearchFilterVisible={false}// build is failing
      isWarningVisible={true}
      slotEmailTemplateCards={
        <>
          <Sections
            selectedTemp={selectedTemp}
            handleChangeSelectedTemplate={handleChangeSelectedTemplate}
          />
        </>
      }
      slotSearchFilter={<></>}
      currentModule={'jobs'}
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
              slotForm={
                <>
                  <EmailTemplateEditForm
                    senderNameChange={senderNameChange}
                    emailSubjectChange={emailSubjectChange}
                    emailBodyChange={emailBodyChange}
                    selectedTemplate={editTemp}
                    isJobTemplate={true}
                  />
                  <EmailPreviewPopover
                    anchorEl={anchorEl}
                    setAnchorEl={setAnchorEl}
                    setHtml={setHtml}
                    isHtml={isHtml}
                    Loading={popOverLoading}
                  />
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

export function useCurrJobTemps({ setSaving }) {
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
    debouncedUpdateEmail(updated_val);
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

  const debouncedUpdateEmail = useCallback(debounce(updateEmailToDB, 300), []);
  async function updateEmailToDB(updated_val) {
    try {
      setSaving('saving');
      await mutateAsync(updated_val);
      setSaving('saved');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      toast.error('Something went wrong!');
    }
  }

  return {
    selectedTemp,
    isFetching,
    isloadTiptap,
    editTemp,
    handleUpdateTemp,
    handleChangeSelectedTemplate,
    isUpdatingDb,
    isUpdatingFailed,
  };
}
