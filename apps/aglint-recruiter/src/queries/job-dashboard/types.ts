export type DashboardTypes = {
  locations: {
    city: {
      [id: string]: number;
    };
    state: {
      [id: string]: number;
    };
    country: {
      [id: string]: number;
    };
  };
  tenureAndExperience: {
    tenure: { [id: number]: number };
    experience: { [id: number]: number };
    average_tenure: number;
    average_experience: number;
  };
  schedules: any; //needs fix
};
