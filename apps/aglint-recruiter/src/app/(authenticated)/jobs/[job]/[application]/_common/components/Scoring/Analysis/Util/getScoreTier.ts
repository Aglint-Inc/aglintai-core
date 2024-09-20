export const getScoreTier = (score: number): 'High' | 'Medium' | 'Low' => {
  return score > 66 ? 'High' : score > 33 ? 'Medium' : 'Low';
};
