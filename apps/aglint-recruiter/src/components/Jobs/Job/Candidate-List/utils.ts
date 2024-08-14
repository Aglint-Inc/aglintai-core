export const formatTimeStamp = (timeStamp: string) => {
  if (timeStamp) {
    const date = new Date(timeStamp);
    const creationDate = `${date.getDate()} ${date.toLocaleString('default', {
      month: 'short',
    })} ${date.getFullYear()}`;
    const creationHour = date.getHours();
    const finalHour =
      creationHour % 12 === 0
        ? 12
        : creationHour % 12 < 10
          ? `0${creationHour % 12}`
          : creationHour % 12;
    const creationMinutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const creationTime = `${finalHour}:${creationMinutes} ${
      creationHour < 12 ? 'AM' : 'PM'
    }`;
    return `${creationDate}, ${creationTime}`;
  }
  return '---';
};

export function formatSessions(sessions: string[]) {
  if (sessions.length === 0) {
    return '';
  } else if (sessions.length === 1) {
    return sessions[0];
  } else {
    return (
      sessions.slice(0, -1).join(', ') + ' and ' + sessions[sessions.length - 1]
    );
  }
}
