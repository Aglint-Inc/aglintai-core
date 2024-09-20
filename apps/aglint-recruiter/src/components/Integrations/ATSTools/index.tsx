import { useToast } from '@components/hooks/use-toast';
import { Input } from '@components/ui/input';
import axios from 'axios';
import { capitalize } from 'lodash';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';

import ATSPopUps from '../ATSPopUps';
import { IntegrationCard } from '../components/IntegrationCard';
import { type ATSType, type PopUpReasonTypes } from '../types';
import { updateIntegrations } from '../utils';
// import GreenHouseLogo from '@public/images/svg/greenhouse-logo.svg';
// import LeverLogo from '@public/images/svg/lever-logo.svg';
// import AshbyLogo from '@public/images/svg/ashby-logo.svg';

function ATSTools({ integrations, refetch }) {
  const { toast } = useToast();
  const router = useRouter();
  const { recruiter } = useAuthDetails();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState<PopUpReasonTypes>();
  const [isLoading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(null);
  // const { data: integrations, refetch } = useAllIntegrations();

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
                // Removedposthog.capture('Greenhouse Data Fetched');
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
                //Removedposthog posthog.capture('Ashby Data Fetched');
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
                // Removed posthog.capture('Lever Data Fetched');
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
      refetch();
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

  function disConnectApi(source: ATSType) {
    setIsOpen(true);
    if (source === 'greenhouse') {
      setReason('disconnect_greenhouse');
    }
    if (source === 'ashby') {
      setReason('disconnect_ashby');
    }
    if (source === 'lever') {
      setReason('disconnect_lever');
    }
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
            encryptData: integrations.greenhouse_key,
          })
          .then(({ data }) => {
            if (data) {
              setTimeout(() => {
                inputRef.current.value = (data as string) || '';
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
          encryptData: integrations.ashby_key,
        })
        .then(({ data }) => {
          if (data) {
            setTimeout(() => {
              inputRef.current.value = (data as string) || '';
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
          encryptData: integrations.lever_key,
        })
        .then(({ data }) => {
          if (data) {
            setTimeout(() => {
              inputRef.current.value = (data as string) || '';
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
      isConnected: integrations?.greenhouse_key,
      logo: <></>,
      // logo: <GreenHouseLogo />,
      primaryText: integrations?.greenhouse_key ? 'Settings' : 'Connect',
      secondaryText: integrations?.greenhouse_key ? 'Disconnect' : 'Learn How',
      primaryAction: () => {
        setLoading(false);
        if (integrations.greenhouse_key)
          router.push('/integrations/greenhouse');
        else connectApi('greenhouse');
      },
      secondaryAction: () => {
        setLoading(false);
        if (integrations.greenhouse_key) disConnectApi('greenhouse');
        else readDocs('greenhouse');
      },
      learnHowLink: 'https://developers.greenhouse.io/harvest.html',
    },
    {
      name: 'lever' as ATSType,
      url: 'lever.co',
      isConnected: integrations?.lever_key,
      logo: <></>,
      // logo: <LeverLogo />,
      primaryText: integrations?.lever_key ? 'Settings' : 'Connect',
      secondaryText: integrations?.lever_key ? 'Disconnect' : 'Learn How',
      primaryAction: () => {
        setLoading(false);
        if (integrations.lever_key) updateApi('lever');
        else connectApi('lever');
      },
      secondaryAction: () => {
        setLoading(false);
        if (integrations.lever_key) disConnectApi('lever');
        else readDocs('lever');
      },
      learnHowLink: 'https://hire.lever.co/developer/documentation',
    },
    {
      name: 'ashby' as ATSType,
      url: 'ashbyhq.com',
      isConnected: integrations?.ashby_key,
      logo: <></>,
      // logo: <AshbyLogo />,
      primaryText: integrations?.ashby_key ? 'Settings' : 'Connect',
      secondaryText: integrations?.ashby_key ? 'Disconnect' : 'Learn How',
      primaryAction: () => {
        setLoading(false);
        if (integrations.ashby_key) updateApi('ashby');
        else connectApi('ashby');
      },
      secondaryAction: () => {
        setLoading(false);
        if (integrations.ashby_key) disConnectApi('ashby');
        else readDocs('ashby');
      },
      learnHowLink: 'https://developers.ashbyhq.com/',
    },
  ];
  return (
    <>
      <>
        {atsTools.map((item, i) => {
          return (
            <IntegrationCard
              key={i}
              slotLogo={item.logo}
              textName={capitalize(item.name)}
              textLink={item.url}
              isConnected={item.isConnected}
              primaryText={item.primaryText}
              secondaryText={item.secondaryText}
              primaryAction={item.primaryAction}
              secondaryAction={item.secondaryAction}
              learnHowLink={item.learnHowLink}
              onClick={() => window.open('https://' + item.url)}
            />
          );
        })}
      </>
      <ATSPopUps // popup for Hr tools
        popUpBody={<Input ref={inputRef} placeholder='Enter API Key' />}
        close={close}
        isOpen={isOpen}
        action={action}
        reason={reason}
        isLoading={isLoading}
        inputValue={inputValue}
      />
    </>
  );
}

export default ATSTools;
