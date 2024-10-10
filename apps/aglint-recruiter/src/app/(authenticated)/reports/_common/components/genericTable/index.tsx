import { Skeleton } from '@components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import React from 'react';

type TableHeader = {
  key: string;
  label: string;
};

type TableProps = {
  title: string;
  headerOption?: React.ReactNode;
  headers: TableHeader[];
  data: Record<string, any>[];
  isLoading?: boolean;
  emptyStateMessage?: string;
};

export default function GenericTable({
  title,
  headerOption,
  headers,
  data,
  isLoading = false,
  emptyStateMessage = 'No data available',
}: TableProps) {
  const renderTableBody = () => {
    if (isLoading) {
      return (
        <TableRow>
          <TableCell colSpan={headers.length}>
            <div className='flex items-center space-x-4'>
              <Skeleton className='h-12 w-12 rounded-full' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-[250px]' />
                <Skeleton className='h-4 w-[200px]' />
              </div>
            </div>
          </TableCell>
        </TableRow>
      );
    }

    if (data.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={headers.length} className='h-24'>
            {emptyStateMessage}
          </TableCell>
        </TableRow>
      );
    }

    return data.map((row, index) => (
      <TableRow key={index}>
        {headers.map((header) => (
          <TableCell key={header.key} className={''}>
            {row[header.key]}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  return (
    <div className='rounded-lg border shadow-sm'>
      <div className='flex flex-row justify-between border-b bg-gray-50 px-4 py-3'>
        <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
        {Boolean(headerOption) && headerOption}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header.key} className={'font-bold'}>
                {header.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{renderTableBody()}</TableBody>
      </Table>
    </div>
  );
}
