export const employeeRange = [
  { value: '10001', show: '10001+' },
  { value: '5001,10000', show: '5001-10000' },
  { value: '2001,5000', show: '2001-5000' },
  { value: '1001,2000', show: '1001-2000' },
  { value: '501,1000', show: '501-1000' },
  { value: '201,500', show: '201-500' },
  { value: '101,200', show: '101-200' },
  { value: '51,100', show: '51-100' },
  { value: '21,50', show: '21-50' },
  { value: '11,20', show: '11-20' },
  { value: '1,10', show: '1-10' },
];

export const initialQuery = () => {
  return {
    companies: [],
    jobTitles: [],
    locations: [],
    companySize: '',
  };
};
