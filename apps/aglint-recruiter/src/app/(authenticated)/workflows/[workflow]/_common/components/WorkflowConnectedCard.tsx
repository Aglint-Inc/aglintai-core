import { Card, CardContent, CardHeader } from '@components/ui/card';
import { ExternalLink, Link2Off} from 'lucide-react';
import Link from 'next/link';

import { UIButton } from '@/components/Common/UIButton';

interface WorkflowConnectedCardProps {
  role?: React.ReactNode;
  slotBadges?: React.ReactNode;
  textRoleCategory?: React.ReactNode;
  textLocation?: React.ReactNode;
  onClickLinkOff?: () => void;
  isLinkOffVisible?: boolean;
  jobLink?: { href: string };
  onClickJob?: () => void;
}

export function WorkflowConnectedCard({
  role = '',
  slotBadges,
  // textRoleCategory = '',
  // textLocation = '',
  onClickLinkOff,
  isLinkOffVisible = true,
  jobLink = { href: '#' },
  onClickJob,
}: WorkflowConnectedCardProps) {
  return (
    <Card className='group cursor-pointer bg-gray-50 border-none shadow-none flex flex-row items-center gap-4'>
      <CardHeader className='flex flex-row items-center gap-2 p-0'>
        <p className='font-regular text-sm'>{role}</p>
        {slotBadges}
      </CardHeader>
      <CardContent className='relative p-0'>
        {/* <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-2'>
            <Building2 size={14} />
            <p>{textRoleCategory}</p>
          </div>
          <div className='flex items-center gap-2'>
            <MapPin size={14} />
            <p>{textLocation}</p>
          </div>
        </div> */}
        <div className='hidden items-center gap-2 group-hover:flex'>
          <Link href={jobLink.href} target='_blank' className='bg-white shadow-sm rounded-sm'>
            <UIButton
              variant='ghost'
              onClick={onClickJob}
              size='sm'
              icon={<ExternalLink size={10} />}
            />
          </Link>
          {isLinkOffVisible && (
            <div  className='bg-white shadow-sm rounded-sm'>
            <UIButton
              variant='ghost'
              size='sm'
              onClick={onClickLinkOff}
              icon={<Link2Off />}
            />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
