import { Card, CardContent, CardHeader } from '@components/ui/card';

import UITypography from '@/components/Common/UITypography';

interface AddPreferenceProps {
  textPreference?: React.ReactNode;
  onClickAddPreference?: React.HTMLAttributes<HTMLDivElement>;
}

export function AddPreference({
  textPreference = 'This is some text inside of a div block.',
  onClickAddPreference = {},
}: AddPreferenceProps) {
  return (
    <Card
      className='overflow-hidden rounded-md border border-neutral-200 shadow-md'
      {...onClickAddPreference}
    >
      <CardHeader className='bg-gray-50 px-3 py-1'>
        <UITypography variant='p' type='small'>
          {textPreference}
        </UITypography>
      </CardHeader>
      <CardContent className='p-2 px-3'>
        <div className='flex items-center space-x-1'>
          <UITypography variant='p' type='small'>
            Press
          </UITypography>
          <span className='rounded border border-neutral-200 px-1'>
            <UITypography variant='p' type='small'>
              Enter
            </UITypography>
          </span>
          <UITypography variant='p' type='small'>
            to add this to the preference
          </UITypography>
        </div>
      </CardContent>
    </Card>
  );
}
