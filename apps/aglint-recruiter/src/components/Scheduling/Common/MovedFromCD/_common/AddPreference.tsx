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
      className='overflow-hidden border border-neutral-200 rounded-md shadow-md'
      {...onClickAddPreference}
    >
      <CardHeader className='py-1 px-3 bg-gray-50'>
        <UITypography variant='p' type='small'>
          {textPreference}
        </UITypography>
      </CardHeader>
      <CardContent className='p-2 px-3'>
        <div className='flex items-center space-x-1'>
          <UITypography variant='p' type='small'>
            Press
          </UITypography>
          <span className='px-1 border border-neutral-200 rounded'>
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
