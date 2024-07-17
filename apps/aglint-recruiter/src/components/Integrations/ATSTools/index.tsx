import { RecruiterType } from '@aglint/shared-types';
import { IconButton, TextField } from '@mui/material';
import axios from 'axios';
import { capitalize } from 'lodash';
import posthog from 'posthog-js';
import { useRef, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { IntegrationCard } from '@/devlink2/IntegrationCard';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import toast from '@/src/utils/toast';

import ATSPopUps from '../ATSPopUps';
import { ATSType, PopUpReasonTypes } from '../types';
import {
  AshbyLogo,
  GreenHouseLogo,
  LeverLogo,
  updateRecruiter,
} from '../utils';

function ATSTools() {
  const { recruiter, setRecruiter } = useAuthDetails();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState<PopUpReasonTypes>();
  const [hideApiKey, setHideApiKey] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(null);

  async function action() {
    const apiKey = inputRef.current && inputRef.current.value;
    setLoading(true);
    if (reason === 'disconnect_greenhouse') {
      await updateRecruiter(recruiter.id, {
        greenhouse_key: null,
      } as RecruiterType).then((data: RecruiterType) => {
        setRecruiter(data);
      });
    }
    if (reason === 'disconnect_ashby') {
      await updateRecruiter(recruiter.id, {
        ashby_key: null,
      } as RecruiterType).then((data: RecruiterType) => {
        setRecruiter(data);
      });
    }
    if (reason === 'disconnect_lever') {
      await updateRecruiter(recruiter.id, {
        lever_key: null,
      } as RecruiterType).then((data: RecruiterType) => {
        setRecruiter(data);
      });
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
            const responseRec = await axios.post('/api/greenhouse/saveApiKey', {
              recruiterId: recruiter.id,
              apiKey: apiKey,
            });
            if (
              responseRec.status === 200 &&
              responseRec.data[0]?.greenhouse_key
            ) {
              setRecruiter(responseRec.data[0]);
              posthog.capture('Green House Data Fetched');
            }
          } else {
            toast.error('API is invalid!');
            setLoading(false);
            return;
          }
        } catch (error) {
          toast.error('Something went wrong.');
        }
      } else {
        toast.warning('Please provide API key.');
        setLoading(false);
        return;
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
            if (responseRec.status === 200 && responseRec.data[0]?.ashby_key) {
              setRecruiter(responseRec.data[0]);
              posthog.capture('Ashby Data Fetched');
            }
          } else {
            toast.error('API is invalid.');
            setLoading(false);
            return;
          }
        } catch (error) {
          toast.error('Something went wrong!');
        }
      } else {
        toast.warning('Please provide API key!');
        setLoading(false);
        return;
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
            if (responseRec.status === 200 && responseRec.data[0]?.lever_key) {
              setRecruiter(responseRec.data[0]);
              posthog.capture('Lever Data Fetched');
            }
          } else {
            toast.error('API is invalid!');
            setLoading(false);
            return;
          }
        } catch (error) {
          toast.error('Something went wrong.');
        }
      } else {
        toast.warning('Please provide API key!');
        setLoading(false);
        return;
      }
    }
    close();
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
            encryptData: recruiter.greenhouse_key,
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
        toast.error('Something went wrong.');
      }
      setLoading(false);
    }
    if (source === 'ashby') {
      setIsOpen(true);
      setReason('update_ashby');
      await axios
        .post(`/api/decryptApiKey`, {
          encryptData: recruiter.ashby_key,
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
          encryptData: recruiter.lever_key,
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
      isConnected: recruiter?.greenhouse_key,
      logo: <GreenHouseLogo />,
      buttons: (
        <CardButtons
          primaryText={recruiter?.greenhouse_key ? 'Edit API Key' : 'Connect'}
          secondaryText={recruiter?.greenhouse_key ? 'Disconnect' : 'Learn How'}
          secondaryAction={() => {
            setLoading(false);
            if (recruiter.greenhouse_key) disConnectApi('greenhouse');
            else readDocs('greenhouse');
          }}
          primaryAction={() => {
            setLoading(false);
            if (recruiter.greenhouse_key) updateApi('greenhouse');
            else connectApi('greenhouse');
          }}
        />
      ),
    },
    {
      name: 'lever' as ATSType,
      url: 'lever.co',
      isConnected: recruiter?.lever_key,
      logo: <LeverLogo />,
      buttons: (
        <CardButtons
          primaryText={recruiter?.lever_key ? 'Edit API Key' : 'Connect'}
          secondaryText={recruiter?.lever_key ? 'Disconnect' : 'Learn How'}
          secondaryAction={() => {
            setLoading(false);
            if (recruiter.lever_key) disConnectApi('lever');
            else readDocs('lever');
          }}
          primaryAction={() => {
            setLoading(false);
            if (recruiter.lever_key) updateApi('lever');
            else connectApi('lever');
          }}
        />
      ),
    },
    {
      name: 'ashby' as ATSType,
      url: 'ashbyhq.com',
      isConnected: recruiter?.ashby_key,
      logo: <AshbyLogo />,
      buttons: (
        <CardButtons
          primaryText={recruiter?.ashby_key ? 'Edit API Key' : 'Connect'}
          secondaryText={recruiter?.ashby_key ? 'Disconnect' : 'Learn How'}
          secondaryAction={() => {
            setLoading(false);
            if (recruiter.ashby_key) disConnectApi('ashby');
            else readDocs('ashby');
          }}
          primaryAction={() => {
            setLoading(false);
            if (recruiter.ashby_key) updateApi('ashby');
            else connectApi('ashby');
          }}
        />
      ),
    },
  ];
  return (
    <>
      <>
        {atsTools.map((item, i) => {
          return (
            <IntegrationCard
              onClickCopyLink={{
                onClick: () => {
                  window.open('https://' + item.url);
                },
              }}
              isConnectedVisible={!!item.isConnected}
              key={i}
              textName={capitalize(item.name)}
              textLink={item.url}
              slotLogo={<>{item.logo}</>}
              slotButton={item.buttons}
            />
          );
        })}
      </>
      <ATSPopUps // popup for Hr tools
        popUpBody={
          <TextField
            type={hideApiKey ? 'password' : 'text'}
            fullWidth
            inputRef={inputRef}
            placeholder='Enter API Key'
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    setHideApiKey((pre) => !pre);
                  }}
                >
                  {hideApiKey ? (
                    <GlobalIcon iconName='visibility' />
                  ) : (
                    <GlobalIcon iconName='visibility_off' />
                  )}
                </IconButton>
              ),
            }}
          />
        }
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

function CardButtons({
  primaryAction,
  secondaryAction,
  primaryText,
  secondaryText,
}: {
  primaryAction: () => void;
  secondaryAction: () => void;
  primaryText: string;
  secondaryText: string;
}) {
  return (
    <>
      <ButtonSoft
        size='2'
        isLeftIcon={false}
        isRightIcon={false}
        color={'neutral'}
        onClickButton={{
          onClick: secondaryAction,
        }}
        textButton={secondaryText}
      />
      {primaryText === 'Edit API Key' ? (
        <ButtonSoft
          size='2'
          isLeftIcon={false}
          isRightIcon={false}
          onClickButton={{
            onClick: primaryAction,
          }}
          textButton={primaryText}
        />
      ) : (
        <ButtonSolid
          size='2'
          isLeftIcon={false}
          isRightIcon={false}
          onClickButton={{
            onClick: primaryAction,
          }}
          textButton={primaryText}
        />
      )}
    </>
  );
}
