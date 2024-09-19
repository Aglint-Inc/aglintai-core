export type DashboardTypes = {
  tenureAndExperience: {
    tenure: { [id: number]: number };
    experience: { [id: number]: number };
    average_tenure: number;
    average_experience: number;
  };
  schedules: any; //needs fix
};
