import { getFullName } from '@aglint/shared-utils';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import Link from 'next/link';

import { type ChatType } from '../hooks/fetch';

function HiringTeam({ chat }: { chat: ChatType }) {
  const meta = chat.metadata;
  const job = meta.findLast((m) => m.function_name === 'fetch_hiring_team')
    ?.payload as any;

  const hiringTeam = [
    {
      role: 'Recruiter',
      name: getFullName(job.rec?.first_name, job.rec?.last_name),
      image: job.rec?.profile_image,
      user_id: job.rec?.user_id,
    },
    {
      role: 'Hiring Manager',
      name: getFullName(job.hir_man?.first_name, job.hir_man?.last_name),
      image: job.hir_man?.profile_image,
      user_id: job.hir_man?.user_id,
    },
    ...(job.recruiting_coordinator
      ? [
          {
            role: 'Recruiting Coordinator',
            name: getFullName(
              job.recruiting_coordinator?.first_name,
              job.recruiting_coordinator?.last_name,
            ),
            image: job.recruiting_coordinator?.profile_image,
            user_id: job.recruiting_coordinator?.user_id,
          },
        ]
      : []),
  ];

  return (
    <div className='space-y-2 pt-2'>
      <div>
        <p className='text-muted-foreground'>
          {job?.job_title
            ? `Here is the hiring team for ${job?.job_title}`
            : 'Here is the hiring team'}
        </p>
      </div>

      {hiringTeam?.map((item) => {
        return (
          <div key={item.user_id} className='flex items-center space-x-4'>
            <Avatar className='rounded-full w-10 h-10'>
              <AvatarImage src={item.image} alt={item.name} />
              <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <Link
                href={`/user/profile/${item.user_id}`}
                className='text-blue-500 hover:underline'
              >
                {item.name}
              </Link>
              <p className='text-sm text-gray-500'>{item.role}</p>
            </div>
          </div>
        );
      })}

      {job?.id && (
        <Link href={`/jobs/${job?.id}/hiring-team`} className='flex flex-row'>
          <button className='px-4 py-2 bg-neutral-200 text-neutral-700 rounded'>
            View Hiring Team
          </button>
        </Link>
      )}
    </div>
  );
}

export default HiringTeam;
