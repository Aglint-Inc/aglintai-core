import Link from 'next/link';
import { createContext } from 'react';

import { DevLinkProvider as DevLinkProvider1 } from '@/devlink/DevLinkProvider';
import { RenderLink } from '@/devlink/devlinkContext';
import { DevLinkProvider as DevLinkProvider2 } from '@/devlink2/DevLinkProvider';
import { DevLinkProvider as DevLinkProvider3 } from '@/devlink3/DevLinkProvider';

export const DevlinkMainProvider = ({ children }) => {
  return (
    <DevLinkProvider1 renderLink={LinkRenderer}>
      <DevLinkProvider2 renderLink={LinkRenderer}>
        <DevLinkProvider3 renderLink={LinkRenderer}>
          {children}
        </DevLinkProvider3>
      </DevLinkProvider2>
    </DevLinkProvider1>
  );
};

const LinkRenderer: RenderLink = ({ href, className, children, ...props }) => (
  <Link href={href} className={className} {...props}>
    {children}
  </Link>
);
