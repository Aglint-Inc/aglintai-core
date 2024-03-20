import { Stack, TextField } from '@mui/material';
import axios from 'axios';
import { capitalize } from 'lodash';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { ButtonPrimaryRegular } from '@/devlink';
import { IntegrationCard, IntegrationUpload } from '@/devlink2';
import { ButtonGrey, ButtonPrimaryOutlinedRegular } from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { RecruiterType } from '@/src/types/data.types';
import toast from '@/src/utils/toast';

import SchedulingPopUps from '../SchedulingToolPopUps';
import { SchedulingReasonTypes, schedulingToolsType } from '../types';
import { GooglLogo, updateRecruiter } from '../utils';

function Scheduling() {
  const { recruiter, setRecruiter } = useAuthDetails();
  const [isOpen, setIsOpen] = useState(false);
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
    setFileData(null);
    close();
  }
  function connectApi(source: schedulingToolsType) {
    setIsOpen(true);
    if (source === 'google_workspace') {
      setReason('connect_google_workSpace');
    }
  }
  async function updateApi(source: schedulingToolsType) {
    setIsOpen(true);
    if (source === 'google_workspace') {
      setReason('update_google_workspace');
    }
  }
  function disConnectApi(source: schedulingToolsType) {
    setIsOpen(true);
    if (source === 'google_workspace') {
      setReason('disconnect_google_workSpace');
    }
  }
  function readDocs(source: schedulingToolsType) {
    if (source === 'google_workspace')
      window.open('https://www.workspace.google.com');
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
  return (
    <div>
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
          fileData ? (
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
          )
        }
        reason={reason}
      />
    </div>
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
