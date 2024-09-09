export function formatSessionsName(sessions: string[]) {
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
  