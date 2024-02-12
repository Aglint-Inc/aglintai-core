import { type useAssessment } from '.';

export type Assessment = ReturnType<typeof useAssessment>['data'][number];

export type AssessmentCard = Pick<
  Assessment,
  'title' | 'description' | 'level' | 'type'
>;
