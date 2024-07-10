import { GlobalInfo } from '@/devlink2/GlobalInfo';

import { SchedulingFlow, useSchedulingFlowStore } from '../store';

function ErrorsFindAvailibility() {
  const { noOptions, filteredSchedulingOptions } = useSchedulingFlowStore(
    (state) => ({
      noOptions: state.noOptions,
      filteredSchedulingOptions: state.filteredSchedulingOptions,
    }),
  );

  const errors = getErrors(filteredSchedulingOptions);

  console.log(filteredSchedulingOptions);

  return (
    <>
      {noOptions && (
        <GlobalInfo
          color={'warning'}
          textTitle={
            'No available slots found. Please try expanding the date ranges.'
          }
          textDescription={null}
          showWidget={true}
          // slotWidget={
          //   <ul>
          //     {errors.map((error) => {
          //       return (
          //         <li key={error.date}>
          //           {dayjsLocal(error.date).format('MMM DD')} :{' '}
          //           {error.errors.join(', ')}
          //         </li>
          //       );
          //     })}
          //   </ul>
          // }
        />
      )}
    </>
  );
}

export default ErrorsFindAvailibility;

function getErrors(
  schedulingOptions: SchedulingFlow['filteredSchedulingOptions'],
) {
  return schedulingOptions.map((option) => ({
    date_range: option.date_range,
    errors: option.plans.map((plan) =>
      plan.no_slot_reasons.map((reason) => reason.reason),
    ),
  }));
}
