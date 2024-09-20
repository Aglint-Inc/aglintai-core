/* eslint-disable no-unused-vars */
export enum featureFlag {
  isAssistantEnabled = 'isAssistantEnabled',
  isSupportEnabled = 'isSupportEnabled',
}

export const interviewPlanRecruiterUserQuery =
  'user_id, first_name, last_name, email, profile_image, position, status, phone, linked_in, office_location_id, employment, department_id' as const;

//  'user_id, first_name, last_name, email, profile_image, position, status, phone, linked_in, office_location_id, employment, department_id' as const;
