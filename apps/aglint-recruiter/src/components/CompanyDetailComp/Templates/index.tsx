/* eslint-disable security/detect-object-injection */
import { type DatabaseEnums, type DatabaseTable } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { useToast } from '@components/hooks/use-toast';
import axios from 'axios';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import EmailPreviewPopover from '@/components/Common/EmailTemplateEditor/EmailPreviewPopover';
import EmailTemplateEditForm from '@/components/Common/EmailTemplateEditor/EmailTemplateEditForm';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { useKeyPress } from '@/hooks/useKeyPress';
import { emailTemplateCopy } from '@/types/companyEmailTypes';
import { supabase } from '@/utils/supabase/client';
import { capitalizeAll } from '@/utils/text/textUtils';

import {
  fetchEmailTemplates,
  filterEmailByTemplateTab,
  SortCurrentTabTemps,
  tempFilterOptions,
  template_tabs,
} from './utils';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Skeleton } from '@components/ui/skeleton';
import Link from 'next/link';

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
  const { toast } = useToast();

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
        toast({
          variant: 'destructive',
          title: 'Something went wrong',
        });
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
      toast({
        variant: 'destructive',
        title: 'Something went wrong!',
      });
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

  const filterOptions = Object.keys(tempFilterOptions[temp_tab]);

  const filteredEnum = Object.keys(tempFilterOptions[temp_tab])
    .filter((key) => filter.includes(key))
    .reduce((arr, key) => {
      return arr.concat(tempFilterOptions[temp_tab][key]);
    }, []);

  return (
    <div className='flex flex-col h-screen'>
      <div className='p-4'>
        {isEditorLoad ? (
          <div className='flex items-center justify-center h-[calc(100vh-48px)]'>
            <div className='space-y-2'>
              <Skeleton className='h-4 w-[250px]' />
              <Skeleton className='h-4 w-[200px]' />
              <Skeleton className='h-4 w-[150px]' />
            </div>
          </div>
        ) : (
          templates.length > 0 && (
            <div className='space-y-4'>
              {/* Search and Filter */}
              <div className='flex space-x-2'>
                <Input
                  className='w-64'
                  placeholder='Search Templates'
                  value={searchQry}
                  onChange={(e) => setSearchQry(e.target.value)}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='outline' className='flex items-center'>
                      Type
                      {filter.length > 0 && (
                        <span className='ml-2 h-2 w-2 rounded-full bg-blue-500' />
                      )}
                      {/* {anchorElFilter ? (
                        <ChevronUpIcon size={12} />
                      ) : (
                        <ChevronDownIcon size={12} />
                      )} */}
                    </Button>
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

              {/* Main content */}
              <div className='flex space-x-4'>
                {/* Email Template List */}
                <div className='w-1/3 pr-6'>
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
                    .sort((a, b) =>
                      emailTemplateCopy[a.type].heading.localeCompare(
                        emailTemplateCopy[b.type].heading,
                      ),
                    )
                    .map((emailPath) => (
                      <Link
                        key={emailPath.id}
                        href={{
                          pathname: router.pathname,
                          query: { ...router.query, email: emailPath.type },
                        }}
                        passHref
                      >
                        <Button
                          variant={
                            emailPath.type === temp_email
                              ? 'default'
                              : 'outline'
                          }
                          className='h-16 w-full my-1 justify-start text-left'
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
                            <div className='font-semibold'>
                              {emailTemplateCopy[emailPath.type]?.heading}
                            </div>
                            <div className='text-sm text-gray-500 line-clamp-2'>
                              {emailTemplateCopy[emailPath.type].description}
                            </div>
                          </div>
                        </Button>
                      </Link>
                    ))}
                </div>

                {/* Email Template Details */}
                <div className='w-2/3'>
                  {isEditorLoad ? (
                    <div className='flex items-center justify-center h-[calc(100vh-200px)] bg-neutral-100'>
                      <div className='space-y-2'>
                        <Skeleton className='h-4 w-[250px]' />
                        <Skeleton className='h-4 w-[200px]' />
                        <Skeleton className='h-4 w-[150px]' />
                      </div>
                    </div>
                  ) : (
                    <div className='space-y-4'>
                      <div className='flex justify-between items-center'>
                        <h2 className='text-md font-bold'>
                          {emailTemplateCopy[temp_email].heading}
                        </h2>
                        <Button
                          size='sm'
                          onClick={(e) => {
                            preview();
                            setAnchorEl(e.currentTarget);
                          }}
                        >
                          Preview
                        </Button>
                      </div>
                      <p className='text-gray-600'>
                        {emailTemplateCopy[temp_email].description}
                      </p>
                      {tiptapLoader ? (
                        <div className='flex items-center justify-center h-[calc(100vh-300px)]'>
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
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <EmailPreviewPopover
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        setHtml={setHtml}
        isHtml={isHtml}
        Loading={popOverLoading}
      />
    </div>
  );
}

export default SchedulerEmailTemps;
