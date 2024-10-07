'use client';
import { useToast } from '@components/hooks/use-toast';
import axios from 'axios';
import capitalize from 'lodash/capitalize';
import Image from 'next/image';
import { useRef, useState } from 'react';

import type { useIntegrations } from '@/authenticated/hooks';
import PasswordFiled from '@/common/passwordField';
import { useTenant } from '@/company/hooks';
import { useRouterPro } from '@/hooks/useRouterPro';

import ATSPopUps from '../ATSPopUps';
import { IntegrationCard } from '../components/IntegrationCard';
import { type ATSType, type PopUpReasonTypes } from '../types';
import { updateIntegrations } from '../utils';

function ATSTools({
  data,
  invalidate,
}: Pick<ReturnType<typeof useIntegrations>, 'data' | 'invalidate'>) {
  const { toast } = useToast();
  const router = useRouterPro();
  const { recruiter } = useTenant();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState<PopUpReasonTypes>();
  const [isLoading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');

  async function action(): Promise<boolean> {
    try {
      const apiKey = inputRef.current && inputRef.current.value;
      setLoading(true);
      if (reason === 'disconnect_greenhouse') {
        await updateIntegrations({ greenhouse_key: null }, recruiter.id);
      }
      if (reason === 'disconnect_ashby') {
        await updateIntegrations({ ashby_key: null }, recruiter.id);
      }
      if (reason === 'disconnect_lever') {
        await updateIntegrations({ lever_key: null }, recruiter.id);
      }

      if (reason === 'connect_greenhouse' || reason === 'update_greenhouse') {
        if (apiKey) {
          try {
            // verifying greenhouse key
            const response = await axios.post('/api/greenhouse/getPostings', {
              page: 1,
              apiKey: apiKey,
              isInitial: true,
            });
            if (response.status === 200 && response.data.length > 0) {
              // updating key to database
              const responseRec = await axios.post(
                '/api/greenhouse/saveApiKey',
                {
                  recruiterId: recruiter.id,
                  apiKey: apiKey,
                },
              );
              if (
                responseRec.status === 200 &&
                responseRec.data[0]?.greenhouse_key
              ) {
                //
              }
            } else {
              toast({
                variant: 'destructive',
                title: 'API is invalid!',
              });
              setLoading(false);
              return false;
            }
          } catch (error) {
            toast({
              variant: 'destructive',
              title: 'Something went wrong.',
            });
            setLoading(false);
            return false;
          }
        } else {
          toast({
            variant: 'destructive',
            title: 'Please provide API key.',
          });
          setLoading(false);
          return false;
        }
      }
      if (reason === 'connect_ashby' || reason === 'update_ashby') {
        if (apiKey) {
          try {
            // verifying greenhouse key
            const response = await axios.post('/api/ashby/getPostings', {
              page: 1,
              apiKey: inputRef.current.value,
              isInitial: true,
            });
            if (response.status === 200 && response.data?.results?.length > 0) {
              // updating key to database
              const responseRec = await axios.post('/api/ashby/saveApiKey', {
                recruiterId: recruiter.id,
                apiKey: apiKey,
              });
              if (
                responseRec.status === 200 &&
                responseRec.data[0]?.ashby_key
              ) {
                //
              }
            } else {
              toast({
                variant: 'destructive',
                title: 'API is invalid.',
              });
              setLoading(false);
              return false;
            }
          } catch (error) {
            toast({
              variant: 'destructive',
              title: 'Something went wrong!',
            });
            setLoading(false);
            return false;
          }
        } else {
          toast({
            variant: 'destructive',
            title: 'Please provide API key!',
          });
          setLoading(false);
          return false;
        }
      }
      if (reason === 'connect_lever' || reason === 'update_lever') {
        if (apiKey) {
          try {
            // verifying greenhouse key
            const response = await axios.post('/api/lever/getPostings', {
              offset: 0,
              apiKey: inputRef.current.value,
              isInitial: true,
            });
            if (response.status === 200 && response.data.data) {
              // updating key to database
              const responseRec = await axios.post('/api/lever/saveApiKey', {
                recruiterId: recruiter.id,
                apiKey: apiKey,
              });
              if (
                responseRec.status === 200 &&
                responseRec.data[0]?.lever_key
              ) {
                //
              }
            } else {
              toast({
                variant: 'destructive',
                title: 'API is invalid!',
              });
              setLoading(false);
              return false;
            }
          } catch (error) {
            toast({
              variant: 'destructive',
              title: 'Something went wrong.',
            });
            setLoading(false);
            return false;
          }
        } else {
          toast({
            variant: 'destructive',
            title: 'Please provide API key!',
          });
          setLoading(false);
          return false;
        }
      }
      invalidate();
      close();
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  function close() {
    setIsOpen(false);
  }

  function connectApi(source: ATSType) {
    setIsOpen(true);
    if (source === 'greenhouse') {
      setReason('connect_greenhouse');
    }
    if (source === 'ashby') {
      setReason('connect_ashby');
    }
    if (source === 'lever') {
      setReason('connect_lever');
    }
  }

  async function updateApi(source: ATSType) {
    if (source === 'greenhouse') {
      setLoading(true);

      setIsOpen(true);
      setReason('update_greenhouse');
      try {
        await axios
          .post(`/api/decryptApiKey`, {
            encryptData: data.greenhouse_key,
          })
          .then(({ data }) => {
            if (data) {
              setTimeout(() => {
                inputRef?.current?.value &&
                  (inputRef.current.value = (data as string) || '');
                setInputValue(data);
              }, 10);
            }
          });
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Something went wrong.',
        });
      }
      setLoading(false);
    }
    if (source === 'ashby') {
      setIsOpen(true);
      setReason('update_ashby');
      await axios
        .post(`/api/decryptApiKey`, {
          encryptData: data.ashby_key,
        })
        .then(({ data }) => {
          if (data) {
            setTimeout(() => {
              inputRef?.current &&
                (inputRef.current.value = (data as string) || '');
              setInputValue(data);
            }, 10);
          }
        });
    }
    if (source === 'lever') {
      setLoading(true);
      setIsOpen(true);
      setReason('update_lever');
      await axios
        .post(`/api/decryptApiKey`, {
          encryptData: data.lever_key,
        })
        .then(({ data }) => {
          if (data) {
            setTimeout(() => {
              if (inputRef?.current && data) {
                inputRef.current.value = (data as string) || '';
              }
              setInputValue(data);
            }, 10);
          }
        });
      setLoading(false);
    }
  }

  function readDocs(source: ATSType) {
    setIsOpen(true);
    if (source === 'greenhouse') {
      setReason('learn_how_greenhouse');
    }
    if (source === 'lever') {
      setReason('learn_how_lever');
    }
    if (source === 'ashby') {
      setReason('learn_how_ashby');
    }
  }
  const atsTools = [
    {
      name: 'greenhouse' as ATSType,
      url: 'greenhouse.com',
      isVisibile: recruiter.recruiter_preferences.ats === 'Greenhouse',
      isConnected: Boolean(data?.greenhouse_key),
      logo: (
        <Image
          src={'/images/integration/greenhouse-logo.svg'}
          alt={'Greenhouse'}
          width={48}
          height={48}
        />
      ),
      primaryText: data?.greenhouse_key ? 'Settings' : 'Connect',
      secondaryText: data?.greenhouse_key ? null : 'Learn How',
      primaryAction: () => {
        setLoading(false);
        if (data.greenhouse_key) router.push('/integrations/greenhouse');
        else connectApi('greenhouse');
      },
      secondaryAction: () => {
        setLoading(false);
        readDocs('greenhouse');
      },
      learnHowLink: 'https://developers.greenhouse.io/harvest.html',
    },
    {
      name: 'lever' as ATSType,
      url: 'lever.co',
      isVisibile: recruiter.recruiter_preferences.ats === 'Lever',
      isConnected: Boolean(data?.lever_key),
      logo: (
        <Image
          src={'/images/integration/lever-logo.svg'}
          alt={'Lever'}
          width={48}
          height={48}
        />
      ),
      primaryText: data?.lever_key ? 'Settings' : 'Connect',
      secondaryText: data?.lever_key ? null : 'Learn How',
      primaryAction: () => {
        setLoading(false);
        if (data?.lever_key) updateApi('lever');
        else connectApi('lever');
      },
      secondaryAction: () => {
        setLoading(false);
        readDocs('lever');
      },
      learnHowLink: 'https://hire.lever.co/developer/documentation',
    },
    {
      name: 'ashby' as ATSType,
      url: 'ashbyhq.com',
      isVisibile: recruiter.recruiter_preferences.ats === 'Ashby',
      isConnected: Boolean(data?.ashby_key),
      logo: (
        <Image
          src={'/images/integration/ashby-logo.svg'}
          alt={'Lever'}
          width={48}
          height={48}
        />
      ),
      primaryText: data?.ashby_key ? 'Settings' : 'Connect',
      secondaryText: data?.ashby_key ? null : 'Learn How',
      primaryAction: () => {
        setLoading(false);
        if (data.ashby_key) updateApi('ashby');
        else connectApi('ashby');
      },
      secondaryAction: () => {
        setLoading(false);
        readDocs('ashby');
      },
      learnHowLink: 'https://developers.ashbyhq.com/',
    },
  ];
  return (
    <>
      <>
        {atsTools
          .filter(({ isVisibile }) => isVisibile)
          .map((item, i) => {
            return (
              <IntegrationCard
                key={i}
                slotLogo={item.logo}
                textName={capitalize(item.name)}
                textLink={item.url}
                isConnected={item.isConnected}
                primaryText={item.primaryText}
                secondaryText={item.secondaryText || undefined}
                primaryAction={item.primaryAction}
                secondaryAction={item.secondaryAction}
                learnHowLink={item.learnHowLink}
                onClick={() => window.open('https://' + item.url)}
              />
            );
          })}
      </>
      <ATSPopUps // popup for Hr tools
        popUpBody={<PasswordFiled ref={inputRef} placeholder='Enter API Key' />}
        close={close}
        isOpen={isOpen}
        action={action}
        reason={reason!}
        isLoading={isLoading}
        inputValue={inputValue}
      />
    </>
  );
}

export default ATSTools;
