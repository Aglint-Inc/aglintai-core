export type EventCalendar = {
  extendedProps: {
    conferenceData: {
      key: {
        type: string;
      };
      name: string;
      iconUri: string;
    } | null;
    attendees: {
      email: string;
      responseStatus?: 'accepted' | 'declined' | 'tentative' | 'needsAction';
      organizer: boolean;
    }[];
    color: string;
    isSelected?: boolean;
    isLoading?: boolean;
    session_id?: string;
  };
  start: string;
  end: string;
  title: string;
  resourceId: string;
  id: string;
};

export type Resource = {
  id: string;
  title: string;
  extendedProps: {
    data: {
      id: string;
      profile_pic: string | null;
      email: string;
      name: string;
      position: string | null;
    };
    color: string;
  };
};
