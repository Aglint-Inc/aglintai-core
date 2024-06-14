import { RecruiterType } from '@aglint/shared-types';
import { supabaseWrap } from '@aglint/shared-utils';
import { Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { capitalize } from 'lodash';
import { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { ButtonSolid } from '@/devlink2/ButtonSolid';
import { IntegrationCard } from '@/devlink2/IntegrationCard';
import { IntegrationUpload } from '@/devlink2/IntegrationUpload';
import { ToggleButton } from '@/devlink2/ToggleButton';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import Loader from '../../Common/Loader';
import { ShowCode } from '../../Common/ShowCode';
import SchedulingPopUps from '../SchedulingToolPopUps';
import { SchedulingReasonTypes, schedulingToolsType } from '../types';
import { GooglLogo, updateRecruiter, ZoomLogo } from '../utils';

function Scheduling() {
  const { recruiter, setRecruiter } = useAuthDetails();
  const [isOpen, setIsOpen] = useState(false);
  const [hideApiKey, setHideApiKey] = useState(true);

  const [reason, setReason] = useState<SchedulingReasonTypes>();
  const [isLoading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [fileData, setFileData] = useState(null);
  function close() {
    setIsOpen(false);
    setFileData(null);
  }
  const accountIdRef = useRef<HTMLInputElement>(null);
  const clientIdRef = useRef<HTMLInputElement>(null);
  const clientSecretRef = useRef<HTMLInputElement>(null);
  const domainRef = useRef<HTMLInputElement>(null);
  async function action() {
    const google_workspace_domain = domainRef.current?.value;
    if (
      reason === 'connect_google_workSpace' ||
      reason === 'update_google_workspace'
    ) {
      if (fileData) {
        await updateRecruiter(recruiter.id, {
          service_json: fileData,
          google_workspace_domain,
        } as RecruiterType).then((data: RecruiterType) => {
          setRecruiter(data);
        });
      } else {
        await updateRecruiter(recruiter.id, {
          google_workspace_domain,
        } as RecruiterType).then((data: RecruiterType) => {
          setRecruiter(data);
        });
      }
    }
    if (reason === 'disconnect_google_workSpace') {
      await updateRecruiter(recruiter.id, {
        service_json: null,
      } as RecruiterType).then((data: RecruiterType) => {
        setRecruiter(data);
      });
    }

    if (reason === 'disconnect_zoom') {
      await updateRecruiter(recruiter.id, {
        zoom_auth: null,
      } as RecruiterType).then((data: RecruiterType) => {
        setRecruiter(data);
      });
    }
    if (reason === 'connect_zoom') {
      const client_id = clientIdRef.current.value;
      const client_secret = clientSecretRef.current.value;
      const account_id = accountIdRef.current.value;

      if (!client_id && !client_secret && !account_id) {
        toast.warning('Provide API key.');
        return null;
      }
      updateZoomAuth({ client_id, client_secret, account_id });
    }
    if (reason === 'update_zoom') {
      const client_id = clientIdRef.current.value;
      const client_secret = clientSecretRef.current.value;
      const account_id = accountIdRef.current.value;

      if (!client_id && !client_secret && !account_id) {
        toast.warning('Provide API key.');
        return null;
      }
      updateZoomAuth({ client_id, client_secret, account_id });
    }
    setFileData(null);
    close();
  }
  function connectApi(source: schedulingToolsType) {
    setIsOpen(true);
    if (source === 'google_workspace') {
      setReason('connect_google_workSpace');
    }
    if (source === 'zoom') {
      setReason('connect_zoom');
    }
  }
  async function updateApi(source: schedulingToolsType) {
    setIsOpen(true);
    if (source === 'google_workspace') {
      setReason('update_google_workspace');
    }
    if (source === 'zoom') {
      setReason('update_zoom');
      await axios
        .post(`/api/decryptApiKey`, {
          encryptData: recruiter.zoom_auth,
        })
        .then(({ data }) => {
          if (data) {
            setTimeout(() => {
              const keys = JSON.parse(data) as {
                client_id: string;
                client_secret: string;
                account_id: string;
              };
              if (clientIdRef.current) {
                clientIdRef.current.value = keys.client_id;
                accountIdRef.current.value = keys.account_id;
                clientSecretRef.current.value = keys.client_secret;
              }
            }, 100);
          }
        });
    }
  }
  function disConnectApi(source: schedulingToolsType) {
    setIsOpen(true);
    if (source === 'google_workspace') {
      setReason('disconnect_google_workSpace');
    }
    if (source === 'zoom') {
      setReason('disconnect_zoom');
    }
  }
  function readDocs(source: schedulingToolsType) {
    if (source === 'google_workspace')
      window.open('https://workspace.google.com');
    if (source === 'zoom')
      window.open(
        'https://marketplace.zoom.us/develop/applications/6yi2AYxkRASH4rVcP-8c9Q/information?mode=dev',
      );
  }

  const SchedulingTools = [
    {
      name: String('google_workspace')
        .split('_')
        .join(' ') as schedulingToolsType,
      url: 'workspace.google.com',
      isConnected: recruiter?.service_json,
      logo: <GooglLogo />,
      buttons: (
        <CardButtons
          primaryText={recruiter?.service_json ? 'Re-Upload' : 'Connect'}
          secondaryText={recruiter?.service_json ? 'Disconnect' : 'Learn How'}
          secondaryAction={() => {
            setLoading(false);
            if (recruiter.service_json) disConnectApi('google_workspace');
            else readDocs('google_workspace');
          }}
          primaryAction={() => {
            setLoading(false);
            if (recruiter.service_json) updateApi('google_workspace');
            else connectApi('google_workspace');
          }}
        />
      ),
    },
    {
      name: String('zoom') as schedulingToolsType,
      url: 'zoom.com',
      logo: <ZoomLogo />,
      isConnected: recruiter?.zoom_auth,
      buttons: (
        <CardButtons
          primaryText={recruiter?.zoom_auth ? 'Re-Connect' : 'Connect'}
          secondaryText={recruiter?.zoom_auth ? 'Disconnect' : 'Learn How'}
          secondaryAction={() => {
            setLoading(false);
            if (recruiter.zoom_auth) disConnectApi('zoom');
            else readDocs('zoom');
          }}
          primaryAction={() => {
            setLoading(false);
            if (recruiter.zoom_auth) updateApi('zoom');
            else connectApi('zoom');
          }}
        />
      ),
    },
  ];

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'application/json': ['.json'],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length < 1) {
        toast.warning('Please upload the file in .json format.');
        return null;
      }

      const file = acceptedFiles.map((file) => Object.assign(file))[0];
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.onload = async (e) => {
        setUploading(true);
        if (e.target) {
          /* Parse data */
          const readData = e.target.result;
          const { data } = await axios.post(`/api/encryptData`, {
            planData: readData,
          });
          setFileData(data);
          setUploading(false);
        }
      };
      if (rABS) reader.readAsBinaryString(file);
      else reader.readAsArrayBuffer(file);
    },
  });

  const updateZoomAuth = async ({ client_id, client_secret, account_id }) => {
    const zoom_auth = {
      client_id,
      client_secret,
      account_id,
    };
    const auth_str = JSON.stringify(zoom_auth);
    const { data: encrypted_cred } = await axios.post(`/api/encryptData`, {
      planData: auth_str,
    });

    const data = supabaseWrap(
      await supabase
        .from('recruiter')
        .update({
          zoom_auth: encrypted_cred,
        })
        .eq('id', recruiter.id)
        .select()
        .single(),
    );
    setRecruiter(data as RecruiterType);
  };

  return (
    <>
      {SchedulingTools.map((item, i) => {
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
      <SchedulingPopUps
        close={close}
        isOpen={isOpen}
        action={action}
        isLoading={isLoading}
        popUpBody={
          <ShowCode>
            <ShowCode.When
              isTrue={
                reason === 'connect_google_workSpace' ||
                reason === 'disconnect_google_workSpace' ||
                reason === 'update_google_workspace'
              }
            >
              <Stack direction={'column'} spacing={'var(--space-1)'}>
                <Typography mb={0.5} variant='body1'>
                  Domain Name
                </Typography>

                <TextField
                  defaultValue={
                    recruiter.google_workspace_domain ||
                    recruiter.company_website
                  }
                  placeholder='Enter domain name'
                  fullWidth
                  inputRef={domainRef}
                />
                <ShowCode>
                  <ShowCode.When isTrue={fileData}>
                    <>
                      <Typography mb={0.5} variant='body1'>
                        Service Key
                      </Typography>
                      <TextField fullWidth disabled value={fileData} />
                    </>
                  </ShowCode.When>
                  <ShowCode.Else>
                    <ShowCode>
                      <ShowCode.When isTrue={uploading}>
                        <Stack
                          height={140}
                          width={'100%'}
                          direction={'row'}
                          alignItems={'center'}
                          justifyContent={'center'}
                        >
                          <Loader />
                        </Stack>
                      </ShowCode.When>
                      <ShowCode.Else>
                        <Stack>
                          <input id='uploadServiceJson' {...getInputProps()} />
                          <div {...getRootProps()}>
                            <IntegrationUpload
                              onClickGetJson={{
                                onClick: (e: {
                                  stopPropagation: () => void;
                                }) => {
                                  e.stopPropagation();
                                },
                              }}
                            />
                          </div>
                        </Stack>
                      </ShowCode.Else>
                    </ShowCode>
                  </ShowCode.Else>
                </ShowCode>
              </Stack>
            </ShowCode.When>
            <ShowCode.When
              isTrue={
                reason === 'connect_zoom' ||
                reason === 'disconnect_zoom' ||
                reason === 'update_zoom'
              }
            >
              <Stack
                justifyContent={'end'}
                alignItems={'center'}
                direction={'row'}
                spacing={2}
              >
                <Typography variant='body1'>Show keys</Typography>
                <ToggleButton
                  onclickToggle={{
                    onClick: () => {
                      setHideApiKey((pre) => !pre);
                    },
                  }}
                  isActive={!hideApiKey}
                  isInactive={hideApiKey}
                />
              </Stack>
              <Stack direction={'column'} spacing={1}>
                <Typography variant='body1'>Account Id</Typography>
                <TextField
                  type={hideApiKey ? 'password' : 'text'}
                  fullWidth
                  inputRef={accountIdRef}
                />
                <Typography variant='body1'>Client Id</Typography>
                <TextField
                  type={hideApiKey ? 'password' : 'text'}
                  fullWidth
                  inputRef={clientIdRef}
                />
                <Typography variant='body1'>Client Secrete</Typography>
                <TextField
                  type={hideApiKey ? 'password' : 'text'}
                  fullWidth
                  inputRef={clientSecretRef}
                />
              </Stack>
            </ShowCode.When>
          </ShowCode>
        }
        reason={reason}
      />
    </>
  );
}

export default Scheduling;

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
      {primaryText === 'Edit' ||
      primaryText === 'Re-Connect' ||
      primaryText === 'Re-Upload' ? (
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
