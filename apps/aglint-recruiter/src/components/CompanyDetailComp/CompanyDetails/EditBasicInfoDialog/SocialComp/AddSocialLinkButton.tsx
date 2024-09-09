import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@components/ui/popover';
import { useState } from 'react';

import { validation } from './utils';

const AddSocialLinkButton = ({ AddCustomSocialHandle, customSocials }) => {
  const [open, setOpen] = useState(false);
  const [social, setSocial] = useState({
    name: { value: '', error: false, type: 'string' },
    url: { value: '', error: false, type: 'url' },
  });
  const [isExist, setIsExist] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const handleValidate = () => {
    const newSocial = { ...social };
    let hasError = false;

    Object.entries(social).forEach(([key, curr]) => {
      const err = !validation(curr.value, curr.type);
      newSocial[key] = { ...curr, error: err };
      if (err) hasError = true;
    });

    return { newSocial, error: hasError };
  };

  const handleSubmit = () => {
    setLoading(true);
    const { newSocial, error } = handleValidate();
    const newName = newSocial.name.value.trim().toLowerCase();
    const newValue = newSocial.url.value;

    const isExits = Object.keys(customSocials).includes(newName);

    if (isExits) {
      setIsExist(true);
      setLoading(false);
      return;
    }

    if (!error) {
      AddCustomSocialHandle(newName, newValue);
      handleClose();
    } else {
      setSocial(newSocial);
    }
    setLoading(false);
    setIsExist(false);
  };

  const handleChange = (e, key: 'name' | 'url') => {
    setSocial((prev) => ({
      ...prev,
      [key]: { ...prev[key], value: e.target.value, error: false },
    }));
  };

  const handleClose = () => {
    setOpen(false);
    setLoading(false);
    setSocial({
      name: { value: '', error: false, type: 'string' },
      url: { value: '', error: false, type: 'url' },
    });
  };

  return (
    <div className='flex items-center'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline'>Add Social Link</Button>
        </PopoverTrigger>
        <PopoverContent className='w-80' align='start' side='top'>
          <h3 className='font-medium mb-2'>Add Social Link</h3>
          <div className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='name'>Platform Name</Label>
              <Input
                id='name'
                placeholder='Platform name'
                value={social.name.value}
                onChange={(e) => handleChange(e, 'name')}
              />
              {social.name.error && (
                <p className='text-sm text-red-500'>
                  Please enter a valid social media name
                </p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='url'>Platform URL</Label>
              <Input
                id='url'
                placeholder='Platform URL'
                value={social.url.value}
                onChange={(e) => handleChange(e, 'url')}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              />
              {social.url.error && (
                <p className='text-sm text-red-500'>
                  Please enter a valid social media URL
                </p>
              )}
              {isExist && (
                <p className='text-sm text-red-500'>
                  This social already exist. please check
                </p>
              )}
            </div>
          </div>
          <div className='flex justify-end gap-2 mt-4'>
            <Button variant='outline' onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? 'Adding...' : 'Add'}
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AddSocialLinkButton;
