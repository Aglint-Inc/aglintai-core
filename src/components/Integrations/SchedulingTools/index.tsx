import { IconButton, Stack, TextField } from '@mui/material';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import axios from 'axios';
import { capitalize } from 'lodash';
import { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { ButtonPrimaryRegular } from '@/devlink';
import { IntegrationCard, IntegrationUpload } from '@/devlink2';
import { ButtonGrey, ButtonPrimaryOutlinedRegular } from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { RecruiterType } from '@/src/types/data.types';
import { ZOOM_REDIRECT_URI } from '@/src/utils/integrations/constants';
import toast from '@/src/utils/toast';

import { ShowCode } from '../../Common/ShowCode';
import SchedulingPopUps from '../SchedulingToolPopUps';
import { SchedulingReasonTypes, schedulingToolsType } from '../types';
import { GooglLogo, updateRecruiter, ZoomLogo } from '../utils';

function Scheduling() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { recruiter, setRecruiter } = useAuthDetails();
  const [isOpen, setIsOpen] = useState(false);
  const [hideApiKey, setHideApiKey] = useState(true);

  const [reason, setReason] = useState<SchedulingReasonTypes>();
  const [isLoading, setLoading] = useState(false);
  const [fileData, setFileData] = useState(null);
  function close() {
    setIsOpen(false);
  }
  async function action() {
    if (
      reason === 'connect_google_workSpace' ||
      reason === 'update_google_workspace'
    ) {
      if (fileData) {
        await updateRecruiter(recruiter.id, {
          service_json: fileData,
        } as RecruiterType).then((data: RecruiterType) => {
          setRecruiter(data);
        });
      } else {
        toast.warning('Please select file!');
        return;
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
    setFileData(null);
    close();
  }
  function connectApi(source: schedulingToolsType) {
    if (source === 'google_workspace') {
      setIsOpen(true);
      setReason('connect_google_workSpace');
    }
    if (source === 'zoom') {
      handleGetAuthUri();
    }
  }
  async function updateApi(source: schedulingToolsType) {
    setTimeout(() => {
      inputRef.current.value = recruiter?.zoom_auth;
    }, 10);
    if (source === 'google_workspace') {
      setIsOpen(true);
      setReason('update_google_workspace');
    }
    if (source === 'zoom') {
      setReason('update_zoom');
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
      window.open('https://www.workspace.google.com');
    if (source === 'zoom') window.open('https://www.zoom.com');
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
          primaryText={recruiter?.service_json ? 'Edit' : 'Connect'}
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
          primaryText={recruiter?.zoom_auth ? 'Edit' : 'Connect'}
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
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles.map((file) => Object.assign(file))[0];
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;
      reader.onload = async (e) => {
        if (e.target) {
          /* Parse data */
          const readData = e.target.result;
          const { data } = await axios.post(`/api/encryptData`, {
            planData: readData,
          });
          setFileData(data);
        }
      };
      if (rABS) reader.readAsBinaryString(file);
      else reader.readAsArrayBuffer(file);
    },
  });

  const handleGetAuthUri = async () => {
    try {
      let zoom_auth_url = `https://zoom.us/oauth/authorize?redirect_uri=${ZOOM_REDIRECT_URI}&client_id=${process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID}&response_type=code`;
      const popup = window.open(zoom_auth_url, 'popup', 'popup=true');
      const checkPopup = setInterval(() => {
        if (popup && !popup.closed) {
          try {
            if (popup.window.location.href.includes('zoom-auth=sucess')) {
              toast.success('Zoom auth sucess');
              popup.close();
              clearInterval(checkPopup);
            }
            if (popup.window.location.href.includes('zoom-auth=failed')) {
              toast.error('Zoom auth failed');
            }
          } catch (error) {
            // console.log(error);
          }
        }
      }, 1000);
    } catch (error) {
      // console.log(error);
    }
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
                reason === 'connect_zoom' ||
                reason === 'disconnect_zoom' ||
                reason === 'update_zoom'
              }
            >
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
            </ShowCode.When>
            <ShowCode.When
              isTrue={
                reason === 'connect_google_workSpace' ||
                reason === 'disconnect_google_workSpace' ||
                reason === 'update_google_workspace'
              }
            >
              {fileData ? (
                <TextField fullWidth disabled value={fileData} />
              ) : (
                <Stack {...getRootProps()}>
                  <input id='uploadServiceJson' {...getInputProps()} />
                  <IntegrationUpload
                    onClickGetJson={{
                      onClick: (e: { stopPropagation: () => void }) => {
                        e.stopPropagation();
                      },
                    }}
                  />
                </Stack>
              )}
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
