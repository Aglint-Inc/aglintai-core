const Priority = {
  l4: {
    color: '#467B7C',
    text: 'Lowest',
  },
  l3: {
    color: '#467B7C',
    text: 'Low',
  },
  l2: {
    color: '#F79A3E',
    text: 'Medium',
  },
  l1: {
    color: '#D93F4C',
    text: 'High',
  },
};
export const mapPriority = (level: string) => {
  return Priority[String(level.toLocaleLowerCase())].text;
};
export const mapPriorityColor = (level: string) => {
  return Priority[String(level.toLocaleLowerCase())].color;
};

const Status = {
  open: '#3498DB',
  pending: '#F1C40F',
  'on hold': '#95A5A6',
  resolved: '#228F67',
  escalated: '#9B59B6',
  canceled: '#34495E',
  reopened: '#E74C3C',
};
export const mapStatusColor = (status: string) => {
  return Status[String(status.toLocaleLowerCase())]?.color;
};
