'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import {
  getEmailsDirectoryMetadata,
  type EmailsDirectory,
} from '../actions/get-emails-directory-metadata';
import { useHotreload } from '../hooks/use-hot-reload';
import { emailsDirectoryAbsolutePath } from '../utils/emails-directory-absolute-path';
import { type EmailRenderingResult } from '../actions/render-email-by-path';

const EmailsContext = createContext<
  | {
      emailsDirectoryMetadata: EmailsDirectory;
      /**
       * Uses the hot reloaded bundled build and rendering email result
       */
      useEmailRenderingResult: (
        emailPath: string,
        serverEmailRenderedResult: EmailRenderingResult,
      ) => EmailRenderingResult;
    }
  | undefined
>(undefined);

export const useEmails = () => {
  const providerValue = useContext(EmailsContext);

  if (typeof providerValue === 'undefined') {
    throw new Error(
      'Cannot call `useEmail()` outside of an EmailsContext provider!',
    );
  }

  return providerValue;
};

export const EmailsProvider = (props: {
  initialEmailsDirectoryMetadata: EmailsDirectory;
  children: React.ReactNode;
}) => {
  const [emailsDirectoryMetadata, setEmailsDirectoryMetadata] =
    useState<EmailsDirectory>(props.initialEmailsDirectoryMetadata);

  const [renderingResultPerEmailPath, setRenderingResultPerEmailPath] =
    useState<Record<string, EmailRenderingResult>>({});

  if (process.env.NEXT_PUBLIC_IS_BUILDING !== 'true') {
    // this will not change on runtime so it doesn't violate
    // the rules of hooks
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useHotreload(async () => {
      const metadata = await getEmailsDirectoryMetadata(
        emailsDirectoryAbsolutePath,
      );
      if (metadata) {
        setEmailsDirectoryMetadata(metadata);
      } else {
        throw new Error(
          'Hot reloading: unable to find the emails directory to update the sidebar',
        );
      }
    });
  }

  return (
    <EmailsContext.Provider
      value={{
        emailsDirectoryMetadata,
        useEmailRenderingResult: (emailPath, serverEmailRenderedResult) => {
          useEffect(() => {
            if (typeof renderingResultPerEmailPath[emailPath] === 'undefined') {
              setRenderingResultPerEmailPath((map) => ({
                ...map,
                [emailPath]: serverEmailRenderedResult,
              }));
            }
          }, [serverEmailRenderedResult, emailPath]);

          if (typeof renderingResultPerEmailPath[emailPath] !== 'undefined') {
            return renderingResultPerEmailPath[emailPath];
          }

          return serverEmailRenderedResult;
        },
      }}
    >
      {props.children}
    </EmailsContext.Provider>
  );
};
