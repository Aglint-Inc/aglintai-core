export type Section = 'Analysis' | 'Education' | 'Experience' | 'Skills';

export const getIconName = (section: Section) => {
  switch (section) {
    case 'Analysis':
      return 'equalizer';
    case 'Education':
      return 'school';
    case 'Experience':
      return 'work';
    case 'Skills':
      return 'handyman';
  }
};
