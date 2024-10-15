import Typography from '@components/typography';
import { type Dispatch, type SetStateAction } from 'react';

import KeywordSection from '@/authenticated/components/KeywordSection';

type FormProp = {
  keywords: {
    title: string;
    description: string;
    value: any[];
    changeHandler: Dispatch<SetStateAction<any[]>>;
  }[];
};

export const EditKeywordsForm = ({ keywords }: FormProp) => {
  return (
    <div>
      {keywords.map((keyword) => {
        return (
          <div className='mb-12 flex flex-col' key={keyword.title}>
            <Typography
              variant='p'
              type='small'
              className='mb-1 text-sm font-medium'
            >
              {keyword.title}
            </Typography>
            <Typography
              variant='p'
              type='small'
              className='mb-2 text-muted-foreground'
            >
              {keyword.description}
            </Typography>
            <KeywordSection
              keywords={keyword.value}
              setKeywords={keyword.changeHandler}
            />
          </div>
        );
      })}
    </div>
  );
};
