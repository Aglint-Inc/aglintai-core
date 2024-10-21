import { EmptyState } from '@components/empty-state';
import { Button } from '@components/ui/button';
import { Plus, Text } from 'lucide-react';
import React from 'react';

import AddChip from '@/components/Common/AddChip';
import toast from '@/utils/toast';

interface KeywordSectionProps {
  keywords: string[];
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
}

const KeywordSection: React.FC<KeywordSectionProps> = ({
  keywords,
  setKeywords,
}) => {
  const handleAdd = ({ name }: { name: string }) => {
    const newKeywords = String(name).split(',');
    newKeywords.forEach((item) => {
      const trimmedItem = item.trim();
      if (trimmedItem.length) {
        if (keywords.includes(trimmedItem)) {
          toast.warning(`"${trimmedItem}" keyword exists.`);
        } else {
          setKeywords((prev) => [trimmedItem, ...prev]);
        }
      }
    });
  };

  const handleDelete = (itemToDelete: string) => {
    setKeywords((prev) => prev.filter((item) => item !== itemToDelete));
  };

  return keywords?.length > 0 ? (
    <AddChip
      options={keywords.map((item) => ({ name: item, id: item }))}
      suggestionsList={[]}
      handleAddDepartment={handleAdd}
      placeholder='Enter new value...'
      btn={
        <Button variant='outline' size='sm' className='rounded-md'>
          <Plus className='mr-2 h-4 w-4' />
          Add keyword
        </Button>
      }
      handleRemoveKeyword={({ name }) => {
        handleDelete(name);
      }}
    />
  ) : (
    <EmptyState
      variant='inline'
      icon={Text}
      description='No keywords added yet. Add now.'
      primarySlot={
        <AddChip
          options={keywords.map((item) => ({ name: item, id: item }))}
          suggestionsList={[]}
          handleAddDepartment={handleAdd}
          placeholder='Enter new value...'
          btn={
            <Button size='sm' variant='outline'>
              <Plus className='mr-2 h-4 w-4' />
              Add keyword
            </Button>
          }
          handleRemoveKeyword={({ name }) => {
            handleDelete(name);
          }}
        />
      }
    />
  );
};

export default KeywordSection;
