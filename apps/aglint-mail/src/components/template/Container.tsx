import { Body, Container, Img, Tailwind } from '@react-email/components';
import { Html } from 'next/document';
import config from '../../../tailwind.config';
import { Parser } from 'html-to-react';
import { Footer } from './Footer';

export function EmailContainer({
  companyLogo,
  emailBody,
  children,
}: {
  companyLogo: string;
  emailBody: string;
  children?: React.ReactNode;
}) {
  const htmlParser = Parser();
  return (
    <Html>
      <Tailwind config={config}>
        {/* <Preview></Preview> */}
        <Body className="bg-neutral-3 font-sans  p-[20px]">
          <Container className="px-[3px] mx-auto">
            <Container className="p-[50px] bg-white rounded-[8px]">
              <Img
                alt="Company logo"
                className="w-[80px] mb-[10px]"
                src={companyLogo}
              />
              <Container className="text-text-sm text-neutral-12">
                {htmlParser.parse(emailBody)}
              </Container>
              {children}
            </Container>
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
