import { Button } from '@components/ui/button';
import { KeywordCard } from '@devlink2/KeywordCard';
import { Alert, Typography } from '@mui/material';
import { Plus } from 'lucide-react';
import React from 'react';

import toast from '@/utils/toast';

import AddChip from './AddChip';
import KeyWordChip from './KeyWordChip';

interface KeywordSectionProps {
  title: string;
  warningText: string;
  keywords: string[];
  setKeywords: React.Dispatch<React.SetStateAction<string[]>>;
  emptyMessage: string;
}

const KeywordSection: React.FC<KeywordSectionProps> = ({
  title,
  warningText,
  keywords,
  setKeywords,
  emptyMessage,
}) => {
  const handleAdd = ({ name }) => {
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

  return (
    <KeywordCard
      textTitle={title}
      textWarning={warningText}
      slotInput={
        <AddChip
          options={keywords.map((item) => ({ name: item, id: item }))}
          suggestionsList={[]}
          handleAddDepartment={handleAdd}
          placeholder='Enter new value...'
          btn={
            <Button variant='outline' size='sm' className='rounded-full'>
              <Plus className='h-4 w-4 mr-2' />
              Add keyword
            </Button>
          }
        />
      }
      slotSuggestPill={
        keywords.length === 0 ? (
          <Alert severity='info' icon={false}>
            <Typography>{emptyMessage}</Typography>
          </Alert>
        ) : (
          keywords.map((item, index) => (
            <KeyWordChip
              key={item}
              name={item}
              index={index}
              id={item}
              handleRemoveKeyword={handleDelete}
            />
          ))
        )
      }
    />
  );
};

export default KeywordSection;
