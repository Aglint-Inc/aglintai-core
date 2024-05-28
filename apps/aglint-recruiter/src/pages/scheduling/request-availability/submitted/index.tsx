import { AvailabilitySubmitted } from '@/devlink2/AvailabilitySubmitted';

function RequestSubmittedAvailability() {
  return <AvailabilitySubmitted />;
}

export default RequestSubmittedAvailability;

RequestSubmittedAvailability.publicProvider = (page) => {
  return page;
};
