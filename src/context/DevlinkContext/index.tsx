import Link from 'next/link';
import { createContext } from 'react';

import { DevLinkProvider as DevLinkProvider1, RenderLink } from '@/devlink';

export const DevLinkMainContext = createContext(null);
export const DevlinkMainProvider = ({ children }) => {
  return (
    <DevLinkMainContext.Provider value={null}>
      <DevLinkProvider1 renderLink={LinkRenderer}>{children}</DevLinkProvider1>
    </DevLinkMainContext.Provider>
  );
};

const LinkRenderer: RenderLink = ({ href, className, children, ...props }) => (
  <Link href={href} className={className} {...props}>
    {children}
  </Link>
);
