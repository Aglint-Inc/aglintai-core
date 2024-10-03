/* eslint-disable security/detect-object-injection */
import { type DatabaseEnums, type DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { Button } from '@components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@components/ui/dialog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { debounce } from 'lodash';
import { Loader2 } from 'lucide-react';
import {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useState,
} from 'react';

import { useTenant } from '@/company/hooks';
import EmailTemplateEditForm from '@/components/Common/EmailTemplateEditor/EmailTemplateEditForm';
import { Loader } from '@/components/Common/Loader';
import { useRouterPro } from '@/hooks/useRouterPro';
import { Settings } from '@/job/components/SharedTopNav/actions';
import { useJob } from '@/job/hooks';
import { emailTemplateCopy } from '@/types/companyEmailTypes';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

const templates_order: DatabaseEnums['email_slack_types'][] = [
  'applicationRecieved_email_applicant',
  'applicantReject_email_applicant',
];
export const JobEmailTemplatesDashboard = () => {
  const [, setSaving] = useState<'saving' | 'saved'>('saved');
  const { isFetching } = useCurrJobTemps({ setSaving });

  return (
    <div className='h-full w-full'>
      {isFetching ? (
        <Loader />
      ) : (
        <>
          <Settings />
          <JobEmailTemplates setSaving={setSaving} />
        </>
      )}
    </div>
  );
};

const JobEmailTemplates = ({
  setSaving,
}: {
  setSaving: Dispatch<SetStateAction<'saving' | 'saved'>>;
}) => {
  const { job } = useJob();
  const { recruiter_id } = useTenant();
  const {
    editTemp,
    isloadTiptap,
    selectedTemp,
    handleChangeSelectedTemplate,
    handleUpdateTemp,
  } = useCurrJobTemps({ setSaving });

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

  const senderNameChange = (e: any) => {
    handleUpdateTemp({ ...editTemp, from_name: e.target.value });
  };
  const emailSubjectChange = (html: any) => {
    const text = html;
    handleUpdateTemp({ ...editTemp, subject: text });
  };
  const emailBodyChange = (s: any) => {
    handleUpdateTemp({ ...editTemp, body: s });
  };
  const EmailPreviewContent = ({ isHtml, loading }: any) => {
    if (loading) {
      return <Loader2 className='h-8 w-8 animate-spin' />;
    }

    return <div dangerouslySetInnerHTML={{ __html: isHtml }} />;
  };

  return (
    <div className='w-full space-y-4'>
      {/* <Tabs defaultValue="templates" className="w-full">
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          {/* Add more tabs if needed */}
      {/* </TabsList>
        <TabsContent value="templates" className="space-y-4">  */}
      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <Sections
            selectedTemp={selectedTemp}
            handleChangeSelectedTemplate={handleChangeSelectedTemplate}
          />
        </CardContent>
      </Card>

      {isloadTiptap ? (
        <div className='flex justify-center'>
          <Loader2 className='h-8 w-8 animate-spin' />
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>
              {
                emailTemplateCopy[
                  editTemp.type as keyof typeof emailTemplateCopy
                ]!.heading
              }
            </CardTitle>
            <p className='text-sm text-muted-foreground'>
              {
                emailTemplateCopy[
                  editTemp.type as keyof typeof emailTemplateCopy
                ]!.description
              }
            </p>
          </CardHeader>
          <CardContent>
            <EmailTemplateEditForm
              senderNameChange={senderNameChange}
              emailSubjectChange={emailSubjectChange}
              emailBodyChange={emailBodyChange}
              selectedTemplate={editTemp}
              isJobTemplate={true}
            />
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={preview}>Preview</Button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <EmailPreviewContent isHtml={isHtml} loading={popOverLoading} />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}
      {/* </TabsContent> */}
      {/* // </Tabs> */}
    </div>
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
          <Card
            key={tempKey}
            className={`cursor-pointer ${selectedTemp === tempKey ? 'border-primary' : ''}`}
            onClick={() => handleChangeSelectedTemplate(tempKey)}
          >
            <CardHeader>
              <CardTitle>
                {
                  emailTemplateCopy[tempKey as keyof typeof emailTemplateCopy]!
                    .heading
                }
              </CardTitle>
              <CardDescription>
                {
                  emailTemplateCopy[tempKey as keyof typeof emailTemplateCopy]!
                    .description
                }
              </CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </>
  );
};

export function useCurrJobTemps({
  setSaving,
}: {
  setSaving: Dispatch<SetStateAction<'saving' | 'saved'>>;
}) {
  const router = useRouterPro();
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
          .eq('job_id', router.params.id),
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
          .eq('job_id', router.params.id)
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
    isFetched
      ? {
          ...(templates![
            templates_order[0]
          ] as DatabaseTable['job_email_template']),
        }
      : (null as unknown as DatabaseTable['job_email_template']),
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
    setEditTemp(() => ({
      ...(templates![type] as DatabaseTable['job_email_template']),
    }));
    setIsloadTiptap(true);
    setTimeout(() => {
      setIsloadTiptap(false);
    }, 300);
  };

  const debouncedUpdateEmail = useCallback(debounce(updateEmailToDB, 300), []);
  async function updateEmailToDB(updated_val: any) {
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
