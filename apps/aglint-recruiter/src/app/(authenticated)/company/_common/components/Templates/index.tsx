/* eslint-disable security/detect-object-injection */
import { type DatabaseEnums, type DatabaseTable } from '@aglint/shared-types';
import AutoSave from '@components/auto-save';
import { useToast } from '@components/hooks/use-toast';
import {
  Section,
  SectionActions,
  SectionDescription,
  SectionHeader,
  SectionHeaderText,
  SectionTitle,
} from '@components/layouts/sections-header';
import { Button } from '@components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Input } from '@components/ui/input';
import { ScrollArea } from '@components/ui/scroll-area';
import { Separator } from '@components/ui/separator';
import { Skeleton } from '@components/ui/skeleton';
import axios from 'axios';
import { debounce } from 'lodash';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

import EmailPreviewPopover from '@/common/EmailTemplateEditor/EmailPreviewPopover';
import EmailTemplateEditForm from '@/common/EmailTemplateEditor/EmailTemplateEditForm';
import { UIButton } from '@/common/UIButton';
import { useTenant } from '@/company/hooks';
import { useKeyPress } from '@/hooks/useKeyPress';
import { useRouterPro } from '@/hooks/useRouterPro';
import { type Read } from '@/routers/tenant/templates/read';
import { type ProcedureQuery } from '@/server/api/trpc';
import { api } from '@/trpc/client';
import { emailTemplateCopy } from '@/types/companyEmailTypes';
import { capitalizeAll } from '@/utils/text/textUtils';

import {
  filterEmailByTemplateTab,
  SortCurrentTabTemps,
  tempFilterOptions,
  type TEMPLATE_TABS,
  template_tabs,
} from './utils';
type EmailTemplate = DatabaseTable['company_email_template'] & {
  type: keyof typeof emailTemplateCopy;
};
function SchedulerEmailTemps() {
  const { recruiter_id } = useTenant();
  const { data: fetchedTemps, status } = useCompanyTemplates();
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [tiptapLoader, setTipTapLoder] = useState(false);
  const { mutateAsync } = api.tenant.templates.update.useMutation();
  const [isEditorLoad, setIsEditorLoad] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  const [searchQry, setSearchQry] = useState('');
  const router = useRouterPro();
  const { toast } = useToast();

  const [isHtml, setHtml] = useState<string | null>(null);
  const [popOverLoading, setPopOverLoading] = useState(false);

  const [isFocus, setIsFocus] = useState(false);

  const [saving, setSaving] = useState(false);
  const [show, setShow] = useState(false);

  const temp_tab = router.queryParams.tab as keyof typeof tempFilterOptions;
  const temp_email = router.queryParams
    .email as DatabaseEnums['email_slack_types'];

  useEffect(() => {
    if (status === 'success') {
      let template_tab = template_tabs[0].key;
      if (!template_tabs.find((t) => t.key === temp_tab)) {
        template_tab = template_tabs[0].key;
      }
      const temps = fetchedTemps;
      if (!temps || !router.isReady) return;

      const curr_tab_temps = SortCurrentTabTemps(temps as EmailTemplate[]);

      const current_filtered_temp = curr_tab_temps.filter((t) =>
        filterEmailByTemplateTab(template_tab, t.type),
      );

      if (!current_filtered_temp.find((e) => e.type === temp_email)) {
        setEmailRoute(current_filtered_temp[0].type);
      }

      setTemplates([...curr_tab_temps]);

      setTimeout(() => {
        setTipTapLoder(false);
        setIsEditorLoad(false);
      }, 500);
    }
  }, [fetchedTemps, status]);
  useEffect(() => {
    if (!template_tabs.find((t) => t.key === temp_tab)) {
      setTabRoute(template_tabs[0].key);
    }
  }, [router.isReady, router.queryParams]);

  async function updateEmailToDB(
    updated_template: DatabaseTable['company_email_template'],
  ) {
    try {
      setSaving(true);
      await mutateAsync({
        template_id: updated_template.id,
        updated_template: {
          ...updated_template,
        },
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
      });
    } finally {
      setSaving(false);
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
      toast({
        variant: 'destructive',
        title: `Error fetching preview: ${error}`,
      });
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

  function setEmailRoute(temp: DatabaseEnums['email_slack_types']) {
    const currentUrl = new URL(window.location.href); // Get the current URL
    currentUrl.searchParams.set('email', temp); // Set or update the `email` query param

    router.push(currentUrl.toString());
  }
  function setTabRoute(tab: TEMPLATE_TABS) {
    const currentUrl = new URL(window.location.href); // Get the current URL
    currentUrl.searchParams.set('template_tab', tab); // Set or update the `email` query param
    router.push(currentUrl.toString());
  }

  const currentTabQueryTemplates = () => {
    return templates
      .filter((emailPath) => {
        const flag = filterEmailByTemplateTab(temp_tab as any, emailPath.type);
        const email_copy = emailTemplateCopy[emailPath.type];
        if (flag && email_copy && email_copy.heading && searchQry.length > 0) {
          return (
            flag &&
            email_copy.heading
              .toLocaleLowerCase()
              .includes(searchQry.toLocaleLowerCase())
          );
        }
        return flag;
      })
      .sort((a, b) => {
        const emailCopy1 = emailTemplateCopy[a.type];
        const emailCopy2 = emailTemplateCopy[b.type];
        if (!emailCopy1 || !emailCopy2) return 0;
        if (!emailCopy1.heading || !emailCopy2.heading) return 0;
        if (emailCopy1.heading > emailCopy2.heading) return 1;
        if (emailCopy2.heading > emailCopy1.heading) return -1;
        return 0;
      });
  };

  const [filter, setFilter] = useState<string[]>([]);

  // useEffect(() => {
  //   if (currentTabQueryTemplates().length > 0) {
  //     setEmailRoute(currentTabQueryTemplates()[0]?.type);
  //   }
  // }, [isEditorLoad]);

  const filterOptions = Object.keys(tempFilterOptions[temp_tab]);

  const filteredEnum = Object.keys(tempFilterOptions[temp_tab])
    .filter((key) => filter.includes(key))
    .reduce((arr: any, key: any) => {
      //@ts-ignore TODO: fix this
      return [...arr, ...tempFilterOptions[temp_tab][key]];
    }, []);

  useEffect(() => {
    if (saving) setShow(true);
    const timeout = setTimeout(() => (!saving ? setShow(false) : null), 1000);
    return () => clearTimeout(timeout);
  }, [saving]);

  return (
    <div className='flex flex-row'>
      <AutoSave show={show} saving={saving} />
      {isEditorLoad ? (
        <div className='space-y-2'>
          <Skeleton className='h-4 w-[250px]' />
          <Skeleton className='h-4 w-[200px]' />
          <Skeleton className='h-4 w-[150px]' />
        </div>
      ) : (
        templates.length > 0 && (
          <div className='flex flex-row'>
            <Section>
              <SectionHeader>
                <SectionHeaderText>
                  <SectionTitle>Communication Templates</SectionTitle>
                  <SectionDescription>
                    All communication templates used in the system.
                  </SectionDescription>
                </SectionHeaderText>
              </SectionHeader>
              <div className='flex gap-2'>
                <Input
                  className='h-9 w-64'
                  placeholder='Search templates'
                  value={searchQry}
                  onChange={(e) => setSearchQry(e.target.value)}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <UIButton variant='outline' className='flex items-center'>
                      Type
                      {filter.length > 0 && (
                        <span className='ml-2 h-2 w-2 rounded-full bg-blue-500' />
                      )}
                      {/* {anchorElFilter ? (
                          <ChevronUpIcon size={12} />
                        ) : (
                          <ChevronDownIcon size={12} />
                        )} */}
                    </UIButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {filterOptions.map((opt, i) => (
                      <DropdownMenuCheckboxItem
                        key={i}
                        checked={filter.includes(opt)}
                        onCheckedChange={() => {
                          setFilter((pre) =>
                            filter.includes(opt)
                              ? pre.filter((p) => p !== opt)
                              : [...pre, opt],
                          );
                        }}
                      >
                        {capitalizeAll(opt)}
                      </DropdownMenuCheckboxItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onSelect={() => setFilter([])}>
                      Reset
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className='w-[350px] py-2'>
                <ScrollArea className='h-[calc(100vh-180px)]'>
                  {templates
                    .filter((emailPath) => {
                      const type =
                        emailPath.type as keyof typeof emailTemplateCopy;
                      const flag = filterEmailByTemplateTab(
                        temp_tab as any,
                        type,
                      );
                      if (flag && searchQry.length > 0) {
                        const emailCopy = emailTemplateCopy[type];
                        return (
                          emailCopy &&
                          emailCopy.heading
                            .toLowerCase()
                            .includes(searchQry.toLowerCase())
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
                      const emailCopy1 = emailTemplateCopy[a.type];
                      const emailCopy2 = emailTemplateCopy[b.type];
                      if (!emailCopy1 || !emailCopy2) return 0;
                      if (!emailCopy1.heading || !emailCopy2.heading) return 0;
                      if (emailCopy1.heading > emailCopy2.heading) return 1;
                      if (emailCopy2.heading > emailCopy1.heading) return -1;
                      return 0;
                    })
                    .map((emailPath) => {
                      const emailCopy = emailTemplateCopy[emailPath.type];
                      if (
                        !emailCopy ||
                        !emailCopy.description ||
                        !emailCopy.heading
                      )
                        return null;

                      return (
                        <Link
                          key={emailPath.id}
                          href={{
                            pathname: router.pathName,
                            query: {
                              ...router.queryParams,
                              email: emailPath.type,
                            },
                          }}
                          passHref
                        >
                          <Button
                            variant={
                              emailPath.type === temp_email
                                ? 'default'
                                : 'outline'
                            }
                            className={`my-1 h-16 w-[330px] justify-start text-left ${emailPath.type === temp_email ? 'border bg-gray-100 text-foreground hover:bg-gray-50' : 'bg-white text-foreground hover:bg-gray-50'}`}
                            onClick={() => {
                              if (temp_email !== emailPath.type) {
                                setTipTapLoder(true);
                                setTimeout(() => {
                                  setTipTapLoder(false);
                                }, 500);
                              }
                            }}
                          >
                            <div className='w-full'>
                              <div
                                className={`line-clamp-2 font-medium ${emailPath.type === temp_email ? 'text-foreground' : 'text-foreground'}`}
                              >
                                {emailCopy && emailCopy.heading}
                              </div>
                              <div
                                className={`line-clamp-2 text-sm ${emailPath.type === temp_email ? 'text-muted-foreground' : 'text-muted-foreground'}`}
                              >
                                {emailCopy &&
                                  emailCopy.description &&
                                  emailCopy.description}
                              </div>
                            </div>
                          </Button>
                        </Link>
                      );
                    })}
                </ScrollArea>
              </div>
            </Section>
            <Separator orientation='vertical' className='h-full' />
            {isEditorLoad ? (
              <div className='space-y-2'>
                <Skeleton className='h-4 w-[250px]' />
                <Skeleton className='h-4 w-[200px]' />
                <Skeleton className='h-4 w-[150px]' />
              </div>
            ) : (
              <Section className='pl-4'>
                <SectionHeader>
                  <SectionHeaderText>
                    <SectionTitle>
                      {emailTemplateCopy[temp_email] &&
                        emailTemplateCopy[temp_email].heading &&
                        emailTemplateCopy[temp_email].heading}
                    </SectionTitle>
                    <SectionDescription>
                      {emailTemplateCopy[temp_email] &&
                        emailTemplateCopy[temp_email].heading &&
                        emailTemplateCopy[temp_email].description}
                    </SectionDescription>
                  </SectionHeaderText>
                  <SectionActions>
                    <Button
                      size='sm'
                      onClick={(e) => {
                        preview();
                        setAnchorEl(e.currentTarget);
                      }}
                    >
                      Preview
                    </Button>
                  </SectionActions>
                </SectionHeader>

                {tiptapLoader || !selectedTemplate ? (
                  <div className='flex h-[calc(100vh-300px)] items-center justify-center'>
                    <div className='space-y-2'>
                      <Skeleton className='h-4 w-[250px]' />
                      <Skeleton className='h-4 w-[200px]' />
                      <Skeleton className='h-4 w-[150px]' />
                    </div>
                  </div>
                ) : (
                  <EmailTemplateEditForm
                    onBlur={() => setIsFocus(false)}
                    onFocus={() => setIsFocus(true)}
                    senderNameChange={(value: string) => {
                      handleUpdateEmailTemp({
                        ...selectedTemplate,
                        from_name: value,
                      });
                    }}
                    emailBodyChange={(str: string) => {
                      handleUpdateEmailTemp({
                        ...selectedTemplate,
                        body: str,
                      });
                    }}
                    emailSubjectChange={(str: string) => {
                      handleUpdateEmailTemp({
                        ...selectedTemplate,
                        subject: str,
                      });
                    }}
                    selectedTemplate={{ ...selectedTemplate }}
                    showSender={
                      router.queryParams.template_tab !== 'slack' &&
                      router.queryParams.template_tab !== 'calender'
                    }
                    showSubject={
                      router.queryParams.template_tab !== 'slack' &&
                      router.queryParams.template_tab !== 'calender'
                    }
                  />
                )}
              </Section>
            )}
          </div>
        )
      )}
      {anchorEl && (
        <EmailPreviewPopover
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          setHtml={(html) => setHtml(html)}
          isHtml={isHtml}
          isLoading={popOverLoading}
        />
      )}
    </div>
  );
}

export default SchedulerEmailTemps;

const useCompanyTemplates = (): ProcedureQuery<Read> =>
  api.tenant.templates.read.useQuery();
