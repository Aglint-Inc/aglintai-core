'use client';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@components/ui/breadcrumb';
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

/* eslint-disable no-unused-vars */
type BreadcrumContextType = {
  breadcrum: ReactNode[];
  setBreadcrum: Dispatch<SetStateAction<{ name: string; route?: string }[]>>;
};
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */
const contextInitialState: BreadcrumContextType = {
  breadcrum: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setBreadcrum: () => {},
};
/* eslint-enable no-unused-vars */

const BreadcrumContext =
  createContext<BreadcrumContextType>(contextInitialState);

export const BreadcrumProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [breadcrum, setBreadcrum] = useState<
    { name: string; route?: string }[]
  >([]);

  useEffect(() => {
    if (breadcrum?.length) {
      localStorage.setItem('aglint_breadcrum', JSON.stringify(breadcrum));
    }
  }, [String(breadcrum?.map((item) => item.name) || [])]);
  useEffect(() => {
    const temp: typeof breadcrum = JSON.parse(
      localStorage.getItem('aglint_breadcrum') || '[]',
    );
    if (temp) {
      setBreadcrum(temp);
    }
  }, []);

  return (
    <BreadcrumContext.Provider
      value={{
        breadcrum: getBreadcrum(
          breadcrum?.map((item) => ({
            ...item,
            onClick: item.route ? () => router.push(item.route) : null,
          })) || [],
        ),
        setBreadcrum,
      }}
    >
      {children}
    </BreadcrumContext.Provider>
  );
};

export const useBreadcrumContext = () => {
  const context = useContext(BreadcrumContext);
  if (context === undefined) {
    throw new Error('useBreadcrumContext must be used within a Task page');
  }
  return context;
};

import { useRouter } from 'next/navigation';

const getBreadcrum = (
  paths: { name: string; onClick?: () => void }[],
) => {
  if (!paths?.length) {
    return [];
  }

  return paths.map((path, index) => (
    <BreadcrumbItem key={index}>
      {index > 0 && <BreadcrumbSeparator />}
      {path.onClick ? (
        <BreadcrumbLink onClick={path.onClick}>{path.name}</BreadcrumbLink>
      ) : (
        <BreadcrumbPage>{path.name}</BreadcrumbPage>
      )}
    </BreadcrumbItem>
  ));
};
