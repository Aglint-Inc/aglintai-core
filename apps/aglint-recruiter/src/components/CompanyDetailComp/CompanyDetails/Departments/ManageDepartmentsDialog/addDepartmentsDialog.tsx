import { useToast } from '@components/hooks/use-toast';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { Plus } from 'lucide-react';
import React, { ReactNode, useState } from 'react';

import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { manageDepartments } from '@/context/AuthContext/utils';
import { useAllDepartments } from '@/queries/departments';

interface DepartmentsProps {
  btn: ReactNode;
}

const AddDepartmentsDialog: React.FC<DepartmentsProps> = ({ btn }) => {
  const { data: departments, refetch: refetchDepartments } =
    useAllDepartments();
  const departmentNames = departments.map((ele) => ele.name);
  const { recruiter } = useAuthDetails();
  const [inputValue, setInputValue] = useState('');
  let initialDepartments = [];

  if (localStorage?.getItem('departments')) {
    if (Array.isArray(JSON.parse(localStorage?.getItem('departments')))) {
      initialDepartments = JSON.parse(localStorage?.getItem('departments'));
    }
  }
  const { toast } = useToast();
  const handleAddDepartment = async (department: string) => {
    toast({
      title: 'Department is already exists.',
      description: '',
    });
    if (department.trim() !== '') {
      await manageDepartments({
        type: 'insert',
        data: [{ recruiter_id: recruiter.id, name: department }],
      }).catch((err) => {
        toast({
          title: String(err).includes('unique_deps')
            ? `Department is already exists.`
            : String(err),
          description: '',
        });
      });
      refetchDepartments();
    } else {
      // toast.error('Please enter valid department name.');
    }
    setInputValue('');
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{btn}</PopoverTrigger>
      <PopoverContent className='p-0' side='right' align='start'>
        <Command>
          <CommandInput
            placeholder='Enter new department...'
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading='Suggestions'>
              {initialDepartments.map((department) => (
                <CommandItem
                  key={department}
                  value={department}
                  onSelect={() => handleAddDepartment(department)}
                >
                  <Plus className='mr-2 h-4 w-4' />
                  <span>{department}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            {inputValue &&
              !departmentNames.includes(inputValue) &&
              !departmentNames.includes(inputValue) && (
                <CommandGroup heading='Custom'>
                  <CommandItem onSelect={() => handleAddDepartment(inputValue)}>
                    <Plus className='mr-2 h-4 w-4' />
                    <span>Add {inputValue}</span>
                  </CommandItem>
                </CommandGroup>
              )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AddDepartmentsDialog;
