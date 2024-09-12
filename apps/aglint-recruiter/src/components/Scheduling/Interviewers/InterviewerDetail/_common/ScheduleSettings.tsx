import UITypography from '@/components/Common/UITypography';

export function ScheduleSettings({
  as: _Component = 'div',
  slotTimeZoneInput,
  slotDailyLimit,
  slotWeeklyLimit,
  slotWorkingHourDay,
  slotDayOff,
  onClickAddDate = {},
  slotKeywordCard,
  isKeywordVisible = false,
  isCompanyLevelVisible = true,
  isCompanyDaysOffVisible = true,
}) {
  return (
    <div className='flex max-w-[700px] p-4 flex-col gap-5 bg-white'>
      {isKeywordVisible ? (
        <div className='flex flex-col gap-5'>
          {isCompanyLevelVisible ? (
            <div className='flex flex-col gap-1 w-[620px]'>
              <div className='font-semibold'>{'Keywords'}</div>
              <div className='text-gray-600'>
                {
                  'Keywords allow you to identify events on interviewer’s calendars that can be scheduled over by either you or a candidate when booking interviews.'
                }
              </div>
            </div>
          ) : null}
          <div className='flex flex-col gap-3 w-[658px]'>{slotKeywordCard}</div>
        </div>
      ) : null}
      {isCompanyLevelVisible ? (
        <div className='flex justify-between items-center'>
          <div className='flex flex-col gap-1'>
            <UITypography variant='p' type='small'>
              Set up recruiting time ranges and available working hours
            </UITypography>
            <UITypography variant='p' type='small'>
              Availability
            </UITypography>
          </div>
        </div>
      ) : null}
      <div className='flex flex-col gap-2'>
        <UITypography variant='p' type='small'>
          Time Zone
        </UITypography>
        <div className='flex flex-col-reverse'>{slotTimeZoneInput}</div>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-1'>
          <UITypography variant='p' type='small'>
            Interview Load
          </UITypography>
          <UITypography variant='p' type='small'>
            Setup maximum interviews per day and week.
          </UITypography>
        </div>
        <div className='flex flex-col gap-2 '>
          <UITypography variant='p' type='small' className='w-[120px]'>
            Daily Limit
          </UITypography>
          <div className='flex flex-col gap-1'>{slotDailyLimit}</div>

          <UITypography variant='p' type='small' className='w-[120px]'>
            Weekly Limit
          </UITypography>
          <div className='flex flex-col  gap-1'>{slotWeeklyLimit}</div>
        </div>
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col gap-1'>
          <UITypography variant='p' type='small'>
            Setup working hour across company level.
          </UITypography>
        </div>
        <div className='flex flex-col w-full max-w-[700px]'>
          {slotWorkingHourDay}
        </div>
      </div>
      {isCompanyDaysOffVisible ? (
        <div className='flex flex-col gap-2 pb-10'>
          <div className='flex flex-col gap-1'>
            <div>{'Company Days Off'}</div>
            <div className='text-gray-500'>
              {
                'Add company holidays and these dates will be excluded from scheduling.'
              }
            </div>
          </div>
          <div className='flex flex-col w-full max-w-[500px]'>{slotDayOff}</div>
          <div
            className='flex items-center gap-1 text-[#337fbd] cursor-pointer hover:text-[#1e5f8d]'
            {...onClickAddDate}
          >
            <div className='flex items-center'>
              <svg
                width='12'
                height='12'
                viewBox='0 0 12 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M3.375 0C3.60938 0.015625 3.73438 0.140625 3.75 0.375V1.5H8.25V0.375C8.26562 0.140625 8.39062 0.015625 8.625 0C8.85938 0.015625 8.98438 0.140625 9 0.375V1.5H9.75C10.1719 1.51563 10.5234 1.66406 10.8047 1.94531C11.0859 2.22656 11.2344 2.57812 11.25 3V3.75V4.5V10.5C11.2344 10.9219 11.0859 11.2734 10.8047 11.5547C10.5234 11.8359 10.1719 11.9844 9.75 12H2.25C1.82812 11.9844 1.47656 11.8359 1.19531 11.5547C0.914062 11.2734 0.765625 10.9219 0.75 10.5V4.5V3.75V3C0.765625 2.57812 0.914062 2.22656 1.19531 1.94531C1.47656 1.66406 1.82812 1.51563 2.25 1.5H3V0.375C3.01562 0.140625 3.14062 0.015625 3.375 0ZM10.5 4.5H1.5V10.5C1.5 10.7188 1.57031 10.8984 1.71094 11.0391C1.85156 11.1797 2.03125 11.25 2.25 11.25H9.75C9.96875 11.25 10.1484 11.1797 10.2891 11.0391C10.4297 10.8984 10.5 10.7188 10.5 10.5V4.5ZM9.75 2.25H2.25C2.03125 2.25 1.85156 2.32031 1.71094 2.46094C1.57031 2.60156 1.5 2.78125 1.5 3V3.75H10.5V3C10.5 2.78125 10.4297 2.60156 10.2891 2.46094C10.1484 2.32031 9.96875 2.25 9.75 2.25Z'
                  fill='#337FBD'
                />
              </svg>
            </div>
            <div>{'Add'}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
