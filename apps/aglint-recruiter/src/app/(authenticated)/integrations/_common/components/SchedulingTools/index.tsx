import { useToast } from '@components/hooks/use-toast';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import PasswordField from 'src/app/_common/components/passwordField';

import { useTenant } from '@/company/hooks';
import { ShowCode } from '@/common/ShowCode';

import { IntegrationCard } from '../components/IntegrationCard';
import SchedulingPopUps from '../SchedulingToolPopUps';
import { type SchedulingReasonTypes, type schedulingToolsType } from '../types';
import { updateIntegrations } from '../utils';

function Scheduling({ allIntegrations }: { allIntegrations: any }) {
  const { recruiter } = useTenant();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const [reason, setReason] = useState<SchedulingReasonTypes>();
  const [isLoading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [fileData, setFileData] = useState(null);
  function close() {
    setIsOpen(false);
    setFileData(null);
  }
  const accountIdRef = useRef<HTMLInputElement | null>(null);
  const clientIdRef = useRef<HTMLInputElement | null>(null);
  const clientSecretRef = useRef<HTMLInputElement | null>(null);
  const domainRef = useRef<HTMLInputElement | null>(null);

  async function action() {
    const google_workspace_domain = domainRef.current?.value ?? null!;
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
    if (reason === 'connect_zoom') {
      const client_id = clientIdRef.current!.value;
      const client_secret = clientSecretRef.current!.value;
      const account_id = accountIdRef.current!.value;

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
      const client_id = clientIdRef.current!.value;
      const client_secret = clientSecretRef.current!.value;
      const account_id = accountIdRef.current!.value;

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
              if (clientIdRef.current!) {
                clientIdRef.current!.value = keys.client_id;
                accountIdRef.current!.value = keys.account_id;
                clientSecretRef.current!.value = keys.client_secret;
              }
            }, 100);
          }
        });
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
      logo: (
        <Image
          src={'/images/integration/google-logo.svg'}
          alt={'Google'}
          width={40}
          height={40}
        />
      ),
      primaryText: allIntegrations?.service_json ? 'Re-Upload' : 'Connect',
      secondaryText: allIntegrations?.service_json ? null : 'Learn How',
      primaryAction: () => {
        setLoading(false);
        if (allIntegrations?.service_json) updateApi('google_workspace');
        else connectApi('google_workspace');
      },
      secondaryAction: () => {
        setLoading(false);
        // if (allIntegrations?.service_json) disConnectApi('google_workspace');
        // else
        readDocs('google_workspace');
      },
      learnHowLink: 'https://workspace.google.com',
    },
    {
      name: 'Zoom',
      url: 'zoom.com',
      logo: (
        <Image
          src={'/images/integration/zoom-logo.svg'}
          alt={'Zoom'}
          width={40}
          height={40}
        />
      ),
      isConnected: allIntegrations?.zoom_auth,
      primaryText: allIntegrations?.zoom_auth ? 'Re-Connect' : 'Connect',
      secondaryText: allIntegrations?.zoom_auth ? null : 'Learn How',
      primaryAction: () => {
        setLoading(false);
        if (allIntegrations?.zoom_auth) updateApi('zoom');
        else connectApi('zoom');
      },
      secondaryAction: () => {
        setLoading(false);
        // if (allIntegrations?.zoom_auth) disConnectApi('zoom');
        // else
        readDocs('zoom');
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

  const updateZoomAuth = async ({
    client_id,
    client_secret,
    account_id,
  }: {
    client_id: string;
    client_secret: string;
    account_id: string;
  }) => {
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
          secondaryText={item.secondaryText!}
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
                reason === 'update_google_workspace'
              }
            >
              <div className='flex flex-col gap-2 space-y-2'>
                <div className='flex flex-col gap-1'>
                  <Label className='text-base font-normal'>Domain Name</Label>
                  <Input
                    defaultValue={allIntegrations?.google_workspace_domain}
                    placeholder='Ex : https://aglinthq.com'
                    ref={domainRef}
                  />
                </div>
                <ShowCode>
                  <ShowCode.When isTrue={fileData!}>
                    <div>
                      <p className='text-base font-normal'>Service Key</p>
                      <Input disabled value={fileData!} />
                    </div>
                  </ShowCode.When>
                  <ShowCode.Else>
                    <ShowCode>
                      <ShowCode.When isTrue={uploading}>
                        <div className='flex h-36 items-center justify-center'>
                          <Loader2 className='h-8 w-8 animate-spin' />
                        </div>
                      </ShowCode.When>
                      <ShowCode.Else>
                        <div className='flex flex-col gap-1'>
                          <Label className='text-base font-normal'>
                            Upload File
                          </Label>
                          <div {...getRootProps()} className='cursor-pointer'>
                            <input {...getInputProps()} />
                            <div className='flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-6'>
                              <p className='text-center text-sm text-gray-600'>
                                Drag & drop a file here, or click to select a
                                file
                              </p>
                            </div>
                          </div>
                          <div className='mt-4 text-sm text-muted-foreground'>
                            Your connection details are encrypted and secured
                            with our platform.
                          </div>
                        </div>
                      </ShowCode.Else>
                    </ShowCode>
                  </ShowCode.Else>
                </ShowCode>
              </div>
            </ShowCode.When>
            <ShowCode.When
              isTrue={reason === 'connect_zoom' || reason === 'update_zoom'}
            >
              <div className='space-y-4'>
                <div>
                  <Label>Account ID</Label>
                  <Input
                    type={'text'}
                    placeholder='Enter Account ID'
                    ref={accountIdRef}
                  />
                </div>
                <div>
                  <Label>Client ID</Label>
                  <Input
                    type={'text'}
                    placeholder='Enter Client Id'
                    ref={clientIdRef}
                  />
                </div>
                <div>
                  <Label>Client Secret</Label>
                  <PasswordField
                    placeholder='Enter Client Secret'
                    ref={clientSecretRef}
                  />
                </div>
                <div className='mt-4 text-sm text-muted-foreground'>
                  Your connection details are encrypted and secured with our
                  platform.
                </div>
              </div>
            </ShowCode.When>
          </ShowCode>
        }
        reason={reason!}
      />
    </>
  );
}

export default Scheduling;
