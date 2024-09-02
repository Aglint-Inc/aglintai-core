'use client';
import { type DatabaseEnums } from '@aglint/shared-types';
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
export type taskFilterType = {
  Job: string[];
  Status: DatabaseEnums['task_status'][];
  Priority: DatabaseEnums['task_priority'][];
  Assignee: string[];
  Type: DatabaseEnums['task_type_enum'][];
  Candidate: string[];
};

/* eslint-disable no-unused-vars */
export type BreadcrumContextType = {
  breadcrum: ReactNode[];
  setBreadcrum: Dispatch<SetStateAction<{ name: string; route?: string }[]>>;
};
/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */
const contextInitialState: BreadcrumContextType = {
  breadcrum: [],
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

import { Breadcrum } from '@/devlink2/Breadcrum';
export const getBreadcrum = (
  paths: { name: string; onClick?: () => void }[],
  notFirst?: boolean,
) => {
  if (!paths?.length) {
    return;
  }
  if (paths.length == 1) {
    return [
      <Breadcrum key={1} showArrow={notFirst} textName={paths[0].name} />,
    ];
  }
  const [curr, ...rest] = paths;

  return [
    <Breadcrum
      key={paths.length}
      textName={curr.name}
      showArrow={notFirst}
      isLink={Boolean(curr.onClick)}
      onClickLink={{ onClick: () => curr.onClick && curr.onClick() }}
    />,
    ...getBreadcrum(rest, true),
  ];
};
