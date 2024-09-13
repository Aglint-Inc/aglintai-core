import { Card, CardContent, CardHeader } from '@components/ui/card';
import { Building2, ExternalLink, Link2Off, MapPin } from 'lucide-react';
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
  textRoleCategory = '',
  textLocation = '',
  onClickLinkOff,
  isLinkOffVisible = true,
  jobLink = { href: '#' },
  onClickJob,
}: WorkflowConnectedCardProps) {
  return (
    <Card className='cursor-pointer group p-3'>
      <CardHeader className='flex flex-row items-center gap-2 p-0'>
        <p className='font-semibold'>{role}</p>
        {slotBadges}
      </CardHeader>
      <CardContent className='relative p-0'>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-2'>
            <Building2 size={14} />
            <p>{textRoleCategory}</p>
          </div>
          <div className='flex items-center gap-2'>
            <MapPin size={14} />
            <p>{textLocation}</p>
          </div>
        </div>
        <div className='absolute right-0 bottom-0 hidden group-hover:flex items-center gap-2'>
          <Link href={jobLink.href} target='_blank'>
            <UIButton
              variant='ghost'
              onClick={onClickJob}
              size='sm'
              icon={<ExternalLink size={10} />}
            />
          </Link>
          {isLinkOffVisible && (
            <UIButton
              variant='ghost'
              size='sm'
              onClick={onClickLinkOff}
              icon={<Link2Off />}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
