import { IconButton, TextField } from '@mui/material';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import axios from 'axios';
import { capitalize } from 'lodash';
import posthog from 'posthog-js';
import { useRef, useState } from 'react';

import { ButtonPrimaryRegular } from '@/devlink';
import { IntegrationCard } from '@/devlink2';
import { ButtonGrey, ButtonPrimaryOutlinedRegular } from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { RecruiterType } from '@/src/types/data.types';
import toast from '@/src/utils/toast';

import HrToolPopUps from '../HrToolPopUps';
import { hrToolsType, PopUpReasonTypes } from '../types';
import {
    AshbyLogo,
    GreenHouseLogo,
    LeverLogo,
    updateRecruiter,
} from '../utils';

function HrTools() {
  const { recruiter, setRecruiter } = useAuthDetails();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState<PopUpReasonTypes>();
  const [hideApiKey, setHideApiKey] = useState(true);
  const [isLoading, setLoading] = useState(false);

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
            toast.error('Api is invalid!');
            setLoading(false);
            return;
          }
        } catch (error) {
          toast.error('Something went wrong!');
        }
      } else {
        toast.warning('Please provide api key!');
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
            toast.error('Api is invalid!');
            setLoading(false);
            return;
          }
        } catch (error) {
          toast.error('Something went wrong!');
        }
      } else {
        toast.warning('Please provide api key!');
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
            toast.error('Api is invalid!');
            setLoading(false);
            return;
          }
        } catch (error) {
          toast.error('Something went wrong!');
        }
      } else {
        toast.warning('Please provide api key!');
        setLoading(false);
        return;
      }
    }
    close();
  }

  function close() {
    setIsOpen(false);
  }

  function disConnectApi(source: hrToolsType) {
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

  function connectApi(source: hrToolsType) {
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

  async function updateApi(source: hrToolsType) {
    if (source === 'greenhouse') {
      setIsOpen(true);
      setReason('update_greenhouse');
      await axios
        .post(`/api/decryptApiKey`, {
          encryptData: recruiter.greenhouse_key,
        })
        .then(({ data }) => {
          if (data) {
            setTimeout(() => {
              inputRef.current.value = (data as string) || '';
            }, 10);
          }
        });
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
            }, 10);
          }
        });
    }
    if (source === 'lever') {
      setIsOpen(true);
      setReason('connect_lever');
      await axios
        .post(`/api/decryptApiKey`, {
          encryptData: recruiter.lever_key,
        })
        .then(({ data }) => {
          if (data) {
            setTimeout(() => {
              inputRef.current.value = (data as string) || '';
            }, 10);
          }
        });
    }
  }

  function readDocs(source: hrToolsType) {
    if (source === 'greenhouse') window.open('https://www.greenhouse.com');
    if (source === 'lever') window.open('https://www.lever.com');
    if (source === 'ashby') window.open('https://www.ashbyhq.com');
  }
  const hrTools = [
    {
      name: 'greenhouse' as hrToolsType,
      url: 'greenhouse.com',
      isConnected: recruiter?.greenhouse_key,
      logo: <GreenHouseLogo />,
      buttons: (
        <CardButtons
          primaryText={recruiter?.greenhouse_key ? 'Edit' : 'Connect'}
          secondaryText={
            recruiter?.greenhouse_key ? 'Disconnected' : 'Learn How'
          }
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
      name: 'lever' as hrToolsType,
      url: 'lever.com',
      isConnected: recruiter?.lever_key,
      logo: <LeverLogo />,
      buttons: (
        <CardButtons
          primaryText={recruiter?.lever_key ? 'Edit' : 'Connect'}
          secondaryText={recruiter?.lever_key ? 'Disconnected' : 'Learn How'}
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
      name: 'ashby' as hrToolsType,
      url: 'ashbyhq.com',
      isConnected: recruiter?.ashby_key,
      logo: <AshbyLogo />,
      buttons: (
        <CardButtons
          primaryText={recruiter?.ashby_key ? 'Edit' : 'Connect'}
          secondaryText={recruiter?.ashby_key ? 'Disconnected' : 'Learn How'}
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
        {hrTools.map((item, i) => {
          return (
            <IntegrationCard
              onClickCopyLink={{
                onClick: () => {
                  navigator.clipboard.writeText(item.url).then(() => {
                    toast.message('Copied to clipboard');
                  });
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
      <HrToolPopUps // popup for Hr tools
        popUpBody={
          <TextField
            type={hideApiKey ? 'password' : 'text'}
            fullWidth
            inputRef={inputRef}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    setHideApiKey((pre) => !pre);
                  }}
                >
                  {hideApiKey ? <IconEyeOff /> : <IconEye />}
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
      />
    </>
  );
}

export default HrTools;

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
      <ButtonGrey
        onClickButton={{
          onClick: secondaryAction,
        }}
        textLabel={secondaryText}
      />
      {primaryText === 'Edit' ? (
        <ButtonPrimaryOutlinedRegular
          buttonProps={{
            onClick: primaryAction,
          }}
          buttonText={primaryText}
        />
      ) : (
        <ButtonPrimaryRegular
          onClickButton={{
            onClick: primaryAction,
          }}
          textLabel={primaryText}
        />
      )}
    </>
  );
}
