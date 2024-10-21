import { useState } from 'react';

export const useHeaderPropContext = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedDepartments, setDepartments] = useState<string[]>([]);
  const isFilterApplied = !!selectedDepartments?.length || !!searchText?.length;
  const [activeTab, setActiveTab] = useState<'active' | 'archived'>('active');
  const handleTabChange = (value: string) => {
    if (value === 'active' || value === 'archived') {
      setActiveTab(value);
    }
  };
  return {
    searchText,
    setSearchText,
    selectedDepartments,
    setDepartments,
    isFilterApplied,
    activeTab,
    setActiveTab,
    handleTabChange,
  };
};
