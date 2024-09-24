import { useToast } from '@components/hooks/use-toast';
import { Input } from '@components/ui/input';
import { Toggle } from '@components/ui/toggle';
import GoogleLogo from '@public/images/svg/google-logo.svg';
import ZoomLogo from '@public/images/svg/zoom-logo.svg';
import axios from 'axios';
import { Loader2, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { ShowCode } from '@/components/Common/ShowCode';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';

import { IntegrationCard } from '../components/IntegrationCard';
import SchedulingPopUps from '../SchedulingToolPopUps';
import { type SchedulingReasonTypes, type schedulingToolsType } from '../types';
import { updateIntegrations } from '../utils';

function Scheduling({ allIntegrations }) {
  const { recruiter } = useAuthDetails();
  const { toast } = useToast();
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
        await updateIntegrations(
          {
            service_json: fileData,
            google_workspace_domain,
          },
          recruiter.id,
        );
      } else {
        await updateIntegrations(
          { google_workspace_domain: null },
          recruiter.id,
        );
      }
    }
    if (reason === 'disconnect_google_workSpace') {
      await updateIntegrations({ service_json: null }, recruiter.id);
    }

    if (reason === 'disconnect_zoom') {
      await updateIntegrations({ zoom_auth: null }, recruiter.id);
    }
    if (reason === 'connect_zoom') {
      const client_id = clientIdRef.current.value;
      const client_secret = clientSecretRef.current.value;
      const account_id = accountIdRef.current.value;

      if (!client_id && !client_secret && !account_id) {
        toast({
          variant: 'destructive',
          title: 'Provide API key.',
        });
        return null;
      }
      updateZoomAuth({ client_id, client_secret, account_id });
    }
    if (reason === 'update_zoom') {
      const client_id = clientIdRef.current.value;
      const client_secret = clientSecretRef.current.value;
      const account_id = accountIdRef.current.value;

      if (!client_id || !client_secret || !account_id) {
        toast({
          variant: 'destructive',
          title: 'Provide API key.',
        });
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
          encryptData: allIntegrations?.zoom_auth,
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
      name: 'Google Workspace',
      url: 'workspace.google.com',
      isConnected: allIntegrations?.service_json,
      logo: <GoogleLogo />,
      primaryText: allIntegrations?.service_json ? 'Re-Upload' : 'Connect',
      secondaryText: allIntegrations?.service_json ? 'Disconnect' : 'Learn How',
      primaryAction: () => {
        setLoading(false);
        if (allIntegrations?.service_json) updateApi('google_workspace');
        else connectApi('google_workspace');
      },
      secondaryAction: () => {
        setLoading(false);
        if (allIntegrations?.service_json) disConnectApi('google_workspace');
        else readDocs('google_workspace');
      },
      learnHowLink: 'https://workspace.google.com',
    },
    {
      name: 'Zoom',
      url: 'zoom.com',
      logo: <ZoomLogo />,
      isConnected: allIntegrations?.zoom_auth,
      primaryText: allIntegrations?.zoom_auth ? 'Re-Connect' : 'Connect',
      secondaryText: allIntegrations?.zoom_auth ? 'Disconnect' : 'Learn How',
      primaryAction: () => {
        setLoading(false);
        if (allIntegrations?.zoom_auth) updateApi('zoom');
        else connectApi('zoom');
      },
      secondaryAction: () => {
        setLoading(false);
        if (allIntegrations?.zoom_auth) disConnectApi('zoom');
        else readDocs('zoom');
      },
      learnHowLink:
        'https://marketplace.zoom.us/develop/applications/6yi2AYxkRASH4rVcP-8c9Q/information?mode=dev',
    },
  ];

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      'application/json': ['.json'],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length < 1) {
        toast({
          variant: 'destructive',
          title: 'Please upload the file in .json format.',
        });
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
    await updateIntegrations({ zoom_auth: encrypted_cred }, recruiter.id);
  };

  return (
    <>
      {SchedulingTools.map((item, i) => (
        <IntegrationCard
          key={i}
          slotLogo={item.logo}
          textName={item.name}
          textLink={item.url}
          isConnected={item.isConnected}
          primaryText={item.primaryText}
          secondaryText={item.secondaryText}
          primaryAction={item.primaryAction}
          secondaryAction={item.secondaryAction}
          learnHowLink={item.learnHowLink}
          onClick={() => window.open('https://' + item.url)}
        />
      ))}
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
              <div className='space-y-2'>
                <p className='text-base font-normal'>Domain Name</p>
                <Input
                  defaultValue={allIntegrations?.google_workspace_domain}
                  placeholder='Ex : https://aglinthq.com'
                  ref={domainRef}
                />
                <ShowCode>
                  <ShowCode.When isTrue={fileData}>
                    <>
                      <p className='text-base font-normal'>Service Key</p>
                      <Input disabled value={fileData} />
                    </>
                  </ShowCode.When>
                  <ShowCode.Else>
                    <ShowCode>
                      <ShowCode.When isTrue={uploading}>
                        <div className='flex h-36 items-center justify-center'>
                          <Loader2 className='h-8 w-8 animate-spin' />
                        </div>
                      </ShowCode.When>
                      <ShowCode.Else>
                        <div {...getRootProps()} className='cursor-pointer'>
                          <input {...getInputProps()} />
                          <div className='flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6'>
                            <Upload className='h-12 w-12 text-gray-400' />
                            <p className='mt-2 text-center text-sm text-gray-600'>
                              Drag & drop a file here, or click to select a file
                            </p>
                          </div>
                        </div>
                      </ShowCode.Else>
                    </ShowCode>
                  </ShowCode.Else>
                </ShowCode>
              </div>
            </ShowCode.When>
            <ShowCode.When
              isTrue={
                reason === 'connect_zoom' ||
                reason === 'disconnect_zoom' ||
                reason === 'update_zoom'
              }
            >
              <div className='space-y-4'>
                <div className='flex items-center justify-end space-x-2'>
                  <Toggle
                    pressed={!hideApiKey}
                    onPressedChange={() => setHideApiKey((prev) => !prev)}
                  />
                </div>
                <Input
                  type={hideApiKey ? 'password' : 'text'}
                  placeholder='Enter Account ID'
                  ref={accountIdRef}
                />
                <Input
                  type={hideApiKey ? 'password' : 'text'}
                  placeholder='Enter Client Id'
                  ref={clientIdRef}
                />
                <Input
                  type={hideApiKey ? 'password' : 'text'}
                  placeholder='Enter Client Secret'
                  ref={clientSecretRef}
                />
              </div>
            </ShowCode.When>
          </ShowCode>
        }
        reason={reason}
      />
    </>
  );
}

export default Scheduling;
