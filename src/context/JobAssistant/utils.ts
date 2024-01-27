export const reasons = {
  compare: 'compared_result',
  filter: 'filtered_result',
};

export const chatusers = {
  recruiter: 'You',
  assistant: 'Assistant',
};

export const getResumeMatched = (score: number) => {
  if (score >= 80)
    return {
      text: 'Top match',
      bgColor: '#A81897',
      borderColor: 'rgba(168, 24, 151, 0.2)',
    };
  else if (score >= 60)
    return {
      text: 'Good match',
      bgColor: '#228F67',
      borderColor: 'rgb(195, 234, 223)',
    };
  else if (score >= 40)
    return {
      text: 'Average match',
      bgColor: 'rgb(252 152 0)',
      borderColor: 'rgba(86, 65, 0, 0.10)',
    };
  else if (score >= 20)
    return {
      text: 'Poor match',
      bgColor: 'rgb(255 180 0)',
      borderColor: 'rgba(255, 212, 161, 0.50)',
    };
  else if (score >= 0)
    return {
      text: 'Not a match',
      bgColor: 'rgba(255, 240, 241, 1)',
      borderColor: 'rgb(255, 210, 216)',
    };
  else if (score == -1)
    return {
      text: 'Resume not parsable',
      bgColor: 'rgba(255, 240, 241, 1)',
      borderColor: 'rgb(255, 210, 216)',
    };
  else if (score == -2)
    return {
      text: 'Resume not found',
      bgColor: 'rgba(255, 240, 241, 1)',
      borderColor: 'rgb(255, 210, 216)',
    };
};

export const suggestions = {
  initialPrompts: [
    'Get top 5 applicants by location `San Francisco`.',
    'View applicants by email `email@domain.com`',
    'Get top 5 applicants.',
    'Get top 5 applicants with skill `React`.',
    'Get top 2 candidates and compare',
  ],
  topMatchSuggestion: [
    'Compare first two applicants.',
    'Get next top 5 applicants.',
  ],
  skillSuggestion: [
    'Compare first two applicants.',
    'Get next top 5 applicants.',
  ],
  locationSuggestion: [
    'Compare first two applicants.',
    'Get next top 5 applicants.',
    'Near by `Location name`',
  ],
  compareSuggestion: ['Select First candidate.', 'Select secound candidate.'],
  common: [
    'Get top 5 applicants by location `San Francisco`.',
    'Get top 5 applicants.',
    'Get top 5 applicants with skill `React`.',
  ],
};

export function getSuggestedPrompts(searchArguments, result_candidates) {
  return searchArguments.get_applications?.arguments?.sort &&
    result_candidates.length &&
    result_candidates.length
    ? suggestions.topMatchSuggestion
    : searchArguments.get_applications?.arguments?.location &&
        result_candidates.length
      ? suggestions.locationSuggestion
      : searchArguments.get_applications_extra_details?.arguments?.reason ===
          reasons.compare
        ? suggestions.compareSuggestion
        : [];
}
